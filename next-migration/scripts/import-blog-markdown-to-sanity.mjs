import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

function usage() {
  console.error(
    "Usage: node scripts/import-blog-markdown-to-sanity.mjs <markdown-file> [--dry-run] [--english-only]"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const englishOnly = args.includes("--english-only");
const markdownFile = args.find((arg) => !arg.startsWith("--"));

if (!markdownFile) {
  usage();
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axzpb83z";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-05-23";
const token =
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_READ_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  "";

if (!token) {
  throw new Error(
    "Missing SANITY auth token. Set SANITY_WRITE_TOKEN, SANITY_READ_TOKEN, or SANITY_AUTH_TOKEN."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const source = fs.readFileSync(path.resolve(markdownFile), "utf8");

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractField(label) {
  const escaped = escapeRegex(label);
  const patterns = [
    new RegExp(`^\\*\\*${escaped}:\\*\\*\\s*(.+?)\\s*$`, "m"),
    new RegExp(`^${escaped}:\\s*(.+?)\\s*$`, "m")
  ];

  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

function parseCustomHeading(line) {
  const match =
    line.match(/^`?H([123])[:：]\s*(.+?)`?\s*$/) ||
    line.match(/^#{1,3}\s*H([123])[:：]\s*(.+?)\s*$/);
  if (!match) {
    return null;
  }

  return {
    level: Number(match[1]),
    text: match[2].trim()
  };
}

function createKey(prefix = "k") {
  return `${prefix}-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

function containsCjk(text) {
  return /[\u3400-\u9fff]/.test(text || "");
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDivider(line) {
  return /^\|(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line.trim());
}

function pushTextSpan(children, text, marks = []) {
  if (!text) {
    return;
  }

  children.push({
    _type: "span",
    _key: createKey("span"),
    text,
    marks
  });
}

function buildPortableTextChildren(text) {
  const children = [];
  const markDefs = [];
  const tokenPattern = /(\[([^\]]+)\]\((https?:\/\/[^)\s]+)\))|(\*\*([^*]+)\*\*)/g;
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > cursor) {
      pushTextSpan(children, text.slice(cursor, match.index));
    }

    if (match[1]) {
      const markKey = createKey("link");
      markDefs.push({
        _key: markKey,
        _type: "link",
        href: match[3]
      });
      pushTextSpan(children, match[2], [markKey]);
    } else if (match[4]) {
      pushTextSpan(children, match[5], ["strong"]);
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    pushTextSpan(children, text.slice(cursor));
  }

  if (!children.length) {
    pushTextSpan(children, text);
  }

  return { children, markDefs };
}

function createBlock(text, style = "normal", extra = {}) {
  const { children, markDefs } = buildPortableTextChildren(text);
  return {
    _type: "block",
    _key: createKey("block"),
    style,
    markDefs,
    children,
    ...extra
  };
}

function normalizeParagraph(lines) {
  return lines.map((line) => line.trim()).join(" ").replace(/\s+/g, " ").trim();
}

function parseBody(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const body = [];
  let index = lines.findIndex((line) => parseCustomHeading(line.trim())?.level === 1);

  if (index === -1) {
    index = 0;
  } else {
    index += 1;
    while (index < lines.length && !lines[index].trim()) {
      index += 1;
    }

    if (parseCustomHeading(lines[index]?.trim())?.level === 1) {
      index += 1;
    }
  }

  let paragraphBuffer = [];

  function flushParagraph() {
    const paragraph = normalizeParagraph(paragraphBuffer);
    if (paragraph && !(englishOnly && containsCjk(paragraph))) {
      body.push(createBlock(paragraph));
    }
    paragraphBuffer = [];
  }

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line || line === "---") {
      flushParagraph();
      index += 1;
      continue;
    }

    const heading = parseCustomHeading(line);
    if (heading) {
      flushParagraph();
      if (heading.level > 1 && !(englishOnly && containsCjk(heading.text))) {
        body.push(createBlock(heading.text, `h${heading.level}`));
      }
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }

      const meaningfulLines = tableLines.filter((entry) => !isTableDivider(entry));
      if (
        meaningfulLines.length >= 2 &&
        !(englishOnly && containsCjk(meaningfulLines[0]))
      ) {
        body.push({
          _type: "comparisonTable",
          _key: createKey("table"),
          headers: splitTableRow(meaningfulLines[0]),
          rows: meaningfulLines.slice(1).map(splitTableRow)
        });
      }
      continue;
    }

    if (/^- /.test(line)) {
      flushParagraph();
      while (index < lines.length && /^- /.test(lines[index].trim())) {
        const itemText = lines[index].trim().replace(/^- /, "").trim();
        if (!(englishOnly && containsCjk(itemText))) {
          body.push(
            createBlock(itemText, "normal", {
              listItem: "bullet",
              level: 1
            })
          );
        }
        index += 1;
      }
      continue;
    }

    paragraphBuffer.push(line);
    index += 1;
  }

  flushParagraph();
  return body;
}

const metaTitle = extractField("Meta Title");
const metaDescription = extractField("Meta Description");
const slug = extractField("URL Slug")
  .replace(/`/g, "")
  .trim()
  .replace(/^\/+|\/+$/g, "");

if (!metaTitle || !metaDescription || !slug) {
  throw new Error("Failed to extract Meta Title, Meta Description, or URL Slug.");
}

const articleTitle =
  source
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => parseCustomHeading(line.trim()))
    .find((heading) => heading?.level === 1)?.text || metaTitle;
const body = parseBody(source);
const existing = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id,publishedAt,heroImage,seo}',
  { slug }
);

const documentId = existing?._id || `post-${slug}`;
const nowIso = new Date().toISOString();

const doc = {
  _id: documentId,
  _type: "post",
  title: articleTitle,
  slug: {
    _type: "slug",
    current: slug
  },
  excerpt: metaDescription,
  publishedAt: existing?.publishedAt || nowIso,
  ...(existing?.heroImage ? { heroImage: existing.heroImage } : {}),
  body,
  seo: {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      "warehouse robots",
      "warehouse automation",
      "autonomous warehouse robots",
      "AMR",
      "AGV",
      "ASRS"
    ],
    canonicalUrl: `/blog/${slug}`,
    noindex: false,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    twitterCard: "summary_large_image",
    ...(existing?.seo?.ogImage ? { ogImage: existing.seo.ogImage } : {})
  }
};

if (dryRun) {
  console.log(JSON.stringify(doc, null, 2));
  process.exit(0);
}

await client.createOrReplace(doc);

console.log(
  JSON.stringify(
    {
      status: "ok",
      documentId,
      slug,
      title: articleTitle,
      bodyBlockCount: body.length,
      englishOnly
    },
    null,
    2
  )
);

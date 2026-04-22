import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "../../public");
const outputFile = path.resolve(__dirname, "../lib/legacy-site.generated.js");
const HTML_EXTENSION = ".html";

function listLegacyHtmlFiles(directory) {
  const entries = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      entries.push(...listLegacyHtmlFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(HTML_EXTENSION)) {
      entries.push(absolutePath);
    }
  }

  return entries;
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function stripHtmlSuffix(value) {
  if (value === "/index.html") {
    return "/";
  }

  if (value.endsWith("/index.html")) {
    return value.slice(0, -"/index.html".length) || "/";
  }

  if (value.endsWith(HTML_EXTENSION)) {
    return value.slice(0, -HTML_EXTENSION.length);
  }

  return value || "/";
}

function getCleanRoutePath(relativeFilePath) {
  return stripHtmlSuffix(`/${toPosixPath(relativeFilePath)}`);
}

function getLegacyHtmlAlias(relativeFilePath) {
  const normalized = `/${toPosixPath(relativeFilePath)}`;
  return normalized === "/index.html" ? "/" : normalized;
}

function parseAttributes(attributeSource) {
  const attributes = {};
  const attributePattern = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

  for (const match of attributeSource.matchAll(attributePattern)) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    attributes[name] = doubleQuoted ?? singleQuoted ?? unquoted ?? "";
  }

  return attributes;
}

function resolveLocalUrl(rawValue, relativeFilePath) {
  const currentPath = `/${toPosixPath(relativeFilePath)}`;
  const resolved = new URL(rawValue, `https://legacy.local${currentPath}`);
  const pathname = resolved.pathname;

  if (pathname.endsWith(HTML_EXTENSION)) {
    return stripHtmlSuffix(pathname);
  }

  return pathname;
}

function rewriteLegacyFragmentUrls(fragmentHtml, relativeFilePath) {
  const $ = load(fragmentHtml, null, false);
  const supportedAttributes = ["href", "src", "action", "poster"];

  for (const attributeName of supportedAttributes) {
    $(`[${attributeName}]`).each((_, element) => {
      const currentValue = $(element).attr(attributeName);

      if (
        !currentValue ||
        currentValue.startsWith("http://") ||
        currentValue.startsWith("https://") ||
        currentValue.startsWith("mailto:") ||
        currentValue.startsWith("tel:") ||
        currentValue.startsWith("#") ||
        currentValue.startsWith("data:") ||
        currentValue.startsWith("//")
      ) {
        return;
      }

      $(element).attr(attributeName, resolveLocalUrl(currentValue, relativeFilePath));
    });
  }

  return $.html();
}

function getStrategyForScript(script) {
  if (script.src?.includes("cdn.tailwindcss.com")) {
    return "beforeInteractive";
  }

  if (!script.src && script.code.includes("window.__SITE_ROUTES__")) {
    return "beforeInteractive";
  }

  if (!script.src && script.id === "tailwind-config") {
    return "beforeInteractive";
  }

  return "afterInteractive";
}

function parseScripts(headHtml, relativeFilePath) {
  const scripts = [];
  const scriptPattern = /<script([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of headHtml.matchAll(scriptPattern)) {
    const [, attributeSource, code] = match;
    const attributes = parseAttributes(attributeSource);
    const src = attributes.src ? resolveLocalUrl(attributes.src, relativeFilePath) : null;

    scripts.push({
      id: attributes.id || null,
      src,
      code: src ? "" : code.trim(),
      type: attributes.type || undefined,
      strategy: getStrategyForScript({
        id: attributes.id || null,
        src,
        code
      })
    });
  }

  return scripts;
}

function parseLegacyPage(absolutePath) {
  const relativeFilePath = toPosixPath(path.relative(sourceDir, absolutePath));
  const cleanRoutePath = getCleanRoutePath(relativeFilePath);
  const legacyHtmlAlias = getLegacyHtmlAlias(relativeFilePath);
  const rawHtml = fs.readFileSync(absolutePath, "utf8");
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const headMatch = rawHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = rawHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error(`Could not parse body for ${relativeFilePath}`);
  }

  const bodyAttributes = parseAttributes(bodyMatch[1] || "");
  const headHtml = headMatch?.[1] || "";
  const inlineStyles = [...headHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(
    (match) => match[1]
  );

  return {
    relativeFilePath,
    cleanRoutePath,
    legacyHtmlAlias,
    title: titleMatch?.[1]?.trim() || "Huizong Intelligent Automation",
    bodyClassName: bodyAttributes.class || "",
    bodyDataset: {
      pageKey: bodyAttributes["data-page-key"] || ""
    },
    inlineStyles,
    scripts: parseScripts(headHtml, relativeFilePath),
    bodyHtml: rewriteLegacyFragmentUrls(bodyMatch[2], relativeFilePath)
  };
}

const entries = listLegacyHtmlFiles(sourceDir).map(parseLegacyPage);

const moduleSource = `export const LEGACY_PAGES = ${JSON.stringify(entries, null, 2)};\n`;
fs.writeFileSync(outputFile, moduleSource);

console.log(`Generated legacy manifest at ${outputFile}`);

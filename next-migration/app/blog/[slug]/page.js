import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getBlogBodyOverride } from "@/lib/blog-body-overrides.mjs";
import { getBlogImageOverride } from "@/lib/blog-image-overrides.mjs";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { getPostBySlug, getRelatedPosts } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const dynamic = "force-dynamic";

const getCachedPostBySlug = cache(getPostBySlug);
const getCachedRelatedPosts = cache(getRelatedPosts);

function resolveSlugParam(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateMetadata({ params }) {
  const post = await getCachedPostBySlug(resolveSlugParam(params.slug));

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | coolyne`,
    description: post.excerpt || "Warehouse automation article from coolyne.",
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  };
}

function formatPublishedDate(value) {
  if (!value) {
    return "Publishing schedule pending";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(value));
}

const BLOG_SIDECARD_COPY = {
  "agv-guide": {
    eyebrow: "AGV Basics",
    title: "Key Topics",
    description: "System scope. Navigation methods. Safety logic. Forklift replacement fit."
  },
  "agv-vs-amr": {
    eyebrow: "Transport Strategy",
    title: "Comparison Focus",
    description: "Navigation style. Safety trade-offs. Flexibility. Cost fit. Selection logic."
  },
  "warehouse-automation-guide": {
    eyebrow: "Warehouse Automation",
    title: "What This Covers",
    description: "Robot workflows. Efficiency gains. Safety value. ROI checks. Deployment fit."
  },
  "agv-what-is-automated-guided-vehicle": {
    eyebrow: "AGV Overview",
    title: "Core Scope",
    description: "How AGVs work. Main types. Application fit. Integration logic. Use cases."
  }
};

function normalizeTopicDescription(post) {
  const raw = (post?.excerpt || "").trim();
  if (!raw) {
    return "Workflow scope. System logic. Operational fit. Integration priorities.";
  }

  const compact = raw.replace(/\s+/g, " ").trim();
  const sentence = compact.split(/(?<=[.!?])\s+/)[0] || compact;
  return sentence.length > 120 ? `${sentence.slice(0, 117).trim()}...` : sentence;
}

function getSidecardCopy(post) {
  const slug = typeof post === "string" ? post : post?.slug;
  const mapped = BLOG_SIDECARD_COPY[slug];

  if (mapped) {
    return mapped;
  }

  return {
    eyebrow: "Topic Summary",
    title: "What This Covers",
    description: normalizeTopicDescription(post)
  };
}

function buildFallbackArticleBody(post) {
  const excerpt =
    post?.excerpt ||
    "This article is being refreshed. Please use the blog index or contact page if you need the content immediately.";

  return [
    {
      _type: "block",
      _key: "fallback-intro",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "fallback-intro-span",
          marks: [],
          text: excerpt
        }
      ]
    },
    {
      _type: "block",
      _key: "fallback-note",
      style: "blockquote",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "fallback-note-span",
          marks: [],
          text: "If the full article does not appear after refresh, the page is likely serving a stale cache snapshot. Try opening the post again from the blog index."
        }
      ]
    }
  ];
}

const REDUNDANT_BLOG_ASSET_IDS = {
  "agv-guide": ["51bf7a4e07fe44f2871756ccd30dcbfc48fd4d93"]
};

function blockContainsAssetId(block, assetIds) {
  if (!block || !assetIds?.length) {
    return false;
  }

  const refs = [
    block?.asset?._ref,
    block?.asset?._id,
    block?.image?.asset?._ref,
    block?.image?.asset?._id,
    block?.node?.asset?._ref,
    block?.node?.asset?._id,
    block?.value?.asset?._ref,
    block?.value?.asset?._id
  ].filter(Boolean);

  return refs.some((ref) => assetIds.some((assetId) => ref.includes(assetId)));
}

function pruneRedundantBlogBlocks(slug, blocks) {
  if (!Array.isArray(blocks)) {
    return blocks;
  }

  const assetIds = REDUNDANT_BLOG_ASSET_IDS[slug];

  if (!assetIds?.length) {
    return blocks;
  }

  return blocks.filter((block) => !blockContainsAssetId(block, assetIds));
}

export default async function BlogDetailPage({ params }) {
  const slug = resolveSlugParam(params.slug);
  const [post, relatedPosts] = await Promise.all([
    getCachedPostBySlug(slug),
    getCachedRelatedPosts(slug)
  ]);

  if (!post) {
    notFound();
  }

  const heroImageUrl =
    getBlogImageOverride(post) || urlFor(post.heroImage)?.width(1600).height(960).url() || null;
  const resolvedBody = pruneRedundantBlogBlocks(slug, getBlogBodyOverride(post) || post.body);
  const articleBody = resolvedBody?.length ? resolvedBody : buildFallbackArticleBody(post);
  const sidecardCopy = getSidecardCopy(post);

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="section-panel blog-detail-hero">
          <div className="blog-detail-hero-grid">
            <div className="blog-detail-copy">
              <h1>{post.title}</h1>
              <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
              <div className="hero-actions">
                <Link className="hero-button" href="/blog">
                  Back to blog
                </Link>
                <Link className="secondary-button blog-outline-button" href="/contact">
                  Discuss this topic
                </Link>
              </div>
            </div>
            <div className="blog-detail-sidecard">
              {heroImageUrl ? (
                <div className="blog-detail-sidecard-media">
                  <img alt={post.title} src={heroImageUrl} />
                </div>
              ) : null}
              <span className="card-label">{sidecardCopy.eyebrow}</span>
              <strong>{sidecardCopy.title}</strong>
              <p>{sidecardCopy.description}</p>
            </div>
          </div>
        </section>

        <section className="section-panel blog-article-panel">
          <div className="blog-article-layout">
            <aside className="blog-article-aside">
              <div className="blog-article-aside-card">
                <span className="card-label">Project Inquiry</span>
                <p>Use the contact page for project-specific consultation tied to this topic.</p>
                <Link className="link-chip" href="/contact">
                  Contact coolyne
                </Link>
              </div>
              {relatedPosts.length ? (
                <div className="blog-article-aside-card">
                  <span className="card-label">Continue Reading</span>
                  <div className="blog-related-list">
                    {relatedPosts.map((item) => (
                      <Link className="blog-related-link" href={`/blog/${item.slug}`} key={item._id}>
                        <strong>{item.title}</strong>
                        {item.publishedAt ? <span>{formatPublishedDate(item.publishedAt)}</span> : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
            <div className="blog-article-prose mdx-prose">
              <SanityPortableText value={articleBody} />
            </div>
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

import Link from "next/link";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getBlogBodyOverride } from "@/lib/blog-body-overrides.mjs";
import { getBlogImageOverride } from "@/lib/blog-image-overrides.mjs";
import {
  getCanonicalBlogSlug,
  getFallbackPostBySlug,
  getFallbackRelatedPosts
} from "@/lib/blog-post-fallbacks.mjs";
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
  const mapped = BLOG_SIDECARD_COPY[post?.slug];

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
    }
  ];
}

async function loadPostBundle(slug) {
  const canonicalSlug = getCanonicalBlogSlug(slug);
  const [sanityPost, sanityRelatedPosts] = await Promise.all([
    getCachedPostBySlug(canonicalSlug),
    getCachedRelatedPosts(canonicalSlug)
  ]);

  const post = sanityPost || getFallbackPostBySlug(canonicalSlug);
  const relatedPosts = sanityRelatedPosts.length
    ? sanityRelatedPosts
    : getFallbackRelatedPosts(canonicalSlug);

  return {
    canonicalSlug,
    post,
    relatedPosts
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolveSlugParam(resolvedParams.slug);
  const { canonicalSlug, post } = await loadPostBundle(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt || "Warehouse automation article from coolyne.",
    alternates: {
      canonical: `/blog/${canonicalSlug}`
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolveSlugParam(resolvedParams.slug);
  const { canonicalSlug, post, relatedPosts } = await loadPostBundle(slug);

  if (slug !== canonicalSlug) {
    redirect(`/blog/${canonicalSlug}`);
  }

  if (!post) {
    notFound();
  }

  const heroImageUrl =
    getBlogImageOverride(post) ||
    post.image ||
    urlFor(post.heroImage)?.width(1600).height(960).url() ||
    null;
  const resolvedBody = getBlogBodyOverride(post) || post.body;
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

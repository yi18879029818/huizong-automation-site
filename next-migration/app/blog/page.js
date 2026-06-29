import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getBlogImageOverride } from "@/lib/blog-image-overrides.mjs";
import { mergeBlogPosts } from "@/lib/local-blog-posts.mjs";
import { getPostList } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | coolyne",
  description: "Warehouse automation insights, project notes, and engineering guidance from coolyne.",
  alternates: {
    canonical: "/blog"
  }
};

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

function getPostImage(post, width, height) {
  return urlFor(post?.heroImage)?.width(width).height(height).url() || null;
}

const DEFAULT_BLOG_REFERENCE_POSTS = [
  {
    _id: "fallback-agv-guide",
    title: "AGV: What Is Automated Guided Vehicle",
    excerpt:
      "Learn what AGVs are, how they work, key AGV types, AGV vs AMR differences, and how to choose the right system for factory automation.",
    publishedAt: "2026-03-28",
    category: "Uncategorized",
    image: "/assets/images/agv-forklift-original.png"
  },
  {
    _id: "fallback-warehouse-automation",
    title: "What Is Warehouse Automation and How Does It Work in Factories",
    excerpt:
      "A practical guide to warehouse automation, including key systems, factory workflows, and automatable warehouse processes.",
    publishedAt: "2026-03-12",
    category: "Uncategorized",
    image: "/assets/images/storage-agv-hero.webp"
  },
  {
    _id: "fallback-assembly-line",
    title: "What Is an Automated Assembly Line",
    excerpt:
      "What Is an Automated Assembly Line Semi Fully Dedicated and Flexible Lines Plus Benefits and ROI",
    publishedAt: "2025-01-16",
    category: "Uncategorized",
    image: "/assets/images/case-detail-solution-maxresdefault.jpg"
  }
];

export default async function BlogIndexPage() {
  const posts = mergeBlogPosts(await getPostList());
  const items = posts.length
    ? posts.map((post) => ({
        ...post,
        category: post.category || "Insights",
        href: `/blog/${post.slug}`,
        image: getBlogImageOverride(post) || getPostImage(post, 1400, 920)
      }))
    : DEFAULT_BLOG_REFERENCE_POSTS;

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="section-panel blog-index-hero">
          <div className="blog-index-simple-head">
            <span className="card-label">Blog</span>
            <h1>All Blog Posts</h1>
            <p>
              Automation notes, warehouse system explainers, and practical engineering articles
              presented in a cleaner editorial flow.
            </p>
          </div>
        </section>

        <section className="section-panel blog-stream-panel" id="blog-post-stream">
          <div className="blog-flow-list">
            {items.map((post, index) => {
              const isReversed = index % 2 === 1;
              const hasLink = Boolean(post.href);

              return (
                <article
                  className={`blog-flow-item${isReversed ? " is-reversed" : ""}`}
                  key={post._id}
                >
                  <div className="blog-flow-media-shell">
                    {hasLink ? (
                      <Link className="blog-flow-media" href={post.href}>
                        {post.image ? (
                          <img alt={post.title} src={post.image} />
                        ) : (
                          <div className="blog-image-fallback">
                            <span className="card-label">Blog</span>
                            <strong>{post.title}</strong>
                          </div>
                        )}
                      </Link>
                    ) : (
                      <div className="blog-flow-media">
                        {post.image ? (
                          <img alt={post.title} src={post.image} />
                        ) : (
                          <div className="blog-image-fallback">
                            <span className="card-label">Blog</span>
                            <strong>{post.title}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="blog-flow-copy">
                    <div className="blog-reference-meta">
                      <span className="blog-category-chip">{post.category}</span>
                      <span>{formatPublishedDate(post.publishedAt)}</span>
                    </div>
                    <h2>
                      {hasLink ? <Link href={post.href}>{post.title}</Link> : post.title}
                    </h2>
                    <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                    {hasLink ? (
                      <Link className="blog-read-link" href={post.href}>
                        Read article
                      </Link>
                    ) : (
                      <span className="blog-read-link is-static">Read article</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

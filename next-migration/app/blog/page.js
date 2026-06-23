import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getBlogImageOverride } from "@/lib/blog-image-overrides.mjs";
import { BLOG_FALLBACK_POSTS } from "@/lib/blog-post-fallbacks.mjs";
import { getPostList } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
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

export default async function BlogIndexPage() {
  const posts = await getPostList();
  const items = posts.length
    ? posts.map((post) => ({
        ...post,
        category: post.category || "Insights",
        href: `/blog/${post.slug}`,
        image: getBlogImageOverride(post) || getPostImage(post, 1400, 920)
      }))
    : BLOG_FALLBACK_POSTS.map((post) => ({
        ...post,
        href: `/blog/${post.slug}`
      }));

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

              return (
                <article
                  className={`blog-flow-item${isReversed ? " is-reversed" : ""}`}
                  key={post._id}
                >
                  <div className="blog-flow-media-shell">
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
                  </div>

                  <div className="blog-flow-copy">
                    <div className="blog-reference-meta">
                      <span className="blog-category-chip">{post.category}</span>
                      <span>{formatPublishedDate(post.publishedAt)}</span>
                    </div>
                    <h2>
                      <Link href={post.href}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                    <Link className="blog-read-link" href={post.href}>
                      Read article
                    </Link>
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

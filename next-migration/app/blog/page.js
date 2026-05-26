import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getPostList } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const revalidate = 300;

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

export default async function BlogIndexPage() {
  const posts = await getPostList();

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="section-panel blog-index-hero">
          <div className="blog-index-simple-head">
            <span className="card-label">Blog</span>
            <h1>All Blog Posts</h1>
            <p>
              Notes on AGV systems, warehouse automation, project delivery, and practical
              engineering questions from the coolyne team.
            </p>
            <div className="blog-index-head-actions">
              <Link className="hero-button" href="/contact">
                Speak with an expert
              </Link>
              <Link className="secondary-button blog-outline-button" href="#blog-post-stream">
                Browse articles
              </Link>
            </div>
          </div>
        </section>

        <section className="section-panel blog-stream-panel" id="blog-post-stream">
          {posts.length ? (
            <div className="blog-reference-grid">
              {posts.map((post) => {
                const postImage = getPostImage(post, 1200, 780);

                return (
                  <article className="blog-reference-card" key={post._id}>
                    <Link className="blog-reference-media" href={`/blog/${post.slug}`}>
                      {postImage ? (
                        <img alt={post.title} src={postImage} />
                      ) : (
                        <div className="blog-image-fallback blog-image-fallback-compact">
                          <span className="card-label">Blog</span>
                          <strong>{post.title}</strong>
                        </div>
                      )}
                    </Link>
                    <div className="blog-reference-copy">
                      <div className="blog-reference-meta">
                        <Link className="blog-category-chip" href="/blog">
                          Insights
                        </Link>
                        <span>{formatPublishedDate(post.publishedAt)}</span>
                      </div>
                      <h2>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                      <Link className="blog-read-link" href={`/blog/${post.slug}`}>
                        Read article
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <article className="blog-empty-state">
              <div className="blog-empty-copy">
                <span className="card-label">Sanity Ready</span>
                <h3>No published blog entries yet</h3>
                <p>
                  Publish documents of type <code>post</code> in Sanity and this page will turn
                  into the full article stream automatically.
                </p>
              </div>
              <div className="blog-empty-actions">
                <Link className="hero-button" href="/studio">
                  Open Studio
                </Link>
              </div>
            </article>
          )}
        </section>
      </main>
    </CmsPageShell>
  );
}

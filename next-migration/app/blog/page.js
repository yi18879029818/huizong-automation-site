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

const editorialFocus = [
  {
    label: "AGV Systems",
    title: "Application notes for forklift, lifting, and handling robots.",
    copy: "Buying teams can compare automation fit, deployment rhythm, and layout constraints without digging through product pages first."
  },
  {
    label: "ASRS Planning",
    title: "Storage strategy, throughput logic, and integration checkpoints.",
    copy: "We use the blog stream to make dense warehouse topics easier to scan before a project brief or quotation discussion."
  },
  {
    label: "Project Delivery",
    title: "Field lessons from commissioning, rollout, and handover.",
    copy: "Operational teams can review practical questions around timing, interfaces, and post-install support in one place."
  }
];

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
  const featuredPost = posts[0] || null;
  const secondaryPosts = posts.slice(1);
  const storyRailPosts = secondaryPosts.slice(0, 3);
  const archivePosts = secondaryPosts.slice(3);
  const featuredImage = featuredPost ? getPostImage(featuredPost, 1400, 900) : null;
  const heroStats = [
    {
      value: String(posts.length).padStart(2, "0"),
      label: "Published articles"
    },
    {
      value: editorialFocus.length.toString(),
      label: "Editorial tracks"
    },
    {
      value: featuredPost ? "Live" : "Soon",
      label: "Featured story"
    }
  ];

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="section-panel blog-index-hero">
          <div className="blog-index-hero-grid">
            <div className="blog-index-copy">
              <span className="card-label">Blog</span>
              <h1>Warehouse automation insights with a cleaner editorial layout.</h1>
              <p>
                A dedicated stream for engineering guidance, procurement questions, and rollout
                lessons across AGV, ASRS, and intralogistics projects.
              </p>
              <div className="blog-hero-metrics" aria-label="Blog overview">
                {heroStats.map((item) => (
                  <div className="blog-hero-metric" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="hero-actions">
                <Link className="hero-button" href="/contact">
                  Discuss a project
                </Link>
                <Link className="secondary-button blog-outline-button" href="#blog-latest">
                  Browse latest articles
                </Link>
              </div>
            </div>
            <div className="blog-index-aside">
              <article className="blog-aside-card">
                <span className="card-label">Editorial Scope</span>
                <strong>{String(posts.length).padStart(2, "0")}</strong>
                <p>
                  Published articles now feed this page directly from Sanity, so the layout stays
                  stable while content grows over time.
                </p>
              </article>
              <article className="blog-aside-card blog-aside-card-muted">
                <span className="card-label">Coverage</span>
                <ul className="blog-aside-list">
                  <li>AGV and AMR applications</li>
                  <li>Warehouse systems planning</li>
                  <li>Delivery, integration, and support</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section-panel blog-focus-panel">
          <div className="blog-section-heading">
            <span className="card-label">Focus Areas</span>
            <h2>Built like an editorial index, not a loose card wall.</h2>
            <p>
              We have shifted the blog page toward a more structured reading flow so visitors can
              scan topics, spot the key article, and move deeper without visual clutter.
            </p>
          </div>
          <div className="blog-focus-grid">
            {editorialFocus.map((item) => (
              <article className="blog-focus-card" key={item.label}>
                <span className="card-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-panel blog-stream-panel" id="blog-latest">
          <div className="blog-section-heading">
            <span className="card-label">Latest</span>
            <h2>Recent articles with a clearer reading path.</h2>
            <p>
              The lead story gets full visual weight, the next few entries stay visible in a tight
              briefing rail, and the rest of the archive remains easy to scan below.
            </p>
          </div>

          {featuredPost ? (
            <div className="blog-editorial-grid">
              <article className="blog-featured-card">
                <div className="blog-featured-media">
                  {featuredImage ? (
                    <img alt={featuredPost.title} src={featuredImage} />
                  ) : (
                    <div className="blog-image-fallback">
                      <span className="card-label">Featured Article</span>
                      <strong>{featuredPost.title}</strong>
                    </div>
                  )}
                </div>
                <div className="blog-featured-copy">
                  <div className="blog-meta-row">
                    <span>Featured</span>
                    <span>{formatPublishedDate(featuredPost.publishedAt)}</span>
                  </div>
                  <h3>{featuredPost.title}</h3>
                  <p>{featuredPost.excerpt || "Structured editorial content managed in Sanity."}</p>
                  <div className="panel-action">
                    <Link className="hero-button" href={`/blog/${featuredPost.slug}`}>
                      Read featured article
                    </Link>
                  </div>
                </div>
              </article>

              <aside className="blog-story-rail">
                <div className="blog-story-rail-head">
                  <span className="card-label">Briefing Rail</span>
                  <h3>More to read next</h3>
                </div>
                {storyRailPosts.length ? (
                  <div className="blog-story-rail-list">
                    {storyRailPosts.map((post, index) => (
                      <article className="blog-story-rail-card" key={post._id}>
                        <div className="blog-story-rail-meta">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <span>{formatPublishedDate(post.publishedAt)}</span>
                        </div>
                        <h4>{post.title}</h4>
                        <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                        <Link className="link-chip" href={`/blog/${post.slug}`}>
                          Open article
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="blog-story-rail-empty">
                    <p>New supporting stories will appear here as soon as more posts are published.</p>
                  </div>
                )}
              </aside>
            </div>
          ) : (
            <article className="blog-empty-state">
              <div className="blog-empty-copy">
                <span className="card-label">Sanity Ready</span>
                <h3>The new blog layout is live and waiting for published content.</h3>
                <p>
                  Once documents of type <code>post</code> are published in Sanity, this page will
                  automatically populate with a featured story and a full editorial list.
                </p>
              </div>
              <div className="blog-empty-actions">
                <Link className="hero-button" href="/studio">
                  Open Studio
                </Link>
                <Link className="secondary-button blog-empty-outline" href="/contact">
                  Plan topics with the team
                </Link>
              </div>
            </article>
          )}

          <div className="blog-list-block">
            <div className="blog-list-header">
              <h3>Archive</h3>
              <p>
                {archivePosts.length
                  ? `${archivePosts.length} additional articles`
                  : posts.length
                    ? "More articles will stack here as the archive grows"
                    : "No published entries yet"}
              </p>
            </div>
            {archivePosts.length ? (
              <div className="blog-archive-grid">
                {archivePosts.map((post) => {
                  const postImage = getPostImage(post, 900, 600);

                  return (
                    <article className="blog-archive-card" key={post._id}>
                      <div className="blog-archive-thumb">
                        {postImage ? (
                          <img alt={post.title} src={postImage} />
                        ) : (
                          <div className="blog-image-fallback blog-image-fallback-compact">
                            <span className="card-label">Blog</span>
                            <strong>{post.title}</strong>
                          </div>
                        )}
                      </div>
                      <div className="blog-archive-copy">
                        <div className="blog-meta-row">
                          <span>Article</span>
                          <span>{formatPublishedDate(post.publishedAt)}</span>
                        </div>
                        <h4>{post.title}</h4>
                        <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                        <Link className="link-chip" href={`/blog/${post.slug}`}>
                          Read article
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="blog-list-placeholder">
                <p>
                  Publish more blog entries in Sanity to expand the archive grid and keep this page
                  feeling like a living editorial library.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

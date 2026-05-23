import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getPostList } from "@/lib/sanity/content.mjs";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 300;

export const metadata = {
  title: "Blog | coolyne",
  description: "Warehouse automation insights, project notes, and engineering guidance from coolyne.",
  alternates: {
    canonical: "/blog"
  }
};

export default async function BlogIndexPage() {
  const posts = await getPostList();

  return (
    <CmsPageShell>
      <main className="shell-main">
        <section className="hero-panel is-detail">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Insights</span>
              <h1>Automation field notes, buyer guides, and rollout lessons.</h1>
              <p>
                A Sanity-backed editorial stream for warehouse automation strategy, implementation
                planning, and project learning.
              </p>
            </div>
          </div>
        </section>
        <section className="section-panel">
          <div className="section-heading">
            <h2>Latest posts</h2>
            <p>Once Sanity content is published, these entries become the primary source for this section.</p>
          </div>
          <div className="card-grid">
            {posts.length ? (
              posts.map((post, index) => (
                <article
                  className={`card-panel${index === 0 ? " is-accent" : ""}`}
                  key={post._id}
                  style={{ gridColumn: "span 4" }}
                >
                  <span className="card-label">Blog</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
                  <div className="panel-action">
                    <Link className="link-chip" href={`/blog/${post.slug}`}>
                      Read article
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <article className="card-panel is-accent" style={{ gridColumn: "span 12" }}>
                <span className="card-label">Sanity ready</span>
                <h3>No published blog entries yet</h3>
                <p>
                  Publish documents of type <code>post</code> in Sanity and they will appear here.
                </p>
              </article>
            )}
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

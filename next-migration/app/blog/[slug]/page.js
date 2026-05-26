import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-page-shell";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { getPostBySlug, getPostList } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPostList();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

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

export default async function BlogDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getPostList();

  if (!post) {
    notFound();
  }

  const heroImageUrl = urlFor(post.heroImage)?.width(1600).height(960).url() || null;
  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="section-panel blog-detail-hero">
          <div className="blog-detail-hero-grid">
            <div className="blog-detail-copy">
              <span className="card-label">Blog</span>
              <Link className="blog-back-link" href="/blog">
                Back to all articles
              </Link>
              <div className="blog-meta-row">
                <span>Article</span>
                <span>{formatPublishedDate(post.publishedAt)}</span>
              </div>
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
              <span className="card-label">Reading Mode</span>
              <strong>Field Notes</strong>
              <p>
                This layout keeps the article body wide, the support actions close by, and the
                reading flow focused on one engineering topic at a time.
              </p>
            </div>
          </div>
        </section>

        {heroImageUrl ? (
          <section className="blog-article-media-shell">
            <div className="blog-article-media">
              <img alt={post.title} src={heroImageUrl} />
            </div>
          </section>
        ) : null}

        <section className="section-panel blog-article-panel">
          <div className="blog-article-layout">
            <aside className="blog-article-aside">
              <div className="blog-article-aside-card">
                <span className="card-label">Published</span>
                <strong>{formatPublishedDate(post.publishedAt)}</strong>
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
                        <span>{formatPublishedDate(item.publishedAt)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
            <div className="blog-article-prose mdx-prose">
              <SanityPortableText value={post.body} />
            </div>
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

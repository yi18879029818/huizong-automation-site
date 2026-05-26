import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-page-shell";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { getPostBySlug, getPostList } from "@/lib/sanity/content.mjs";

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

export default async function BlogDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <CmsPageShell currentSection="blog">
      <main className="shell-main">
        <section className="hero-panel is-detail">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Blog</span>
              <h1>{post.title}</h1>
              <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
            </div>
          </div>
        </section>
        <section className="section-panel">
          <div className="mdx-prose">
            <SanityPortableText value={post.body} />
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

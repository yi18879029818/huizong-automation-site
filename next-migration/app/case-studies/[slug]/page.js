import { notFound } from "next/navigation";
import { StructuredCatalogDetailPage } from "@/components/structured-catalog-pages";
import { CmsPageShell } from "@/components/cms-page-shell";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { getCaseStudyBySlug, getCaseStudyList } from "@/lib/sanity/content.mjs";
import { getStructuredPage } from "@/lib/structured-content";

export const revalidate = 300;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudyList();
  return caseStudies.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (caseStudy) {
    return {
      title: `${caseStudy.title} | coolyne`,
      description: caseStudy.summary || "Warehouse automation case study from coolyne.",
      alternates: {
        canonical: `/case-studies/${caseStudy.slug}`
      }
    };
  }

  const fallbackPage = await getStructuredPage(["case-studies", params.slug]);
  if (!fallbackPage) {
    return {};
  }

  return {
    title: fallbackPage.title,
    description: fallbackPage.data.summary,
    alternates: {
      canonical: fallbackPage.currentHref
    }
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (caseStudy) {
    return (
      <CmsPageShell currentSection="case-studies">
        <main className="shell-main">
          <section className="hero-panel is-detail">
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="eyebrow">Case Study</span>
                <h1>{caseStudy.title}</h1>
                <p>{caseStudy.summary || "Structured project summary managed in Sanity."}</p>
              </div>
            </div>
          </section>
          <section className="section-panel">
            <div className="section-heading">
              <h2>Challenge</h2>
            </div>
            <div className="mdx-prose">
              <SanityPortableText value={caseStudy.challenge} />
            </div>
          </section>
          <section className="section-panel">
            <div className="section-heading">
              <h2>Solution</h2>
            </div>
            <div className="mdx-prose">
              <SanityPortableText value={caseStudy.solution} />
            </div>
          </section>
          <section className="section-panel">
            <div className="section-heading">
              <h2>Result</h2>
            </div>
            <div className="mdx-prose">
              <SanityPortableText value={caseStudy.result} />
            </div>
          </section>
        </main>
      </CmsPageShell>
    );
  }

  const fallbackPage = await getStructuredPage(["case-studies", params.slug]);
  if (!fallbackPage) {
    notFound();
  }

  return <StructuredCatalogDetailPage page={fallbackPage} />;
}

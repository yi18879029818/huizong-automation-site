import Link from "next/link";
import { StructuredCatalogOverviewPage } from "@/components/structured-catalog-pages";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getCaseStudyList } from "@/lib/sanity/content.mjs";
import { getStructuredPage } from "@/lib/structured-content";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: "Case Studies | coolyne",
    description: "Warehouse automation projects, proof points, and deployment stories from coolyne.",
    alternates: {
      canonical: "/case-studies"
    }
  };
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudyList();

  if (!caseStudies.length) {
    const fallbackPage = await getStructuredPage(["case-studies"]);
    return <StructuredCatalogOverviewPage page={fallbackPage} />;
  }

  return (
    <CmsPageShell currentSection="case-studies">
      <main className="shell-main">
        <section className="hero-panel is-detail">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Case Studies</span>
              <h1>Deployment stories managed in Sanity, with the legacy catalog still available as fallback.</h1>
              <p>Published case study documents can progressively replace the current MDX-driven listing.</p>
            </div>
          </div>
        </section>
        <section className="section-panel">
          <div className="card-grid">
            {caseStudies.map((entry, index) => (
              <article
                className={`card-panel${index === 0 ? " is-accent" : ""}`}
                key={entry._id}
                style={{ gridColumn: "span 4" }}
              >
                <span className="card-label">Case Study</span>
                <h3>{entry.title}</h3>
                <p>{entry.summary || "Structured project summary managed in Sanity."}</p>
                <div className="panel-action">
                  <Link className="link-chip" href={`/case-studies/${entry.slug}`}>
                    View project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

import { CaseStudyIndex } from "@/components/case-study-index";
import { CmsPageShell } from "@/components/cms-page-shell";
import { StructuredCatalogOverviewPage } from "@/components/structured-catalog-pages";
import { getCaseStudyList } from "@/lib/sanity/content.mjs";
import { buildTitleMetadata, resolveSeoTitle } from "@/lib/seo";
import { getStructuredPage } from "@/lib/structured-content";

export const revalidate = 300;

const description = "Real warehouse automation case studies covering ASRS and material handling projects.";
const title = resolveSeoTitle("Warehouse Automation Case Studies");

export const metadata = {
  title: buildTitleMetadata("Warehouse Automation Case Studies"),
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title, description, url: "/case-studies", type: "website" },
  twitter: { card: "summary_large_image", title, description }
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudyList();

  if (!caseStudies.length) {
    const fallbackPage = await getStructuredPage(["case-studies"]);
    return <StructuredCatalogOverviewPage page={fallbackPage} />;
  }

  return (
    <CmsPageShell currentSection="case-studies">
      <main className="shell-main case-study-index-page">
        <section className="case-study-index-hero">
          <p className="case-study-kicker">Project Experience</p>
          <h1>Warehouse Automation Case Studies</h1>
          <p>Real project references covering automated storage, production logistics, and material handling workflows.</p>
        </section>
        <section aria-label="Case study listing" className="case-study-index-content">
          <CaseStudyIndex caseStudies={caseStudies} />
        </section>
      </main>
    </CmsPageShell>
  );
}

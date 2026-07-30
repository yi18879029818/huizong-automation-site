import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { StructuredCatalogDetailPage } from "@/components/structured-catalog-pages";
import { getCaseStudyBySlug, getCaseStudyList } from "@/lib/sanity/content.mjs";
import { getStructuredPage } from "@/lib/structured-content";

export const revalidate = 300;

const getCachedCaseStudyBySlug = cache(getCaseStudyBySlug);
const getCachedStructuredFallback = cache((...slugParts) => getStructuredPage(slugParts));

export async function generateStaticParams() {
  const caseStudies = await getCaseStudyList();
  return caseStudies.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const caseStudy = await getCachedCaseStudyBySlug(params.slug);

  if (caseStudy) {
    return {
      title: `${caseStudy.title} | coolyne`,
      description: caseStudy.summary || "Warehouse automation case study from coolyne.",
      alternates: {
        canonical: `/case-studies/projects/${caseStudy.slug}`
      }
    };
  }

  const fallbackPage = await getCachedStructuredFallback("case-studies", params.slug);
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
  const caseStudy = await getCachedCaseStudyBySlug(params.slug);

  if (caseStudy) {
    redirect(`/case-studies/projects/${caseStudy.slug}`);
  }

  const fallbackPage = await getCachedStructuredFallback("case-studies", params.slug);
  if (!fallbackPage) {
    notFound();
  }

  return <StructuredCatalogDetailPage page={fallbackPage} />;
}

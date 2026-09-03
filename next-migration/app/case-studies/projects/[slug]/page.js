import { cache } from "react";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getCaseStudyBySlug, getCaseStudyList } from "@/lib/sanity/content.mjs";
import { buildTitleMetadata, resolveSeoTitle } from "@/lib/seo";
import { COMPANY } from "@/lib/site-config";

export const revalidate = 300;

const getCachedCaseStudy = cache(getCaseStudyBySlug);

export async function generateStaticParams() {
  const caseStudies = await getCaseStudyList();
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const caseStudy = await getCachedCaseStudy(params.slug);
  if (!caseStudy) return {};

  const seo = caseStudy.seo || {};
  const description = seo.description || caseStudy.summary;
  const title = resolveSeoTitle(seo.title || caseStudy.title);
  const canonical = seo.canonicalUrl || `/case-studies/projects/${caseStudy.slug}`;
  const image = caseStudy.coverImage?.src || caseStudy.heroImage?.asset?.url;

  return {
    title: buildTitleMetadata(seo.title || caseStudy.title),
    description,
    alternates: { canonical },
    robots: { index: !seo.noindex, follow: !seo.noindex },
    openGraph: {
      type: "article",
      title: resolveSeoTitle(seo.ogTitle || caseStudy.title),
      description: seo.ogDescription || description,
      url: canonical,
      siteName: COMPANY.name,
      images: image ? [{ url: image, alt: caseStudy.coverImage?.alt || caseStudy.title }] : undefined
    },
    twitter: {
      card: seo.twitterCard || "summary_large_image",
      title: resolveSeoTitle(seo.ogTitle || caseStudy.title),
      description: seo.ogDescription || description,
      images: image ? [image] : undefined
    }
  };
}

export default async function CaseStudyProjectPage({ params }) {
  const [caseStudy, studies] = await Promise.all([getCachedCaseStudy(params.slug), getCaseStudyList()]);
  if (!caseStudy) notFound();

  const currentIndex = studies.findIndex((study) => study.slug === caseStudy.slug);
  const previousStudy = currentIndex > 0 ? studies[currentIndex - 1] : null;
  const nextStudy = currentIndex >= 0 && currentIndex < studies.length - 1 ? studies[currentIndex + 1] : null;
  const canonical = `https://www.coolyne.com/case-studies/projects/${caseStudy.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.coolyne.com/" },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://www.coolyne.com/case-studies" },
          { "@type": "ListItem", position: 3, name: caseStudy.title, item: canonical }
        ]
      },
      {
        "@type": "WebPage",
        "@id": canonical,
        url: canonical,
        name: caseStudy.title,
        description: caseStudy.summary
      },
      {
        "@type": "Article",
        mainEntityOfPage: canonical,
        headline: caseStudy.title,
        description: caseStudy.summary,
        image: caseStudy.coverImage?.src ? `https://www.coolyne.com${caseStudy.coverImage.src}` : undefined,
        publisher: { "@type": "Organization", name: COMPANY.name, url: "https://www.coolyne.com" }
      }
    ]
  };

  return (
    <CmsPageShell currentSection="case-studies">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} type="application/ld+json" />
      <CaseStudyDetail caseStudy={caseStudy} nextStudy={nextStudy} previousStudy={previousStudy} />
    </CmsPageShell>
  );
}

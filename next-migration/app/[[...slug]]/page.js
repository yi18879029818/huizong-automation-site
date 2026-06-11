import { cache } from "react";
import { notFound } from "next/navigation";
import {
  StructuredCatalogDetailPage,
  StructuredCatalogOverviewPage
} from "@/components/structured-catalog-pages";
import { StructuredStaticPage } from "@/components/structured-static-pages";
import { StructuredData } from "@/components/structured-data";
import { StructuredDetailPage, StructuredOverviewPage } from "@/components/structured-site";
import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { COMPANY } from "@/lib/site-config";

export const dynamicParams = true;
export const revalidate = 0;

const getCachedStructuredPage = cache((...slugParts) => getStructuredPage(slugParts));

export function generateStaticParams() {
  return getAllStructuredRoutes().map((route) => ({
    slug: route === "/" ? [] : route.slice(1).split("/")
  }));
}

function buildStructuredMetadata(page) {
  const seo = page.data.seo || {};
  const description =
    seo.description ||
    page.data.heroSummary ||
    page.data.summary ||
    "Fleet structured content page.";
  const image =
    seo.ogImage?.src ||
    page.data.heroBackgroundImage?.src ||
    page.data.image ||
    "/assets/images/agv-forklift-original.png";
  const title = seo.title || page.title;
  const canonical = seo.canonicalUrl || page.currentHref;
  const shouldIndex = !seo.noindex;
  const keywords = Array.isArray(seo.keywords) && seo.keywords.length ? seo.keywords : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        "x-default": canonical
      }
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical,
      siteName: COMPANY.name,
      type: page.kind === "case-project-detail" ? "article" : "website",
      images: [
        {
          url: image,
          alt: seo.ogImage?.alt || page.data.title
        }
      ]
    },
    twitter: {
      card: seo.twitterCard || "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: [image]
    },
    other: {
      "ai-markdown": `/api/markdown?path=${page.currentHref}`
    }
  };
}

function shouldRenderPureStructuredPage(page) {
  return (
    page.kind === "home-page" ||
    page.kind === "about-page" ||
    page.kind === "contact-page" ||
    page.kind === "policy-page" ||
    page.kind === "industry-detail" ||
    page.section === "products" ||
    page.section === "solutions" ||
    page.section === "case-studies"
  );
}

function renderPureStructuredPage(page) {
  if (
    page.kind === "home-page" ||
    page.kind === "about-page" ||
    page.kind === "contact-page" ||
    page.kind === "policy-page"
  ) {
    return <StructuredStaticPage page={page} />;
  }

  if (
    page.kind === "product-overview" ||
    page.kind === "solution-overview" ||
    page.kind === "case-overview"
  ) {
    return <StructuredCatalogOverviewPage page={page} />;
  }

  return <StructuredCatalogDetailPage page={page} />;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const structuredPage = await getCachedStructuredPage(...(resolvedParams.slug || []));

  if (structuredPage) {
    return buildStructuredMetadata(structuredPage);
  }

  return {};
}

export default async function StructuredPage({ params }) {
  const resolvedParams = await params;
  const structuredPage = await getCachedStructuredPage(...(resolvedParams.slug || []));

  if (structuredPage) {
    return (
      <>
        {shouldRenderPureStructuredPage(structuredPage) ? (
          renderPureStructuredPage(structuredPage)
        ) : (
          <>
            <StructuredData page={structuredPage} />
            {structuredPage.kind === "home-page" ||
            structuredPage.kind === "product-overview" ||
            structuredPage.kind === "solution-overview" ||
            structuredPage.kind === "case-overview" ? (
              <StructuredOverviewPage page={structuredPage} />
            ) : (
              <StructuredDetailPage page={structuredPage} />
            )}
          </>
        )}
      </>
    );
  }

  notFound();
}

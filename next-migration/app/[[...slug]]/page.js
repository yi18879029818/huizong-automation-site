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

export function generateStaticParams() {
  return getAllStructuredRoutes().map((route) => ({
    slug: route === "/" ? [] : route.slice(1).split("/")
  }));
}

function buildStructuredMetadata(page) {
  const description =
    page.data.heroSummary ||
    page.data.summary ||
    "Huizong Intelligent Automation structured content page.";
  const image = page.data.image || "/assets/images/agv-forklift-original.png";

  return {
    title: page.title,
    description,
    alternates: {
      canonical: page.currentHref,
      languages: {
        "x-default": page.currentHref
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      title: page.title,
      description,
      url: page.currentHref,
      siteName: COMPANY.name,
      type: page.kind === "case-project-detail" ? "article" : "website",
      images: [
        {
          url: image,
          alt: page.data.title
        }
      ]
    },
    other: {
      "llms-json": "/llms.json",
      "llms-index": "/llms.txt",
      "llms-full": "/llms-full.txt",
      "ai-markdown": `/api/markdown?path=${page.currentHref}`
    }
  };
}

function shouldRenderPureStructuredPage(page) {
  return (
    page.kind === "home-page" ||
    page.kind === "about-page" ||
    page.kind === "contact-page" ||
    page.section === "products" ||
    page.section === "solutions" ||
    page.section === "case-studies"
  );
}

function renderPureStructuredPage(page) {
  if (page.kind === "home-page" || page.kind === "about-page" || page.kind === "contact-page") {
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
  const structuredPage = getStructuredPage(resolvedParams.slug || []);

  if (structuredPage) {
    return buildStructuredMetadata(structuredPage);
  }

  return {};
}

export default async function StructuredPage({ params }) {
  const resolvedParams = await params;
  const structuredPage = getStructuredPage(resolvedParams.slug || []);

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

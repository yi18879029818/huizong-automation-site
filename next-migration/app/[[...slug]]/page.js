import { notFound } from "next/navigation";
import { LegacyBodyAttributes } from "@/components/legacy-body-attributes";
import { LegacyPageAssets } from "@/components/legacy-page-assets";
import { StructuredDetailPage, StructuredOverviewPage } from "@/components/structured-site";
import { getLegacyPage, getStaticLegacyRoutes } from "@/lib/legacy-site";
import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { COMPANY } from "@/lib/site-config";

export const dynamicParams = true;

export function generateStaticParams() {
  const routeKeys = new Set();
  const params = [];

  for (const route of getAllStructuredRoutes()) {
    const slug = route === "/" ? [] : route.slice(1).split("/");
    const key = slug.join("/");

    if (!routeKeys.has(key)) {
      routeKeys.add(key);
      params.push({ slug });
    }
  }

  for (const route of getStaticLegacyRoutes()) {
    const key = route.slug.join("/");

    if (!routeKeys.has(key)) {
      routeKeys.add(key);
      params.push(route);
    }
  }

  return params;
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
      canonical: page.currentHref
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
    }
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const structuredPage = getStructuredPage(resolvedParams.slug || []);

  if (structuredPage) {
    return buildStructuredMetadata(structuredPage);
  }

  const page = getLegacyPage(resolvedParams.slug || []);

  if (!page) {
    return {};
  }

  return {
    title: page.title
  };
}

export default async function LegacyPage({ params }) {
  const resolvedParams = await params;
  const structuredPage = getStructuredPage(resolvedParams.slug || []);

  if (structuredPage) {
    if (
      structuredPage.kind === "home-page" ||
      structuredPage.kind === "product-overview" ||
      structuredPage.kind === "solution-overview" ||
      structuredPage.kind === "case-overview"
    ) {
      return <StructuredOverviewPage page={structuredPage} />;
    }

    return <StructuredDetailPage page={structuredPage} />;
  }

  const page = getLegacyPage(resolvedParams.slug || []);

  if (!page) {
    notFound();
  }

  return (
    <>
      <LegacyPageAssets page={page} />
      <LegacyBodyAttributes
        bodyClassName={page.bodyClassName}
        bodyDataset={page.bodyDataset}
      />
      <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} suppressHydrationWarning />
    </>
  );
}

import { notFound } from "next/navigation";
import { LegacyBodyAttributes } from "@/components/legacy-body-attributes";
import { StructuredLegacyPage } from "@/components/public-shell";
import { StructuredData } from "@/components/structured-data";
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
  const legacyPage = getLegacyPage(resolvedParams.slug || []);

  if (structuredPage) {
    return buildStructuredMetadata(structuredPage);
  }

  if (legacyPage) {
    return {
      title: legacyPage.title
    };
  }

  return {};
}

export default async function StructuredPage({ params }) {
  const resolvedParams = await params;
  const structuredPage = getStructuredPage(resolvedParams.slug || []);
  const legacyPage = getLegacyPage(resolvedParams.slug || []);

  if (structuredPage) {
    return (
      <>
        {legacyPage ? (
          <>
            <LegacyBodyAttributes
              bodyClassName={legacyPage.bodyClassName}
              bodyDataset={legacyPage.bodyDataset}
            />
            <div
              dangerouslySetInnerHTML={{ __html: legacyPage.headHtml || "" }}
              suppressHydrationWarning
            />
            <StructuredLegacyPage
              legacyContentHtml={legacyPage.contentHtml || legacyPage.bodyHtml}
              page={structuredPage}
            />
          </>
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

  if (legacyPage) {
    return (
      <>
        <LegacyBodyAttributes
          bodyClassName={legacyPage.bodyClassName}
          bodyDataset={legacyPage.bodyDataset}
        />
        <div
          dangerouslySetInnerHTML={{ __html: `${legacyPage.headHtml || ""}${legacyPage.bodyHtml}` }}
          suppressHydrationWarning
        />
      </>
    );
  }

  notFound();
}

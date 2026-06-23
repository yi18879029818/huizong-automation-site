import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { SITE_URL } from "@/lib/site-config";

function toSlug(route) {
  return route === "/" ? [] : route.slice(1).split("/");
}

function resolvePriority(kind, route) {
  if (route === "/") {
    return 1;
  }

  if (kind === "contact-page") {
    return 0.9;
  }

  if (kind === "about-page" || route === "/products" || route === "/solutions") {
    return 0.8;
  }

  if (kind?.endsWith("detail") || kind === "case-project-detail") {
    return 0.7;
  }

  return 0.75;
}

function resolveChangeFrequency(kind, route) {
  if (route === "/") {
    return "weekly";
  }

  if (
    kind === "product-overview" ||
    kind === "solution-overview" ||
    kind === "case-overview"
  ) {
    return "weekly";
  }

  return "monthly";
}

export default async function sitemap() {
  const now = new Date();
  const routes = [...new Set([...getAllStructuredRoutes(), "/faq", "/blog"])];
  const pages = await Promise.all(routes.map((route) => getStructuredPage(toSlug(route))));

  return routes.map((route, index) => {
    const page = pages[index];
    const canonical = page?.data?.seo?.canonicalUrl || `${SITE_URL}${route}`;

    return {
      url: canonical,
      lastModified: now,
      changeFrequency: resolveChangeFrequency(page?.kind, route),
      priority: resolvePriority(page?.kind, route)
    };
  });
}

import { LEGACY_PAGES } from "@/lib/legacy-site.generated";

function stripLeadingSlash(value) {
  return value.startsWith("/") ? value.slice(1) : value;
}

function normalizeRequestedPath(slugSegments = []) {
  if (!slugSegments.length) {
    return "/";
  }

  return `/${slugSegments.join("/")}`;
}

export function getLegacyPage(slugSegments = []) {
  const requestedPath = normalizeRequestedPath(slugSegments);

  return (
    LEGACY_PAGES.find(
      (item) => item.cleanRoutePath === requestedPath || item.legacyHtmlAlias === requestedPath
    ) || null
  );
}

export function getStaticLegacyRoutes() {
  return LEGACY_PAGES.filter((entry) => entry.cleanRoutePath !== entry.legacyHtmlAlias).map(
    (entry) => ({
      slug: stripLeadingSlash(entry.cleanRoutePath).split("/").filter(Boolean)
    })
  );
}

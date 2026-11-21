import { getTranslationIndex } from "@/lib/i18n/server";
import { PAGE_ROUTES, LOCALES, localizedHref } from "@/lib/i18n/routing.mjs";
import { mergeBlogPosts } from "@/lib/local-blog-posts.mjs";
import { getCaseStudyList, getPostList } from "@/lib/sanity/content.mjs";
import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-dynamic";

const REDIRECTED_ROUTES = new Set(["/blog/autonomous-forklifts"]);

function toSlug(route) {
  return route === "/" ? [] : route.slice(1).split("/");
}

function toAbsoluteUrl(urlOrPath, fallbackRoute) {
  if (typeof urlOrPath === "string" && urlOrPath.trim()) {
    const normalized = urlOrPath.trim();

    if (/^https?:\/\//i.test(normalized)) {
      return normalized;
    }

    if (normalized.startsWith("/")) {
      return `${SITE_URL}${normalized}`;
    }
  }

  return `${SITE_URL}${fallbackRoute}`;
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
  const [postList, caseStudies] = await Promise.all([getPostList(), getCaseStudyList()]);
  const posts = mergeBlogPosts(postList);
  const routes = [
    ...new Set([
      ...getAllStructuredRoutes(),
      "/faq",
      "/blog",
      ...posts.map((post) => `/blog/${post.slug}`),
      ...caseStudies.map((study) => `/case-studies/projects/${study.slug}`)
    ])
  ].filter((route) => !REDIRECTED_ROUTES.has(route));
  const pages = await Promise.all(routes.map((route) => getStructuredPage(toSlug(route))));
  const postMap = new Map(posts.map((post) => [`/blog/${post.slug}`, post]));

  const translations = await getTranslationIndex();
  const languageRoutes = Object.fromEntries(LOCALES.map(locale => [locale, locale === "en" ? routes : [...PAGE_ROUTES, ...translations.filter(item => item.locale === locale).map(item => item.path)]]));
  function alternates(route) {
    return { languages: Object.fromEntries(LOCALES.filter(locale => languageRoutes[locale].includes(route)).map(locale => [locale, SITE_URL + localizedHref(route, locale, languageRoutes[locale])])) };
  }
  const entries = routes.map((route, index) => {
    const page = pages[index];
    const canonical = toAbsoluteUrl(page?.data?.seo?.canonicalUrl, route);
    const matchedPost = postMap.get(route);
    const lastModified = matchedPost?._updatedAt
      ? new Date(matchedPost._updatedAt)
      : matchedPost?.publishedAt
        ? new Date(matchedPost.publishedAt)
        : now;

    return {
      url: canonical,
      alternates: alternates(route),
      lastModified,
      changeFrequency: resolveChangeFrequency(page?.kind, route),
      priority: resolvePriority(page?.kind, route)
    };
  });
  for (const locale of LOCALES.slice(1)) {
    for (const route of [...new Set(languageRoutes[locale])]) {
      if (route === "/thanks") continue;
      entries.push({
        url: SITE_URL + localizedHref(route, locale, languageRoutes[locale]),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates(route)
      });
    }
  }
  return entries;
}

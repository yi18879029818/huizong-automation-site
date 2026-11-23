import pageKeys from "./page-keys.json";
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import { cache } from "react";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import { sanityFetch } from "@/lib/sanity/fetch.mjs";
import { PAGE_ROUTES, LOCALES, localizedHref, translateText as translateDictionaryText } from "./shared";

export const getLocale = cache(() => {
  const locale = headers().get("x-site-locale");
  return LOCALES.includes(locale) ? locale : "en";
});

export const getTranslationIndex = unstable_cache(async () => {
  return await sanityFetch({
    query: '*[_type=="postTranslation" && status=="published" && !(_id in path("drafts.**")) && defined(source->slug.current)]{locale,"path":"/blog/"+source->slug.current,sourceRevision,"currentRevision":source->_rev}'
  }) || [];
}, ["published-post-translations"], { revalidate: 60, tags: ["post-translations"] });

export const getLocaleRoutes = cache(async (locale) => {
  const posts = (await getTranslationIndex()).filter(item => item.locale === locale).map(item => item.path);
  return [...PAGE_ROUTES, ...posts];
});

export async function languageAlternates(path) {
  const languages = { en: "https://www.coolyne.com" + path, "x-default": "https://www.coolyne.com" + path };
  for (const locale of LOCALES.slice(1)) {
    const routes = await getLocaleRoutes(locale);
    if (routes.includes(path)) languages[locale] = "https://www.coolyne.com" + localizedHref(path, locale, routes);
  }
  return languages;
}

export async function localizeMetadata(metadata, path = headers().get("x-site-path") || "/") {
  const locale = getLocale();
  const routes = await getLocaleRoutes(locale);
  const canonical = "https://www.coolyne.com" + localizedHref(path, locale, routes);
  const title = typeof metadata.title === "object"
    ? Object.fromEntries(Object.entries(metadata.title).map(([key, value]) => [key, translateText(value, locale)]))
    : translateText(metadata.title, locale);
  return {
    ...metadata,
    title,
    description: translateText(metadata.description, locale),
    alternates: { canonical, languages: await languageAlternates(path) },
    openGraph: {
      ...metadata.openGraph,
      title: translateText(metadata.openGraph?.title, locale),
      description: translateText(metadata.openGraph?.description, locale),
      url: canonical,
      images: metadata.openGraph?.images?.map(image => typeof image === "string" ? image : { ...image, alt: translateText(image.alt, locale) }),
      locale: { en: "en_US", fr: "fr_FR", de: "de_DE", es: "es_ES" }[locale]
    },
    twitter: metadata.twitter ? {
      ...metadata.twitter,
      title: translateText(metadata.twitter.title, locale),
      description: translateText(metadata.twitter.description, locale)
    } : undefined
  };
}

export function localizeSchema(value, locale, routes, key = "") {
  if (Array.isArray(value)) return value.map(item => localizeSchema(item, locale, routes, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, localizeSchema(item, locale, routes, name)]));
  }
  if (typeof value !== "string") return value;
  if (["name", "headline", "description", "text", "caption"].includes(key)) return translateText(value, locale);
  if (["url", "@id", "item"].includes(key)) {
    return localizedHref(value, locale, routes).replace(/^\/(?!\/)/, "https://www.coolyne.com/");
  }
  if (key === "inLanguage") return locale;
  return value;
}

export function getLocaleDictionary(locale) {
  return ({ fr, de, es })[locale] || {};
}

export function translateText(value, locale) {
  return translateDictionaryText(value, locale, getLocaleDictionary(locale));
}

export function getPageDictionary(locale) {
  if (locale === "en") return {};
  const dictionary = getLocaleDictionary(locale);
  const path = headers().get("x-site-path") || "/";
  const common = new Set(pageKeys.common);
  const keys = new Set((pageKeys.pages[path] || []).filter(key => !common.has(key)));
  return Object.fromEntries([...keys].filter(key => dictionary[key]).map(key => [key, dictionary[key]]));
}

export function getCommonDictionary(locale) {
  if (locale === "en") return {};
  const dictionary = getLocaleDictionary(locale);
  return Object.fromEntries(pageKeys.common.filter(key => dictionary[key]).map(key => [key, dictionary[key]]));
}

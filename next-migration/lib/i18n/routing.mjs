import manifest from "./routes.json";

export const LOCALES = ["en", "fr", "de", "es"];
export const LANGUAGE_NAMES = { en: "English", fr: "Français", de: "Deutsch", es: "Español" };
export const PAGE_ROUTES = manifest.pages;
export function parseLocalePath(pathname = "/") {
  const parts = pathname.split("/");
  const locale = LOCALES.includes(parts[1]) && parts[1] !== "en" ? parts[1] : "en";
  return { locale, path: locale === "en" ? pathname : "/" + parts.slice(2).join("/") || "/" };
}

export function localizedHref(href, locale, routes = [...PAGE_ROUTES, ...manifest.posts]) {
  if (typeof href !== "string") return href;
  const internal = href.replace(/^https:\/\/(?:www\.)?coolyne\.com(?=\/|$)/, "");
  if (!internal.startsWith("/") || internal.startsWith("//")) return href;
  const match = internal.match(/^([^?#]*)(.*)$/);
  const parsed = parseLocalePath(match[1].replace(/\/$/, "") || "/");
  if (!routes.includes(parsed.path)) return href;
  const prefix = locale === "en" ? "" : "/" + locale;
  return prefix + (parsed.path === "/" ? "/" : parsed.path) + match[2];
}


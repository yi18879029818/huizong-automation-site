import { cloneElement, isValidElement } from "react";

import { LOCALES, LANGUAGE_NAMES, PAGE_ROUTES, parseLocalePath, localizedHref } from "./routing.mjs";
export { LOCALES, LANGUAGE_NAMES, PAGE_ROUTES, parseLocalePath, localizedHref };

export function translateText(value, locale, dictionary = {}) {
  if (typeof value !== "string" || locale === "en") return value;
  const key = value.replace(/\s+/g, " ").trim();
  const translated = dictionary[key];
  if (!translated) return value;
  return (value.match(/^\s*/)?.[0] || "") + translated + (value.match(/\s*$/)?.[0] || "");
}

export function localizeTree(node, locale, routes, dictionary) {
  if (typeof node === "string") return translateText(node, locale, dictionary);
  if (Array.isArray(node)) return node.map(child => localizeTree(child, locale, routes, dictionary));
  if (!isValidElement(node)) return node;
  const { type, props } = node;
  if (["script", "style", "svg", "code", "pre"].includes(type) ||
      /material-(symbols|icons)/.test(props.className || "") || props.translate === "no") return node;
  const next = {};
  for (const key of ["alt", "title", "aria-label", "placeholder", "data-success-message"]) {
    if (typeof props[key] === "string") next[key] = translateText(props[key], locale, dictionary);
  }
  for (const key of ["href", "data-success-redirect"]) {
    if (props[key]) next[key] = localizedHref(props[key], locale, routes);
  }
  if (props.children !== undefined) next.children = localizeTree(props.children, locale, routes, dictionary);
  return cloneElement(node, next);
}

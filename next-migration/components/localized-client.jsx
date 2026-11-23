"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { localizeTree, translateText, localizedHref } from "@/lib/i18n/shared";

const LocaleContext = createContext({ locale: "en", routes: [], dictionary: {} });

export function LocaleProvider({ locale, routes, dictionary, children }) {
  const parent = useContext(LocaleContext);
  const mergedDictionary = useMemo(() => ({ ...parent.dictionary, ...dictionary }), [parent.dictionary, dictionary]);
  useEffect(() => {
    const translate = value => translateText(value, locale, mergedDictionary);
    const href = value => localizedHref(value, locale, routes);
    window.__COOLYNE_TRANSLATE__ = translate;
    window.__COOLYNE_HREF__ = href;
    window.__COOLYNE_LOCALIZE_NATIVE__?.();
    return () => {
      if (window.__COOLYNE_TRANSLATE__ === translate) delete window.__COOLYNE_TRANSLATE__;
      if (window.__COOLYNE_HREF__ === href) delete window.__COOLYNE_HREF__;
    };
  }, [locale, routes, mergedDictionary]);
  return <LocaleContext.Provider value={{ locale, routes, dictionary: mergedDictionary }}>{children}</LocaleContext.Provider>;
}

export function Localized({ children }) {
  const { locale, routes, dictionary } = useContext(LocaleContext);
  return localizeTree(children, locale, routes, dictionary);
}

export function useSiteLocale() {
  return useContext(LocaleContext);
}

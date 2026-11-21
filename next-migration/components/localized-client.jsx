"use client";

import { createContext, useContext, useEffect } from "react";
import { localizeTree, translateText, localizedHref } from "@/lib/i18n/shared";

const LocaleContext = createContext({ locale: "en", routes: [], dictionary: {} });

export function LocaleProvider({ locale, routes, dictionary, children }) {
  useEffect(() => {
    const translate = value => translateText(value, locale, dictionary);
    const href = value => localizedHref(value, locale, routes);
    window.__COOLYNE_TRANSLATE__ = translate;
    window.__COOLYNE_HREF__ = href;
    window.__COOLYNE_LOCALIZE_NATIVE__?.();
    return () => {
      if (window.__COOLYNE_TRANSLATE__ === translate) delete window.__COOLYNE_TRANSLATE__;
      if (window.__COOLYNE_HREF__ === href) delete window.__COOLYNE_HREF__;
    };
  }, [locale, routes, dictionary]);
  return <LocaleContext.Provider value={{ locale, routes, dictionary }}>{children}</LocaleContext.Provider>;
}

export function Localized({ children }) {
  const { locale, routes, dictionary } = useContext(LocaleContext);
  return localizeTree(children, locale, routes, dictionary);
}

export function useSiteLocale() {
  return useContext(LocaleContext);
}

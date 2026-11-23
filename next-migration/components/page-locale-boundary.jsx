import { LocaleProvider } from "@/components/localized-client";
import { getLocale, getLocaleRoutes, getPageDictionary } from "@/lib/i18n/server";

export default async function PageLocaleBoundary({ children }) {
  const locale = getLocale();
  return <LocaleProvider locale={locale} routes={await getLocaleRoutes(locale)} dictionary={getPageDictionary(locale)}>{children}</LocaleProvider>;
}

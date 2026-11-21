import { headers } from "next/headers";
import { getLocale, languageAlternates } from "@/lib/i18n/server";
import { LANGUAGE_NAMES } from "@/lib/i18n/shared";

export async function LanguageSwitcher() {
  const locale = getLocale();
  const path = headers().get("x-site-path") || "/";
  const alternates = await languageAlternates(path);
  return (
    <details className="language-switcher" translate="no">
      <summary aria-label="Language">{LANGUAGE_NAMES[locale]}</summary>
      <nav aria-label="Language">
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
          <a href={alternates[code] || "https://www.coolyne.com/" + (code === "en" ? "" : code + "/")}
            hrefLang={code} lang={code} key={code} aria-current={locale === code ? "true" : undefined}>
            {name}
          </a>
        ))}
      </nav>
    </details>
  );
}

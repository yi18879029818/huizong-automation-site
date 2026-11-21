# Multilingual content

English uses the existing URLs. French, German and Spanish use /fr, /de and /es. Main-page dictionaries live in lib/i18n/fr.json, de.json and es.json. Keys match normalized English text. Technical identifiers, form field values, API paths and asset URLs are excluded from text localization.

The initial article selection uses fresh GA4 screenPageViews for www.coolyne.com, 2026-10-24 through 2026-11-20. See lib/i18n/routes.json. Initial translations were generated automatically and checked for terminology and numeric preservation. Native-language editorial review is pending.

Sanity postTranslation documents reference the English article and store locale, title, excerpt, body, SEO, status and the English source revision. Images are inherited from the English article. Published translations appear in localized lists, language alternates and the sitemap. Availability caches refresh within 60 seconds. Studio validation warns when the English source revision changes and rejects duplicate article/language pairs.

To prepare known dictionary content as drafts, set SANITY_WRITE_TOKEN in the process environment and run:
node scripts/prepare-post-translations.mjs --slug=article-slug --write

Use --publish when ready for publication. Existing translations require --refresh to replace them. The importer stops on missing dictionary entries so newly added text can be translated before publication. Editing existing translations directly through the Sanity schema does not require a frontend deployment.

Run browser regression checks against a local or deployed build:
node scripts/check-multilingual.mjs
Set I18N_TEST_URL to change the base URL. The script verifies rendering, metadata, language links, unsupported routes, request-header isolation and sitemap entries.

Translation payloads are partitioned by page in lib/i18n/page-keys.json. Run node scripts/collect-translation-keys.mjs after changing English copy or dictionaries. I18N_SOURCE_URL can point to a local English build when preparing a frontend copy change. This keeps browser dictionaries small while preserving shared form, navigation and dialog vocabulary.

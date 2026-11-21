# Four-language website implementation plan

Goal: Publish French, German and Spanish versions of main pages and ten popular articles.
Architecture: Request-scoped locale, shared React text localization, versioned dictionaries and separate Sanity post translations.
Tech stack: Existing Next.js 14, React 18, Sanity and OpenNext.

- [ ] Build locale parsing, supported route manifest, dictionaries, server/client localization and language selector.
- [ ] Integrate request headers, HTML language, supported page routing, metadata, structured data and sitemap.
- [ ] Extract rendered English text and form feedback. Translate and validate terminology and numerical values. Record source hashes for updates.
- [ ] Add Sanity postTranslation schema and draft importer. Publish the ten selected article translations after content verification.
- [ ] Test routing and rendering regressions, run build, inspect desktop/mobile pages and forms.
- [ ] Commit, push main, deploy, verify live pages and sitemap, update work log and handoff.

Current GA4 window is 2026-10-24 through 2026-11-20, hostname www.coolyne.com. Select ten article paths by screenPageViews from the fresh API report, resolving redirects before publishing.

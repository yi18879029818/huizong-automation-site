# Four-language website design

Approved in chat on 2026-11-21. English uses existing URLs. French, German and Spanish use /fr, /de and /es. A request-scoped locale selects server-rendered text from versioned dictionaries. Shared React rendering localizes visible text, labels and supported internal links without altering identifiers, form values or assets. The root supplies the same locale to client components.

The first release covers structured main pages, FAQ, thank-you page and ten currently most viewed blog articles. Blog translations are separate Sanity documents referencing the English source with locale, publication status and source revision. English content remains the source for images and technical fields. Publishable translation paths are enumerated for selectors, alternate links and sitemap. Unsupported translations return 404. Language selection stays on the equivalent page when available.

SEO uses self-canonical URLs, reciprocal language alternates, localized metadata and structured data. Forms retain API contracts. English content, images, carousel controls and technical specifications retain existing behavior.

Verify route parsing, locale spoof protection, asset/API exclusion, translation availability, text/attribute handling, translation revision tracking, metadata and sitemap. Check desktop/mobile layouts, hydration, language switching, carousel and form validation. Commit and push main before production deploy, then verify public routes and sitemap.

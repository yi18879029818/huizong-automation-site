# Work Log

## 2026-07-30 - Real Case Study Migration

- Migrated six verified legacy projects into Sanity `caseStudy` documents, including the existing `automated-warehouse-upgrade` path.
- Added a filterable case-study listing and dedicated `/case-studies/projects/[slug]` detail template.
- Added locally hosted legacy project images under `case-study-assets/`; the production prebuild sync copies them to `public/images/case-studies/`.
- Added local-image metadata, project metrics, sections, specifications, scope tables, gallery, canonical metadata, JSON-LD, and sitemap coverage.
- Verified the Sanity queries, local page and image responses, sitemap coverage, and `npm run build`.


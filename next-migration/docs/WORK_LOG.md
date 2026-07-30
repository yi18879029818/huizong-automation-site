# Work Log

## 2026-07-30 - Real Case Study Migration

- Migrated six verified legacy projects into Sanity `caseStudy` documents, including the existing `automated-warehouse-upgrade` path.
- Added a filterable case-study listing and dedicated `/case-studies/projects/[slug]` detail template.
- Added locally hosted legacy project images under `case-study-assets/`; the production prebuild sync copies them to `public/images/case-studies/`.
- Added local-image metadata, project metrics, sections, specifications, scope tables, gallery, canonical metadata, JSON-LD, and sitemap coverage.
- Verified the Sanity queries, local page and image responses, sitemap coverage, and `npm run build`.
- Published Cloudflare Worker version `bc04b85c-a14a-4326-b8b6-7f3deb1b52b8` after pushing `main`; all six production routes return `200`.

## 2026-07-30 - Electronics Case Study Cover Correction

- Replaced the electronics manufacturer case-study card cover with the verified original production-floor image from the legacy case-study listing.
- Localized the source as `electronics-manufacturer-cover.webp`, updated the Sanity `coverImage`, and kept the existing detail-page gallery unchanged.
- Verified the updated Sanity document and `npm run build`.
- Published Cloudflare Worker version `68165525-e194-456c-ab3a-275f68d07702`; the production case-study listing now returns the new local WebP cover with `200`.

## 2026-07-30 - Case Study Card Cover Normalization

- Standardized every case-study listing cover frame to the first card's `630:418` horizontal ratio.
- Applied `object-fit: cover` so source images fill the common frame without distortion, including the mobile layout.
- Verified with `npm run build` before release.

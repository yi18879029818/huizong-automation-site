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
- Verified with `npm run build` and `200` from the production `/case-studies` route.
- Published Cloudflare Worker version `032738dd-5a21-4b5d-b179-93d464be18a8` after pushing `main`.

## 2026-07-30 - Electronics Manufacturer Case Study Detail Rebuild

- Rebuilt only `/case-studies/projects/electronics-manufacturer-warehouse-automation` into a dedicated project-narrative layout based on the verified legacy case-study sequence.
- Preserved the current Coolyne visual system and localized real images while reusing the existing Sanity project content.
- Replaced the generic table and sticky-sidebar presentation for this one route with challenge, approach, equipment, results, consultation CTA, and project navigation sections.
- Omitted unverified numeric metrics, historical client quotations, and legacy brand references.
- Verified `npm run build`; the generated route includes the new approach section and excludes the legacy `0 FTEs` metric.
- Published Cloudflare Worker version `8cd9f1d7-ad56-400c-99b2-7a733aff11e6`; production returns `200` with the new approach and equipment sections.

## 2026-07-30 - Case Study Detail Template Expansion

- Extended the dedicated project-narrative layout from the electronics manufacturer case to the remaining five Sanity case-study detail routes.
- Preserved each case's own Sanity content, imagery, and SEO metadata while removing generic metric strips and sticky-sidebars from all six real project details.
- Cases with multiple project images retain the equipment gallery; single-image cases use capability cards sourced from their existing specifications instead of repeated imagery.
- Verified `npm run build` for all 50 static routes.
- Published Cloudflare Worker version `947dd14f-137c-4710-81f8-73581dac3384`; all six production case-study detail pages return `200` with the unified modules and without the legacy metric strip.

## 2026-07-30 - Mini Load Case Video Embed

- Replaced the Mini Load ASRS case study's challenge-section image with the user-provided YouTube video, starting at 91 seconds.
- Scoped the embedded video to `/case-studies/projects/mini-load-asrs-bin-storage`; the remaining five case-study detail pages keep their existing media.
- Verified `npm run build` successfully.
- Published Cloudflare Worker version `7c5e290b-d04b-461a-8a54-2092b464587e`; the target page returns `200` and contains the 91-second YouTube embed.

## 2026-07-30 - Unit Load ASRS Case Video Embed

- Replaced the Unit Load ASRS case study's challenge-section image with the user-provided YouTube video.
- Scoped the embed to `/case-studies/projects/unit-load-asrs-pallet-handling`; the other five case-study detail pages remain unchanged.
- Verified `npm run build` successfully.

## 2026-07-30 - Case Study Hero Title Scale

- Reduced the shared case-study detail hero title scale from a maximum of `5.1rem` to `3.75rem`.
- The responsive rule applies to all six project detail pages while preserving readable mobile sizing.
- Verified `npm run build` successfully.

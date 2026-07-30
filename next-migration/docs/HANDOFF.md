# Handoff

## 当前完成状态

Six real case studies are stored in Sanity and live through the new case-study listing and project detail routes.

## 本次修改的文件

`app/case-studies/`, `components/case-study-*.jsx`, `lib/sanity/queries.mjs`, `sanity/schemaTypes/`, `scripts/`, `case-study-assets/`, and `app/sitemap.js`.

## 已验证的结果

Sanity returns all six slugs; `npm run build` passes; all six production pages and their local image paths return `200`; sitemap includes all six project URLs.

## 未解决的问题

`npx sanity deploy --yes` requires selecting or creating a hosted Studio hostname. No new hostname was created automatically.

## 下一步建议

If a hosted Studio is required, select an approved existing hostname or create one through the Sanity project owner; do not create a hostname automatically.

## 不要碰的风险区域

Do not replace the Sanity case-study flow with local JSON or reintroduce legacy external image URLs.

## 2026-07-30 Cover Update

The electronics manufacturer case-study cover now uses the localized real production-floor image at `/images/case-studies/electronics-manufacturer-warehouse-automation/electronics-manufacturer-cover.webp`. Sanity, `main`, and Cloudflare Worker version `68165525-e194-456c-ab3a-275f68d07702` have been updated; production returns the asset with `200 image/webp`.

## 2026-07-30 Card Cover Frames

Every card on `/case-studies` now uses a `630:418` cover frame with `object-fit: cover`. This keeps the current card design while preventing source-image proportions from changing card height. Cloudflare Worker version `032738dd-5a21-4b5d-b179-93d464be18a8` is live and `/case-studies` returns `200`.

## 2026-07-30 Electronics Case Layout

`/case-studies/projects/electronics-manufacturer-warehouse-automation` now uses a dedicated, reference-led narrative layout. It is scoped by slug, so other case-study detail templates remain unchanged. It reuses Sanity content and localized images, and deliberately excludes unverified metrics, historical quotes, and legacy branding. Cloudflare Worker version `8cd9f1d7-ad56-400c-99b2-7a733aff11e6` is live; the production page returns `200` with the new approach and equipment sections.

## 2026-07-30 All Case Detail Layouts

All six real case-study detail routes now share the same project-narrative layout. Multi-image projects retain a visual equipment grid; single-image projects use existing specification rows as visual capability cards. This is presentation-only: Sanity documents, URLs, SEO metadata, and case-study cards remain unchanged. Cloudflare Worker version `947dd14f-137c-4710-81f8-73581dac3384` is live; all six detail pages return `200` with the unified modules and without the legacy metric strip.

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

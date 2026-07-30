# Handoff

## 当前完成状态

Six real case studies are stored in Sanity and render through the new case-study listing and project detail routes.

## 本次修改的文件

`app/case-studies/`, `components/case-study-*.jsx`, `lib/sanity/queries.mjs`, `sanity/schemaTypes/`, `scripts/`, `case-study-assets/`, and `app/sitemap.js`.

## 已验证的结果

Sanity returns all six slugs; local project page and WebP image return `200`; sitemap includes all six project URLs; `npm run build` passes.

## 未解决的问题

`npx sanity deploy --yes` requires selecting or creating a hosted Studio hostname. No new hostname was created automatically.

## 下一步建议

Push `main`, execute `npm run release:production`, then verify the six production URLs and `/sitemap.xml`.

## 不要碰的风险区域

Do not replace the Sanity case-study flow with local JSON or reintroduce legacy external image URLs.


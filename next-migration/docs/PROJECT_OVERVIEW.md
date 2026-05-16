# coolyne Website Project Overview

## 1. Project Summary

This project is the current frontend codebase for the `coolyne.com` website.

It is a B2B industrial website focused on:

- warehouse automation
- AGV and AMR products
- ASRS and material handling solutions
- case studies and trust-building content
- lead generation through contact and inquiry forms

The current frontend repository is:

`D:\BaiduNetdiskDownload\codex-DP-1\cloudflare-pages-site-deploy\next-migration`

The public asset source directory is:

`D:\BaiduNetdiskDownload\codex-DP-1\cloudflare-pages-site-deploy\public`

## 2. Project Goals

The website is not only a brand site. It also serves as a sales and conversion tool.

Core goals:

- present coolyne as a credible warehouse automation supplier
- clearly explain products and solutions
- improve trust through certificates, case studies, and structured content
- drive inquiries through forms and CTA modules
- support GA4, GTM, GSC, and future ad conversion tracking

## 3. Current Business Positioning

The website positioning is:

**industrial automation website + lead generation funnel + structured product and solution catalog**

Target audiences:

- manufacturing decision makers
- warehouse and logistics project owners
- automation equipment buyers
- system integrators and channel partners
- overseas B2B customers evaluating warehouse automation vendors

## 4. Current Site Scope

Main routes currently covered:

- `/`
- `/about`
- `/contact`
- `/thanks`
- `/products`
- `/products/agv-forklift`
- `/products/ground-handling-forklift-agv`
- `/products/lifting-agv`
- `/products/storage-agv`
- `/products/agv-roller`
- `/products/composite-mobile-robot`
- `/solutions`
- `/solutions/asrs`
- `/solutions/material-handling`
- `/solutions/picking`
- `/solutions/software`
- `/case-studies`
- `/case-studies/asrs`
- `/case-studies/material-handling`
- `/case-studies/picking`
- `/case-studies/projects/automated-warehouse-upgrade`

## 5. Current Implementation Status

Completed or already in use:

- Next.js App Router migration
- Cloudflare Workers / OpenNext deployment path
- structured routing and content-driven page assembly
- homepage, about, contact, products, solutions, and case studies pages
- website-wide GTM integration
- GA4 measurement ID integration
- GSC verification file support
- `/thanks/` thank-you page for ad conversion tracking
- form success redirect to `/thanks/`
- form required field rules adjusted so only email and message are required on main forms
- homepage 3D viewer recovery and local `model-viewer` asset fallback

## 6. Important Project Rules

### 6.1 Source of truth for assets

Static public assets should be maintained in:

`..\public`

Reason:

- `next-migration/public` is synchronized from the upper-level `public` folder before build
- direct edits inside `next-migration/public` may be overwritten by `scripts/sync-legacy-public.mjs`

### 6.2 Deployment reality

The standard deployment command is:

```bash
npm run deploy
```

However, in this project the final route-binding step on Cloudflare can fail because of token permission issues.

Practical behavior observed:

- OpenNext build may still succeed
- worker upload may still succeed
- static assets may still upload
- final custom-domain route binding may fail with Cloudflare API error `10000`

Because of that, deployment verification must always include checking the live site content.

### 6.3 Current live domain

- [https://www.coolyne.com](https://www.coolyne.com)
- [https://coolyne.com](https://coolyne.com)

## 7. Recent Important Changes

Recent iterations that matter for future work:

- replaced legacy Fleet branding with coolyne branding across the site
- adjusted header and footer logo rendering
- added GTM container `GTM-NND97MZW`
- connected GA4 measurement ID `G-P4MLY74P4X`
- added `google40a155700db0be9e.html` support for GSC
- added `/thanks/` page and redirect-after-success form flow
- updated major forms so failed submissions do not redirect
- made email and message the only required fields on major website forms
- replaced multiple page assets and homepage hero interactions
- fixed homepage 3D dependency so it no longer relies only on remote CDN loading

## 8. Key Risks and Ongoing Attention Areas

- Cloudflare deployment token permissions are incomplete for route operations
- the codebase mixes structured React pages, MDX content, and legacy public assets
- some older docs contain encoding corruption and should not be treated as final reference
- homepage 3D area is sensitive because it depends on both asset integrity and client-side viewer loading
- website visuals have gone through many live edits, so verification after each change is important

## 9. Recommended Maintenance Workflow

For every new task:

1. read this file
2. read `project-progress.md`
3. read `technical-project-plan.md`
4. confirm whether the change belongs in code, MDX content, or public assets
5. build before deploy when the change affects routes, scripts, or structured pages
6. verify the live page after deployment

## 10. Related Documents

- [README](./README.md)
- [Business Planning](./business-planning.md)
- [Project Progress](./project-progress.md)
- [Technical Project Plan](./technical-project-plan.md)

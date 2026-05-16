# coolyne Website Technical Project Plan

## 1. Technical Summary

This project is a Next.js frontend deployed to Cloudflare using OpenNext.

Core stack:

- Next.js 14
- React 18
- App Router
- MDX-based content modules
- OpenNext for Cloudflare packaging
- Cloudflare Workers + static assets

The repository is structured as a modern frontend, but it still depends on a synchronized legacy-style public asset directory.

## 2. Architecture Overview

### 2.1 Rendering model

The site uses a structured routing approach:

- route resolution is handled centrally
- page content is assembled from MDX and structured page components
- route-to-page mapping happens through shared content loaders and navigation configuration

Key flow:

1. route enters Next.js App Router
2. slug is normalized
3. route metadata and content module are selected
4. a structured page component renders the final page layout

### 2.2 Main code areas

Important files and directories:

- `app/layout.js`
  global layout, scripts, GTM, shared shell hooks

- `app/[[...slug]]/page.js`
  catch-all route entry for structured frontend pages

- `components/structured-static-pages.js`
  homepage, about, and contact page rendering

- `components/structured-catalog-pages.js`
  products, solutions, and case studies rendering

- `components/public-shell.js`
  shared page chrome and common outer structure

- `lib/structured-content.js`
  structured page resolution, route-to-content mapping, metadata assembly

- `lib/navigation.js`
  navigation sections and canonical structured route list

- `content/`
  MDX content for pages, products, solutions, and case studies

- `public/assets/`
  shared scripts, styles, logo assets, hero utilities

- `public/downloads/`
  product files, certificates, imagery, and other downloadable or public media

## 3. Routing Strategy

### 3.1 Public pages

Primary route surface:

- `/`
- `/about`
- `/contact`
- `/thanks`

### 3.2 Structured catalog routes

Products:

- `/products`
- `/products/agv-forklift`
- `/products/ground-handling-forklift-agv`
- `/products/lifting-agv`
- `/products/storage-agv`
- `/products/agv-roller`
- `/products/composite-mobile-robot`

Solutions:

- `/solutions`
- `/solutions/asrs`
- `/solutions/material-handling`
- `/solutions/picking`
- `/solutions/software`

Case studies:

- `/case-studies`
- `/case-studies/asrs`
- `/case-studies/material-handling`
- `/case-studies/picking`
- `/case-studies/projects/automated-warehouse-upgrade`

### 3.3 Route resolution source

Canonical route and navigation configuration currently depends on:

- `lib/navigation.js`
- `lib/structured-content.js`

## 4. Content Strategy in Code

### 4.1 MDX content

The site uses MDX files as structured content sources.

Examples:

- `content/pages/home.mdx`
- `content/pages/about.mdx`
- `content/pages/contact.mdx`
- `content/products/*.mdx`
- `content/solutions/*.mdx`
- `content/case-studies/*.mdx`

Each content file may export:

- `meta`
- `features`
- `scenarios`
- `integrations`
- `capabilities`
- `faqs`
- `cards`
- `projects`

### 4.2 Presentation layer

Rendering is not handled directly inside each MDX file.

Instead:

- MDX provides structured content and metadata
- React page builders decide layout, sections, cards, and visual composition

This means content updates and layout updates are partially separated, but not fully decoupled.

## 5. Frontend Shell and Shared Assets

### 5.1 Shared styles

Primary global styles:

- `app/globals.css`
- `app/structured-content.css`
- `public/assets/site-shell.css`

Notes:

- styling is a mix of utility classes and handwritten CSS
- site-wide shell styles live outside normal component-level CSS
- high-impact visual changes often happen in `site-shell.css`

### 5.2 Shared scripts

Important global frontend scripts:

- `public/assets/site-shell.js`
  shared shell behavior and global frontend interactions

- `public/assets/site-motion.js`
  motion and page-level visual behavior

- `public/assets/home-hero-robot.js`
  homepage 3D model state handling

- `public/assets/vendor-model-viewer.min.js`
  local copy of `model-viewer`, used to avoid homepage 3D failures caused by remote CDN instability

## 6. Form and Conversion Architecture

### 6.1 Main contact endpoint

Backend route:

- `app/api/contact/route.js`

Actual submission processing:

- `lib/contact-service.js`

Current behavior:

- validates form payload
- requires a valid email
- validates required fields in payload
- sends submission email through Resend
- attempts to store submissions through D1 using `FORM_DB`

### 6.2 Main form rules

Current frontend rule after recent changes:

- `email` required
- `message` required
- `fullName` optional on the main forms that were adjusted
- `company` optional where applicable
- `phone` optional where applicable

### 6.3 Success redirect

Successful form submissions redirect to:

- `/thanks/`

This is used for ad conversion tracking and only triggers after successful submission.

### 6.4 Search/chat helper endpoint

Route:

- `app/api/search/route.js`

Purpose:

- lightweight keyword-based automation helper
- supports chatbot-like quick guidance
- routes users toward products, solutions, quote intent, or contact actions

## 7. Analytics and Tracking

### 7.1 GTM

GTM container is injected globally from:

- `app/layout.js`

Current container:

- `GTM-NND97MZW`

### 7.2 GA4

Current measurement ID:

- `G-P4MLY74P4X`

Configured through:

- Cloudflare environment variables
- frontend tracking integration already in place

### 7.3 GSC

Google Search Console verification file support is present.

Related route/file:

- `app/google40a155700db0be9e.html/`
- public verification asset support

## 8. Deployment Architecture

### 8.1 Build commands

Standard commands:

```bash
npm install
npm run dev
npm run build
npx opennextjs-cloudflare build
npm run deploy
```

### 8.2 Asset sync rule

Before build, the project runs:

- `scripts/sync-legacy-public.mjs`

This copies public assets from the upper-level `public` directory into `next-migration/public`.

That means:

- edit source assets in `..\public`
- do not rely on direct edits in `next-migration/public` unless you know they will be regenerated or resynced

### 8.3 Real deployment behavior

Observed real deployment sequence:

1. sync upper-level public assets
2. run Next build
3. run OpenNext bundle generation
4. upload worker and assets to Cloudflare
5. optionally bind custom-domain routes

### 8.4 Known deployment problem

There is an existing Cloudflare token permission issue for route binding.

Typical failure:

- Cloudflare API error `10000`
- failure during `/workers/routes`

Practical workaround used during maintenance:

- deploy worker/assets first with `wrangler.deploy.jsonc`
- optionally try full custom-domain deploy with `wrangler.jsonc`
- always verify live HTML, script files, or assets directly after deployment

## 9. 3D Homepage Technical Notes

Homepage hero contains a client-side 3D viewer.

Key parts:

- markup in `components/structured-static-pages.js`
- viewer status logic in `public/assets/home-hero-robot.js`
- local model-viewer script in `public/assets/vendor-model-viewer.min.js`

Important note:

The homepage 3D block is sensitive to:

- script loading
- GLB asset path validity
- browser-side model-viewer execution
- cache mismatch between worker code and public assets

When changing this area:

1. update source file in `..\public` if changing public script/assets
2. rebuild with OpenNext, not only plain `next build`
3. deploy
4. verify live homepage HTML and live script contents

## 10. High-Risk Files

These files have broad impact:

- `app/layout.js`
- `components/public-shell.js`
- `components/structured-static-pages.js`
- `components/structured-catalog-pages.js`
- `lib/structured-content.js`
- `public/assets/site-shell.css`
- `public/assets/site-shell.js`

Changes here should be tested more carefully than isolated content edits.

## 11. Recommended Technical Maintenance Rules

### 11.1 When editing UI or content

- prefer editing MDX for content-only changes
- prefer editing structured page components for layout or section logic changes
- prefer editing upper-level `public` for shared assets

### 11.2 When editing forms

- keep current submission API contract unchanged unless intentionally redesigning backend integration
- preserve success-only redirect behavior to `/thanks/`
- verify failure cases still do not redirect

### 11.3 When deploying

- if only code changed, still consider OpenNext rebuild before deploy
- if public assets or frontend scripts changed, rebuild and verify uploaded assets
- verify the actual live page source when the deploy command reports partial success or route-binding errors

## 12. Suggested Next Technical Improvements

Short term:

- standardize docs encoding and remove corrupted legacy text
- add a cleaner deployment verification checklist
- reduce dependence on globally injected ad hoc scripts where possible

Medium term:

- split oversized page renderer files into smaller modules
- separate data, layout, and interaction logic more clearly
- create a more explicit form configuration layer

Long term:

- evaluate CMS-backed content management
- connect CRM or lead management system
- formalize environment and deployment profiles

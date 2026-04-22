# Next.js Low-Risk Migration Shell

This directory is the first-stage migration shell for the existing Cloudflare Pages marketing site.

## What it does now

- Keeps the original static site in `../public` unchanged.
- Syncs the legacy `public/` folder into this Next.js app before `dev` and `build`.
- Maps the existing HTML files to clean App Router routes:
  - `index.html` -> `/`
  - `about/index.html` -> `/about`
  - `products/agv-forklift.html` -> `/products/agv-forklift`
- Reuses the existing shell CSS, shared JavaScript, and page-specific scripts.
- Preserves legacy `.html` aliases such as `/products/agv-forklift.html`.
- Replaces the core content sections with structured React templates for:
  - `/`
  - `/about`
  - `/contact`
  - `/products`
  - `/solutions`
  - `/case-studies`
  - all product, solution, and case-study detail routes
- Moves the structured content source into MDX files under:
  - `content/products/*.mdx`
  - `content/solutions/*.mdx`
  - `content/case-studies/*.mdx`

## Structured content status

These routes no longer depend on page-local legacy HTML:

- `home`, `about`, and `contact`
- `products` overview and detail pages
- `solutions` overview and detail pages
- `case-studies` overview, category pages, and project detail page

They now render from centralized content objects in `lib/structured-content.js` and shared templates in `components/structured-site.js`.

## AI / SEO outputs

The migration layer now also provides:

- `app/llms.txt/route.js`
- `app/sitemap.js`
- `app/robots.js`
- page-level JSON-LD from `components/structured-data.js`
- page-level canonical and Open Graph metadata from `app/[[...slug]]/page.js`
- breadcrumb and FAQ schema for MDX-driven content routes

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare Workers deployment

This Next.js app is now prepared for the Cloudflare Workers + OpenNext deployment path.

Key files:

- `wrangler.jsonc`
- `open-next.config.ts`
- `app/api/contact/route.js`
- `lib/contact-service.js`

Deployment flow:

```bash
npm run deploy
```

Before deploying:

1. Update the `database_id` in `wrangler.jsonc` for the `FORM_DB` D1 binding.
2. Add the following secrets and variables in Cloudflare:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
3. For local preview, copy `.dev.vars.example` to `.dev.vars`.

Notes:

- `npm run dev` still uses the regular Next.js dev server.
- `npm run preview` builds the OpenNext worker and runs it with Wrangler.
- The contact form no longer depends on the legacy `functions/api/contact.js` endpoint when this app is deployed on Workers.

## Why this is low risk

- No rewrite of the current page markup yet.
- No changes to the current Cloudflare Functions backend.
- Existing assets, 3D models, and page scripts remain in use.

## Recommended next step

Now that the public-facing content pages are off the legacy HTML layer, the clean next move is to start attaching progressive backend capability:

1. connect structured content to a shared content registry or CMS
2. expose filtered content summaries through Next.js route handlers or FastAPI
3. add retrieval, lead routing, and MCP-oriented endpoints on top of the same content model

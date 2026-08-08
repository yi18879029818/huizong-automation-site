# Work Log

## 2026-08-03 - Unit Load ASRS Case Study Layout Alignment

- Applied the verified legacy Unit Load ASRS case-study structure to `/case-studies/projects/unit-load-asrs-pallet-handling`.
- Reused the compact ASRS template shared with the Mini Load page, preserving the configured YouTube process video, Sanity project content, reported storage and payback metrics, and responsive mobile stack.
- Verified `npm run build` successfully for all generated routes.

## 2026-08-03 - Mini Load ASRS Case Study Layout Alignment

- Rebuilt only `/case-studies/projects/mini-load-asrs-bin-storage` into the compact project-narrative layout used by the verified legacy Mini Load ASRS reference.
- Kept the existing YouTube process video, Sanity project content, and route metadata; the page now presents project name and background beside the video, followed by solution, results, reported metrics, and a consultation CTA.
- Added a responsive mobile stack without changing the other five case-study detail layouts.
- Verified `npm run build` successfully for all generated routes.

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
- Published Cloudflare Worker version `cb0c7920-8b69-413e-92e1-c8d7dfb9f6e8`; the Unit Load ASRS page returns `200` with its video and the shared title scale is present in the published CSS.

## 2026-07-31 - Portrait Equipment Image Framing

- Updated portrait equipment images in case-study delivered-system cards to use complete-image framing rather than horizontal cropping.
- The workshop intralogistics AGV card now shows the full vehicle; landscape project images retain their existing presentation.
- Verified `npm run build` successfully.

## 2026-07-31 - ASRS Upgrade Reference Layout

- Rebuilt `/case-studies/projects/automated-warehouse-upgrade` as a long-form project report following the Robotlyne workshop intralogistics reference structure.
- Preserved the ASRS upgrade case's own Sanity text, route, and SEO data while using the three locally stored original reference images in the matching report sections.
- Verified `npm run build` successfully.
- Published Cloudflare Worker version `79db6028-97d0-422b-9b69-6f1fcb5b1f05`; the production route returns `200` with the new report headings and reference media.

## 2026-07-31 - Sanity Blog Publication and Update

- Published `Reverse Logistics: What It Is and Why It Matters to Your Business` to Sanity at `/blog/reverse-logistics`.
- Updated `/blog/agv-vs-amr` from the supplied English document, retaining its existing hero image and publishing all nine AGV-versus-AMR comparison tables.
- Updated article metadata and canonical paths through the standard Sanity post fields; both posts contain English-only body content.
- Verified both production URLs return `200` and `/sitemap.xml` includes the new reverse-logistics URL.

## 2026-07-31 - Warehouse Automation Guide Sanity Update

- Updated `/blog/warehouse-automation-guide` from the supplied Word document through the formal Sanity content flow.
- Set the visible article title from the document H1 and retained the document Meta Title for SEO; preserved the existing hero image and publication date.
- Imported 171 English-only Portable Text blocks with the revised warehouse automation systems, types, and process content.
- Verified the production page returns `200`, displays the updated title, and is present in `/sitemap.xml`.
- Published Cloudflare Worker version `c9a77a77-6639-46fc-a486-e455f812d81b`; the live page and its SEO title both return the updated values.

## 2026-08-01 - G2P and AS/RS Sanity Updates

- Updated `/blog/goods-to-person-guide` and `/blog/what-is-asrs` from the supplied Word documents through the formal Sanity content flow.
- Preserved each article's existing hero image and publication date while replacing the English body and SEO metadata; the G2P article contains 151 body blocks and the AS/RS article contains 94.
- Verified both production URLs return `200`, show their new titles and SEO titles, contain English-only bodies, and are included in `/sitemap.xml`.

## 2026-08-01 - Reverse Logistics Inline Images

- Added five supplied warehouse images to `/blog/reverse-logistics` through Sanity's asset library without changing the article title, publication date, or hero image state.
- Placed the images after the relevant sections for returnable-container recovery, return registration, restock/repair/disposal classification, conveyor sorting, and AGV/AMR internal transportation.
- Verified the Sanity document contains five `imageWithAlt` blocks, the production article returns `200` with Sanity image URLs, and `/sitemap.xml` includes the article URL.

## 2026-08-01 - Reverse Logistics Cover Image

- Set the returnable-container image already used in the article body as the Sanity `heroImage` for `/blog/reverse-logistics`.
- Verified the production article returns `200` and references the selected Sanity cover asset.

## 2026-08-03 - Maximum Stock Level Sanity Publication

- Published `What Is the Maximum Stock Level? Definition, Formula, and Calculation Example` through Sanity at `/blog/maximum-stock-level`.
- Preserved the supplied definitions, formulas, calculation example, risk analysis, and maximum/minimum/safety-stock comparison table; added three contextual internal links to related Coolyne guides.
- Set a selective-pallet-racking Sanity asset as the cover image because the supplied Word document did not include embedded media.
- Verified the production article returns `200`, includes the cover asset, and is present in `/sitemap.xml`.

## 2026-08-03 - Maximum Stock Level Sanity Image Update

- Replaced the `/blog/maximum-stock-level` cover with the supplied blue-tote AS/RS image through Sanity.
- Added the three supplied supporting visuals after the calculation, calculation-example, and inventory-risk sections, with descriptive alt text and captions.
- Verified the production article returns `200`, references the new cover and all three inline assets, and remains in `/sitemap.xml`.

## 2026-08-03 - Workshop Intralogistics Reference Case Migration

- Rebuilt `/case-studies/projects/workshop-intralogistics-automation` as a long-form project report using the verified Robotlyne Workshop Intralogistics reference structure.
- Used the locally preserved original reference images for facility layout, AGV route planning, and the autonomous forklift, and aligned the page copy with the reference project's background, objectives, site assessment, solution, equipment, scope, and ROI information.
- Verified `npm run build` successfully; production publishing remains pending until the current GitHub connectivity issue allows the local `main` commits to be pushed.
- Published Cloudflare Worker version `e27c275b-774b-4917-8695-cf762edac906`; verified the production route returns `200` and includes the project-background, objectives, site-assessment, route-planning, equipment-overview, scope-and-ROI sections, plus all three reference images.

## 2026-08-04 - Smart Home Manufacturing AGV Reference Case Migration

- Rebuilt `/case-studies/projects/smart-home-manufacturing-agv` as a dedicated project report following the verified Robotlyne Smart Home Manufacturing AGV reference sequence.
- Added project background, objectives, pickup and drop-off, empty-tray delivery, full-load pickup, AGV selection, fleet planning, digital twin, ROI, CTA, and project navigation sections.
- Reused the five locally preserved reference workflow and digital-twin images from `public/images/case-studies/smart-home-manufacturing-agv/`.
- Verified `npm run build` successfully and published Cloudflare Worker version `4163bcf1-ad65-4822-9a84-e973aff38097`.
- Verified the production route returns `200` with the new project headings and the first and fifth reference-image URLs.
- Repositioned `Project Background`, `Project Objectives`, and `Solutions` into the reference page's desktop two-column arrangement: orange title at left, detailed content at right, with section dividers and a mobile single-column fallback.
- Verified `npm run build` and published Cloudflare Worker version `1b6cc170-02bf-43a2-ad2c-2980b6825077`; the production page returns `200` and includes all three headings plus the `smart-home-reference-split` layout class.
- Standardized the lead-title scale across the six migrated case-study detail pages. Desktop titles now use a wider heading area, a maximum 3.6rem scale, tighter line height, and balanced wrapping so long project names prioritize one or two lines instead of three.
- Published Cloudflare Worker version `2551f1c7-de10-42a3-963b-9a95f86b9e68`; all six migrated case-study detail URLs returned `200` after release.

## 2026-08-04 - Machine Tending Blog Refresh

- Replaced the Sanity body for `/blog/what-is-machine-tending` with the supplied Machine Tending Robots document, preserving the existing article cover and publishing date.
- Updated the frontend media insertion anchors to match the refreshed copy, preserving two contextual images and the existing machine-tending workflow video.
- Verified the Sanity document has the updated title, 130 body blocks, and the expected section structure; `npm run build` completed successfully.
- Published Cloudflare Worker version `2e61bdf0-3ae1-44da-8f15-80d2da1d5cbe`; production article and `/sitemap.xml` both return `200`, and the article page includes the refreshed title, both images, and the workflow video.

## 2026-08-05 - Stock Turnover Sanity Publication

- Published `What Is Stock Turnover? How to Calculate, Interpret, and Improve It` through Sanity at `/blog/stock-turnover-guide`.
- Preserved the supplied formulas, calculation example, interpretation guidance, limitation analysis, and inventory-improvement strategies in 105 Portable Text blocks; the article is English only.
- Verified the Sanity document, production article response (`200`), and `/sitemap.xml` entry. The source Word document contained no embedded media, so no cover image was assigned.

## 2026-08-06 - Mobile Manipulator Robots Blog Refresh

- Replaced the English body and SEO metadata for `/blog/autonomous-mobile-manipulator-robots-market` through Sanity using the supplied Mobile Manipulator Robots document.
- Preserved the existing cover image and the original publication date; the refreshed article contains 87 Portable Text blocks covering operation, applications, advantages, and Coolyne's mobile manipulator solution.
- Verified the Sanity document, production article response (`200`), updated title, and `/sitemap.xml` entry.

## 2026-08-06 - Stock Turnover Blog Visuals

- Updated the Sanity post for `/blog/stock-turnover-guide` with a warehouse inventory-check hero image and four contextual body visuals.
- Placed the images after the matching stock-turnover formula, DIO, slow-moving inventory, and RFID inventory-accuracy sections.
- Excluded supplied graphics with fabricated comparisons, third-party branding, or unreadable dashboard labels.
- Verified the Sanity CDN returns one hero image and four `imageWithAlt` blocks. The production article and `/sitemap.xml` both return `200`; the article URL is present in the sitemap.
- The production Worker still returned the previous article markup before release, so `npm run release:production` is required to publish the current dynamic Sanity renderer.

## 2026-08-07 - Logistics Hubs Sanity Publication

- Published `What Is a Logistics Hub? Types, Operations, Benefits, and Location Factors` through Sanity at `/blog/logistics-hubs` as an English-only article.
- Preserved the supplied document structure in 133 Portable Text blocks, including 32 headings and 19 list items, and configured the article SEO title and description.
- The source Word document contained no embedded media, so no hero image or body visuals were added.
- Verified the production article returns `200`, and `/sitemap.xml` returns `200` and includes the new blog URL. No Cloudflare deployment was required because the blog route and sitemap read the Sanity content dynamically.

## 2026-08-08 - Automated Warehouse Picking Systems Refresh

- Replaced the English body and SEO metadata for `/blog/automated-warehouse-picking-systems` through Sanity using the supplied Automated Warehouse Picking Systems document.
- Preserved the existing publication date, hero image, and social preview image; the refreshed article contains 102 English Portable Text blocks.
- Updated the Markdown-to-Sanity importer to retain an existing `seo.ogImage` when refreshing an existing post.
- Verified the Sanity document, production article response (`200`), updated title and selection section, and `/sitemap.xml` entry. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-08 - Logistics Hubs Blog Visuals

- Added the six supplied logistics-hub visuals to `/blog/logistics-hubs` through Sanity `imageWithAlt` blocks without changing the article title, publication date, SEO fields, or existing English copy.
- Inserted each visual beside the matching Port Logistics Hubs, Rail Logistics Hubs, Air Logistics Hubs, Regional Distribution Hubs, operating workflow, and location-selection sections.
- Selected the port, rail, and road multimodal image as the `heroImage` cover, reusing the already-uploaded Sanity asset with its descriptive alt text.
- Verified Sanity contains the selected hero image and all six image blocks with reachable asset URLs. The production article and `/sitemap.xml` both return `200`, and the article URL remains present in the sitemap. No Cloudflare deployment was required because these Sanity content changes are read dynamically.

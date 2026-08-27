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

## 2026-08-10 - Palletization and Automated Pallet Handling Sanity Publication

- Published `What Is Palletization? How Palletization Improves Transportation and Warehouse Efficiency` through Sanity at `/blog/palletization-automated-pallet-handling` as an English-only article.
- Preserved the supplied document structure in 79 Portable Text blocks, including the palletization workflow, transport-efficiency benefits, pallet standards, and automated pallet-handling guidance.
- The source Word document contained no embedded media, so no hero image or body visuals were added.
- Verified the Sanity document, production article response (`200`), and `/sitemap.xml` entry. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-10 - Palletization Article Visual Assets

- Added `scripts/add-palletization-images.mjs` to place the five supplied visual assets into the Sanity post `palletization-automated-pallet-handling`.
- Set `2.jpg` as the hero image and placed it after the "What Is Palletization?" section; placed the other four images after their related logistics and automation sections.
- Verified the Sanity post contains the hero plus five `imageWithAlt` blocks, the live article returns `200`, and `/sitemap.xml` includes the article URL.

## 2026-08-12 - Warehouse Layout Optimization Sanity Publication

- Published `Warehouse Layout Optimization: How to Improve Space Utilization and Operational Efficiency` through Sanity at `/blog/warehouse-layout-optimization` as an English-only article.
- Imported 191 Portable Text blocks from the supplied Word document and configured the article title, slug, and SEO metadata.
- The source document contained no embedded images, so no hero image or inline visuals were added.
- Verified the production article returns `200`, and `/sitemap.xml` returns `200` and includes the new blog URL. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-13 - Warehouse Layout Optimization Visuals

- Added the supplied warehouse-layout visuals for `/blog/warehouse-layout-optimization` using frontend static image overrides because the available Sanity token can read the post but cannot create assets or update documents.
- Set `warehouse-layout-optimization-layout-types-cover.png` as the article cover through `lib/blog-image-overrides.mjs`.
- Inserted `warehouse-layout-optimization-zone-based-storage.jpg` after the warehouse functional-area sizing paragraph and `warehouse-layout-optimization-abc-slotting-layout.png` after the ABC analysis paragraph.
- Added an explicit sitemap route fallback for `/blog/warehouse-layout-optimization` so the URL remains present even if runtime sitemap generation misses the Sanity post.
- Verified `npm run build` succeeds. Local standalone verification returned `200` for the article, found all three image paths in the article HTML, and confirmed `/sitemap.xml` contains `https://www.coolyne.com/blog/warehouse-layout-optimization`.
- Deployed Cloudflare Worker version `9af1ac13-46e3-4363-ab31-f114de6619e8`; deployment uploaded the three new image assets.
- Verified production article HTML includes the cover and both inline image paths. Verified the new static image URLs return `200`, and production `/sitemap.xml` includes `https://www.coolyne.com/blog/warehouse-layout-optimization`.
- Re-tested the provided Sanity token after deployment. Sanity accepted it for identification/read context but rejected asset upload with missing `create` permission and rejected document patch dry-runs with missing `update` permission, so the frontend static override remains the active production solution.
- Tested a second provided Sanity token; read, create dry-run, and update dry-run all passed.
- Used the write-capable token to upload the cover and two body visuals into Sanity for `/blog/warehouse-layout-optimization`. Public Sanity reads now show one `heroImage` asset and two body `imageWithAlt` blocks.
- Removed the temporary frontend static image overrides and removed the now-unneeded static image files from the repository so the article renders from Sanity as the canonical source.
- Deployed cleanup as Cloudflare Worker version `530bd15c-da57-4456-82fe-d2407f9c5346`.
- Verified production article HTML now contains Sanity CDN image URLs, does not contain the removed static image paths, and production `/sitemap.xml` still contains `https://www.coolyne.com/blog/warehouse-layout-optimization`.

## 2026-08-19 - Five Coolyne Blog Publications

- Published five supplied English Word documents through Sanity as Coolyne blog posts:
  `/blog/how-we-designed-unmanned-agv-logistics-for-an-injection-molding-workshop`,
  `/blog/how-we-designed-a-machine-tending-cell-with-a-composite-robot-and-receiving-agv`,
  `/blog/how-we-designed-agv-based-intralogistics-for-a-multi-floor-electronics-workshop`,
  `/blog/how-we-designed-an-inline-robotic-screw-fastening-system-for-notebook-keyboards`, and
  `/blog/automated-sortation-what-is-an-automated-sortation-system`.
- Converted the source Word structure into Coolyne importer-ready Markdown with title, SEO description, slug, headings, and list blocks, then imported with `--english-only`.
- Verified DOCX text extraction before publication: all five documents returned `verified_text_covered: true` and `missing_count: 0`.
- Verified Sanity readback for all five posts, including SEO fields and body block counts of 249, 207, 193, 221, and 106.
- Verified each production article returns `200`, includes the exact article title and `BlogPosting` structured data, and `/sitemap.xml` returns `200` with all five new blog URLs.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-20 - Five Coolyne Blog Link Restoration

- Restored the source Word document hyperlinks that were lost during the initial DOCX-to-Sanity import for the five 2026-08-19 Coolyne blog posts.
- Added 9 Sanity Portable Text link marks across the five posts, preserving the original Word anchor text and target URLs.
- Restored case-library links for the injection-molding AGV logistics, machine-tending cell, multi-floor electronics intralogistics, and notebook-keyboard screw-fastening articles.
- Restored Coolyne internal links for `/products/agv-roller`, `/products`, `/solutions`, and `/contact`, plus the original Robotlyne screwdriving URL from the source document.
- Verified Sanity readback shows the expected link marks in all five posts.
- Verified all five production article pages return `200`, and every restored link appears in the production HTML. Production `/sitemap.xml` returns `200`.
- No Cloudflare deployment was required because the blog route reads Sanity content dynamically.

## 2026-08-20 - Notebook Keyboard Screw Fastening Blog Takedown

- Removed the Sanity post `/blog/how-we-designed-an-inline-robotic-screw-fastening-system-for-notebook-keyboards` at the user's request.
- Saved a local Sanity JSON backup before deletion at `tmp/blog-takedown-20260820/how-we-designed-an-inline-robotic-screw-fastening-system-for-notebook-keyboards.sanity-backup.json`.
- Verified Sanity no longer returns the post for that slug.
- Verified production `/blog/how-we-designed-an-inline-robotic-screw-fastening-system-for-notebook-keyboards` returns `404`, and production `/sitemap.xml` returns `200` without that URL.

## 2026-08-20 - SMT Buffer Warehouse Blog Publication

- Published `How We Designed an Automated Buffer Warehouse for an SMT and Insertion Workshop` through Sanity at `/blog/how-we-designed-an-automated-buffer-warehouse-for-an-smt-and-insertion-workshop`.
- Converted the supplied Word document into Coolyne importer-ready Markdown and imported it as English-only content with 241 Sanity body blocks.
- Verified DOCX text extraction before publication with `verified_text_covered: true` and `missing_count: 0`.
- Restored the source Word hyperlink `SMT and insertion workshop automated buffer warehouse case study` to the case-library URL in Sanity Portable Text.
- Verified Sanity readback shows the post, SEO fields, 241 body blocks, and the expected link mark.
- Verified the production article returns `200`, contains the exact title, contains the restored link, includes `BlogPosting` structured data, and production `/sitemap.xml` contains the new URL.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-20 - SMT Buffer Warehouse Blog Visuals

- Prepared three sanitized blog images from the supplied 2026-08-20 source files before upload: cropped the visible bottom brand from the lift-station image, blurred document/screen text, and cropped or blurred visible station labels and stickers.
- Uploaded the sanitized images to Sanity for `/blog/how-we-designed-an-automated-buffer-warehouse-for-an-smt-and-insertion-workshop`.
- Set the lift-station image as the Sanity `heroImage` because the post did not yet have a cover image.
- Inserted three `imageWithAlt` body blocks after the material-flow, material-category, and AGV-to-conveyor interface sections.
- Verified Sanity readback shows the hero image and all three target image blocks with alt text, captions, dimensions, and Sanity CDN URLs.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and includes all three Sanity image asset references and captions. Verified each Sanity CDN image URL returns `200 image/jpeg`.
- Verified production `/sitemap.xml` returns `200` and still contains the blog URL. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-20 - Automated Sortation Blog Visuals

- Prepared five supplied automated-sortation visuals as optimized blog JPEGs under `tmp/automated-sortation-images`.
- Cropped the warehouse conveyor image to remove a visible right-side wall sign; retained the parcel conveyor image naturally because its visible number boards are operational location labels rather than logos.
- Confirmed the current Sanity token can read the target post and passed asset-create and document-update dry-runs before writing.
- Uploaded all five images to Sanity for `/blog/automated-sortation-what-is-an-automated-sortation-system`.
- Set the robotic sortation cell overview as the Sanity `heroImage` because the post did not yet have a cover image.
- Inserted five `imageWithAlt` body blocks after the article definition, operating workflow, sliding shoe sorter, robotic sortation, and traditional high-throughput sortation sections.
- Verified Sanity readback shows the hero image and all five target image blocks with alt text, captions, dimensions, and Sanity CDN URLs.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and includes all five Sanity image asset references and captions. Verified each Sanity CDN image URL returns `200 image/jpeg`.
- Verified production `/sitemap.xml` returns `200` and still contains the blog URL. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-20 - Automated Sortation Cover Image Swap

- Replaced the automated sortation article `heroImage` with the real-scene sliding shoe sorter image already uploaded in Sanity.
- Kept the previous robotic sortation cell overview image in the article body so no inline visual was removed.
- Verified Sanity readback now shows `image-0408e9037c8e9779302fec3e61852892aa2a2e63-600x364-jpg` as the cover image.
- Verified the production article returns `200`, includes the new hero image asset, keeps `BlogPosting` structured data, and production `/sitemap.xml` returns `200` with the article URL.

## 2026-08-20 - Multi-Floor Electronics Workshop Blog Visuals

- Prepared six supplied multi-floor electronics workshop visuals as optimized blog JPEGs under `tmp/multi-floor-electronics-images`.
- Preserved the real-scene visuals without heavy masking so the case-study imagery remains natural; lightly blurred only the small account area in the dispatch-system screenshot.
- Confirmed the current Sanity token can read the target post and passed asset-create and document-update dry-runs before writing.
- Uploaded all six images to Sanity for `/blog/how-we-designed-agv-based-intralogistics-for-a-multi-floor-electronics-workshop`.
- Set the blue-bin AGV workshop image as the Sanity `heroImage` because the post did not yet have a cover image.
- Inserted six `imageWithAlt` body blocks after the logistics-volume, unmanned-vehicle, equipment-interface, multi-floor elevator, and central-dispatching sections.
- Verified Sanity readback shows the hero image and all six target image blocks with alt text, captions, dimensions, and Sanity CDN URLs.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and includes all six Sanity image asset references and captions. Verified each Sanity CDN image URL returns `200 image/jpeg`.
- Verified production `/sitemap.xml` returns `200` and still contains the blog URL. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-20 - Machine-Tending Cell Image and Video

- Prepared the supplied machine-tending image with mild autocontrast, contrast, sharpness, and unsharp-mask enhancement under `tmp/machine-tending-cell-assets/machine-tending-cell-sharpened.jpg`.
- Verified the supplied video is H.264 MP4, 1280x720, about 64 seconds, and about 18.8 MB, below the Cloudflare static asset size limit.
- Copied the video to the source public directory at `../public/videos/machine-tending-cell-receiving-agv.mp4` so the `prebuild` sync step carries it into `next-migration/public/videos`.
- Confirmed Sanity accepts the `videoEmbed` block shape with a dry-run body update before writing.
- Uploaded the sharpened image to Sanity for `/blog/how-we-designed-a-machine-tending-cell-with-a-composite-robot-and-receiving-agv`, set it as `heroImage`, and inserted it into the article body.
- Inserted a Sanity `videoEmbed` body block pointing to `/videos/machine-tending-cell-receiving-agv.mp4`.
- Verified `npm run build` succeeds and the OpenNext output contains `/videos/machine-tending-cell-receiving-agv.mp4`.
- The first `npm run deploy` attempt completed the OpenNext build but failed during Wrangler's Cloudflare API request with `fetch failed`; a direct `npx opennextjs-cloudflare deploy` retry succeeded.
- Deployed Cloudflare Worker version `dbc4c715-11c9-47bb-bd38-b719684a44e3`, uploading `/videos/machine-tending-cell-receiving-agv.mp4`.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and includes the new Sanity image asset, video source, image caption, and video caption.
- Verified the production video URL returns `200 video/mp4`, the Sanity image URL returns `200 image/jpeg`, and production `/sitemap.xml` returns `200` with the article URL.

## 2026-08-20 - Injection Molding Workshop Blog Visuals

- Prepared four supplied injection-molding workshop AGV visuals as optimized blog JPEGs under `tmp/injection-molding-agv-images`.
- Confirmed the current Sanity token can read the target post and passed asset-create and document-update dry-runs before writing.
- Uploaded all four images to Sanity for `/blog/how-we-designed-unmanned-agv-logistics-for-an-injection-molding-workshop`.
- Set the workshop AGV route image as the Sanity `heroImage` because the post did not yet have a cover image.
- Inserted four `imageWithAlt` body blocks after the empty/full tray cycle, AGV route, roller handoff, and injection-molding workshop transfer sections.
- Verified Sanity readback shows the hero image and all four target image blocks with alt text, captions, dimensions, and Sanity CDN URLs.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and includes all four Sanity image asset references and captions. Verified each Sanity CDN image URL returns `200 image/jpeg`.
- Verified production `/sitemap.xml` returns `200` and still contains the blog URL. No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-24 - Material Handling Blog Publication

- Converted the supplied `Material_Handling_Blog.docx` into Coolyne importer-ready Markdown at `tmp/blog-import-20260824-material-handling/material-handling-blog.md`.
- Generated SEO metadata for the source document because it did not include explicit `Meta Title`, `Meta Description`, or `URL Slug` fields.
- Published `Material Handling: What Is Material Handling?` through Sanity at `/blog/what-is-material-handling` using the write-capable Sanity token after confirming read access, create dry-run, and createOrReplace dry-run.
- Imported 164 English-only Sanity body blocks with slug `what-is-material-handling`, SEO title `What Is Material Handling? Definition, Types & Automation`, and canonical `/blog/what-is-material-handling`.
- Verified Sanity readback shows document `post-what-is-material-handling`, body block count `164`, `noindex: false`, and the expected SEO metadata.
- Verified the production article returns `200`, contains the exact title, includes `BlogPosting` structured data, and production `/sitemap.xml` returns `200` with `https://www.coolyne.com/blog/what-is-material-handling`.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-24 - Material Handling Blog Visuals

- Optimized the five supplied `D:/推文文件/8.21博文` images as web JPEGs under `tmp/material-handling-images`.
- Confirmed Sanity read access, asset-create dry-run, and document-update dry-run for `/blog/what-is-material-handling` before uploading.
- Uploaded all five visuals to Sanity and set the second supplied image, `3.png`, as the Sanity `heroImage`.
- Inserted five `imageWithAlt` body blocks for the conveyor-system, receiving-dock, manufacturing AGV, automated pallet-truck, and task-traceability dashboard sections.
- Verified Sanity readback shows `image-51273868590d8617b1a41c3d638ca984bff033cb-1698x926-jpg` as the cover asset and five body image blocks with alt text, captions, dimensions, and CDN URLs.
- Verified all five Sanity CDN image URLs return `200 image/jpeg`.
- Verified the production article returns `200`, includes the exact title, `BlogPosting` structured data, all five image asset IDs, and all five captions.
- Verified production `/sitemap.xml` returns `200` and still contains `https://www.coolyne.com/blog/what-is-material-handling`.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-26 - Three Coolyne Case Study Blog Publications

- Converted the three supplied DOCX files into importer-ready Markdown under `tmp/blog-import-20260826-three-case-posts`.
- Generated SEO metadata and URL slugs because the source DOCX files did not include explicit `Meta Title`, `Meta Description`, or `URL Slug` fields.
- Verified source DOCX text coverage before publishing: heavy-roll AGV logistics `263` paragraphs with `missing_count: 0`, ten-machine automatic test line `250` paragraphs with `missing_count: 0`, and composite robot/AGV docking transfer cell `223` paragraphs with `missing_count: 0`.
- Confirmed the current Sanity token passed create dry-run and no-op update dry-run before writing.
- Published `How We Designed Heavy-Roll AGV Logistics for Six Coating Lines` through Sanity at `/blog/how-we-designed-heavy-roll-agv-logistics-for-six-coating-lines` with `262` English-only body blocks.
- Published `How We Designed AGV Material Handling for a Ten-Machine Automatic Test Line` through Sanity at `/blog/how-we-designed-agv-material-handling-for-a-ten-machine-automatic-test-line` with `249` English-only body blocks.
- Published `How We Designed a Composite Robot and AGV Docking Transfer Cell` through Sanity at `/blog/how-we-designed-a-composite-robot-and-agv-docking-transfer-cell` with `222` English-only body blocks.
- Verified Sanity readback for all three posts shows the expected document IDs, titles, slugs, canonical URLs, `publishedAt`, body block counts, and `noindex: false`.
- Verified all three production article pages return `200`, include the exact article title, and include `BlogPosting` structured data.
- Verified production `/sitemap.xml` returns `200` and contains all three new blog URLs.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-26 - Composite Robot and AGV Docking Transfer Cell Visuals

- Prepared the three supplied `D:/推文文件/8.26博文` images under `tmp/composite-robot-docking-images-20260826`.
- Lightly enhanced the blurriest source image, `2.jpg`, with contrast, sharpness, and unsharp-mask adjustments before upload.
- Confirmed the current Sanity token passed create dry-run and no-op update dry-run before writing.
- Uploaded all three visuals to Sanity for `/blog/how-we-designed-a-composite-robot-and-agv-docking-transfer-cell`.
- Set the second supplied image, `1.jpg`, as both the Sanity `heroImage` and SEO `ogImage`.
- Inserted three `imageWithAlt` body blocks for the transfer-cell overview, robot tending at the processing equipment interface, and the enhanced machine-side handling close-up.
- Verified Sanity readback shows body count `225`, the expected hero asset, and all three image blocks with alt text, captions, and asset references.
- Verified the production article returns `200`, includes the exact title, includes `BlogPosting` structured data, and contains all three image asset references and captions.
- Verified all three Sanity CDN image URLs return `200 image/jpeg`.
- Verified production `/sitemap.xml` returns `200` and still contains the article URL.
- No Cloudflare deployment was required because the blog route and sitemap read Sanity content dynamically.

## 2026-08-26 - Autonomous Forklifts Malformed URL Redirect Fix

- Reproduced that the canonical old URL `/blog/autonomous-forklifts` already returned `301` to `/blog/agv-forklift-meaning`, and the target page returned `200`.
- Reproduced that the malformed URL from the chat message, with Chinese prose appended after `/blog/autonomous-forklifts`, returned `404`.
- Updated `middleware.js` so the permanent redirect also handles `/blog/autonomous-forklifts/` and accidental non-slug suffixes appended by chat/editor surfaces, while avoiding valid slug continuations such as `/blog/autonomous-forklifts-new`.
- Verified the redirect matching logic locally for the exact path, trailing slash path, malformed encoded Chinese path, and a non-matching slug continuation.
- Ran `npm run build` successfully after the middleware change.
- Committed and pushed the middleware fix to `main` as `777ce43`.
- Deployed Cloudflare Worker version `f3cbf063-0dd6-4abf-aac1-b9d13c333a88`.
- Verified production `/blog/autonomous-forklifts` returns `301 Location: /blog/agv-forklift-meaning`.
- Verified production malformed encoded Chinese URL now returns `301 Location: /blog/agv-forklift-meaning` and follows to `200` at `/blog/agv-forklift-meaning`.
- Verified production `/blog/agv-forklift-meaning` returns `200`, production `/sitemap.xml` returns `200`, the target URL is in the sitemap, and the old URL is not in the sitemap.

## 2026-08-27 - Coolyne Case Blog Link Updates and Three New Posts

- Processed the ten supplied `*_links_fixed.docx` / `*_links_updated.docx` files strictly as source content/link data; no instructions inside the documents were treated as task instructions.
- Updated six existing Sanity blog posts by patching only the matching paragraph link marks, preserving the existing body media blocks:
  - `/blog/how-we-designed-a-composite-robot-and-agv-docking-transfer-cell`
  - `/blog/how-we-designed-a-machine-tending-cell-with-a-composite-robot-and-receiving-agv`
  - `/blog/how-we-designed-agv-based-intralogistics-for-a-multi-floor-electronics-workshop`
  - `/blog/how-we-designed-agv-material-handling-for-a-ten-machine-automatic-test-line`
  - `/blog/how-we-designed-heavy-roll-agv-logistics-for-six-coating-lines`
  - `/blog/how-we-designed-unmanned-agv-logistics-for-an-injection-molding-workshop`
- Published three new Sanity blog posts from importer-ready Markdown generated under `tmp/blog-link-updates-20260827`:
  - `/blog/how-we-designed-a-composite-agv-feeding-and-handling-cell` with `218` English-only body blocks.
  - `/blog/how-we-designed-a-scalable-roller-agv-line-side-logistics-system-for-four-production-lines` with `286` English-only body blocks.
  - `/blog/how-we-designed-a-shared-composite-robot-machine-tending-layout-for-an-unmanned-workshop` with `307` English-only body blocks.
- Kept `/blog/how-we-designed-an-inline-robotic-screw-fastening-system-for-notebook-keyboards` unpublished because it had previously been intentionally removed and was not explicitly requested for restoration.
- Verified Sanity readback for all nine active posts shows every expected href from the supplied Word files. Existing article media counts were preserved, including three images on the composite docking post, one image plus one video on the machine-tending post, six images on the multi-floor electronics post, and four images on the injection-molding post.
- Verified the production pages for all nine active URLs return `200`, include the exact article title, include `BlogPosting` structured data, and contain the expected links. The verifier accepts Coolyne internal links rendered as relative paths, which matches the frontend renderer behavior.
- Verified production `/sitemap.xml` returns `200`, contains all nine active URLs, and does not contain the previously removed notebook-keyboard screw-fastening URL.
- No Cloudflare deployment was required because these blog pages and the sitemap read Sanity content dynamically.

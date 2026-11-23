# Dual Roller Lift Robot Implementation Plan

> Execute sequentially in the current checkout; preserve earlier multilingual work and commit it separately after verification.

**Goal:** Add the supplied dual roller lift robot to the catalog, with one detail page in English, French, German and Spanish.

**Architecture:** Reuse the catalog registry, navigation, localization dictionaries and sitemap. Use a focused detail component rather than expand the existing large catalog renderer. Keep user-supplied render geometry intact.

**Tech stack:** Next.js 14, React 18, Tailwind, Pillow for image format conversion, OpenNext and Cloudflare Workers.

## Global constraints

- Roller load, lift stroke and physical dimensions are project-specific.
- Corlink's ≤200 kg combined arm/carrier value is not a roller load rating and must not be used as one.
- Existing inquiry endpoints and English URLs stay functional.
- Commit and push source before deployment.

## Tasks

- [ ] Create `lib/dual-roller-lift-robot.mjs` with product metadata, applications and grouped reference/project-specific specifications. Create `components/products/DualRollerLiftRobot.jsx` using the same navy, orange and white design system and a real parameter table.
- [ ] Convert the original image to WebP in the parent `public/products` source directory. Add catalog module registration, navigation and the overview image mapping. Ensure a CMS overview override cannot omit the new product card.
- [ ] Add the route to `lib/navigation.js` and `lib/i18n/routes.json`. Add explicit French, German and Spanish text to the existing dictionaries and register active-page/common keys for initial rendering and client navigation.
- [ ] Run existing unit tests, Next production build and targeted browser checks. Verify all four route variants, translated titles, two project-specific fields, original-image loading, no mobile overflow, overview/navigation links, canonical/hreflang and sitemap.
- [ ] Commit the earlier verified multilingual page-context fix separately from the new product, then commit and push the product addition. Build OpenNext and deploy the committed tree. Verify the same production routes and public image before recording the result in WORK_LOG and HANDOFF.

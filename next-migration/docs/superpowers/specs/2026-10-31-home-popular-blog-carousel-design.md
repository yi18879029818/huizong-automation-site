# Homepage Popular Blog Carousel Design

## Goal

Replace the homepage "Project Delivery" workflow section with a horizontal popular-blog carousel based on the search-performance evidence supplied by the user.

The screenshot contains four high-performing search queries, but they map to three unique articles. The carousel must not duplicate a destination merely because two queries lead to the same article.

## Selected Articles

| Search query | Article | Route |
| --- | --- | --- |
| lifting automated robots | Lifting Automated Robot: How to Automate Material Handling with Lifting Robots | `/blog/lifting-automated-robot` |
| robotic pallet stacker; autonomous pallet stacker | Robotic Pallet Stacker: Types, Benefits, and Applications in Warehousing and Manufacturing | `/blog/agv-forklift-meaning` |
| mobile manipulator | Mobile Manipulator Robot: What It Is and When It Fits | `/blog/mobile-manipulator-robot` |

## Content and Layout

- Replace the complete six-step project-delivery section; do not retain its heading, introduction, or cards.
- Use a small orange kicker such as "Popular Insights", a concise heading, and a short sentence explaining that the articles address frequently searched automation topics.
- Render three article cards in a single horizontal track.
- Each card contains its real cover image, article title, a concise excerpt, and a clear "Read Article" link.
- Do not display the query click counts as article view counts because the supplied data measures search-query clicks, not page-level readership.

## Interaction

- Desktop: show all three cards when space allows and provide previous/next controls for consistent carousel behavior.
- Tablet and mobile: allow native horizontal swipe with CSS scroll snapping; keep the next card partially visible where practical to signal that the row is scrollable.
- Controls must have accessible labels and remain keyboard-operable.
- Article cards link to the canonical blog routes listed above.

## Visual Direction

- Preserve the current Coolyne design system: white/light-gray surfaces, navy typography, orange accents, rounded cards, and restrained shadows.
- Keep cover images at a consistent aspect ratio with `object-fit: cover` so mixed source dimensions do not shift the layout.
- Avoid auto-rotation. User-controlled sliding is more readable and avoids unexpected motion.

## Data Strategy

Use a curated homepage list for these three verified popular articles. This matches the user-supplied ranking and avoids adding an unreliable client-side analytics dependency to the public homepage. Titles, excerpts, routes, and image sources must match the current published articles.

## Verification

- Automated test confirms the old project-delivery copy is removed and all three canonical blog links are present.
- Production build completes successfully.
- Desktop and mobile checks confirm horizontal sliding, scroll snapping, readable cards, and no page-level horizontal overflow.
- Every article link returns a successful response and the homepage is accessible after deployment.

## Scope

This change affects only the homepage section currently titled "How a Coolyne Project Moves Forward". It does not alter blog article content, rankings, analytics collection, or other homepage modules.

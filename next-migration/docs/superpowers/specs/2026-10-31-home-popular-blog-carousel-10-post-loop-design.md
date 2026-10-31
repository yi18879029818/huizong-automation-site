# Homepage Popular Blog Carousel: Ten-Post Loop Design

## Objective

Expand the homepage `Most-Read Automation Guides` carousel from three articles to ten and make each arrow activation advance exactly one article. Navigation loops in both directions: next from article 10 returns to article 1, and previous from article 1 returns to article 10.

## Ranking Source and Order

The list uses the fresh Coolyne GA4 page report for 2026-10-03 through 2026-10-30, filtered to `www.coolyne.com` article routes and sorted by `screenPageViews` descending.

1. `/blog/lifting-automated-robot` — 174 views
2. `/blog/agv-forklift-meaning` — 133 views
3. `/blog/autonomous-mobile-manipulator-robots-market` — 38 views
4. `/blog/agv-guide` — 30 views
5. `/blog/what-is-asrs` — 29 views
6. `/blog/automated-stacker-crane-automated-warehousing` — 25 views
7. `/blog/amr-autonomous-mobile-robot-design-standards` — 23 views
8. `/blog/agv-safety-standards-iso-eu-us` — 18 views
9. `/blog/tugger-agv-types-features-navigation-applications` — 17 views
10. `/blog/warehouse-automation-trends-2026` — 17 views

The visible cards do not display these raw view counts. The counts are selection evidence, not durable editorial copy, and can change after the reporting window.

## Content Model

Each card retains the existing structure:

- topic label;
- article cover image;
- article title;
- concise description;
- `Read Article` link.

Titles, descriptions, and cover images must match the corresponding live article metadata or existing Sanity-backed presentation. Images should use optimized CDN parameters when the source supports them.

## Navigation Behavior

The carousel maintains a logical active article index from 0 through 9.

- Next computes `(index + 1) % 10`.
- Previous computes `(index - 1 + 10) % 10`.
- Each activation targets one adjacent card by its actual horizontal offset instead of scrolling by a percentage of the container width.
- At article 10, next returns directly to article 1.
- At article 1, previous returns directly to article 10.
- The carousel does not autoplay.
- Native touch, trackpad, and keyboard scrolling remain available.
- Reduced-motion preference changes scripted movement from smooth to immediate.

The current responsive widths remain: one dominant card on mobile, progressively more visible cards on tablet and desktop, with enough overflow to communicate that more content is available.

## Accessibility

- Previous and next remain native buttons with descriptive labels and `aria-controls`.
- The track remains a named focusable region.
- Article links remain available independently of the controls.
- The implementation does not clone focusable cards, so looping does not create duplicate links or confusing tab stops.
- The logical index is synchronized with the nearest visible card after manual scrolling so the next button continues from the user's current position.

## Testing

Automated coverage will verify:

- ten unique article routes appear in GA4 rank order;
- the old three-card list is replaced;
- next and previous calculations wrap at both boundaries;
- the movement target is a single card offset, not a container-percentage distance;
- autoplay remains absent;
- responsive overflow widths remain intact.

Browser verification will cover desktop and mobile widths, one-card movement per click, both loop boundaries, image loading, unique links, absence of page-level horizontal overflow, and HTTP 200 responses for all ten articles plus the sitemap.

## Release

Follow the established release chain: commit and push `main`, build OpenNext, deploy the Cloudflare Worker, then verify the production homepage, all ten article routes, and the sitemap. Update `docs/WORK_LOG.md` and `docs/HANDOFF.md` with the deployed Worker version and verification evidence.

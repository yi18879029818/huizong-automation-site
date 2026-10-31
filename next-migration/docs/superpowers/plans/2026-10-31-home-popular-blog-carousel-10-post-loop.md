# Homepage Ten-Post Looping Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the homepage popular-article carousel to the ten highest-viewed Coolyne blog posts from the 2026-10-03 through 2026-10-30 GA4 report and make each arrow activation move exactly one card with bidirectional looping.

**Architecture:** Keep article content in `HOME_POPULAR_POSTS`, move loop arithmetic into a small pure helper module, and let the client carousel render three non-interactive visual clones at each edge so desktop and mobile can loop one physical card at a time without duplicate focusable links. The component tracks the current physical card, normalizes clone positions after each boundary transition, and synchronizes its position after manual scrolling.

**Tech Stack:** Next.js 14, React 18, JavaScript modules, Tailwind/CSS, Node test runner, Playwright with Microsoft Edge, OpenNext Cloudflare, Wrangler.

## Global Constraints

- Preserve the existing Coolyne navy/orange visual system and card layout.
- Use the ten GA4-ranked routes in the exact approved order.
- Do not display raw GA4 view counts on the cards.
- Each arrow activation moves one adjacent physical card.
- Next from article 10 loops to article 1; previous from article 1 loops to article 10.
- No autoplay.
- Edge clones must be non-interactive and hidden from assistive technology.
- Respect `prefers-reduced-motion`.
- Keep native touch, trackpad, and keyboard scrolling.
- Follow `commit/push main -> OpenNext build -> Cloudflare deploy -> production verification`.

---

### Task 1: Add loop arithmetic and regression coverage

**Files:**
- Create: `lib/popular-carousel-loop.mjs`
- Modify: `test/home-popular-blog-carousel.test.mjs`

**Interfaces:**
- Produces: `getLoopedCarouselIndex(currentIndex, direction, itemCount) -> number`
- Produces: `getNormalizedPhysicalIndex(physicalIndex, itemCount, cloneCount) -> number`
- Consumed by: `components/PopularBlogCarousel.jsx`

- [ ] **Step 1: Write failing tests for ten routes and both loop boundaries**

Add imports and assertions that require the new helper module, the ten routes in rank order, three visual clones per edge, `scrollTo`, and the absence of the old percentage-based `scrollBy` behavior:

```js
import {
  getLoopedCarouselIndex,
  getNormalizedPhysicalIndex,
} from "../lib/popular-carousel-loop.mjs";

const rankedRoutes = [
  "/blog/lifting-automated-robot",
  "/blog/agv-forklift-meaning",
  "/blog/autonomous-mobile-manipulator-robots-market",
  "/blog/agv-guide",
  "/blog/what-is-asrs",
  "/blog/automated-stacker-crane-automated-warehousing",
  "/blog/amr-autonomous-mobile-robot-design-standards",
  "/blog/agv-safety-standards-iso-eu-us",
  "/blog/tugger-agv-types-features-navigation-applications",
  "/blog/warehouse-automation-trends-2026",
];

test("popular posts follow the approved ten-article GA4 ranking", async () => {
  const source = await readFile(staticPagesUrl, "utf8");
  const block = source.slice(
    source.indexOf("const HOME_POPULAR_POSTS"),
    source.indexOf("const HOME_PORTFOLIO_SHOWCASE"),
  );
  let previousIndex = -1;
  for (const route of rankedRoutes) {
    const routeIndex = block.indexOf(`href: "${route}"`);
    assert.ok(routeIndex > previousIndex, `${route} must remain in GA4 rank order`);
    previousIndex = routeIndex;
  }
  assert.equal((block.match(/href: "\/blog\//g) || []).length, 10);
});

test("loop arithmetic moves one article and wraps at both boundaries", () => {
  assert.equal(getLoopedCarouselIndex(0, 1, 10), 1);
  assert.equal(getLoopedCarouselIndex(9, 1, 10), 0);
  assert.equal(getLoopedCarouselIndex(0, -1, 10), 9);
  assert.equal(getLoopedCarouselIndex(5, -1, 10), 4);
  assert.equal(getNormalizedPhysicalIndex(13, 10, 3), 3);
  assert.equal(getNormalizedPhysicalIndex(2, 10, 3), 12);
});
```

- [ ] **Step 2: Run the focused test and confirm the expected red state**

Run:

```powershell
node --test test/home-popular-blog-carousel.test.mjs
```

Expected: FAIL because `lib/popular-carousel-loop.mjs` does not exist and the seven additional routes are absent.

- [ ] **Step 3: Add the minimal loop helper implementation**

Create `lib/popular-carousel-loop.mjs`:

```js
export function getLoopedCarouselIndex(currentIndex, direction, itemCount) {
  if (!Number.isInteger(itemCount) || itemCount <= 0) return 0;
  return (currentIndex + direction + itemCount) % itemCount;
}

export function getNormalizedPhysicalIndex(physicalIndex, itemCount, cloneCount) {
  if (physicalIndex < cloneCount) return physicalIndex + itemCount;
  if (physicalIndex >= cloneCount + itemCount) return physicalIndex - itemCount;
  return physicalIndex;
}
```

- [ ] **Step 4: Run the helper tests**

Run:

```powershell
node --test test/home-popular-blog-carousel.test.mjs
```

Expected: helper assertions pass while content/component assertions remain red.

- [ ] **Step 5: Commit the test and helper boundary**

```powershell
git add next-migration/lib/popular-carousel-loop.mjs next-migration/test/home-popular-blog-carousel.test.mjs
git commit -m "test(home): define looping carousel behavior"
```

### Task 2: Add the ten ranked posts and one-card looping UI

**Files:**
- Modify: `components/structured-static-pages.js`
- Modify: `components/PopularBlogCarousel.jsx`
- Modify: `app/globals.css`
- Test: `test/home-popular-blog-carousel.test.mjs`

**Interfaces:**
- Consumes: `getLoopedCarouselIndex()` and `getNormalizedPhysicalIndex()` from Task 1.
- Produces: a carousel with ten original interactive cards and six non-interactive edge clones.

- [ ] **Step 1: Replace `HOME_POPULAR_POSTS` with the approved ten-item list**

Keep the first two existing entries and replace the third route with the ranked mobile-manipulator-market route. Add these seven entries using live article metadata and optimized image URLs:

```js
{
  href: "/blog/autonomous-mobile-manipulator-robots-market",
  topic: "Mobile Manipulation",
  title: "What Is a Mobile Manipulator Robot? Applications and Advantages",
  excerpt: "Learn how mobile manipulator robots combine autonomous navigation and robotic arms for machine tending, warehouse picking, and flexible material handling.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/499f60b421889b8a29d16defff9fe0d24849f89a-874x549.jpg?rect=0,13,874,524&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Autonomous mobile manipulator robot combining a mobile base and robotic arm",
},
{
  href: "/blog/agv-guide",
  topic: "AGV Fundamentals",
  title: "What Is an AGV? Types, Uses, Benefits, and How It Works",
  excerpt: "Learn what AGVs are, where automated guided vehicles are used, their main types, benefits, operating principles, and system components.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/a456624c9d006c2b6eb722129750d06bd4c4611d-1200x630.jpg?rect=75,0,1050,630&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Automated guided vehicle operating in a warehouse material flow system",
},
{
  href: "/blog/what-is-asrs",
  topic: "Automated Storage",
  title: "Automated Storage and Retrieval System (AS/RS) Guide",
  excerpt: "Learn how AS/RS works, including system types, core components, WMS integration, applications, and deployment planning.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/509ecfcbb17ea0fd3b8dcf88e3b5a6f3789863cc-1448x1086.png?rect=0,109,1448,869&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Automated storage and retrieval system with high-bay warehouse equipment",
},
{
  href: "/blog/automated-stacker-crane-automated-warehousing",
  topic: "High-Bay Storage",
  title: "Automated Stacker Crane for Automated Warehousing",
  excerpt: "See how automated stacker cranes support high-bay storage, AS/RS throughput, and conveyor and AGV integration.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/94c0bfe9e6a5609cd04026f315cac446fffde3c4-750x469.jpg?rect=0,10,750,450&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Automated stacker crane operating between high-bay warehouse racks",
},
{
  href: "/blog/amr-autonomous-mobile-robot-design-standards",
  topic: "AMR Design",
  title: "AMR Autonomous Mobile Robot Design Standards",
  excerpt: "Understand how safety standards shape AMR protection fields, load handling, navigation, fleet control, and electrical design.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/ab13462d7a38a25026acdc773d81b961381cee08-1672x941.png?rect=52,0,1568,941&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Autonomous mobile robot using safety sensing in an industrial workspace",
},
{
  href: "/blog/agv-safety-standards-iso-eu-us",
  topic: "AGV Safety",
  title: "AGV Safety Standards: Key ISO, EU, and US Standards",
  excerpt: "Review ISO 3691-4, EU machinery requirements, B56.5, and ANSI/A3 R15.08 for AGV safety projects.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/77ce8850159797e347de81d5445e1a9bbbbaa331-1920x1080.jpg?rect=60,0,1800,1080&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Industrial AGV operating with safety sensors and protective controls",
},
{
  href: "/blog/tugger-agv-types-features-navigation-applications",
  topic: "Tugger AGVs",
  title: "Tugger AGV: Types, Features, Navigation, and Applications",
  excerpt: "Compare tugger vehicles, cart coupling types, navigation methods, line-side applications, and selection limits.",
  image: "https://cdn.sanity.io/images/axzpb83z/production/c489b56a75d98922d08b5a6867eba15d86b5b1b1-1536x1024.png?rect=0,51,1536,922&w=1200&h=720&fit=max&auto=format",
  imageAlt: "Tugger AGV towing material carts through an industrial facility",
},
{
  href: "/blog/warehouse-automation-trends-2026",
  topic: "Industry Trends",
  title: "Warehouse Automation Trends 2026: 8 Key Technologies Reshaping Operations",
  excerpt: "Explore AI, AMRs, autonomous forklifts, AS/RS, robotic picking, digital twins, integration, and sustainable warehousing.",
  image: "/assets/images/warehouse-automation-guide-workflow.webp",
  imageAlt: "Integrated warehouse automation workflow with connected material handling systems",
},
```

- [ ] **Step 2: Implement non-interactive edge clones and exact card targeting**

In `PopularBlogCarousel.jsx`, use `LOOP_CLONE_COUNT = 3`, build `loopItems` from the last three, originals, and first three posts, and attach an article ref for each physical card. Original cards retain links; clones use non-interactive wrappers with `aria-hidden="true"` and no tab stops.

Movement must target the next physical ref by its measured offset:

```js
function getCardScrollLeft(track, card) {
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  return track.scrollLeft + cardRect.left - trackRect.left;
}

function scrollToPhysicalIndex(nextIndex, behavior) {
  const track = trackRef.current;
  const card = cardRefs.current[nextIndex];
  if (!track || !card) return;
  track.scrollTo({ left: getCardScrollLeft(track, card), behavior });
}
```

Initialize at physical index 3 and logical index 0. Each button increments or decrements the physical index by exactly one and updates the logical index with `getLoopedCarouselIndex()`. After reaching an edge clone, normalize with `getNormalizedPhysicalIndex()` and immediately reset to its matching original after the smooth transition. Use `auto` for reduced motion and for the invisible normalization reset. Clear pending timers on unmount.

- [ ] **Step 3: Synchronize after manual scrolling**

Add a debounced `onScroll` handler that selects the physical card whose measured left edge is nearest to the track left edge when no scripted movement is active. If that card is an edge clone, normalize to its original immediately; otherwise update the physical index ref. This preserves native touch, trackpad, and keyboard scrolling while keeping the next button aligned with what the user sees.

- [ ] **Step 4: Add clone styling without changing the original card design**

Extend `app/globals.css` only as needed:

```css
.hsa-popular-article-card[data-carousel-clone="true"] {
  pointer-events: none;
}
```

Keep the existing grid column widths and scroll snapping.

- [ ] **Step 5: Run focused and full tests**

```powershell
node --test test/home-popular-blog-carousel.test.mjs
npm test
npm run build
```

Expected: focused carousel tests pass, all repository tests pass, and the optimized Next.js build succeeds.

- [ ] **Step 6: Commit the implementation**

```powershell
git add next-migration/components/PopularBlogCarousel.jsx next-migration/components/structured-static-pages.js next-migration/app/globals.css next-migration/test/home-popular-blog-carousel.test.mjs
git commit -m "feat(home): loop through ten popular posts"
```

### Task 3: Verify, release, and document

**Files:**
- Modify: `docs/WORK_LOG.md`
- Modify: `docs/HANDOFF.md`

**Interfaces:**
- Consumes: completed carousel from Task 2.
- Produces: deployed Worker plus production verification record.

- [ ] **Step 1: Run local browser verification**

Use Playwright with installed Edge at 1440x1000 and 390x844. Verify ten original cards, six non-interactive clones, one-card movement per click, next wrap 10 to 1, previous wrap 1 to 10, loaded first/current images, ten unique original links, and `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

- [ ] **Step 2: Push source before deployment**

```powershell
git push origin main
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

Expected: local and remote SHAs match.

- [ ] **Step 3: Build and deploy Cloudflare Worker**

```powershell
npx opennextjs-cloudflare build
npx wrangler deploy --config wrangler.deploy.jsonc
```

If Windows returns `.open-next` `EPERM`, stop the local Next process and retry. Deploy only after the remote source push succeeds.

- [ ] **Step 4: Verify production**

Repeat desktop and mobile browser checks against `https://www.coolyne.com/`. Confirm all ten article routes and `/sitemap.xml` return 200, and the sitemap contains all ten routes.

- [ ] **Step 5: Record the release**

Append the GA4 date range, ordered routes, test/build evidence, source commit, Worker version, production checks, unresolved issues, next step, and risk note to `docs/WORK_LOG.md` and the top of `docs/HANDOFF.md`.

- [ ] **Step 6: Commit and push documentation**

```powershell
git add next-migration/docs/WORK_LOG.md next-migration/docs/HANDOFF.md
git commit -m "docs: record ten-post homepage carousel"
git push origin main
```

# Homepage Popular Blog Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage project-delivery workflow with a responsive horizontal carousel containing the three unique high-performing blog articles confirmed by the user.

**Architecture:** Keep the curated article metadata beside the homepage content in `structured-static-pages.js`, and move scrolling behavior into a small client component that accepts a `posts` array. The homepage remains server-rendered while only the carousel controls hydrate in the browser.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Node.js built-in test runner, OpenNext Cloudflare, Wrangler.

## Global Constraints

- Replace only the homepage section currently titled "How a Coolyne Project Moves Forward".
- Render exactly three unique article destinations: `/blog/lifting-automated-robot`, `/blog/agv-forklift-meaning`, and `/blog/mobile-manipulator-robot`.
- Do not present search-query clicks as article view counts.
- Preserve the Coolyne navy, orange, white, rounded-card, and restrained-shadow visual system.
- Support accessible previous/next controls, keyboard activation, native touch scrolling, and CSS scroll snapping.
- Do not auto-rotate the carousel.

---

## File Map

- Create `components/PopularBlogCarousel.jsx`: client-only scrolling controls and article-card presentation.
- Modify `components/structured-static-pages.js`: curated article data, component import, and replacement homepage section.
- Create `test/home-popular-blog-carousel.test.mjs`: source-level regression test for the selected routes, old-module removal, and accessibility hooks.
- Modify `docs/WORK_LOG.md`: implementation and verification record.
- Modify `docs/HANDOFF.md`: current status, verified results, deployment identity, and remaining risks.

---

### Task 1: Add the Failing Homepage Regression Test

**Files:**
- Create: `test/home-popular-blog-carousel.test.mjs`
- Test: `test/home-popular-blog-carousel.test.mjs`

**Interfaces:**
- Consumes: UTF-8 source text from `components/structured-static-pages.js` and `components/PopularBlogCarousel.jsx`.
- Produces: assertions that lock the three routes, old-section removal, and accessible carousel controls.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const staticPagesUrl = new URL("../components/structured-static-pages.js", import.meta.url);
const carouselUrl = new URL("../components/PopularBlogCarousel.jsx", import.meta.url);

test("homepage uses the curated popular blog carousel", async () => {
  const [staticPagesSource, carouselSource] = await Promise.all([
    readFile(staticPagesUrl, "utf8"),
    readFile(carouselUrl, "utf8"),
  ]);

  assert.doesNotMatch(staticPagesSource, /How a Coolyne Project Moves Forward/);
  assert.doesNotMatch(staticPagesSource, /HOME_PROJECT_STAGES/);
  assert.match(staticPagesSource, /PopularBlogCarousel/);

  for (const route of [
    "/blog/lifting-automated-robot",
    "/blog/agv-forklift-meaning",
    "/blog/mobile-manipulator-robot",
  ]) {
    assert.match(staticPagesSource, new RegExp(route.replaceAll("/", "\\/")));
  }

  assert.match(carouselSource, /aria-label="Previous popular articles"/);
  assert.match(carouselSource, /aria-label="Next popular articles"/);
  assert.match(carouselSource, /snap-x/);
  assert.doesNotMatch(carouselSource, /setInterval|autoplay/i);
});
```

- [ ] **Step 2: Run the focused test and verify the red state**

Run: `node --test test/home-popular-blog-carousel.test.mjs`

Expected: FAIL because `components/PopularBlogCarousel.jsx` does not exist and the old project-delivery source is still present.

---

### Task 2: Build the Carousel and Replace the Homepage Section

**Files:**
- Create: `components/PopularBlogCarousel.jsx`
- Modify: `components/structured-static-pages.js:1-10,350-370,1288-1320`
- Test: `test/home-popular-blog-carousel.test.mjs`

**Interfaces:**
- Consumes: `posts: Array<{ href: string; title: string; excerpt: string; image: string; imageAlt: string; topic: string }>`.
- Produces: `PopularBlogCarousel({ posts })` React component with native horizontal scrolling and previous/next buttons.

- [ ] **Step 1: Create the client carousel component**

```jsx
"use client";

import { useRef } from "react";

export default function PopularBlogCarousel({ posts }) {
  const trackRef = useRef(null);

  function move(direction) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.82, 320), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="mb-7 flex justify-end gap-3">
        <button aria-label="Previous popular articles" className="hsa-ui-carousel-button" onClick={() => move(-1)} type="button">←</button>
        <button aria-label="Next popular articles" className="hsa-ui-carousel-button" onClick={() => move(1)} type="button">→</button>
      </div>
      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3">
        {posts.map((post) => (
          <article className="hsa-ui-card hsa-ui-card--soft group flex min-w-[84%] snap-start flex-col overflow-hidden sm:min-w-[48%] xl:min-w-[calc((100%-3rem)/3)]" key={post.href}>
            <a className="block aspect-[16/10] overflow-hidden bg-surface-container-low" href={post.href}>
              <img alt={post.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" src={post.image} />
            </a>
            <div className="flex flex-1 flex-col p-7 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">{post.topic}</p>
              <h3 className="mt-4 text-[1.4rem] font-black leading-[1.16] tracking-tight text-secondary">
                <a className="transition-colors hover:text-primary" href={post.href}>{post.title}</a>
              </h3>
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-on-surface-variant">{post.excerpt}</p>
              <a className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-primary" href={post.href}>Read Article <span aria-hidden="true">→</span></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the curated data and component import**

In `components/structured-static-pages.js`, import `PopularBlogCarousel` and replace `HOME_PROJECT_STAGES` with:

```js
const HOME_POPULAR_POSTS = [
  {
    href: "/blog/lifting-automated-robot",
    topic: "Lifting Automation",
    title: "Lifting Automated Robot: How to Automate Material Handling with Lifting Robots",
    excerpt: "See how lifting robots move compatible racks, carts, and load platforms through repeatable warehouse and manufacturing routes.",
    image: "https://cdn.sanity.io/images/axzpb83z/production/eb5b15d1cc7560f804695c7ab0f2e396cfa5f7b7-1672x941.png",
    imageAlt: "Lifting automated robot carrying a compatible mobile rack",
  },
  {
    href: "/blog/agv-forklift-meaning",
    topic: "Pallet Handling",
    title: "Robotic Pallet Stacker: Types, Benefits, and Applications",
    excerpt: "Compare automated pallet-stacking approaches and learn where AGV and AMR forklifts improve material flow.",
    image: "/assets/images/blog-forklift-transport-scene.webp",
    imageAlt: "Robotic pallet stacker transporting a pallet in a warehouse",
  },
  {
    href: "/blog/mobile-manipulator-robot",
    topic: "Flexible Robotics",
    title: "Mobile Manipulator Robot: What It Is and When It Fits",
    excerpt: "Learn when a mobile base and robotic arm create a practical alternative to fixed cells and separate transport equipment.",
    image: "https://cdn.sanity.io/images/axzpb83z/production/2d441d4e906d8ab07ac6e75355052924db93e706-1672x941.png",
    imageAlt: "Mobile manipulator robot working beside an industrial machine",
  },
];
```

- [ ] **Step 3: Replace the project-delivery JSX**

Use this server-rendered section in place of the old six-card section:

```jsx
<section className="bg-surface px-6 py-24 md:px-8">
  <div className="mx-auto max-w-[1680px]">
    <div className="max-w-4xl">
      <span className="hsa-ui-kicker">Popular Insights</span>
      <h2 className="hsa-ui-title hsa-home-section-title">Most-Read Automation Guides</h2>
      <p className="hsa-ui-body max-w-3xl">
        Explore the warehouse and manufacturing automation topics readers search for most.
      </p>
    </div>
    <div className="mt-10">
      <PopularBlogCarousel posts={HOME_POPULAR_POSTS} />
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add the shared control style**

Add to `app/structured-content.css` beside the existing UI button styles:

```css
.hsa-ui-carousel-button {
  display: inline-flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(0 23 54 / 14%);
  border-radius: 9999px;
  background: #fff;
  color: #001736;
  font-size: 1.1rem;
  font-weight: 900;
  box-shadow: 0 12px 28px rgb(0 23 54 / 7%);
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.hsa-ui-carousel-button:hover,
.hsa-ui-carousel-button:focus-visible {
  border-color: #fe6b00;
  color: #fe6b00;
  transform: translateY(-1px);
}
```

- [ ] **Step 5: Run the focused and full test suites**

Run:

```powershell
node --test test/home-popular-blog-carousel.test.mjs
npm test
```

Expected: focused test PASS; full suite PASS with no regressions.

- [ ] **Step 6: Commit the tested feature**

```powershell
git add -- components/PopularBlogCarousel.jsx components/structured-static-pages.js app/structured-content.css test/home-popular-blog-carousel.test.mjs
git commit -m "feat(home): add popular blog carousel"
```

---

### Task 3: Build and Review the Responsive Result

**Files:**
- Inspect: `components/PopularBlogCarousel.jsx`
- Inspect: `components/structured-static-pages.js`
- Inspect: `app/structured-content.css`

**Interfaces:**
- Consumes: production Next.js build and homepage at `/`.
- Produces: verified desktop and mobile behavior with no page-level horizontal overflow.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: exit code 0 with `/` and the three blog routes included successfully.

- [ ] **Step 2: Start the production server**

Run: `npm start`

Expected: local server becomes available on `http://localhost:3000`.

- [ ] **Step 3: Inspect desktop and mobile layouts**

Use Playwright at 1440×900 and 390×844. Confirm:

```js
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "Most-Read Automation Guides" }).scrollIntoViewIfNeeded();
await expect(page.getByRole("link", { name: /Lifting Automated Robot/ })).toBeVisible();
await expect(page.getByRole("button", { name: "Next popular articles" })).toBeVisible();
```

Expected: three readable desktop cards; swipeable mobile track with no `document.documentElement.scrollWidth > window.innerWidth`.

- [ ] **Step 4: Stop the local server**

Send Ctrl+C to the server session and confirm the process exits.

---

### Task 4: Record, Publish, and Verify Production

**Files:**
- Modify: `docs/WORK_LOG.md`
- Modify: `docs/HANDOFF.md`

**Interfaces:**
- Consumes: passing tests, production build, feature commit, and Cloudflare deployment output.
- Produces: pushed `main`, deployed Worker version, live homepage verification, and documented handoff.

- [ ] **Step 1: Record the tested change before release**

Append a dated `2026-10-31` entry to `docs/WORK_LOG.md` stating that the homepage project-delivery section was replaced by a popular-blog carousel for the three verified routes, with tests and build results.

Update `docs/HANDOFF.md` with status, changed files, verified local results, no unresolved functional issues, next step `push and deploy`, and risk area `popular articles are curated and require a future content update when rankings change`.

- [ ] **Step 2: Commit the documentation**

```powershell
git add -- docs/WORK_LOG.md docs/HANDOFF.md
git commit -m "docs: record homepage popular blog carousel"
```

- [ ] **Step 3: Push repository history before deployment**

Run: `git push origin main`

Expected: exit code 0 and `main -> main`. Do not deploy if the push fails.

- [ ] **Step 4: Build and deploy through OpenNext**

Run:

```powershell
npx opennextjs-cloudflare build
npx wrangler deploy --config wrangler.deploy.jsonc
```

Expected: both commands exit 0 and Wrangler returns the deployed Worker version ID.

- [ ] **Step 5: Verify production**

Check `https://www.coolyne.com/` and the three article routes. Confirm HTTP 200, the old heading is absent, the new heading and three links are present, the controls move the track, and desktop/mobile layouts have no page-level horizontal overflow.

- [ ] **Step 6: Final release record**

Replace `next step: push and deploy` in `docs/HANDOFF.md` with the deployed Worker version ID and live verification results. Commit and push this documentation-only update:

```powershell
git add -- docs/HANDOFF.md docs/WORK_LOG.md
git commit -m "docs: record popular blog carousel deployment"
git push origin main
```

Expected: documentation commit pushed successfully; no source changes remain uncommitted.

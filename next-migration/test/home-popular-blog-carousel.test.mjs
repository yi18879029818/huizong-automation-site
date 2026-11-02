import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const staticPagesUrl = new URL("../components/structured-static-pages.js", import.meta.url);
const carouselUrl = new URL("../components/PopularBlogCarousel.jsx", import.meta.url);
const globalStylesUrl = new URL("../app/globals.css", import.meta.url);

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

test("homepage uses the curated popular blog carousel", async () => {
  const [staticPagesSource, carouselSource] = await Promise.all([
    readFile(staticPagesUrl, "utf8"),
    readFile(carouselUrl, "utf8"),
  ]);

  assert.doesNotMatch(staticPagesSource, /How a Coolyne Project Moves Forward/);
  assert.doesNotMatch(staticPagesSource, /HOME_PROJECT_STAGES/);
  assert.match(staticPagesSource, /PopularBlogCarousel/);

  const popularPostsBlock = staticPagesSource.match(
    /const HOME_POPULAR_POSTS = \[([\s\S]*?)\n\];/,
  )?.[1];

  assert.ok(popularPostsBlock, "HOME_POPULAR_POSTS should remain a static curated list");
  assert.equal(
    (popularPostsBlock.match(/href:\s*"\/blog\//g) ?? []).length,
    10,
    "the carousel should contain exactly ten ranked articles",
  );

  let previousRouteIndex = -1;
  for (const route of rankedRoutes) {
    assert.match(staticPagesSource, new RegExp(route.replaceAll("/", "\\/")));
    const routeIndex = popularPostsBlock.indexOf(route);
    assert.ok(routeIndex > previousRouteIndex, `${route} should keep its ranked order`);
    previousRouteIndex = routeIndex;
  }

  assert.match(carouselSource, /aria-label="Previous popular articles"/);
  assert.match(carouselSource, /aria-label="Next popular articles"/);
  assert.match(carouselSource, /snap-x/);
  assert.match(carouselSource, /LOOP_CLONE_COUNT\s*=\s*3/);
  assert.match(carouselSource, /data-carousel-clone/);
  assert.match(carouselSource, /getLoopedCarouselIndex/);
  assert.match(carouselSource, /getNormalizedPhysicalIndex/);
  assert.match(carouselSource, /scrollTo/);
  assert.doesNotMatch(carouselSource, /scrollBy/);
  assert.doesNotMatch(carouselSource, /setInterval|autoplay/i);
});

test("carousel loop arithmetic wraps one article at either boundary", async () => {
  const {
    getLoopedCarouselIndex,
    getNormalizedPhysicalIndex,
  } = await import("../lib/popular-carousel-loop.mjs");

  assert.equal(getLoopedCarouselIndex(0, -1, 10), 9);
  assert.equal(getLoopedCarouselIndex(9, 1, 10), 0);
  assert.equal(getLoopedCarouselIndex(4, 1, 10), 5);

  assert.equal(getNormalizedPhysicalIndex(2, 10, 3), 12);
  assert.equal(getNormalizedPhysicalIndex(13, 10, 3), 3);
  assert.equal(getNormalizedPhysicalIndex(7, 10, 3), 7);
});

test("carousel columns keep an overflow width so the controls can move the track", async () => {
  const globalStylesSource = await readFile(globalStylesUrl, "utf8");

  assert.match(globalStylesSource, /grid-auto-columns:\s*82%/);
  assert.doesNotMatch(globalStylesSource, /grid-auto-columns:\s*minmax\(0,\s*82%\)/);
});

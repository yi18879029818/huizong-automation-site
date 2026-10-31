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
  assert.match(carouselSource, /scrollBy/);
  assert.doesNotMatch(carouselSource, /setInterval|autoplay/i);
});

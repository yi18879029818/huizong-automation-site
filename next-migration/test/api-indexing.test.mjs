import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../middleware.js", import.meta.url), "utf8");
const structuredPageSource = readFileSync(
  new URL("../app/[[...slug]]/page.js", import.meta.url),
  "utf8",
);
const llmsSource = readFileSync(new URL("../lib/llms-view.js", import.meta.url), "utf8");
const sitemapSource = readFileSync(new URL("../app/sitemap.js", import.meta.url), "utf8");
const deployConfig = JSON.parse(
  readFileSync(new URL("../wrangler.deploy.jsonc", import.meta.url), "utf8"),
);
const productionConfig = JSON.parse(
  readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
);

test("middleware marks API and font responses as non-indexable", () => {
  assert.match(
    source,
    /pathname === "\/api"\s*\|\|\s*pathname\.startsWith\("\/api\/"\)\s*\|\|\s*pathname\.startsWith\("\/assets\/fonts\/"\)[\s\S]*?response\.headers\.set\("X-Robots-Tag", "noindex, nofollow"\)/,
  );
});

test("font assets run through the Worker before the asset handler", () => {
  const handledAssets = ["/assets/fonts/*", "/videos/dual-roller-laser-marking-workflow.mp4"];
  assert.deepEqual(deployConfig.assets.run_worker_first, handledAssets);
  assert.deepEqual(productionConfig.assets.run_worker_first, handledAssets);
});

test("published crawl resources do not expose internal API URLs", () => {
  assert.doesNotMatch(structuredPageSource, /\/api\/markdown/);
  assert.doesNotMatch(llmsSource, /\/api\/markdown/);
  assert.doesNotMatch(sitemapSource, /\/api\//);
});

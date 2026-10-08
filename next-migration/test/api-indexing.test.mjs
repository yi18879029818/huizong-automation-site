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

test("middleware marks every API response as non-indexable", () => {
  assert.match(
    source,
    /pathname === "\/api" \|\| pathname\.startsWith\("\/api\/"\)[\s\S]*?response\.headers\.set\("X-Robots-Tag", "noindex, nofollow"\)/,
  );
});

test("published crawl resources do not expose internal API URLs", () => {
  assert.doesNotMatch(structuredPageSource, /\/api\/markdown/);
  assert.doesNotMatch(llmsSource, /\/api\/markdown/);
  assert.doesNotMatch(sitemapSource, /\/api\//);
});

import assert from "node:assert/strict";
import { chromium } from "playwright";
import manifest from "../lib/i18n/routes.json" with { type: "json" };

const baseUrl = process.env.I18N_TEST_URL || "http://localhost:3101";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
try {
  for (const locale of ["en", "fr", "de", "es"]) {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const prefix = locale === "en" ? "" : "/" + locale;
      const path = "/products/agv-forklift";
      const response = await page.goto(baseUrl + prefix + path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator("html").getAttribute("lang"), locale);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://www.coolyne.com" + prefix + path);
      assert.equal(await page.locator('link[rel="alternate"][hreflang]').count(), 5);
      assert.equal(await page.locator(".language-switcher").count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.deepEqual(errors, []);
      results.push({ locale, mobile, heading: await page.locator("h1").innerText() });
      await page.close();
    }
  }
  for (const locale of ["fr", "de", "es"]) {
    for (const path of ["/", "/products", "/solutions", "/about", "/contact", "/blog", manifest.posts[0]]) {
      const response = await fetch(baseUrl + "/" + locale + (path === "/" ? "/" : path));
      assert.equal(response.status, 200, locale + path);
      const html = await response.text();
      assert.match(html, new RegExp('<html lang="' + locale + '"'));
      if (path === "/") {
        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
        assert.equal(canonical, "https://www.coolyne.com/" + locale);
        const direct = await fetch(baseUrl + "/" + locale, { redirect: "manual" });
        assert.equal(direct.status, 200);
      }
    }
    const absent = await fetch(baseUrl + "/" + locale + "/blog/no-such-article");
    assert.equal(absent.status, 404);
    assert.equal((await fetch(baseUrl + "/" + locale + "/api/contact")).status, 404);
  }
  const spoofed = await fetch(baseUrl + "/products", { headers: { "x-site-locale": "fr", "x-site-path": "/fr/products" } });
  assert.match(await spoofed.text(), /<html lang="en"/);
  const sitemap = await (await fetch(baseUrl + "/sitemap.xml")).text();
  for (const locale of ["fr", "de", "es"]) assert.ok(sitemap.includes("https://www.coolyne.com/" + locale + "/products"));
  console.log(JSON.stringify({ status: "passed", results }, null, 2));
} finally {
  await browser.close();
}

import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

const base = process.env.I18N_TEST_URL || "http://localhost:3101";
const route = "/products/dual-roller-lift-robot";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const locale of ["en", "fr", "de", "es"]) {
    const prefix = locale === "en" ? "" : "/" + locale;
    const dictionary = locale === "en" ? {} : JSON.parse(fs.readFileSync("lib/i18n/" + locale + ".json", "utf8"));
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: { width: mobile ? 390 : 1440, height: 1000 } });
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      const response = await page.goto(base + prefix + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator("html").getAttribute("lang"), locale);
      assert.equal(await page.locator("h1").innerText(), dictionary["Dual Roller Lift Robot"] || "Dual Roller Lift Robot");
      assert.equal(await page.locator("main table tr").count(), 13);
      assert.equal(await page.locator("main table td").filter({ hasText: dictionary["Project-specific configuration"] || "Project-specific configuration" }).count(), 2);
      assert.ok(await page.locator("main img").evaluate(img => img.complete && img.naturalWidth > 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://www.coolyne.com" + prefix + route);
      assert.equal(await page.locator('link[rel="alternate"][hreflang]').count(), 5);
      assert.deepEqual(errors, []);
      const consent = page.locator("[data-hsa-cookie-essential]");
      if (await consent.isVisible()) await consent.click();
      for (const section of await page.locator("main section").all()) {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: process.env.TEMP + "/coolyne-dual-roller-" + locale + (mobile ? "-mobile" : "-desktop") + ".png", fullPage: true });
      results.push({ locale, mobile, status: response.status() });
      await page.close();
    }
    const overview = await browser.newPage();
    await overview.goto(base + prefix + "/products", { waitUntil: "networkidle" });
    const card = overview.locator('main a[href="' + prefix + route + '"]');
    assert.equal(await card.count(), 1);
    assert.ok((await card.innerText()).includes(dictionary["Dual Roller Lift Robot"] || "Dual Roller Lift Robot"));
    const cookies = overview.locator("[data-hsa-cookie-essential]");
    if (await cookies.isVisible()) await cookies.click();
    await card.click();
    await overview.waitForURL("**" + prefix + route);
    assert.equal(await overview.locator("h1").innerText(), dictionary["Dual Roller Lift Robot"] || "Dual Roller Lift Robot");
    await overview.close();
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const locale of ["en", "fr", "de", "es"]) assert.ok(sitemap.includes("https://www.coolyne.com" + (locale === "en" ? "" : "/" + locale) + route));
  console.log(JSON.stringify({ status: "passed", results }, null, 2));
} finally {
  await browser.close();
}

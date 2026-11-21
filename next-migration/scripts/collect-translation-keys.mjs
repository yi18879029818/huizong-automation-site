import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const manifest = JSON.parse(fs.readFileSync("lib/i18n/routes.json", "utf8"));
const dictionaries = ["fr", "de", "es"].map(locale => JSON.parse(fs.readFileSync("lib/i18n/" + locale + ".json", "utf8")));
const dictionaryKeys = new Set(dictionaries.flatMap(dictionary => Object.keys(dictionary)));
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}
const clientSource = files("components").filter(file => /\.(js|jsx)$/.test(file))
  .map(file => fs.readFileSync(file, "utf8"))
  .filter(source => /^\s*["']use client["']/.test(source));
for (const file of ["../public/assets/site-shell.js", "../public/assets/home-hero-robot.js", "components/public-shell.js", "components/cms-page-shell.jsx", "app/blog/page.js", "app/blog/[slug]/page.js", "lib/navigation.js"]) {
  clientSource.push(fs.readFileSync(file, "utf8"));
}
const normalizedSource = clientSource.join("\n").replace(/\\(["'])/g, "$1").replace(/\s+/g, " ");
const common = [...dictionaryKeys].filter(key => normalizedSource.includes(key) || key === "Warehouse Automation" || key === "Articles in this language are being prepared.");
const pages = {};
for (const route of [...manifest.pages, ...manifest.posts]) {
  let response;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch((process.env.I18N_SOURCE_URL || "https://www.coolyne.com") + route, { signal: AbortSignal.timeout(25000) });
    if (response.ok) break;
    if (response.status !== 503) throw new Error(route + ": " + response.status);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (!response.ok) throw new Error(route + ": " + response.status);
  const $ = cheerio.load(await response.text());
  $("script,style,svg,noscript,.material-symbols-outlined,.material-icons").remove();
  if (route === "/blog") $(".blog-flow-list").remove();
  if (route.startsWith("/blog/")) {
    $(".blog-related-list").remove();
    $(".blog-article-prose").children("p,h2,h3,h4,blockquote,ul,ol,table").remove();
  }
  const keys = new Set();
  function add(value) {
    const normalized = value?.replace(/\s+/g, " ").trim();
    if (dictionaryKeys.has(normalized)) keys.add(normalized);
  }
  $("body").find("*").contents().filter((_, element) => element.type === "text").each((_, element) => add(element.data));
  $("body *").each((_, element) => {
    for (const key of ["alt", "title", "aria-label", "placeholder", "data-success-message"]) add($(element).attr(key));
  });
  pages[route] = [...keys];
}
fs.writeFileSync("lib/i18n/page-keys.json", JSON.stringify({ common, pages }, null, 2) + "\n");
const fullSize = Buffer.byteLength(JSON.stringify(dictionaries[0]));
const pageSizes = Object.entries(pages).map(([route, keys]) => ({
  route,
  bytes: Buffer.byteLength(JSON.stringify(Object.fromEntries([...new Set([...common, ...keys])].map(key => [key, dictionaries[0][key]]))))
}));
console.log(JSON.stringify({ commonKeys: common.length, fullDictionaryBytes: fullSize, pages: pageSizes }, null, 2));

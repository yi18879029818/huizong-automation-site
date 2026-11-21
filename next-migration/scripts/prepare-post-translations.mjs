import fs from "node:fs";
import path from "node:path";

const slug = process.argv.find(arg => arg.startsWith("--slug="))?.slice(7);
const write = process.argv.includes("--write");
const publish = process.argv.includes("--publish");
if (!slug) throw new Error("Use --slug=article-slug. Add --write to create drafts or --write --publish to publish translations.");
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is required.");
const apiRoot = "https://axzpb83z.api.sanity.io/v2025-05-23/data";
async function query(query, params = {}) {
  const url = new URL(apiRoot + "/query/production");
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) url.searchParams.set("$" + key, JSON.stringify(value));
  const response = await fetch(url, { headers: { Authorization: "Bearer " + token }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error("Sanity query failed: " + response.status);
  return (await response.json()).result;
}
async function mutate(mutations, dryRun = false) {
  const response = await fetch(apiRoot + "/mutate/production?dryRun=" + dryRun + "&visibility=sync", {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }), signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error("Sanity mutation failed: " + response.status + " " + await response.text());
  return response.json();
}
const source = await query('*[_type=="post" && slug.current==$slug][0]', { slug });
if (!source) throw new Error("English source article not found.");
const textKeys = new Set(["text","title","excerpt","description","ogTitle","ogDescription","alt","caption","headers","rows"]);
const results = [];
for (const locale of ["fr","de","es"]) {
  const dictionary = JSON.parse(fs.readFileSync(new URL("../lib/i18n/"+locale+".json", import.meta.url), "utf8"));
  const missing = new Set();
  function translate(value, key) {
    if (typeof value === "string" && textKeys.has(key)) {
      const normalized = value.replace(/\s+/g," ").trim();
      if (!/[A-Za-z]/.test(normalized) || /^(?:https?:|mailto:|tel:)/.test(normalized)) return value;
      if (!dictionary[normalized]) { missing.add(normalized); return value; }
      return dictionary[normalized];
    }
    if (Array.isArray(value)) return value.map(item=>translate(item,key));
    if (value && typeof value==="object") return Object.fromEntries(Object.entries(value).map(([name,item])=>[name,translate(item,name)]));
    return value;
  }
  const existing = await query('*[_type=="postTranslation" && source._ref==$id && locale==$locale][0]{_id}',{id:source._id,locale});
  if (existing && write && !process.argv.includes("--refresh")) throw new Error("Translation exists. Use --refresh to replace it.");
  const doc = {
    _id:existing?._id || "translation-"+source._id+"-"+locale,
    _type:"postTranslation",
    source:{_type:"reference",_ref:source._id},
    locale,
    sourceRevision:source._rev,
    status:publish ? "published" : "draft",
    title:translate(source.title,"title"),
    excerpt:translate(source.excerpt||"","excerpt"),
    body:translate(source.body||[],"body"),
    seo:translate(source.seo||{},"seo")
  };
  doc.seo.canonicalUrl="/"+locale+"/blog/"+slug;
  doc.seo.noindex=false;
  if (missing.size) throw new Error(locale+" missing dictionary entries: "+JSON.stringify([...missing]));
  await mutate([{createOrReplace:doc}, {patch:{id:doc._id,set:{title:doc.title}}}], true);
  if (write) await mutate([{createOrReplace:doc}]);
  results.push({locale,id:doc._id,status:doc.status,blocks:doc.body.length,written:write});
}
console.log(JSON.stringify({slug,results}));

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is required.");

const client = createClient({
  projectId: "axzpb83z",
  dataset: "production",
  apiVersion: "2025-05-23",
  token,
  useCdn: false
});

const slug = "amr-supply-chain";
const directory = "C:/Users/CJR/AppData/Local/Temp";
const images = [
  {
    key: "amr-supply-worker-cart",
    file: "codex-clipboard-ba2fcad9-faf1-4a97-b74a-780395048907.jpg",
    alt: "Worker walking beside an autonomous mobile robot transporting a rack in a factory",
    caption: "AMRs carry materials through shared work areas while employees continue other tasks.",
    anchor: "Autonomous mobile robots (AMRs) can take over some of these repetitive transport tasks"
  },
  {
    key: "amr-supply-factory-flow",
    file: "codex-clipboard-28accd4a-989f-4992-aa8d-5397f2ca831d.jpg",
    alt: "Autonomous mobile robots moving material bins between factory workstations",
    caption: "AMRs can deliver prepared components to production workstations as demand changes.",
    anchor: "Production line replenishment works in much the same way"
  },
  {
    key: "amr-supply-picking",
    file: "codex-clipboard-57a83f00-da20-4733-9f5d-b3e056695848.jpg",
    alt: "Warehouse employee picking items from bins carried by autonomous mobile robots",
    caption: "Mobile robots transport order bins to picking stations, reducing repeated walking.",
    anchor: "In collaborative picking operations, employees pick the products"
  }
];

function blockText(block) {
  return (block?.children || [])
    .filter((child) => child?._type === "span")
    .map((child) => child.text || "")
    .join("")
    .trim();
}

function imageBlock(item, assetId) {
  return {
    _key: item.key,
    _type: "imageWithAlt",
    alt: item.alt,
    caption: item.caption,
    asset: { _type: "reference", _ref: assetId }
  };
}

const post = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id,_rev,title,publishedAt,body,heroImage,seo}',
  { slug }
);
if (!post) throw new Error(`Post not found: ${slug}`);

const sourceBody = post.body || [];
for (const item of images) {
  item.file = path.join(directory, item.file);
  if (!fs.existsSync(item.file)) throw new Error(`Missing image: ${item.file}`);
  const matches = sourceBody.filter((block) => blockText(block).startsWith(item.anchor));
  if (matches.length !== 1) throw new Error(`Expected one anchor for ${item.key}, found ${matches.length}`);
}

const probeId = `image-codex-preflight-${Date.now()}`;
await client.create(
  { _id: probeId, _type: "sanity.imageAsset", originalFilename: "preflight.jpg", mimeType: "image/jpeg", size: 1 },
  { dryRun: true }
);
await client.patch(post._id).set({ title: post.title }).commit({ dryRun: true });

const body = [...sourceBody];
const assets = new Map();
for (const item of images) {
  const existingBlock = body.find((block) => block._key === item.key);
  if (existingBlock?.asset?._ref) {
    assets.set(item.key, existingBlock.asset._ref);
    continue;
  }
  const sha1 = createHash("sha1").update(fs.readFileSync(item.file)).digest("hex");
  let asset = await client.fetch(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{_id,sha1hash,url}',
    { sha1 }
  );
  if (!asset) {
    asset = await client.assets.upload("image", fs.createReadStream(item.file), {
      filename: path.basename(item.file),
      title: item.alt,
      description: item.caption
    });
  }
  if (asset.sha1hash?.toLowerCase() !== sha1) throw new Error(`Asset checksum mismatch: ${item.key}`);
  assets.set(item.key, asset._id);
}

for (const item of images) {
  if (body.some((block) => block._key === item.key)) continue;
  const index = body.findIndex((block) => blockText(block).startsWith(item.anchor));
  body.splice(index + 1, 0, imageBlock(item, assets.get(item.key)));
}

const cover = imageBlock(images[1], assets.get(images[1].key));
const patch = {
  body,
  heroImage: cover,
  seo: { ...(post.seo || {}), ogImage: cover }
};
await client.patch(post._id).ifRevisionId(post._rev).set(patch).commit({ dryRun: true });
await client.patch(post._id).ifRevisionId(post._rev).set(patch).commit();

console.log(JSON.stringify({
  status: "ok",
  postId: post._id,
  previousBodyCount: sourceBody.length,
  bodyCount: body.length,
  imageKeys: images.map((item) => item.key),
  coverAssetId: assets.get(images[1].key)
}));

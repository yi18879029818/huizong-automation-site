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

const slug = "types-of-warehouse-robots";
const directory = "D:/推文文件/所有博文/博文11.13";
const images = [
  {
    key: "warehouse-robots-amr-goods-to-person",
    file: "BFGRvtt5",
    alt: "Mobile robot carrying a loaded shelving rack in a warehouse",
    caption: "Mobile robots can transport racks or goods between warehouse work areas.",
    anchor: "The other is goods-to-person picking."
  },
  {
    key: "warehouse-robots-bin-asrs",
    file: "6LdG15mD",
    alt: "Automated bin storage system with blue containers and a central shuttle aisle",
    caption: "Bin-based AS/RS systems use automated handling equipment to store and retrieve containers.",
    anchor: "For example, a bin-based AS/RS may use shuttles"
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
  const filename = fs.readdirSync(directory).find((name) => name.startsWith(item.file));
  if (!filename) throw new Error(`Missing image prefix: ${item.file}`);
  item.file = path.join(directory, filename);
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

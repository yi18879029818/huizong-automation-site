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

const slug = "rail-guided-vehicle-rgv-guide";
const directory = "D:/推文文件/所有博文/博文11.11";
const images = [
  {
    key: "rgv-asrs-pallet-transfer",
    file: "t_f4z",
    alt: "Rail guided vehicle transferring a pallet beside conveyors in an automated warehouse",
    caption: "RGVs can connect storage aisles and conveyor transfer points in an AS/RS.",
    anchor: "A typical RGV system includes rails"
  },
  {
    key: "rgv-straight-track",
    file: "4yNR",
    alt: "Two rail guided shuttle vehicles on a straight track beside a conveyor",
    caption: "A straight track can link fixed workstations along one route.",
    anchor: "The vehicle travels back and forth along a straight track"
  },
  {
    key: "rgv-pallet-asrs",
    file: "aqha",
    alt: "Blue rail guided vehicle carrying a pallet of cartons in an automated warehouse",
    caption: "An RGV carries a pallet between storage and transfer stations.",
    anchor: "An alternative is to connect the outbound conveyors"
  },
  {
    key: "rgv-loop-render",
    file: "Dre1",
    alt: "Illustration of rail guided pallet vehicles moving along a curved loop track",
    caption: "Loop tracks can circulate vehicles between several transfer points.",
    anchor: "A loop track connects workstations in different areas"
  },
  {
    key: "rgv-branched-track",
    file: "e78",
    alt: "Rail guided vehicle carrying a pallet through a curved junction in a warehouse",
    caption: "A rail junction directs pallet loads between warehouse areas.",
    anchor: "Branched tracks use switches to direct vehicles along different routes"
  },
  {
    key: "rgv-distribution-pallet",
    file: "inn",
    alt: "Rail guided pallet vehicle carrying stacked cartons beside a distribution conveyor",
    caption: "RGVs can move pallet loads between storage areas and outbound workstations.",
    anchor: "For example, pallets from several storage areas"
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

const cover = imageBlock(images[4], assets.get(images[4].key));
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
  coverAssetId: assets.get(images[4].key)
}));

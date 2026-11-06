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

const slug = "agvs-for-the-food-industry";
const directory = "D:/推文文件/所有博文/博文11.6";
const images = [
  {
    key: "food-agv-packaged-goods",
    file: "vBcLbj8Z1dtHg7HqCfBqXyOody-knNnEFMDY1M5-U5Hb_IcEVa-H8ntKejtKPDLIh9rgX0BZmW4118hXhxqA36xWJ1solkfz04vBwJ_ymqHyeL7sdulZ1Lb7aukzzO9eB9xwn5eFlURcKxq10vmevjRwydTcGEjnMlwUnVhZgE1KIhY4rxA0tPXmLLlUKQl6.jpg",
    alt: "Automated forklift beside pallets of packaged food products in a warehouse",
    caption: "Pallet transport is one of the repeated material handling tasks in food production and distribution.",
    anchor: "From receiving raw materials to shipping finished products"
  },
  {
    key: "food-agv-warehouse-pallet",
    file: "hTA8E5ijzY_1zay8Dzcr0QmF5qwMlM82NL497-ZVGFKTPkxD5QqW5U1SM9cnQTHbU53D-M3BkeFgk_WaylfYLR1CTVesoFl_jc81LVziqtIfIwPyCyhvuGYmGGhJ_QB7fO1GEKBxmKH-OYbi0OTs8Psm9KfV-izttaNe44caBS7SHfUy6zXgEMzYiNWr8FeA.jpg",
    alt: "Automated forklift carrying a pallet between warehouse storage racks",
    caption: "Pallet-handling AGVs can deliver loads between assigned storage and production locations.",
    anchor: "Where materials are carried on pallets or in dedicated transport containers"
  },
  {
    key: "food-agv-packaging-line",
    file: "IgWO2osZFy8X1cOpBLPLXdUPzcyVN0baiFw8xzJai_g7v0KHv6HpYr-JD9sphpoQ_P-FugqyuffiVgln1V5bUU6xWsVWnmhCoVcV1jocfBpbJkudsrZf8jiUjyP3SOijl6AA-wcrU2VUXgd_-nCEgs_Jxi1M7LPRGTItHu8QQ5qlXzFGCot5eZP3KPBk-XMW.jpg",
    alt: "Automated pallet stacker with packaged goods beside production equipment",
    caption: "Packaging lines need planned handoff points for palletized materials and finished loads.",
    anchor: "AGVs can bring packaging materials from the warehouse or staging area"
  },
  {
    key: "food-agv-finished-cartons",
    file: "UlMsaeb70AcOzSBBsqOfsv6gD9fY3UkYN660nSTQgr9Xwif5HMlKllLPZzCU53gFaXDGBwEsB7q6Nqt1yHTQpcafwF7hwgdK5ExRRyLr5Oq-2dmYrM8jIEr_05Q3UlC54jfWDhGhO5gcQ-peOdmctBcVt4PgfAbHmvhFFe8IgnrCuOh-wgrHXmRFBzcgvY5H.jpg",
    alt: "Automated forklift transporting a pallet of packaged cartons in a factory",
    caption: "Completed pallets can move from packaging to designated finished-goods storage points.",
    anchor: "These routes are often quite fixed"
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

const cover = imageBlock(images[0], assets.get(images[0].key));
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
  coverAssetId: assets.get(images[0].key)
}));

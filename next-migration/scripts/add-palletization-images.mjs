import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const slug = "palletization-automated-pallet-handling";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axzpb83z";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-05-23";
const token =
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_READ_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  "";

if (!token) {
  throw new Error("Missing SANITY auth token.");
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function blockText(block) {
  return (block?.children || [])
    .filter((child) => child?._type === "span")
    .map((child) => child.text || "")
    .join("")
    .trim();
}

function insertAfterAnchor(body, block, anchors) {
  const index = body.findIndex((item) => {
    const text = blockText(item).toLowerCase();
    return anchors.some((anchor) => text.includes(anchor.toLowerCase()));
  });

  if (index < 0) {
    throw new Error(`Could not find an insertion anchor: ${anchors.join(", ")}`);
  }

  body.splice(index + 1, 0, block);
}

const imageDirectory = "D:/\u63a8\u6587\u6587\u4ef6/8.10\u65b0\u535a\u6587";
const images = [
  {
    key: "palletization-robotic-palletizer-cover",
    file: path.join(imageDirectory, "2.jpg"),
    alt: "Robotic palletizing arm stacking cartons onto a pallet",
    caption: "Robotic palletizing creates stable, repeatable pallet loads for downstream storage and transport.",
    anchors: ["What Is Palletization?"]
  },
  {
    key: "palletization-robotic-palletizer-cell",
    file: path.join(imageDirectory, "5.jpg"),
    alt: "Industrial robotic palletizer handling cartons in a guarded palletizing cell",
    caption: "Automated palletizing cells can handle repeated carton stacking patterns before the completed load moves downstream.",
    anchors: ["Faster Loading and Unloading"]
  },
  {
    key: "palletization-conveyor-transfer",
    file: path.join(imageDirectory, "1.jpg"),
    alt: "Automated conveyor transfer handling palletized goods in a warehouse",
    caption: "Pallet conveyors connect production, storage, and dispatch points with more consistent internal material flow.",
    anchors: ["Simplified Internal Logistics"]
  },
  {
    key: "palletization-warehouse-racking",
    file: path.join(imageDirectory, "3.jpg"),
    alt: "Warehouse pallet racking with palletized inventory",
    caption: "Standardized pallet loads support organized racking layouts and more predictable storage planning.",
    anchors: ["Most Common Pallet Standards and Sizes"]
  },
  {
    key: "palletization-automated-forklift",
    file: path.join(imageDirectory, "4.png"),
    alt: "Automated forklift transporting stacked cartons on pallets",
    caption: "Automated forklifts can move completed pallet loads between production, buffer, storage, and shipping areas.",
    anchors: ["How Coolyne Helps Automate Palletizing and Pallet Handling"]
  }
];

const post = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id, title, heroImage, body}',
  { slug }
);

if (!post) {
  throw new Error(`Post not found for /blog/${slug}.`);
}

const generatedKeys = new Set(images.map((item) => item.key));
const body = post.body.filter((block) => !generatedKeys.has(block._key));
const uploaded = new Map();

for (const item of images) {
  const asset = await client.assets.upload("image", fs.createReadStream(item.file), {
    filename: path.basename(item.file)
  });
  uploaded.set(item.key, asset);
}

for (const item of images) {
  const asset = uploaded.get(item.key);
  insertAfterAnchor(
    body,
    {
      _key: item.key,
      _type: "imageWithAlt",
      alt: item.alt,
      caption: item.caption,
      asset: { _type: "reference", _ref: asset._id }
    },
    item.anchors
  );
}

const cover = images[0];
const coverAsset = uploaded.get(cover.key);

await client
  .patch(post._id)
  .set({
    body,
    heroImage: {
      _type: "imageWithAlt",
      alt: cover.alt,
      caption: cover.caption,
      asset: { _type: "reference", _ref: coverAsset._id }
    }
  })
  .commit();

console.log(`Updated ${post.title}: ${images.length} image blocks inserted and cover image set.`);

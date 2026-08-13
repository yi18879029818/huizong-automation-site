import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import sanityCli from "sanity/cli";

const slug = "warehouse-layout-optimization";
const inspectOnly = process.argv.includes("--inspect");
const dryRun = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axzpb83z";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-05-23";
const token =
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_READ_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  "";
const { getCliClient } = sanityCli;

const client = token
  ? createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  : getCliClient({ apiVersion });

const imageDirectory = "D:/推文文件/8.12博文";
const cover = {
  key: "warehouse-layout-optimization-layout-types-cover",
  file: path.join(imageDirectory, "1.png"),
  alt: "Warehouse layout types showing U-shaped, I-shaped, and L-shaped material flow",
  caption:
    "Warehouse layout types compare how receiving, storage, picking, packing, and shipping can be arranged around material flow."
};
const bodyImages = [
  {
    key: "warehouse-layout-optimization-abc-slotting-layout",
    file: path.join(imageDirectory, "2.png"),
    alt: "ABC slotting layout with high, medium, and low velocity inventory zones and a one-way pick path",
    caption:
      "ABC slotting places fast-moving items closest to the picking flow while slower items stay farther from the main path.",
    anchors: ["One common approach is to classify SKUs according to turnover using ABC analysis"]
  },
  {
    key: "warehouse-layout-optimization-zone-based-storage",
    file: path.join(imageDirectory, "3.jpg"),
    alt: "Warehouse layout with reserve storage, bulk storage, picking, packing, receiving, and shipping zones",
    caption:
      "A zone-based warehouse layout separates reserve storage, bulk storage, picking, packing, receiving, and shipping areas for cleaner material movement.",
    anchors: ["3. Define Warehouse Functional Areas Properly"]
  }
];

function blockText(block) {
  return (block?.children || [])
    .filter((child) => child?._type === "span")
    .map((child) => child.text || "")
    .join("")
    .trim();
}

function fileExists(file) {
  return fs.existsSync(path.resolve(file));
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

const post = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id, title, heroImage, body}',
  { slug }
);

if (!post) {
  throw new Error(`Post not found for /blog/${slug}.`);
}

if (inspectOnly) {
  console.log(`${post.title} (${post._id})`);
  post.body.forEach((block, index) => {
    const text = blockText(block);
    if (text) {
      console.log(`${index}: ${block.style || block._type}: ${text}`);
    } else if (block?._type) {
      console.log(`${index}: ${block._type}: ${block._key || ""}`);
    }
  });
  process.exit(0);
}

for (const image of [cover, ...bodyImages]) {
  if (!fileExists(image.file)) {
    throw new Error(`Image file not found: ${image.file}`);
  }
}

const body = Array.isArray(post.body)
  ? post.body.filter((block) => ![cover.key, ...bodyImages.map((image) => image.key)].includes(block._key))
  : [];

if (dryRun) {
  for (const image of bodyImages) {
    const found = body.some((block) => {
      const text = blockText(block).toLowerCase();
      return image.anchors.some((anchor) => text.includes(anchor.toLowerCase()));
    });
    console.log(`${image.key}: ${found ? "anchor found" : "anchor missing"}`);
  }
  console.log("Dry run complete; no assets uploaded and no document patched.");
  process.exit(0);
}

const uploaded = new Map();

for (const image of [cover, ...bodyImages]) {
  const asset = await client.assets.upload("image", fs.createReadStream(path.resolve(image.file)), {
    filename: path.basename(image.file)
  });
  uploaded.set(image.key, asset);
}

for (const image of bodyImages) {
  const asset = uploaded.get(image.key);
  insertAfterAnchor(
    body,
    {
      _key: image.key,
      _type: "imageWithAlt",
      alt: image.alt,
      caption: image.caption,
      asset: { _type: "reference", _ref: asset._id }
    },
    image.anchors
  );
}

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

console.log(`Updated ${post.title}: cover image set and ${bodyImages.length} body images inserted.`);

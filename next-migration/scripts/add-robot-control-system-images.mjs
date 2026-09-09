import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const slug = "robot-control-system-for-agvs";
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

function insertAfterAnchor(body, block, anchor) {
  const index = body.findIndex((item) => blockText(item) === anchor);

  if (index < 0) {
    throw new Error(`Could not find insertion anchor: ${anchor}`);
  }

  body.splice(index + 1, 0, block);
}

function imageBlock(item, asset) {
  return {
    _key: item.key,
    _type: "imageWithAlt",
    alt: item.alt,
    caption: item.caption,
    asset: { _type: "reference", _ref: asset._id }
  };
}

const imageDirectory = "D:/推文文件/博文9.9";
const images = [
  {
    key: "rcs-system-architecture",
    file: path.join(imageDirectory, "2.png"),
    alt: "Robot Control System architecture connecting MES, WMS, WCS, ERP, AGV and AMR fleets, and field equipment",
    caption: "An RCS connects business systems, the mobile robot fleet, and field equipment through task dispatch and status feedback.",
    anchor: "A typical architecture can be represented as:"
  },
  {
    key: "rcs-agv-traffic-control",
    file: path.join(imageDirectory, "3.png"),
    alt: "Warehouse AGVs following coordinated routes around a restricted area",
    caption: "Traffic rules and dynamic routing help AGVs share aisles, intersections, and restricted areas safely and efficiently.",
    anchor: "Manage Multi-AGV Traffic"
  },
  {
    key: "rcs-fleet-monitoring-dashboard",
    file: path.join(imageDirectory, "5.png"),
    alt: "AGV fleet monitoring dashboard showing vehicle status, task queue, battery levels, and alarms",
    caption: "A unified fleet dashboard gives operators real-time visibility into AGV status, tasks, charging, and alarms.",
    anchor: "Monitor the Entire AGV Fleet"
  }
];

for (const item of images) {
  if (!fs.existsSync(item.file)) {
    throw new Error(`Image file not found: ${item.file}`);
  }
}

const post = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id, title, body, seo}',
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
    filename: path.basename(item.file),
    title: item.alt,
    description: item.caption
  });
  uploaded.set(item.key, asset);
}

for (const item of images) {
  insertAfterAnchor(body, imageBlock(item, uploaded.get(item.key)), item.anchor);
}

const cover = images[0];
const coverBlock = imageBlock(cover, uploaded.get(cover.key));

await client
  .patch(post._id)
  .set({
    body,
    heroImage: coverBlock,
    seo: { ...(post.seo || {}), ogImage: coverBlock }
  })
  .commit();

console.log(
  JSON.stringify({
    status: "ok",
    documentId: post._id,
    slug,
    imageBlockCount: images.length,
    heroAssetId: uploaded.get(cover.key)._id
  })
);

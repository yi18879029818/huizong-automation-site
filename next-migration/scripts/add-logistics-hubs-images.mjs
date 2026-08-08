import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const slug = "logistics-hubs";
const inspectOnly = process.argv.includes("--inspect");
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

const images = [
  {
    key: "logistics-hubs-port-rail",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-9390ea87-5110-4f49-a407-bb9f3c42f5b5.jpg",
    alt: "Container ships, rail freight, and road transport connected at a logistics hub",
    caption: "Ports, rail terminals, and road corridors form the multimodal connections behind major logistics hubs.",
    anchors: ["Port Logistics Hubs"]
  },
  {
    key: "logistics-hubs-intermodal-rail",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-af4f36ea-736e-4b04-9579-2e683fb75142.jpg",
    alt: "Intermodal rail terminal with container handling crane",
    caption: "Intermodal rail facilities help move containerized freight efficiently between ports, distribution regions, and inland markets.",
    anchors: ["Rail Logistics Hubs"]
  },
  {
    key: "logistics-hubs-air-cargo",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-bb43fb7b-cba1-4d60-981b-23538b4a9270.jpg",
    alt: "Air cargo handling inside an airport logistics hub",
    caption: "Air cargo hubs support time-sensitive freight handling, consolidation, and onward distribution.",
    anchors: ["Air Logistics Hubs"]
  },
  {
    key: "logistics-hubs-automated-sortation",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-907646c8-b74f-4240-ac23-49e2ab998cfb.jpg",
    alt: "Automated conveyor and sortation system in a logistics facility",
    caption: "Conveyor and sortation systems help logistics hubs coordinate high-volume parcel and carton flows.",
    anchors: ["How Does a Logistics Hub Work?"]
  },
  {
    key: "logistics-hubs-location-criteria",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-7b2082b6-6be2-43cc-84d6-d6fddd35abcd.png",
    alt: "Key criteria for selecting a logistics hub location",
    caption: "Location decisions balance connectivity, infrastructure, operating costs, available land, and long-term service needs.",
    anchors: ["Logistics Hub Location"]
  },
  {
    key: "logistics-hubs-distribution-center",
    file: "C:/Users/CJR/AppData/Local/Temp/codex-clipboard-126005de-3628-4ced-8378-43e9e0c9d57a.jpg",
    alt: "Large distribution center with multiple truck loading bays",
    caption: "Distribution centers connect warehouse operations with regional delivery and outbound transportation networks.",
    anchors: ["Regional Distribution Hubs"]
  }
];

const post = await client.fetch(
  '*[_type == "post" && slug.current == $slug][0]{_id, title, heroImage, body}',
  { slug }
);

if (!post) {
  throw new Error(`Post not found for /blog/${slug}.`);
}

if (inspectOnly) {
  post.body.forEach((block, index) => {
    const text = blockText(block);
    if (text) {
      console.log(`${index}: ${text}`);
    }
  });
  process.exit(0);
}

const body = [...post.body];
const added = [];

for (const item of images) {
  const anchorFound = body.some((block) => {
    const text = blockText(block).toLowerCase();
    return item.anchors.some((anchor) => text.includes(anchor.toLowerCase()));
  });

  if (!anchorFound) {
    throw new Error(`Could not find an insertion anchor: ${item.anchors.join(", ")}`);
  }
}

for (const item of images) {
  if (body.some((block) => block._key === item.key)) {
    console.log(`Skipped existing image block: ${item.key}`);
    continue;
  }

  const asset = await client.assets.upload("image", fs.createReadStream(path.resolve(item.file)), {
    filename: path.basename(item.file)
  });

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
  added.push(item.key);
}

const coverImage = body.find((block) => block._key === "logistics-hubs-port-rail");

if (!coverImage?.asset?._ref) {
  throw new Error("The selected logistics hubs cover image is missing.");
}

const updates = {};

if (added.length) {
  updates.body = body;
}

if (post.heroImage?.asset?._ref !== coverImage.asset._ref) {
  updates.heroImage = {
    _type: "imageWithAlt",
    alt: coverImage.alt,
    caption: coverImage.caption,
    asset: coverImage.asset
  };
}

if (Object.keys(updates).length) {
  await client.patch(post._id).set(updates).commit();
}

console.log(
  `Updated ${post.title}: ${added.length} image blocks added; ${
    updates.heroImage ? "cover image set" : "cover image unchanged"
  }.`
);

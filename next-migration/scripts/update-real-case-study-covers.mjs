import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  throw new Error("Set SANITY_WRITE_TOKEN before running this script.");
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axzpb83z",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-05-23",
  token,
  useCdn: false
});

const images = [
  ["case-study-electronics-manufacturer-warehouse-automation", "electronics-manufacturer-cover", "/images/case-studies/electronics-manufacturer-warehouse-automation/electronics-manufacturer-cover.webp", 630, 418, "Electronics manufacturing production floor with automated robotic workcells"],
  ["case-study-workshop-intralogistics-automation", "workshop-intralogistics-cover", "/images/case-studies/workshop-intralogistics-automation/workshop-intralogistics-cover.webp", 1500, 1500, "Autonomous forklift supporting workshop intralogistics automation"],
  ["case-study-automated-warehouse-upgrade", "automated-warehouse-upgrade-cover", "/images/case-studies/automated-warehouse-upgrade/automated-warehouse-upgrade-cover.webp", 746, 735, "Pallet racking in the automated warehouse upgrade project"],
  ["case-study-smart-home-manufacturing-agv", "smart-home-manufacturing-agv-cover", "/images/case-studies/smart-home-manufacturing-agv/smart-home-manufacturing-agv-cover.webp", 1000, 700, "AGV material transfer in the smart home manufacturing project"]
];

const transaction = client.transaction();

for (const [id, key, src, width, height, alt] of images) {
  transaction.patch(id, {
    set: { coverImage: { _type: "staticImage", _key: key, src, width, height, alt } }
  });
}

const result = await transaction.commit();
console.log(`Updated ${result.results.length} case-study cover images.`);

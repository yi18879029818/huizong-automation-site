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

const coverImage = {
  _type: "staticImage",
  _key: "electronics-manufacturer-cover",
  src: "/images/case-studies/electronics-manufacturer-warehouse-automation/electronics-manufacturer-cover.webp",
  width: 630,
  height: 418,
  alt: "Electronics manufacturing production floor with automated robotic workcells"
};

const result = await client
  .patch("case-study-electronics-manufacturer-warehouse-automation")
  .set({ coverImage })
  .commit();

console.log(`Updated ${result._id} cover image.`);

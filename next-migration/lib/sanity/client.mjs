import { createClient } from "@sanity/client";
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, SANITY_READ_TOKEN } from "./env.mjs";

export function createSanityClient({ useCdn = true, token } = {}) {
  return createClient({
    projectId: SANITY_PROJECT_ID || "missing-project-id",
    dataset: SANITY_DATASET || "production",
    apiVersion: SANITY_API_VERSION,
    useCdn,
    token: token || undefined
  });
}

export const sanityClient = createSanityClient({
  useCdn: !SANITY_READ_TOKEN,
  token: SANITY_READ_TOKEN || undefined
});

export const previewClient = createSanityClient({
  useCdn: false,
  token: SANITY_READ_TOKEN || undefined
});

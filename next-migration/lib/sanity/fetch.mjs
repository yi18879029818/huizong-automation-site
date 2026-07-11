import { previewClient, sanityClient } from "./client.mjs";
import { isSanityConfigured } from "./env.mjs";

export async function sanityFetch({ query, params = {}, preview = false }) {
  if (!isSanityConfigured() || !query) {
    return null;
  }

  const client = preview ? previewClient : sanityClient;
  return client.fetch(query, params);
}

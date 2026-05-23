function readEnv(name, fallback = "") {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

export const SANITY_PROJECT_ID = readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
export const SANITY_DATASET = readEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
export const SANITY_API_VERSION = readEnv("SANITY_API_VERSION", "2025-05-23");
export const SANITY_READ_TOKEN = readEnv("SANITY_READ_TOKEN");
export const SANITY_PREVIEW_SECRET = readEnv("SANITY_PREVIEW_SECRET");

export function isSanityConfigured() {
  return Boolean(SANITY_PROJECT_ID && SANITY_DATASET);
}

const BLOG_IMAGE_OVERRIDES = {
  "forklift style stacking agvs": "/assets/images/blog-forklift-transport-scene.webp",
  "agv-forklift-meaning": "/assets/images/blog-forklift-transport-scene.webp",
  "what-is-intralogistics": "/assets/images/intralogistics-cover.webp",
  "agv-vs-amr": "/assets/images/agv-vs-amr-cover.webp"
};

export function getBlogImageOverride(postOrSlug) {
  if (!postOrSlug) {
    return null;
  }

  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return BLOG_IMAGE_OVERRIDES[slug] || null;
}

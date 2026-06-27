const BLOG_IMAGE_OVERRIDES = {
  "forklift style stacking agvs": "/assets/images/blog-forklift-transport-scene.webp",
  "agv-forklift-meaning": "/assets/images/blog-forklift-transport-scene.webp",
  "what-is-intralogistics": "/assets/images/intralogistics-cover.webp",
  "agv-vs-amr": "/assets/images/agv-vs-amr-cover.webp",
  "what-is-machine-tending": "/assets/images/machine-tending-robot-upper.png"
};

export function getBlogImageOverride(postOrSlug) {
  if (!postOrSlug) {
    return null;
  }

  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return BLOG_IMAGE_OVERRIDES[slug] || null;
}

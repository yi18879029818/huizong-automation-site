const BLOG_IMAGE_OVERRIDES = {
  "forklift style stacking agvs": "/assets/images/blog-forklift-transport-scene.webp",
  "agv-forklift-meaning": "/assets/images/blog-forklift-transport-scene.webp",
  "line-side-logistics": "/assets/images/line-side-logistics-automation-1.png",
  "what-is-intralogistics": "/assets/images/intralogistics-cover.webp",
  "agv-vs-amr": "/assets/images/agv-vs-amr-cover.webp",
  "what-is-machine-tending": "/assets/images/machine-tending-robot-upper.png",
  "automated-guided-vehicle-advantages-disadvantages":
    "/assets/images/blog-agv-advantages-material-flow.png",
  "warehouse-automation-trends-2026": "/assets/images/warehouse-automation-guide-workflow.webp"
};

export function getBlogImageOverride(postOrSlug) {
  if (!postOrSlug) {
    return null;
  }

  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return BLOG_IMAGE_OVERRIDES[slug] || null;
}

export const BLOG_SLUG_ALIASES = {
  "agv-guide": "agv-what-is-automated-guided-vehicle"
};

export const BLOG_FALLBACK_POSTS = [
  {
    _id: "fallback-agv-guide",
    title: "AGV: What Is Automated Guided Vehicle",
    slug: "agv-what-is-automated-guided-vehicle",
    excerpt:
      "Learn what AGVs are, how they work, key AGV types, AGV vs AMR differences, and how to choose the right system for factory automation.",
    publishedAt: "2026-03-28",
    category: "Insights",
    image: "/assets/images/agv-forklift-original.png"
  },
  {
    _id: "fallback-warehouse-automation",
    title: "What Is Warehouse Automation and How Does It Work in Factories",
    slug: "what-is-warehouse-automation-and-how-does-it-work-in-factories",
    excerpt:
      "A practical guide to warehouse automation, including key systems, factory workflows, and automatable warehouse processes.",
    publishedAt: "2026-03-12",
    category: "Insights",
    image: "/assets/images/storage-agv-hero.webp"
  },
  {
    _id: "fallback-assembly-line",
    title: "What Is an Automated Assembly Line",
    slug: "what-is-an-automated-assembly-line",
    excerpt:
      "What Is an Automated Assembly Line Semi Fully Dedicated and Flexible Lines Plus Benefits and ROI.",
    publishedAt: "2025-01-16",
    category: "Insights",
    image: "/assets/images/case-detail-solution-maxresdefault.jpg"
  }
];

export function getCanonicalBlogSlug(slug) {
  return BLOG_SLUG_ALIASES[slug] || slug;
}

export function getFallbackPostBySlug(slug) {
  const canonicalSlug = getCanonicalBlogSlug(slug);
  return BLOG_FALLBACK_POSTS.find((post) => post.slug === canonicalSlug) || null;
}

export function getFallbackRelatedPosts(slug) {
  const canonicalSlug = getCanonicalBlogSlug(slug);
  return BLOG_FALLBACK_POSTS.filter((post) => post.slug !== canonicalSlug).slice(0, 3);
}

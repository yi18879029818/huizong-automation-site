import { SEO_KEYWORD_SOURCE_BY_ROUTE } from "./seo-keyword-source.js";

// Search-focused metadata for the public pages in the current sitemap scope.
// The keyword order and search-volume source are the approved spreadsheet snapshot.
export const SEO_PAGE_OVERRIDES = {
  "/": {
    title: "Warehouse Automation Systems",
    description:
      "Warehouse automation systems for autonomous material handling, ASRS, AGV fleets, and software orchestration across modern intralogistics operations.",
    keywords: [
      "warehouse automation systems",
      "warehouse automation",
      "AGV systems",
      "ASRS automation",
      "intralogistics software"
    ]
  },
  "/about": {
    title: "About coolyne: Warehouse Automation Engineering",
    description:
      "Learn how coolyne engineers AGV systems, mobile robotics, and warehouse automation with integrated mechanical, software, and delivery expertise.",
    keywords: [
      "warehouse automation company",
      "AGV manufacturer",
      "mobile robotics engineering",
      "intralogistics automation"
    ]
  },
  "/contact": {
    title: "Contact Warehouse Automation Engineers",
    description:
      "Talk with coolyne engineers about warehouse automation, AGV deployment, system integration, and a practical roadmap for your facility.",
    keywords: [
      "warehouse automation consultation",
      "AGV system assessment",
      "intralogistics engineering consultation",
      "automation project review"
    ]
  },
  "/products": {
    title: "Warehouse Automation Products",
    description:
      "Explore AGV, autonomous forklift, storage, lifting, roller, and composite mobile robot systems for warehouse and factory automation.",
    keywords: [
      "warehouse automation products",
      "AGV products",
      "autonomous forklift",
      "mobile robot systems",
      "factory automation equipment"
    ]
  },
  "/products/agv-forklift": {
    title: "Autonomous Forklift AGV",
    description:
      "Autonomous forklift AGV for high-density warehouses, pallet storage, retrieval, high-rack operation, and 24/7 internal transport.",
    keywords: [
      "autonomous forklift AGV",
      "forklift AGV",
      "high-rack warehouse automation",
      "pallet storage automation",
      "autonomous pallet transport"
    ]
  },
  "/products/ground-handling-forklift-agv": {
    title: "Ground Handling Forklift AGV",
    description:
      "Ground handling forklift AGV for pallet transfer, staging, rack interface movement, and reliable internal logistics across warehouses and factories.",
    keywords: [
      "ground handling forklift AGV",
      "pallet transfer AGV",
      "warehouse forklift automation",
      "factory material transport",
      "internal logistics AGV"
    ]
  },
  "/products/lifting-agv": {
    title: "Lifting AGV for Material Handling",
    description:
      "Lifting AGV for pallet lifting, production-line delivery, workstation supply, and flexible material movement across warehouse and factory operations.",
    keywords: [
      "lifting AGV",
      "lift AGV",
      "pallet lifting robot",
      "production line delivery AGV",
      "material handling robot"
    ]
  },
  "/products/storage-agv": {
    title: "Storage AGV for Warehouse Automation",
    description:
      "Storage AGV for automated pallet buffering, storage movement, inventory flow, and coordinated warehouse automation in high-density operations.",
    keywords: [
      "storage AGV",
      "automated storage vehicle",
      "pallet storage automation",
      "warehouse buffer automation",
      "AGV inventory movement"
    ]
  },
  "/products/agv-roller": {
    title: "AGV Roller for Conveyor Transfer",
    description:
      "AGV roller system for conveyor handoffs, pallet transfer, line-side delivery, adaptive routing, and production logistics automation.",
    keywords: [
      "AGV roller",
      "roller conveyor AGV",
      "conveyor transfer robot",
      "pallet conveyor automation",
      "line-side delivery AGV"
    ]
  },
  "/products/composite-mobile-robot": {
    title: "Composite Mobile Robot for Machine Tending & Material Handling",
    description:
      "Composite mobile robot combining an AMR base and robotic arm for machine tending, point-of-use material handling, kitting, inspection, and flexible workstation automation.",
    keywords: [
      "composite mobile robot",
      "mobile manipulator robot",
      "mobile robot automation",
      "machine tending robot",
      "industrial mobile robotics"
    ]
  },
  "/solutions": {
    title: "Warehouse Automation Solutions",
    description:
      "Warehouse automation solutions covering ASRS, material handling, picking, machine tending, and software orchestration for industrial operations.",
    keywords: [
      "warehouse automation solutions",
      "intralogistics solutions",
      "ASRS solution",
      "material handling automation",
      "warehouse robotics"
    ]
  },
  "/solutions/asrs": {
    title: "ASRS Warehouse Automation",
    description:
      "ASRS warehouse automation for high-density storage, automated retrieval, inventory traceability, and coordinated material flow.",
    keywords: [
      "ASRS",
      "automated storage and retrieval system",
      "ASRS warehouse automation",
      "high-density storage",
      "automated pallet storage"
    ]
  },
  "/solutions/material-handling": {
    title: "Material Handling Automation",
    description:
      "Material handling automation for pallet transport, production supply, line-side delivery, and coordinated movement across industrial facilities.",
    keywords: [
      "material handling automation",
      "automated material handling",
      "pallet transport automation",
      "production supply automation",
      "industrial logistics automation"
    ]
  },
  "/solutions/picking": {
    title: "Picking and Fulfillment Automation",
    description:
      "Picking and fulfillment automation for goods-to-person workflows, order consolidation, inventory movement, and scalable warehouse execution.",
    keywords: [
      "picking automation",
      "warehouse fulfillment automation",
      "goods-to-person picking",
      "order picking system",
      "warehouse picking solution"
    ]
  },
  "/solutions/goods-to-person-picking-system": {
    title: "Goods-to-Person Picking System",
    description:
      "Goods-to-person picking systems that connect storage, retrieval, order fulfillment, and software coordination for warehouse operations.",
    keywords: [
      "goods-to-person picking system",
      "goods-to-person automation",
      "GTP picking",
      "automated order picking",
      "warehouse fulfillment system"
    ]
  },
  "/solutions/machine-tending-automation": {
    title: "Machine Tending Automation for CNC",
    description:
      "Machine tending automation for CNC cells, robotic loading and unloading, material flow, and flexible production support.",
    keywords: [
      "machine tending automation",
      "CNC machine tending",
      "machine tending robot",
      "robotic machine loading",
      "CNC cell automation"
    ]
  },
  "/solutions/software": {
    title: "Warehouse Automation Software",
    description:
      "Warehouse automation software for WMS, WCS, fleet coordination, task orchestration, and real-time operational visibility.",
    keywords: [
      "warehouse automation software",
      "WMS WCS integration",
      "AGV fleet management",
      "warehouse task orchestration",
      "intralogistics software"
    ]
  },
  "/industries/food-beverage-fmcg-automation": {
    title: "Food, Beverage and FMCG Automation",
    description:
      "Food, beverage, and FMCG automation for pallet handling, AGV transport, storage, replenishment, and hygienic warehouse flow.",
    keywords: [
      "food and beverage automation",
      "FMCG warehouse automation",
      "food factory AGV",
      "beverage warehouse automation",
      "pallet handling automation"
    ]
  }
};

for (const [route, override] of Object.entries(SEO_PAGE_OVERRIDES)) {
  const source = SEO_KEYWORD_SOURCE_BY_ROUTE[route];

  if (!source) {
    continue;
  }

  override.keywords = [
    ...new Set([
      source.primary,
      ...source.secondary,
      ...source.geo,
      ...(override.keywords || [])
    ].filter(Boolean))
  ];
}

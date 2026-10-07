const LIFTING_AGV_ANCHOR =
  "When these carriers are mainly moved by workers or require manually operated forklifts for frequent short-distance transfers, repetitive handling, waiting time, and logistics coordination can gradually become bottlenecks as task volumes increase.";

const FORKLIFT_AGV_ANCHOR =
  "When these transport routes are relatively fixed, pallet volumes are stable, and the same tasks need to be repeated many times every day, a robotic pallet stacker can turn pallet movements that traditionally depend on manually operated forklifts into logistics processes that are automatically scheduled and executed by the system.";

const liftingAgvSpecifications = [
  {
    name: "600kg Lifting AGV",
    href: "/products/lifting-agv",
    image: "/assets/images/lifting-agv-workstation.webp",
    imageAlt: "600kg lifting AGV moving material beside a pallet in a warehouse",
    specifications: [
      { label: "Rated Load", value: "600kg" },
      { label: "Lifting Height", value: "60mm" },
      { label: "Max No-load Speed", value: "1.5m/s" },
      { label: "Navigation Mode", value: "Laser SLAM + QR Code" },
      { label: "Positioning Accuracy", value: "±10mm" },
      { label: "Battery Life / Charge", value: "8h" }
    ]
  },
  {
    name: "1000kg Lifting AGV",
    href: "/products/lifting-agv",
    image: "/downloads/product-overview/lifting-agv.webp",
    imageAlt: "1000kg lifting AGV product view",
    specifications: [
      { label: "Rated Load", value: "1000kg" },
      { label: "Lifting Height", value: "60mm" },
      { label: "Max No-load Speed", value: "1.5m/s" },
      { label: "Navigation Mode", value: "Laser SLAM + QR Code" },
      { label: "Positioning Accuracy", value: "±10mm" },
      { label: "Battery Life / Charge", value: "8h" }
    ]
  }
];

const forkliftAgvSpecifications = [
  {
    name: "AGV Forklift",
    href: "/products/agv-forklift",
    image: "/downloads/product-overview/ground-handling-forklift-agv.webp",
    imageAlt: "1600kg AGV forklift with pallet forks",
    specifications: [
      { label: "Rated Load", value: "1600kg" },
      { label: "Min. Aisle Width", value: "2500mm" },
      { label: "Battery Life / Charge", value: "8h" },
      { label: "Navigation Mode", value: "Laser SLAM + 3D Vision" },
      { label: "Lifting Height", value: "200mm" },
      { label: "Max. No-load Speed", value: "1.8m/s" },
      { label: "Positioning Accuracy", value: "±10mm" },
      { label: "Pallet Size", value: "1200×800; 1200×1000" }
    ]
  },
  {
    name: "Stacking AGV Forklift",
    href: "/products/agv-forklift",
    image: "/downloads/product-overview/forklift-stacker-agv.webp",
    imageAlt: "1400kg stacking AGV forklift with raised mast",
    specifications: [
      { label: "Rated Load", value: "1400kg" },
      { label: "Min. Aisle Width", value: "2500mm" },
      { label: "Battery Life / Charge", value: "8h" },
      { label: "Navigation Mode", value: "Laser SLAM + 3D Vision" },
      { label: "Lifting Height", value: "3000mm" },
      { label: "Max. No-load Speed", value: "1.5m/s" },
      { label: "Positioning Accuracy", value: "±10mm" },
      { label: "Pallet Size", value: "1200×800; 1200×1000" }
    ]
  }
];

const productSpecificationInsertions = {
  "lifting-automated-robot": {
    afterTextIncludes: LIFTING_AGV_ANCHOR,
    key: "lifting-agv-specifications",
    products: liftingAgvSpecifications
  },
  "agv-forklift-meaning": {
    afterTextIncludes: FORKLIFT_AGV_ANCHOR,
    key: "forklift-agv-specifications",
    layout: "forklift-dashboard",
    products: forkliftAgvSpecifications
  }
};

function getBlockText(block) {
  if (block?._type !== "block" || !Array.isArray(block.children)) {
    return "";
  }

  return block.children.map((child) => child?.text || "").join("");
}

export function insertBlogProductSpecificationBlocks(slug, blocks) {
  const insertion = productSpecificationInsertions[slug];

  if (!insertion || !Array.isArray(blocks)) {
    return blocks;
  }

  const productBlock = {
    _type: "productSpecifications",
    _key: `${slug}-${insertion.key}`,
    layout: insertion.layout,
    products: insertion.products
  };
  const alreadyInserted = blocks.some(
    (block) => block?._type === "productSpecifications" && block?._key === productBlock._key
  );

  if (alreadyInserted) {
    return blocks;
  }

  const nextBlocks = [];
  let inserted = false;

  for (const block of blocks) {
    nextBlocks.push(block);

    if (!inserted && getBlockText(block).includes(insertion.afterTextIncludes)) {
      nextBlocks.push(productBlock);
      inserted = true;
    }
  }

  return nextBlocks;
}

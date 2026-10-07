const LIFTING_AGV_ANCHOR =
  "When these carriers are mainly moved by workers or require manually operated forklifts for frequent short-distance transfers, repetitive handling, waiting time, and logistics coordination can gradually become bottlenecks as task volumes increase.";

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

const productSpecificationInsertions = {
  "lifting-automated-robot": {
    afterTextIncludes: LIFTING_AGV_ANCHOR,
    products: liftingAgvSpecifications
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
    _key: `${slug}-lifting-agv-specifications`,
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

import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { CmsPageShell } from "@/components/cms-page-shell";
import { getBlogBodyOverride } from "@/lib/blog-body-overrides.mjs";
import { injectBlogInternalLinks } from "@/lib/blog-internal-links.mjs";
import { getBlogImageOverride } from "@/lib/blog-image-overrides.mjs";
import { getLocalPostBySlug } from "@/lib/local-blog-posts.mjs";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { COMPANY, SITE_URL } from "@/lib/site-config";
import { buildTitleMetadata, resolveSeoTitle } from "@/lib/seo";
import { getPostBySlug, getRelatedPosts } from "@/lib/sanity/content.mjs";
import { urlFor } from "@/lib/sanity/image.mjs";

export const dynamic = "force-dynamic";

const getCachedPostBySlug = cache(getPostBySlug);
const getCachedRelatedPosts = cache(getRelatedPosts);

const BLOG_CANONICAL_OVERRIDES = {
  "agv-guide": "/blog/agv-guide",
  "agv-what-is-automated-guided-vehicle": "/blog/agv-guide"
};

function resolveSlugParam(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateMetadata({ params }) {
  const slug = resolveSlugParam(params.slug);
  const post = (await getCachedPostBySlug(slug)) || getLocalPostBySlug(slug);

  if (!post) {
    return {};
  }

  const canonical = BLOG_CANONICAL_OVERRIDES[slug] || `/blog/${post.slug}`;
  const description = post.seo?.description || post.excerpt || "Warehouse automation article from coolyne.";
  const titleSource = post.seo?.title || post.title;
  const ogTitle = resolveSeoTitle(post.seo?.ogTitle || titleSource);
  const heroImageUrl =
    getBlogImageOverride(post) || urlFor(post.heroImage)?.width(1600).height(960).url() || undefined;

  return {
    title: buildTitleMetadata(titleSource),
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: "article",
      images: heroImageUrl ? [{ url: heroImageUrl, alt: post.title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: heroImageUrl ? [heroImageUrl] : undefined
    }
  };
}

function formatPublishedDate(value) {
  if (!value) {
    return "Publishing schedule pending";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(value));
}

const BLOG_SIDECARD_COPY = {
  "agv-guide": {
    eyebrow: "AGV Basics",
    title: "Key Topics",
    description: "System scope. Navigation methods. Safety logic. Forklift replacement fit."
  },
  "agv-vs-amr": {
    eyebrow: "Transport Strategy",
    title: "Comparison Focus",
    description: "Navigation style. Safety trade-offs. Flexibility. Cost fit. Selection logic."
  },
  "warehouse-automation-guide": {
    eyebrow: "Warehouse Automation",
    title: "What This Covers",
    description: "Robot workflows. Efficiency gains. Safety value. ROI checks. Deployment fit."
  },
  "agv-what-is-automated-guided-vehicle": {
    eyebrow: "AGV Overview",
    title: "Core Scope",
    description: "How AGVs work. Main types. Application fit. Integration logic. Use cases."
  }
};

const BLOG_PRODUCT_LIBRARY = {
  forkliftAgv: { href: "/products/agv-forklift", label: "Forklift AGV" },
  groundHandling: {
    href: "/products/ground-handling-forklift-agv",
    label: "Ground Handling Forklift AGV",
  },
  liftingAgv: { href: "/products/lifting-agv", label: "Lifting AGV" },
  storageAgv: { href: "/products/storage-agv", label: "Storage AGV" },
  agvRoller: { href: "/products/agv-roller", label: "AGV Roller" },
  compositeRobot: {
    href: "/products/composite-mobile-robot",
    label: "Composite Mobile Robot",
  },
};

const BLOG_SOLUTION_LIBRARY = {
  asrs: { href: "/solutions/asrs", label: "ASRS" },
  materialHandling: { href: "/solutions/material-handling", label: "Material Handling" },
  picking: { href: "/solutions/picking", label: "Picking" },
  goodsToPerson: {
    href: "/solutions/goods-to-person-picking-system",
    label: "Goods-to-Person",
  },
  machineTending: {
    href: "/solutions/machine-tending-automation",
    label: "Machine Tending Automation",
  },
  software: { href: "/solutions/software", label: "Warehouse Software" },
};

function normalizeTopicDescription(post) {
  const raw = (post?.excerpt || "").trim();
  if (!raw) {
    return "Workflow scope. System logic. Operational fit. Integration priorities.";
  }

  const compact = raw.replace(/\s+/g, " ").trim();
  const sentence = compact.split(/(?<=[.!?])\s+/)[0] || compact;
  return sentence.length > 120 ? `${sentence.slice(0, 117).trim()}...` : sentence;
}

function getSidecardCopy(post) {
  const slug = typeof post === "string" ? post : post?.slug;
  const mapped = BLOG_SIDECARD_COPY[slug];

  if (mapped) {
    return mapped;
  }

  return {
    eyebrow: "Topic Summary",
    title: "What This Covers",
    description: normalizeTopicDescription(post)
  };
}

function buildFallbackArticleBody(post) {
  const excerpt =
    post?.excerpt ||
    "This article is being refreshed. Please use the blog index or contact page if you need the content immediately.";

  return [
    {
      _type: "block",
      _key: "fallback-intro",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "fallback-intro-span",
          marks: [],
          text: excerpt
        }
      ]
    },
    {
      _type: "block",
      _key: "fallback-note",
      style: "blockquote",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "fallback-note-span",
          marks: [],
          text: "If the full article does not appear after refresh, the page is likely serving a stale cache snapshot. Try opening the post again from the blog index."
        }
      ]
    }
  ];
}

const DEDUPED_BLOG_ASSET_IDS = {
  "what-is-asrs": ["7741c86d1f3e584a526af174f0e672d41b03b877"]
};

const REMOVED_BLOG_ASSET_IDS = {
  "warehouse-automation-guide": [
    "f7640d4851438f8d7b13b27ecaa5cd603246d5e6",
    "9e319ea07a85e56ec46e081c51c466b0717ce273"
  ]
};

const BLOG_BLOCK_INSERTIONS = {
  "what-is-intralogistics": [
    {
      afterTextIncludes:
        "In practical terms, intralogistics usually includes receiving, storage, putaway, replenishment, picking, internal transfer, staging, and shipping support, along with the control logic that keeps those movements accurate and coordinated.",
      block: {
        _type: "staticImage",
        _key: "intralogistics-guide-process-flow-image",
        src: "/assets/images/intralogistics-guide-process-flow.webp",
        alt: "Intralogistics process scene with pallet storage, conveyor equipment, and autonomous material movement inside a warehouse operation",
        caption:
          "Intralogistics process example: storage, pallet movement, conveyor handling, and coordinated internal flow work together inside one operation."
      }
    },
    {
      afterTextIncludes:
        "AGVs fit this picture when the operation has structured internal transport work. If the same loads move between the same points every day, with consistent pickup and drop-off conditions, AGVs can replace repetitive forklift travel with a more controlled transport pattern.",
      block: {
        _type: "staticImage",
        _key: "intralogistics-guide-agv-transport-image",
        src: "/assets/images/intralogistics-guide-agv-transport.webp",
        alt: "AGV moving pallet loads along a defined transport route beside conveyor equipment in a warehouse",
        caption:
          "Structured intralogistics transport example: an AGV moves pallet loads along a defined route as part of a coordinated warehouse flow."
      }
    },
    {
      afterTextIncludes:
        "AGVs fit this picture when the operation has structured internal transport work. If the same loads move between the same points every day, with consistent pickup and drop-off conditions, AGVs can replace repetitive forklift travel with a more controlled transport pattern.",
      block: {
        _type: "videoEmbed",
        _key: "intralogistics-guide-agv-transport-video",
        src: "/videos/intralogistics-guide.mp4",
        caption:
          "Intralogistics transport video: AGV-based internal movement supports repeatable point-to-point material flow inside a structured warehouse operation."
      }
    }
  ],
  "goods-to-person-guide": [
    {
      afterTextIncludes:
        "A goods-to-person system, often shortened to G2P or GTP, is a warehousing and order fulfillment method in which automation brings inventory to a fixed picking station.",
      block: {
        _type: "staticImage",
        _key: "g2p-guide-station-overview-image",
        src: "/assets/images/g2p-guide-station-overview.webp",
        alt: "Goods-to-person picking station with mobile robots delivering blue totes to a fixed operator workstation",
        caption:
          "Goods-to-person concept example: mobile robots deliver totes to a fixed picking station instead of sending the operator through the warehouse."
      }
    },
    {
      afterTextIncludes:
        "The simplest way to understand the difference is this: in person-to-goods picking, the person travels to the product; in goods-to-person picking, the product travels to the person.",
      block: {
        _type: "staticImage",
        _key: "g2p-guide-person-to-goods-contrast-image",
        src: "/assets/images/g2p-guide-person-to-goods-contrast.webp",
        alt: "Worker pushing a cart through warehouse aisles in a traditional person-to-goods picking environment",
        caption:
          "Traditional person-to-goods picking relies on operator travel through storage aisles, which is the movement G2P aims to reduce."
      }
    },
    {
      afterTextIncludes:
        "The operator follows the on-screen instruction, picks the required quantity, confirms the action, and the system updates inventory data before returning the remaining goods to storage or routing them to the next step.",
      block: {
        _type: "staticImage",
        _key: "g2p-guide-pick-station-detail-image",
        src: "/assets/images/g2p-guide-pick-station-detail.webp",
        alt: "Operator picking from a blue tote at a goods-to-person workstation with on-screen instructions",
        caption:
          "Typical G2P workflow at the station: the operator picks from the delivered tote, confirms the task, and the software records the inventory update."
      }
    },
    {
      afterTextIncludes:
        "The operator follows the on-screen instruction, picks the required quantity, confirms the action, and the system updates inventory data before returning the remaining goods to storage or routing them to the next step.",
      block: {
        _type: "videoEmbed",
        _key: "g2p-guide-workflow-video",
        src: "/videos/goods-to-person-guide.mp4",
        caption:
          "Goods-to-person workflow video: inventory is delivered to the picking station, picked by the operator, and routed onward under system control."
      }
    },
    {
      afterTextIncludes:
        "Mobile-robot goods-to-person systems are often attractive when a team wants more deployment flexibility or a more phased automation path.",
      block: {
        _type: "staticImage",
        _key: "g2p-guide-mobile-robot-system-image",
        src: "/assets/images/g2p-guide-mobile-robot-system.webp",
        alt: "Large goods-to-person fulfillment area with multiple mobile robots, picking stations, and conveyor connections",
        caption:
          "Mobile-robot G2P example: multiple robots feed several workstations in parallel while conveyors support outbound flow."
      }
    }
  ],
  "what-is-asrs": [
    {
      afterTextIncludes:
        "At a high level, ASRS works by receiving a load at an inbound point, identifying it, assigning it to a storage location, moving it into storage with automated equipment, and retrieving it again when a downstream process requests it.",
      block: {
        _type: "staticImage",
        _key: "what-is-asrs-storage-aisle-image",
        src: "/assets/images/asrs-guide-storage-aisle.webp",
        alt: "Pallet conveyor and stacker-crane aisle inside a pallet-based ASRS warehouse",
        caption:
          "High-level ASRS aisle example: pallet loads move from conveyor infeed into dense automated storage and back out on request."
      }
    },
    {
      afterTextIncludes:
        "The equipment retrieves the load and sends it to the next station, conveyor, or transport system.",
      block: {
        _type: "videoEmbed",
        _key: "what-is-asrs-workflow-video",
        src: "/videos/asrs-workflow.mp4",
        caption:
          "ASRS workflow example showing automated storage, retrieval, and conveyor-linked material flow."
      }
    },
    {
      afterTextIncludes:
        "identification and safety devices such as scanners, sensors, and access controls",
      block: {
        _type: "staticImage",
        _key: "what-is-asrs-control-interface-image",
        src: "/assets/images/asrs-guide-control-interface.webp",
        alt: "ASRS interface station with pallet conveyor, scanner column, HMI screen, and stacker-crane aisle",
        caption:
          "ASRS interface example: scanners, controls, and conveyor handoff equipment coordinate how loads enter and leave the storage aisle."
      }
    },
    {
      afterTextIncludes:
        "If your operation mainly stores finished goods pallets, unit-load is usually the more relevant starting point. If the operation is built around parts, bins, or small-case handling, mini-load is often closer to the real need.",
      block: {
        _type: "staticImage",
        _key: "what-is-asrs-unitload-miniload-image",
        src: "/assets/images/asrs-guide-unitload-miniload-comparison.webp",
        alt: "Side-by-side comparison of pallet unit-load ASRS and tote-focused mini-load automated storage",
        caption:
          "Unit-load and mini-load comparison: pallet-oriented crane storage on one side and tote-focused automated handling on the other."
      }
    },
    {
      afterTextIncludes:
        "One Coolyne example is its `Automated Warehouse Upgrade` project, where ASRS is used as part of a larger warehouse redesign rather than as a stand-alone machine.",
      block: {
        _type: "staticImage",
        _key: "what-is-asrs-integrated-material-flow-image",
        src: "/assets/images/asrs-guide-integrated-material-flow.webp",
        alt: "Integrated ASRS project with autonomous pallet movers feeding conveyors and high-density automated storage",
        caption:
          "Integrated material-flow example: ASRS works with autonomous pallet movers and conveyor interfaces as part of a larger intralogistics system."
      }
    }
  ],
  "what-is-machine-tending": [
    {
      afterTextIncludes:
        "A complete machine tending system generally includes the robot itself, an end-of-arm tool, a material supply system, control equipment, and safety devices. These components must be selected according to the part characteristics and machining process rather than simply combining a standard robot with an existing machine.",
      block: {
        _type: "staticImage",
        _key: "machine-tending-system-basics-image",
        src: "/assets/images/machine-tending-material-pick-3.png",
        alt: "Machine tending robot positioned beside a CNC machine with organized part trays for automated loading and unloading",
        caption:
          "Machine tending system setup: robot, part presentation, machine interface, and cell integration work together around the CNC process."
      }
    },
    {
      afterTextIncludes:
        "For milling, drilling, and combined machining processes, the robot can load workpieces into fixtures or onto machining pallets.",
      block: {
        _type: "staticImage",
        _key: "machine-tending-common-cnc-cell-image",
        src: "/assets/images/machine-tending-material-pick-2.png",
        alt: "Mobile machine tending robot with robotic arm serving CNC equipment inside a machining workshop",
        caption:
          "CNC machine tending example: a mobile robot with a robotic arm supports repeatable loading and unloading work across machining equipment."
      }
    },
    {
      afterTextIncludes:
        "This connects material transport and machine operation into a continuous workflow, reducing manual replenishment, inter-station handling, and machine waiting time.",
      block: {
        _type: "videoEmbed",
        _key: "machine-tending-operating-cycle-video",
        src: "/videos/what-is-machine-tending-guide.mp4",
        caption:
          "Machine tending workflow video: the robot picks, loads, unloads, and hands off parts in a repeatable CNC support cycle."
      }
    }
  ],
  "autonomous-forklifts": [
    {
      afterTextIncludes:
        "Receiving docks show this pattern clearly. Trailer unloading can move faster than put-away, especially when pallets are scanned and released faster than forklifts can clear them into storage. Once that gap opens, inbound pallets accumulate in staging, trailer turns lengthen, and the next truck can arrive before the previous load has cleared.",
      block: {
        _type: "staticImage",
        _key: "autonomous-forklifts-detail-image-1",
        src: "/assets/images/autonomous-forklifts-detail-1.png",
        alt: "Autonomous forklift moving palletized cartons beside an inbound conveyor and dock area",
        caption:
          "Inbound pallet transfer example: autonomous forklifts help clear receiving and conveyor handoff zones before staging begins to build up."
      }
    },
    {
      afterTextIncludes:
        "Reserve-to-pick replenishment is another loop where throughput improvement often appears early because refill demand follows a visible operational rhythm. When fast-moving SKUs keep draining the front locations, the cost of a late move becomes easy to see. Yale's automated retrieval examples include picking tunnel replenishment, where pallets are pulled from storage when a SKU runs low (Yale automation applications). If that trigger is reliable, autonomous forklifts can protect wave continuity better than a purely reactive manual response.",
      block: {
        _type: "staticImage",
        _key: "autonomous-forklifts-detail-image-2",
        src: "/assets/images/autonomous-forklifts-detail-2.png",
        alt: "Autonomous forklift transporting a wrapped pallet through warehouse storage aisles",
        caption:
          "Reserve-to-pick replenishment example: repeatable pallet movement through storage aisles helps protect front-location refill timing."
      }
    },
    {
      afterTextIncludes:
        "Floor-level loops create a different delay pattern. Time is usually lost in repeated dock-to-storage transfers, conveyor pickup, staging handoff, and other short-interval moves that do not depend on high rack access. Vendor materials for autonomous counterbalanced and stacker equipment commonly center on those tasks and on moderate lift height rather than high-bay storage (Yale robotic counterbalanced stacker). In these loops, throughput usually depends more on steady release and fast handoff than on tall lift capability.",
      block: {
        _type: "staticImage",
        _key: "autonomous-forklifts-detail-image-3",
        src: "/assets/images/autonomous-forklifts-detail-3.png",
        alt: "Autonomous forklift transporting a pallet along a conveyor-connected warehouse route",
        caption:
          "Floor-level transfer example: autonomous forklifts keep conveyor-connected pallet handoffs moving with more stable short-interval execution."
      }
    }
  ],
  "line-side-logistics": [
    {
      afterTextIncludes:
        "Automation starts to make more sense once the transport task stops being occasional and starts becoming repetitive. When the same loads move between the same kinds of points again and again, automated transport and orchestration software can reduce emergency runs, smooth delivery cadence, and make task status more visible. The useful mindset here is not 'replace a driver.' It is 'remove a recurring source of line-side instability.'",
      block: {
        _type: "videoEmbed",
        _key: "line-side-logistics-factory-demo-video",
        src: "/videos/line-side-logistics-guide.mp4",
        caption:
          "Line-side logistics workflow video: automated transport and workstation-side handoff keep production supply moving in a stable, repeatable rhythm."
      }
    }
  ],
  "warehouse-automation-guide": [
    {
      afterTextIncludes: "How Warehouse Automation Robots Work",
      block: {
        _type: "staticImage",
        _key: "warehouse-automation-guide-workflow-image",
        src: "/assets/images/warehouse-automation-guide-workflow.webp",
        alt: "Autonomous mobile robot carrying cartons between storage aisles and automation equipment in a warehouse",
        caption:
          "Warehouse automation workflow example: a mobile robot moves cartons between storage, transfer, and processing areas inside a coordinated warehouse system."
      }
    },
    {
      afterTextIncludes: "Different robot categories play different roles in a warehouse.",
      block: {
        _type: "videoEmbed",
        _key: "warehouse-automation-lifting-agv-video",
        src: "/videos/lifting-agv.mp4",
        caption:
          "Lifting AGV supporting repetitive pallet transport and lift-assisted material movement in warehouse automation."
      }
    },
    {
      afterTextIncludes: "How Warehouse Automation Robots Enhance Workplace Safety",
      block: {
        _type: "staticImage",
        _key: "warehouse-automation-guide-safety-image",
        src: "/assets/images/warehouse-automation-guide-safety.webp",
        alt: "Warehouse operator working beside protected pedestrian lanes and an autonomous transport robot carrying blue totes",
        caption:
          "Safety-focused warehouse automation example: protected walkways, operator stations, and autonomous transport routes reduce conflict in shared work zones."
      }
    }
  ]
};

function getBlockText(block) {
  if (block?._type !== "block" || !Array.isArray(block.children)) {
    return "";
  }

  return block.children.map((child) => child?.text || "").join("");
}

function blockContainsAssetId(block, assetIds) {
  if (!block || !assetIds?.length) {
    return false;
  }

  const refs = [
    block?.asset?._ref,
    block?.asset?._id,
    block?.image?.asset?._ref,
    block?.image?.asset?._id,
    block?.node?.asset?._ref,
    block?.node?.asset?._id,
    block?.value?.asset?._ref,
    block?.value?.asset?._id
  ].filter(Boolean);

  return refs.some((ref) => assetIds.some((assetId) => ref.includes(assetId)));
}

function pruneRedundantBlogBlocks(slug, blocks) {
  if (!Array.isArray(blocks)) {
    return blocks;
  }

  const assetIds = DEDUPED_BLOG_ASSET_IDS[slug];

  if (!assetIds?.length) {
    return blocks;
  }

  const seenAssetIds = new Set();

  return blocks.filter((block) => {
    const matchedAssetId = assetIds.find((assetId) => blockContainsAssetId(block, [assetId]));

    if (!matchedAssetId) {
      return true;
    }

    if (seenAssetIds.has(matchedAssetId)) {
      return false;
    }

    seenAssetIds.add(matchedAssetId);
    return true;
  });
}

function pruneRemovedBlogBlocks(slug, blocks) {
  if (!Array.isArray(blocks)) {
    return blocks;
  }

  const assetIds = REMOVED_BLOG_ASSET_IDS[slug];

  if (!assetIds?.length) {
    return blocks;
  }

  return blocks.filter((block) => !blockContainsAssetId(block, assetIds));
}

function insertBlogVideoBlocks(slug, blocks) {
  if (!Array.isArray(blocks)) {
    return blocks;
  }

  const insertions = BLOG_BLOCK_INSERTIONS[slug];

  if (!insertions?.length) {
    return blocks;
  }

  const pendingInsertions = [...insertions];
  const nextBlocks = [];

  for (const block of blocks) {
    nextBlocks.push(block);

    const blockText = getBlockText(block);
    if (!blockText) {
      continue;
    }

    while (pendingInsertions.length && blockText.includes(pendingInsertions[0].afterTextIncludes)) {
      nextBlocks.push(pendingInsertions.shift().block);
    }
  }

  return nextBlocks;
}

function buildBlogPostingSchema(post, heroImageUrl) {
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const description = post.seo?.description || post.excerpt || "Warehouse automation article from coolyne.";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: resolveSeoTitle(post.seo?.title || post.title),
    description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: {
      "@type": "Organization",
      name: COMPANY.legalName || COMPANY.name
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName || COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/images/coolyne-logo.png`
      }
    },
    image: heroImageUrl ? [heroImageUrl] : undefined
  };
}

function getBlogConversionContext(post) {
  const topic = `${post?.slug || ""} ${post?.title || ""} ${post?.excerpt || ""}`.toLowerCase();

  if (topic.includes("forklift")) {
    return {
      products: [BLOG_PRODUCT_LIBRARY.forkliftAgv, BLOG_PRODUCT_LIBRARY.groundHandling],
      solutions: [BLOG_SOLUTION_LIBRARY.materialHandling, BLOG_SOLUTION_LIBRARY.software],
    };
  }

  if (topic.includes("machine tending")) {
    return {
      products: [BLOG_PRODUCT_LIBRARY.compositeRobot, BLOG_PRODUCT_LIBRARY.liftingAgv],
      solutions: [BLOG_SOLUTION_LIBRARY.machineTending, BLOG_SOLUTION_LIBRARY.materialHandling],
    };
  }

  if (topic.includes("line-side")) {
    return {
      products: [BLOG_PRODUCT_LIBRARY.liftingAgv, BLOG_PRODUCT_LIBRARY.compositeRobot],
      solutions: [BLOG_SOLUTION_LIBRARY.materialHandling, BLOG_SOLUTION_LIBRARY.machineTending],
    };
  }

  if (topic.includes("asrs") || topic.includes("storage")) {
    return {
      products: [BLOG_PRODUCT_LIBRARY.storageAgv, BLOG_PRODUCT_LIBRARY.agvRoller],
      solutions: [BLOG_SOLUTION_LIBRARY.asrs, BLOG_SOLUTION_LIBRARY.software],
    };
  }

  if (
    topic.includes("industrial robot") ||
    topic.includes("mobile manipulator") ||
    topic.includes("composite robot")
  ) {
    return {
      products: [BLOG_PRODUCT_LIBRARY.compositeRobot, BLOG_PRODUCT_LIBRARY.liftingAgv],
      solutions: [BLOG_SOLUTION_LIBRARY.machineTending, BLOG_SOLUTION_LIBRARY.software],
    };
  }

  return {
    products: [BLOG_PRODUCT_LIBRARY.forkliftAgv, BLOG_PRODUCT_LIBRARY.compositeRobot],
    solutions: [BLOG_SOLUTION_LIBRARY.materialHandling, BLOG_SOLUTION_LIBRARY.software],
  };
}

function BlogConversionSection({ post }) {
  const context = getBlogConversionContext(post);

  return (
    <section className="section-panel">
      <div className="blog-article-panel">
        <div className="rounded-[28px] border border-[#d9dde5] bg-white px-8 py-10 shadow-[0_24px_80px_rgba(0,23,54,0.06)] md:px-10 md:py-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-[#fe6b00]">
              Next Review
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#001736] md:text-4xl">
              Move from article research to a scoped feasibility review.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#58606b]">
              Use the related products and solution paths below, then send your workflow and layout
              for a quick engineering review.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[24px] border border-[#d9dde5] bg-[#f8f9fb] px-6 py-6">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#001736]">
                Related Products
              </p>
              <div className="mt-5 space-y-3">
                {context.products.map((item) => (
                  <Link
                    className="flex items-center justify-between rounded-[18px] border border-[#d9dde5] bg-white px-5 py-4 text-sm font-bold text-[#001736] transition-colors hover:border-[#001736]"
                    href={item.href}
                    key={item.href}
                  >
                    <span>{item.label}</span>
                    <span className="text-[#fe6b00]">→</span>
                  </Link>
                ))}
              </div>
            </article>

            <article className="rounded-[24px] border border-[#d9dde5] bg-[#f8f9fb] px-6 py-6">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#001736]">
                Related Solutions
              </p>
              <div className="mt-5 space-y-3">
                {context.solutions.map((item) => (
                  <Link
                    className="flex items-center justify-between rounded-[18px] border border-[#d9dde5] bg-white px-5 py-4 text-sm font-bold text-[#001736] transition-colors hover:border-[#001736]"
                    href={item.href}
                    key={item.href}
                  >
                    <span>{item.label}</span>
                    <span className="text-[#fe6b00]">→</span>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8 rounded-[24px] bg-[#001736] px-6 py-7 text-white md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ffb36d]">
                  Engineering Review
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-tight">
                  Send your workflow and layout for a quick feasibility review.
                </h3>
              </div>
              <a
                className="inline-flex items-center justify-center rounded-[14px] border border-white/14 bg-white/8 px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/14"
                download
                href="/downloads/warehouse-automation-evaluation-checklist.html"
              >
                Download Warehouse Automation Evaluation Checklist
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-[14px] bg-[#fe6b00] px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#db5d00]"
                href="/contact"
              >
                Request Project Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BlogDetailPage({ params }) {
  const slug = resolveSlugParam(params.slug);
  const [remotePost, relatedPosts] = await Promise.all([
    getCachedPostBySlug(slug),
    getCachedRelatedPosts(slug)
  ]);
  const post = remotePost || getLocalPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const heroImageUrl =
    getBlogImageOverride(post) || urlFor(post.heroImage)?.width(1600).height(960).url() || null;
  const resolvedBody = insertBlogVideoBlocks(
    slug,
    pruneRedundantBlogBlocks(
      slug,
      pruneRemovedBlogBlocks(slug, getBlogBodyOverride(post) || post.body)
    )
  );
  const articleBody = resolvedBody?.length
    ? injectBlogInternalLinks(slug, resolvedBody)
    : buildFallbackArticleBody(post);
  const sidecardCopy = getSidecardCopy(post);
  const blogPostingSchema = buildBlogPostingSchema(post, heroImageUrl);

  return (
    <CmsPageShell currentSection="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <main className="shell-main">
        <section className="section-panel blog-detail-hero">
          <div className="blog-detail-hero-grid">
            <div className="blog-detail-copy">
              <h1>{post.title}</h1>
              <p>{post.excerpt || "Structured editorial content managed in Sanity."}</p>
              <div className="hero-actions">
                <Link className="hero-button" href="/blog">
                  Back to blog
                </Link>
                <Link className="secondary-button blog-outline-button" href="/contact">
                  Discuss this topic
                </Link>
              </div>
            </div>
            <div className="blog-detail-sidecard">
              {heroImageUrl ? (
                <div className="blog-detail-sidecard-media">
                  <img alt={post.title} src={heroImageUrl} />
                </div>
              ) : null}
              <span className="card-label">{sidecardCopy.eyebrow}</span>
              <strong>{sidecardCopy.title}</strong>
              <p>{sidecardCopy.description}</p>
            </div>
          </div>
        </section>

        <section className="section-panel blog-article-panel">
          <div className="blog-article-layout">
            <aside className="blog-article-aside">
              <div className="blog-article-aside-card">
                <span className="card-label">Project Inquiry</span>
                <p>Use the contact page for project-specific consultation tied to this topic.</p>
                <Link className="link-chip" href="/contact">
                  Contact coolyne
                </Link>
              </div>
              {relatedPosts.length ? (
                <div className="blog-article-aside-card">
                  <span className="card-label">Continue Reading</span>
                  <div className="blog-related-list">
                    {relatedPosts.map((item) => (
                      <Link className="blog-related-link" href={`/blog/${item.slug}`} key={item._id}>
                        <strong>{item.title}</strong>
                        {item.publishedAt ? <span>{formatPublishedDate(item.publishedAt)}</span> : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
            <div className="blog-article-prose mdx-prose">
              <SanityPortableText value={articleBody} />
            </div>
          </div>
        </section>
        <BlogConversionSection post={post} />
      </main>
    </CmsPageShell>
  );
}

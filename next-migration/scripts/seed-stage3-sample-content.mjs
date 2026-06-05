import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const source = fs.readFileSync(filePath, "utf8");

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();

    if (!key || process.env[key]) {
      continue;
    }

    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadDotEnvFile(path.join(appRoot, ".env.local"));
loadDotEnvFile(path.join(appRoot, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-05-23";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN || "";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local before running sanity:seed:stage3."
  );
}

if (!token) {
  throw new Error(
    "Missing SANITY_WRITE_TOKEN. Add a write-enabled token to .env.local before running sanity:seed:stage3."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const docs = [
  {
    _id: "catalogOverviewPage-products",
    _type: "catalogOverviewPage",
    section: "products",
    title: "Warehouse Automation Systems",
    kicker: "Product Ecosystem",
    summary:
      "A modular fleet of autonomous platforms engineered for pallet handling, transport, dense storage, and hybrid move-and-work execution.",
    metrics: [
      { _key: "products-metric-1", value: "6", label: "Core Platforms" },
      { _key: "products-metric-2", value: "Modular", label: "Deployment Logic" },
      { _key: "products-metric-3", value: "Integrated", label: "Software Backbone" }
    ],
    cards: [
      {
        _key: "products-card-agv-forklift",
        href: "/products/agv-forklift",
        title: "Forklift Stacker AGV",
        label: "Heavy Duty",
        summary:
          "Autonomous pallet handling and high-rack storage for dense warehouse environments requiring 24/7 stability.",
        metrics: [
          { _key: "products-card-agv-forklift-metric-1", value: "+/- 5 mm", label: "Stop Accuracy" },
          { _key: "products-card-agv-forklift-metric-2", value: "1,600 kg", label: "Payload Class" },
          { _key: "products-card-agv-forklift-metric-3", value: "10 m", label: "Lift Height" }
        ]
      },
      {
        _key: "products-card-lifting-agv",
        href: "/products/lifting-agv",
        title: "Lifting AGV",
        label: "Flexible Transfer",
        summary:
          "Low-profile autonomous lifting for shared-aisle transport, buffer handoff, and fast deployment in existing facilities.",
        metrics: [
          { _key: "products-card-lifting-agv-metric-1", value: "1,000 kg", label: "Payload" },
          { _key: "products-card-lifting-agv-metric-2", value: "1.8 m/s", label: "Travel Speed" },
          { _key: "products-card-lifting-agv-metric-3", value: "Zero Tape", label: "Infrastructure" }
        ]
      },
      {
        _key: "products-card-ground-handling-forklift-agv",
        href: "/products/ground-handling-forklift-agv",
        title: "Ground Handling Forklift AGV",
        label: "Ground Handling",
        summary:
          "Laser-guided pallet transfer for floor-level dispatch, short-haul stacking, and stable handling across mixed-traffic industrial sites.",
        metrics: [
          { _key: "products-card-ground-handling-metric-1", value: "1600kg", label: "Payload" },
          { _key: "products-card-ground-handling-metric-2", value: "1.5 / 1.8m/s", label: "Speed" },
          { _key: "products-card-ground-handling-metric-3", value: "+/-10mm", label: "Accuracy" }
        ]
      },
      {
        _key: "products-card-storage-agv",
        href: "/products/storage-agv",
        title: "Storage AGV",
        label: "Dense Buffer",
        summary:
          "High-density storage mobility for scalable buffer zones, automated release, and ASRS-linked transfer operations.",
        metrics: [
          { _key: "products-card-storage-metric-1", value: "+40%", label: "Space Use" },
          { _key: "products-card-storage-metric-2", value: "<90s", label: "Retrieval" },
          { _key: "products-card-storage-metric-3", value: "Modular", label: "Expansion" }
        ]
      },
      {
        _key: "products-card-agv-roller",
        href: "/products/agv-roller",
        title: "AGV Roller",
        label: "Flow Control",
        summary:
          "A mobile conveyor interface connecting fixed automation with flexible transport for cartons, bins, and packing transfer.",
        metrics: [
          { _key: "products-card-roller-metric-1", value: "2-Way", label: "Transfer Flow" },
          { _key: "products-card-roller-metric-2", value: "PLC/WCS", label: "Handshake" },
          { _key: "products-card-roller-metric-3", value: "24/7", label: "Operation" }
        ]
      },
      {
        _key: "products-card-composite-mobile-robot",
        href: "/products/composite-mobile-robot",
        title: "Composite Mobile Robot",
        label: "Mobile Manipulation",
        summary:
          "A move-and-work robotics platform combining autonomous transport, manipulation, and vision-guided execution for hybrid operations.",
        metrics: [
          { _key: "products-card-cmr-metric-1", value: "10kg", label: "Handling" },
          { _key: "products-card-cmr-metric-2", value: "1.2-1.5m", label: "Speed" },
          { _key: "products-card-cmr-metric-3", value: "0.02mm", label: "Arm Precision" }
        ]
      }
    ],
    capabilities: [
      "Flexible deployment with minimal infrastructure changes",
      "Scalable automation across phased warehouse growth",
      "Real-time control through integrated orchestration software",
      "Traceable task execution and performance analytics"
    ],
    faqs: [
      {
        _key: "products-faq-1",
        question: "What kinds of warehouse automation products are covered here?",
        answer:
          "The product layer covers AGV forklifts, lifting AGVs, storage AGVs, AGV rollers, and composite mobile robots."
      },
      {
        _key: "products-faq-2",
        question: "How should buyers evaluate the right product route?",
        answer:
          "Start from payload, aisle conditions, process handoff points, and software integration requirements, then compare the transport model that best matches the site flow."
      }
    ]
  },
  {
    _id: "catalogDetailPage-products-agv-forklift",
    _type: "catalogDetailPage",
    section: "products",
    title: "Forklift Stacker AGV",
    slug: { _type: "slug", current: "agv-forklift" },
    label: "Heavy Duty",
    kicker: "Industrial Robotics",
    summary:
      "Autonomous pallet handling and high-rack storage for dense warehouse operations that require precise putaway, stable traffic control, and continuous multi-shift availability.",
    metrics: [
      { _key: "product-detail-metric-1", value: "+/- 5 mm", label: "Stop Accuracy" },
      { _key: "product-detail-metric-2", value: "1,600 kg", label: "Payload Class" },
      { _key: "product-detail-metric-3", value: "10 m", label: "Lift Height" }
    ],
    features: [
      {
        _key: "product-feature-1",
        label: "Navigation",
        title: "Autonomous SLAM Navigation",
        description:
          "Reflector-free SLAM guidance keeps the vehicle stable in changing aisles without forcing a heavy infrastructure retrofit."
      },
      {
        _key: "product-feature-2",
        label: "Uptime",
        title: "24/7 Operational Availability",
        description:
          "Opportunity charging and mission-aware battery logic keep the fleet online during natural demand lulls."
      },
      {
        _key: "product-feature-3",
        label: "Capacity",
        title: "Heavy-Load Capacity",
        description:
          "Supports industrial pallet handling for high-bay operations without sacrificing maneuverability in narrow warehouse traffic."
      },
      {
        _key: "product-feature-4",
        label: "Safety",
        title: "Multi-Sensor Fusion",
        description:
          "Ultrasonic sensing, 3D vision, and bumper feedback create a layered safety envelope around every movement."
      }
    ],
    scenarios: [
      "Pallet transport across long-haul warehouse lanes",
      "Rack interface for precision putaway and retrieval",
      "Dock transfer from inbound unloading to staging",
      "Line feeding for just-in-time manufacturing supply"
    ],
    integrations: [
      "WMS and WCS bridge for mission dispatch",
      "Fleet control for traffic management and routing",
      "Predictive analytics for maintenance and uptime monitoring"
    ],
    faqs: [
      {
        _key: "product-detail-faq-1",
        question: "Where does the Forklift Stacker AGV fit best?",
        answer:
          "It is best suited to facilities that need automated pallet transport, rack interface execution, and predictable high-bay storage flow with minimal dependence on manual forklift traffic."
      }
    ],
    seo: {
      title: "Forklift Stacker AGV | coolyne Warehouse Automation",
      description:
        "Autonomous pallet handling and high-rack storage with precise navigation, fleet coordination, and warehouse software integration.",
      keywords: ["AGV forklift", "warehouse automation", "forklift stacker agv"],
      canonicalUrl: "/products/agv-forklift",
      noindex: false,
      ogTitle: "Forklift Stacker AGV",
      ogDescription:
        "Heavy-duty autonomous pallet handling for high-density warehouse operations.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogDetailPage-products-ground-handling-forklift-agv",
    _type: "catalogDetailPage",
    section: "products",
    title: "Ground Handling Forklift AGV",
    slug: { _type: "slug", current: "ground-handling-forklift-agv" },
    label: "Ground Handling",
    kicker: "Equipment Introduction",
    summary:
      "Laser-guided pallet transfer for horizontal movement, short-distance stacking, and internal logistics dispatch in dense warehouse and factory environments.",
    metrics: [
      { _key: "gh-metric-1", value: "1600kg", label: "Payload" },
      { _key: "gh-metric-2", value: "1.5/1.8m/s", label: "Speed" },
      { _key: "gh-metric-3", value: "+/-10mm", label: "Accuracy" }
    ],
    features: [
      {
        _key: "gh-feature-1",
        label: "Capacity",
        title: "Strong Loading Capacity",
        description:
          "Supports heavy palletized materials with a 1,600kg rated load and adjustable fork accessibility for varied floor conditions."
      },
      {
        _key: "gh-feature-2",
        label: "Navigation",
        title: "Dynamic Obstacle Avoidance",
        description:
          "Laser SLAM, 3D vision, and dispatch logic enable smooth multi-vehicle coordination across active aisles."
      },
      {
        _key: "gh-feature-3",
        label: "Recognition",
        title: "Multi-Carrier Recognition",
        description:
          "Recognizes different pallet and rack specifications to support precise pick, place, and rack interface execution."
      },
      {
        _key: "gh-feature-4",
        label: "Safety",
        title: "360 Deg Safety Protection",
        description:
          "Multiple sensors, protective edges, and layered safety logic create reliable human-machine interaction coverage."
      }
    ],
    scenarios: [
      "Ground-level pallet transfer between staging and storage zones",
      "Short-distance stacking and rack interface handling",
      "Internal logistics dispatch inside manufacturing workshops",
      "Automated transport across mixed-traffic warehouse aisles"
    ],
    integrations: [
      "Laser SLAM + 3D vision navigation stack",
      "Fleet coordination for multi-vehicle scheduling",
      "Auto and manual charging support"
    ],
    faqs: [
      {
        _key: "gh-faq-1",
        question: "When is Ground Handling Forklift AGV the right fit?",
        answer:
          "It fits sites that need reliable floor-level pallet transfer and short-haul autonomous dispatch without introducing a full high-rack forklift architecture."
      }
    ],
    seo: {
      title: "Ground Handling Forklift AGV | coolyne Warehouse Automation",
      description:
        "Laser-guided pallet transfer and short-haul autonomous dispatch for mixed-traffic warehouse and factory operations.",
      keywords: ["ground handling forklift agv", "warehouse automation", "pallet transfer agv"],
      canonicalUrl: "/products/ground-handling-forklift-agv",
      noindex: false,
      ogTitle: "Ground Handling Forklift AGV",
      ogDescription:
        "Floor-level pallet transfer and short-distance autonomous handling for industrial sites.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogDetailPage-products-lifting-agv",
    _type: "catalogDetailPage",
    section: "products",
    title: "Lifting AGV",
    slug: { _type: "slug", current: "lifting-agv" },
    label: "Low Profile",
    kicker: "Adaptive Internal Mobility",
    summary:
      "Compact autonomous lifting for under-pallet moves, workstation replenishment, and shared-aisle transport without fixed infrastructure.",
    metrics: [
      { _key: "lifting-metric-1", value: "1,000kg", label: "Payload" },
      { _key: "lifting-metric-2", value: "1.8m/s", label: "Speed" },
      { _key: "lifting-metric-3", value: "+/-5mm", label: "Accuracy" }
    ],
    features: [
      {
        _key: "lifting-feature-1",
        label: "Scenario",
        title: "Workstation Supply",
        description:
          "Automates repetitive internal replenishment with predictable mission loops and low human interference."
      },
      {
        _key: "lifting-feature-2",
        label: "Scenario",
        title: "Supermarket Replenishment",
        description:
          "Maintains point-of-use inventory while keeping shared aisles available for people and carts."
      },
      {
        _key: "lifting-feature-3",
        label: "Scenario",
        title: "Cart Transfer",
        description:
          "Handles low-profile load carriers for workshops, assembly support, and flexible cart movements."
      },
      {
        _key: "lifting-feature-4",
        label: "Advantage",
        title: "Route Flexibility",
        description:
          "Dynamic route planning adapts to temporary blocks and mixed-traffic environments without layout rework."
      }
    ],
    scenarios: [
      "Lean manufacturing workstation supply",
      "Supermarket replenishment and milk-run loops",
      "Cart transfer between process cells",
      "Flexible routes inside mixed-traffic workshops"
    ],
    integrations: [
      "Mission triggering from MES and production schedules",
      "Shared-aisle orchestration with manual traffic",
      "Traceable task history for line-side replenishment"
    ],
    faqs: [
      {
        _key: "lifting-faq-1",
        question: "What operational problem does Lifting AGV solve best?",
        answer:
          "It is ideal for factories and warehouses that need flexible internal transfer without tape guidance, fixed conveyors, or major floor modifications."
      }
    ],
    seo: {
      title: "Lifting AGV | coolyne Warehouse Automation",
      description:
        "Compact autonomous lifting for workstation supply, supermarket replenishment, and shared-aisle internal logistics.",
      keywords: ["lifting agv", "internal logistics agv", "warehouse automation"],
      canonicalUrl: "/products/lifting-agv",
      noindex: false,
      ogTitle: "Lifting AGV",
      ogDescription:
        "Flexible low-profile autonomous transport for dynamic internal material flow.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogDetailPage-products-storage-agv",
    _type: "catalogDetailPage",
    section: "products",
    title: "Storage AGV",
    slug: { _type: "slug", current: "storage-agv" },
    label: "ASRS Modular",
    kicker: "Dense Buffer Automation",
    summary:
      "High-density storage mobility for buffer zones, automated transfer, and release tasks inside scalable ASRS environments.",
    metrics: [
      { _key: "storage-metric-1", value: "+40%", label: "Space Use" },
      { _key: "storage-metric-2", value: "<90s", label: "Retrieval" },
      { _key: "storage-metric-3", value: "Modular", label: "Expansion" }
    ],
    features: [
      {
        _key: "storage-feature-1",
        label: "Capability",
        title: "Space Efficiency",
        description:
          "Supports compact buffer strategies that reduce floor dependency and improve cubic utilization."
      },
      {
        _key: "storage-feature-2",
        label: "Capability",
        title: "Retrieval Speed",
        description:
          "Maintains stable release timing for upstream and downstream systems in high-turn environments."
      },
      {
        _key: "storage-feature-3",
        label: "Scenario",
        title: "Dense Buffer Zones",
        description:
          "Handles inventory consolidation close to packing, kitting, and shipping operations."
      },
      {
        _key: "storage-feature-4",
        label: "Scenario",
        title: "Automated Transfer",
        description:
          "Moves loads between storage nodes and process stations with software-directed release logic."
      }
    ],
    scenarios: [
      "Dense buffer zone automation",
      "Automated transfer between storage and process nodes",
      "Storage release for controlled outbound waves"
    ],
    integrations: [
      "ASRS control layer synchronization",
      "Inventory traceability through WMS events",
      "Expansion-ready shuttle and buffer logic"
    ],
    faqs: [
      {
        _key: "storage-faq-1",
        question: "Where does Storage AGV create the most value?",
        answer:
          "It adds the most value in dense buffer and release environments where storage capacity, retrieval timing, and software-directed handoff all need to stay tightly coordinated."
      }
    ],
    seo: {
      title: "Storage AGV | coolyne Warehouse Automation",
      description:
        "High-density storage mobility for buffer zones, automated release, and ASRS-linked transfer operations.",
      keywords: ["storage agv", "asrs automation", "buffer zone automation"],
      canonicalUrl: "/products/storage-agv",
      noindex: false,
      ogTitle: "Storage AGV",
      ogDescription:
        "Dense storage mobility for scalable ASRS and automated inventory release.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogDetailPage-products-agv-roller",
    _type: "catalogDetailPage",
    section: "products",
    title: "AGV Roller",
    slug: { _type: "slug", current: "agv-roller" },
    label: "Flow Control",
    kicker: "Precision Engineering",
    summary:
      "A mobile conveyor link that connects fixed automation with flexible transport for cartons, bins, and packing transfer.",
    metrics: [
      { _key: "roller-metric-1", value: "2-Way", label: "Transfer Flow" },
      { _key: "roller-metric-2", value: "PLC/WCS", label: "Handshake" },
      { _key: "roller-metric-3", value: "24/7", label: "Operation" }
    ],
    features: [
      {
        _key: "roller-feature-1",
        label: "Scenario",
        title: "Conveyor Handoff",
        description:
          "Bridges fixed conveyor lines with autonomous missions to absorb layout constraints and peak variability."
      },
      {
        _key: "roller-feature-2",
        label: "Scenario",
        title: "Carton Transfer",
        description:
          "Moves cartons between sortation, packing, and dispatch points without manual relays."
      },
      {
        _key: "roller-feature-3",
        label: "Scenario",
        title: "Adaptive Routing",
        description:
          "Allows alternate paths and mission logic when lines are congested or temporarily offline."
      },
      {
        _key: "roller-feature-4",
        label: "Ecosystem",
        title: "Fixed-to-Mobile Synergy",
        description:
          "Extends conveyor reach into flexible automation zones where fixed equipment alone is not enough."
      }
    ],
    scenarios: [
      "Conveyor handoff at buffer edges",
      "Carton transfer for packing and dispatch",
      "Hybrid automation between fixed and mobile zones",
      "Modular routing during phased expansion"
    ],
    integrations: [
      "Conveyor PLC handshake",
      "Mission release from WCS orchestration",
      "Hybrid automation routing logic"
    ],
    faqs: [
      {
        _key: "roller-faq-1",
        question: "Why use AGV Roller instead of extending fixed conveyors?",
        answer:
          "It is the better fit when throughput must expand across changing layouts, temporary zones, or phased automation areas where fixed conveyor lines alone become too rigid."
      }
    ],
    seo: {
      title: "AGV Roller | coolyne Warehouse Automation",
      description:
        "A mobile conveyor bridge for cartons, bins, and hybrid transfer between fixed automation and flexible transport zones.",
      keywords: ["agv roller", "mobile conveyor agv", "warehouse transfer automation"],
      canonicalUrl: "/products/agv-roller",
      noindex: false,
      ogTitle: "AGV Roller",
      ogDescription:
        "Hybrid transfer automation connecting conveyor infrastructure with mobile logistics.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogDetailPage-products-composite-mobile-robot",
    _type: "catalogDetailPage",
    section: "products",
    title: "Composite Mobile Robot",
    slug: { _type: "slug", current: "composite-mobile-robot" },
    label: "Next-Gen Tech",
    kicker: "Adaptive Logic",
    summary:
      "A move-and-work platform that combines mobile autonomy with manipulation for flexible fulfillment, line-side tasks, and mixed-item handling.",
    metrics: [
      { _key: "cmr-metric-1", value: "10kg", label: "Handling" },
      { _key: "cmr-metric-2", value: "1.2-1.5m", label: "Speed" },
      { _key: "cmr-metric-3", value: "0.02mm", label: "Arm Precision" }
    ],
    features: [
      {
        _key: "cmr-feature-1",
        label: "Scenario",
        title: "Move-and-Work Automation",
        description:
          "Brings robot arms directly to the task instead of forcing the task to travel back to fixed stations."
      },
      {
        _key: "cmr-feature-2",
        label: "Scenario",
        title: "Flexible Fulfillment",
        description:
          "Handles mixed-item operations, replenishment, and assisted picking with adaptive vision logic."
      },
      {
        _key: "cmr-feature-3",
        label: "Advantage",
        title: "Workflow Adaptability",
        description:
          "Lets operators introduce new SKUs, stations, and task sequences without rebuilding the line."
      },
      {
        _key: "cmr-feature-4",
        label: "Integration",
        title: "Seamless Ecosystem Integration",
        description:
          "Works alongside WMS, picking software, and transport fleets to create hybrid execution flows."
      }
    ],
    scenarios: [
      "Move-and-work automation for kitting and value-add tasks",
      "Flexible fulfillment with irregular item handling",
      "Point-of-use material handling and assisted picking"
    ],
    integrations: [
      "Vision-guided task execution",
      "Hybrid transport and manipulation orchestration",
      "Workflow change management with software rules"
    ],
    faqs: [
      {
        _key: "cmr-faq-1",
        question: "What makes Composite Mobile Robot different from a standard AMR?",
        answer:
          "It does more than move inventory. By combining autonomous navigation with manipulation capability, it can perform work directly at the point of operation."
      }
    ],
    seo: {
      title: "Composite Mobile Robot | coolyne Warehouse Automation",
      description:
        "A move-and-work robotics platform combining mobile autonomy, manipulation, and vision-guided execution for hybrid operations.",
      keywords: ["composite mobile robot", "mobile manipulation robot", "warehouse robotics"],
      canonicalUrl: "/products/composite-mobile-robot",
      noindex: false,
      ogTitle: "Composite Mobile Robot",
      ogDescription:
        "Mobile manipulation for flexible fulfillment, line-side support, and adaptive hybrid automation.",
      twitterCard: "summary_large_image"
    }
  },
  {
    _id: "catalogOverviewPage-solutions",
    _type: "catalogOverviewPage",
    section: "solutions",
    title: "Warehouse and Logistics Automation Solutions",
    kicker: "Engineering Excellence",
    summary:
      "Integrated systems for storage, material movement, fulfillment, and digital control across complex warehouse and manufacturing sites.",
    metrics: [
      { _key: "solutions-metric-1", value: "4", label: "Solution Domains" },
      { _key: "solutions-metric-2", value: "Site-Wide", label: "Operational Scope" },
      { _key: "solutions-metric-3", value: "Unified", label: "Control Architecture" }
    ],
    cards: [
      {
        _key: "solutions-card-asrs",
        href: "/solutions/asrs",
        title: "ASRS",
        label: "Density Engine",
        summary:
          "Automated storage and retrieval for high-density finished goods, raw materials, and controlled-environment inventory.",
        metrics: [
          { _key: "solutions-card-asrs-metric-1", value: "Unit Load", label: "Heavy Storage" },
          { _key: "solutions-card-asrs-metric-2", value: "Mini Load", label: "Bin Storage" },
          { _key: "solutions-card-asrs-metric-3", value: "99.9%", label: "Retrieval Accuracy" }
        ]
      },
      {
        _key: "solutions-card-software",
        href: "/solutions/software",
        title: "Software",
        label: "Digital Intelligence",
        summary:
          "The digital control layer connecting WMS, WCS, fleet orchestration, alerts, analytics, and enterprise integration.",
        metrics: [
          { _key: "solutions-card-software-metric-1", value: "Unified", label: "Control Layer" },
          { _key: "solutions-card-software-metric-2", value: "Real-Time", label: "Visibility" },
          { _key: "solutions-card-software-metric-3", value: "Enterprise", label: "Integration" }
        ]
      }
    ],
    capabilities: [
      "Opportunity sizing and site diagnostics",
      "Simulation-based system design",
      "Integration planning across software and equipment",
      "Commissioning and performance handover"
    ],
    faqs: [
      {
        _key: "solutions-faq-1",
        question: "What does the solutions layer represent?",
        answer:
          "It represents integrated operating models such as ASRS, material handling, picking, and warehouse software instead of isolated products."
      },
      {
        _key: "solutions-faq-2",
        question: "How should buyers evaluate the right solution layer?",
        answer:
          "Start from storage density, transfer logic, fulfillment speed, and software visibility requirements, then map the solution stack that best supports the site workflow."
      }
    ]
  },
  {
    _id: "catalogDetailPage-solutions-asrs",
    _type: "catalogDetailPage",
    section: "solutions",
    title: "ASRS",
    slug: { _type: "slug", current: "asrs" },
    label: "Density Engine",
    kicker: "Redefining Density through Intelligent Retrieval",
    summary:
      "Automated storage and retrieval architecture for high-density inventory, predictable release timing, and software-defined warehouse control.",
    metrics: [
      { _key: "solution-detail-metric-1", value: "Unit Load", label: "Heavy Storage" },
      { _key: "solution-detail-metric-2", value: "Mini Load", label: "Bin Storage" },
      { _key: "solution-detail-metric-3", value: "99.9%", label: "Retrieval Accuracy" }
    ],
    features: [
      {
        _key: "solution-feature-1",
        label: "Architecture",
        title: "Space Efficiency",
        description:
          "Converts vertical space into productive storage capacity without trading away retrieval speed."
      },
      {
        _key: "solution-feature-2",
        label: "Architecture",
        title: "Inventory Traceability",
        description:
          "Tracks every pallet, tote, and bin through a software-defined location and release model."
      },
      {
        _key: "solution-feature-3",
        label: "Scenario",
        title: "Finished Goods Storage",
        description:
          "Stabilizes outbound release timing for palletized goods with predictable retrieval windows."
      },
      {
        _key: "solution-feature-4",
        label: "Integration",
        title: "AGV Orchestration",
        description:
          "Coordinates storage towers, transfer points, and mobile fleets as a single execution fabric."
      }
    ],
    scenarios: [
      "Finished goods storage and release",
      "Component and raw-material buffering",
      "Cold-chain or controlled-environment inventory"
    ],
    integrations: [
      "WMS and WCS integration",
      "Unified node command and task dispatch",
      "Transfer synchronization with AGV fleets"
    ],
    capabilities: [
      "Storage topology assessment",
      "Simulation-backed throughput sizing",
      "Transfer node integration planning",
      "Commissioning and operational handover"
    ],
    faqs: [
      {
        _key: "solution-detail-faq-1",
        question: "What kind of site is best suited to ASRS?",
        answer:
          "ASRS is best suited to operations that need high-density storage, consistent retrieval timing, and tighter control over pallet, tote, or bin movement across the full warehouse flow."
      }
    ],
    seo: {
      title: "ASRS | coolyne Warehouse Automation Solutions",
      description:
        "Automated storage and retrieval solutions for dense inventory, predictable release, and integrated warehouse control.",
      keywords: ["ASRS", "warehouse automation solutions", "automated storage retrieval"],
      canonicalUrl: "/solutions/asrs",
      noindex: false,
      ogTitle: "ASRS",
      ogDescription: "High-density automated storage and retrieval for scalable warehouse operations.",
      twitterCard: "summary_large_image"
    }
  }
];

async function main() {
  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`Upserted ${doc._id}`);
  }

  console.log(
    `Stage 3 catalog content seeded to Sanity project ${projectId}, dataset ${dataset}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

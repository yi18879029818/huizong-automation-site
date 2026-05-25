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
        question: "How should we validate the Stage 3 product layer?",
        answer:
          "Publish this sample document, refresh the products pages, and confirm that the CMS summary, cards, and metrics replace the fallback MDX values."
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
      "A Sanity-managed test document for the AGV forklift page, designed to verify that Stage 3 content overrides the legacy MDX fallback.",
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
        question: "What should change on the AGV forklift page after Stage 3 seeding?",
        answer:
          "The title, summary, metrics, features, scenarios, and integrations should come from Sanity instead of the fallback MDX exports."
      }
    ],
    seo: {
      title: "Forklift Stacker AGV | Sanity Stage 3 Verification",
      description:
        "Verification document for the Stage 3 Sanity product detail layer on the Forklift Stacker AGV page.",
      keywords: ["AGV forklift", "Sanity CMS", "warehouse automation"],
      canonicalUrl: "/products/agv-forklift",
      noindex: false,
      ogTitle: "Forklift Stacker AGV",
      ogDescription:
        "Sanity-powered verification content for the AGV forklift product page.",
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
        question: "How should Stage 3 solutions be validated?",
        answer:
          "Publish the solutions sample documents and confirm that the overview cards and ASRS detail copy update on the live pages."
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
      "A Sanity-managed ASRS verification document for Stage 3, proving that solution-level architecture content can now be edited in CMS.",
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
        question: "What should change on the ASRS page after Stage 3 seeding?",
        answer:
          "The summary, metrics, feature blocks, scenarios, integrations, and metadata should all come from Sanity."
      }
    ],
    seo: {
      title: "ASRS | Sanity Stage 3 Verification",
      description:
        "Verification document for the Stage 3 Sanity solutions layer on the ASRS page.",
      keywords: ["ASRS", "Sanity CMS", "warehouse solutions"],
      canonicalUrl: "/solutions/asrs",
      noindex: false,
      ogTitle: "ASRS",
      ogDescription: "Sanity-powered verification content for the ASRS solutions page.",
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
    `Stage 3 sample content seeded to Sanity project ${projectId}, dataset ${dataset}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

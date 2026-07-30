import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Set SANITY_WRITE_TOKEN before running this script.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "axzpb83z",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-05-23",
  token,
  useCdn: false
});

const key = (prefix = "k") => `${prefix}-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
const block = (text, style = "normal", extra = {}) => ({
  _type: "block", _key: key("block"), style, markDefs: [], children: [{ _type: "span", _key: key("span"), text, marks: [] }], ...extra
});
const h2 = (text) => block(text, "h2");
const bullets = (items) => items.map((text) => block(text, "normal", { listItem: "bullet", level: 1 }));
const table = (headers, rows) => ({ _type: "comparisonTable", _key: key("table"), headers, rows });

const dimensions = {
  electronics01: [1294, 646], electronics02: [1294, 646], electronics03: [544, 365], electronics04: [544, 365], electronics05: [544, 365], electronics06: [544, 365], electronics07: [544, 365],
  mini: [913, 905], unit: [913, 905], facility: [1076, 611], routes: [1639, 914], workshop: [1296, 1884],
  upgrade01: [1659, 927], upgrade02: [1659, 927], upgrade03: [1659, 927], upgrade04: [1659, 927], upgradeWorkflow: [1659, 927],
  smart01: [1423, 752], smart02: [1659, 927], smart03: [1659, 927], smart04: [1659, 927], smart05: [1659, 927]
};

function image(folder, filename, alt, dimensionKey, caption) {
  const [width, height] = dimensions[dimensionKey];
  return { _type: "staticImage", _key: key("image"), src: `/images/case-studies/${folder}/${filename}`, alt, width, height, ...(caption ? { caption } : {}) };
}

const electronicsImages = [
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-01.webp", "Automated electronics manufacturing warehouse with material handling equipment", "electronics01"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-02.webp", "Electronics factory logistics automation workflow", "electronics02"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-03.webp", "Stacker equipment in the electronics manufacturer project", "electronics03"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-04.webp", "Forklift AGV in the electronics manufacturer project", "electronics04"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-05.webp", "Lifting AGV in the electronics manufacturer project", "electronics05"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-06.webp", "Line-side warehouse automation equipment", "electronics06"),
  image("electronics-manufacturer-warehouse-automation", "electronics-factory-07.webp", "Logistics control system for the electronics manufacturer project", "electronics07")
];
const miniImage = image("mini-load-asrs-bin-storage", "mini-load-asrs.webp", "Mini load ASRS for bin storage and production supply", "mini");
const unitImage = image("unit-load-asrs-pallet-handling", "unit-load-asrs.webp", "Unit load ASRS for finished goods pallet handling", "unit");
const workshopImages = [
  image("workshop-intralogistics-automation", "facility-layout-and-process-flow.webp", "Workshop intralogistics facility layout and process flow", "facility"),
  image("workshop-intralogistics-automation", "agv-route-planning-and-traffic-paths.webp", "Autonomous forklift route planning and traffic paths", "routes"),
  image("workshop-intralogistics-automation", "workshop-intralogistics-agv.webp", "Autonomous forklift used in workshop intralogistics automation", "workshop")
];
const upgradeImages = [
  image("automated-warehouse-upgrade", "warehouse-upgrade-01.webp", "Automated warehouse upgrade with ASRS system", "upgrade01"),
  image("automated-warehouse-upgrade", "warehouse-upgrade-02.webp", "ASRS storage and retrieval equipment", "upgrade02"),
  image("automated-warehouse-upgrade", "warehouse-upgrade-03.webp", "Warehouse conveyor interface for the ASRS upgrade", "upgrade03"),
  image("automated-warehouse-upgrade", "warehouse-upgrade-04.webp", "Warehouse system control workflow", "upgrade04"),
  image("automated-warehouse-upgrade", "warehouse-upgrade-workflow.webp", "Automated warehouse storage and retrieval workflow", "upgradeWorkflow")
];
const smartImages = [
  image("smart-home-manufacturing-agv", "smart-home-agv-01.webp", "Roller AGV supporting smart home manufacturing", "smart01"),
  image("smart-home-manufacturing-agv", "smart-home-agv-02.webp", "Empty tray delivery with roller AGV", "smart02"),
  image("smart-home-manufacturing-agv", "smart-home-agv-03.webp", "Finished goods transfer with roller AGV", "smart03"),
  image("smart-home-manufacturing-agv", "smart-home-agv-04.webp", "AGV digital twin system screen", "smart04"),
  image("smart-home-manufacturing-agv", "smart-home-agv-05.webp", "AGV fleet configuration for the smart home manufacturing project", "smart05")
];

function seo(title, summary, slug) {
  return { title, description: summary, canonicalUrl: `/case-studies/projects/${slug}`, noindex: false, ogTitle: title, ogDescription: summary, twitterCard: "summary_large_image" };
}

const studies = [
  {
    _id: "case-study-electronics-manufacturer-warehouse-automation", _type: "caseStudy", orderRank: 1,
    title: "Warehouse Automation Solutions for an Electronics Manufacturer", slug: { _type: "slug", current: "electronics-manufacturer-warehouse-automation" }, category: "Material Handling", industry: "Electronics Manufacturing", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "Integrated AGV, line-side storage, and software orchestration for raw materials, WIP transfers, finished-goods outbound logistics, and line-side supply.", coverImage: electronicsImages[0], gallery: electronicsImages,
    metrics: [{ _key: key(), value: "0 FTEs", label: "Reported labor reduction" }, { _key: key(), value: "1 year", label: "Reported ROI" }],
    background: [block("The electronics manufacturer required a connected approach to raw material handling, work-in-process transfers, finished product outbound logistics, and line-side storage. The project was designed around its production and processing workflows to support a more autonomous smart-factory operation.")],
    objectives: [h2("Project objectives"), ...bullets(["Connect raw material handling, WIP movement, finished goods outbound logistics, and line-side storage.", "Align material delivery with production cadence and assembly responsiveness.", "Provide a shared software layer for visibility, monitoring, and operational coordination."])],
    assessment: [block("Material-flow and payload analysis informed the AGV fleet configuration. The engineering review also considered the factory layout, production cadence, line-side access, and the interface needs of the logistics control layer.")],
    solution: [h2("Integrated automation solution"), block("The delivered concept combined AGV fleet analysis, customized logistics automation, and line-side storage optimization. A unified WES, WMS, and RCS control suite with a 3D digital twin was planned to support visualisation, predictive monitoring, and data-driven optimization."), ...bullets(["AGV fleet configuration based on material-flow and payload analysis.", "Customized logistics automation aligned with factory layout and production rhythm.", "Line-side storage optimization to reduce downtime risk and improve access.", "WES, WMS, RCS, and 3D digital-twin integration for operational visibility."])],
    workflow: [block("The project connects raw material supply, work-in-process transfers, production-line delivery, and finished-goods outbound flow in one coordinated logistics model.")],
    scope: table(["System area", "Project scope"], [["Material handling", "Raw material, WIP, and finished-goods logistics"], ["Line-side logistics", "Line-side storage and material delivery"], ["Control", "WES, WMS, RCS, and 3D digital-twin visibility"]]),
    result: [block("The intended result was a connected production logistics system spanning raw material receipt through finished-goods outbound movement, with the operational foundation for lights-out process coordination.")],
    seo: seo("Warehouse Automation Solutions for an Electronics Manufacturer", "Electronics manufacturing warehouse automation case study covering AGV fleet planning, line-side logistics, and software orchestration.", "electronics-manufacturer-warehouse-automation")
  },
  {
    _id: "case-study-mini-load-asrs-bin-storage", _type: "caseStudy", orderRank: 2,
    title: "Mini Load Automated Storage and Retrieval System for Bin Storage", slug: { _type: "slug", current: "mini-load-asrs-bin-storage" }, category: "ASRS", industry: "Electronics Assembly", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "Mini load ASRS for small-parts storage, production-line supply, ERP integration, and more controlled inventory handling.", coverImage: miniImage, gallery: [miniImage],
    metrics: [{ _key: key(), value: "2 operators", label: "Reported labor reduction" }, { _key: key(), value: "11 months", label: "Reported payback" }, { _key: key(), value: "±5 mm", label: "Docking accuracy" }],
    background: [block("An electronics assembly company needed a more efficient way to store and supply small parts used in production. The mini load ASRS was designed to store components and feed them to production lines as needed, with ERP and automated assembly-line interfaces supporting a more connected workflow.")],
    objectives: [h2("Project objectives"), ...bullets(["Improve small-parts storage and production-line supply.", "Connect the system with ERP and automated assembly lines.", "Improve inventory organization and material visibility."])],
    assessment: [block("The engineering assessment focused on small-part storage needs, line-side delivery conditions, system interfaces, and the required rack-to-line and sorting-station handling path.")],
    solution: [block("The solution adopted a mini load ASRS stacker using laser and vision-based navigation. A built-in lifting unit and telescopic fork support handling between racks, production lines, and sorting locations. Open API interfaces were provided for MES, WES, and ERP integration.")],
    workflow: [block("Small components are stored in the ASRS, retrieved by the stacker as needed, and transferred toward production or sorting points through the integrated material flow.")],
    specifications: table(["Item", "Project information"], [["Navigation", "Laser and vision based"], ["Docking accuracy", "Up to ±5 mm"], ["Interfaces", "MES, WES, ERP"], ["Handling", "Built-in lift unit and telescopic fork"]]),
    scope: table(["Scope area", "Delivered capability"], [["Storage", "Mini load ASRS for small components"], ["Production supply", "Rack, production-line, and sorting-station transfers"], ["Integration", "ERP and automated assembly-line interfaces"]]),
    result: [block("The system was tested, deployed, and integrated with the existing software and automated lines. Following on-site support, it operated steadily and replaced a portion of manual line supply work, improving organization, visibility, and delivery consistency.")],
    seo: seo("Mini Load Automated Storage and Retrieval System for Bin Storage", "Mini load ASRS case study for electronics assembly bin storage and production-line supply.", "mini-load-asrs-bin-storage")
  },
  {
    _id: "case-study-unit-load-asrs-pallet-handling", _type: "caseStudy", orderRank: 3,
    title: "Unit Load ASRS for Finished Goods Pallet Handling", slug: { _type: "slug", current: "unit-load-asrs-pallet-handling" }, category: "ASRS", industry: "Home Appliance Manufacturing", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "Unit load ASRS and AGV forklift coordination for finished-goods pallet storage, safer handling, and higher storage capacity.", coverImage: unitImage, gallery: [unitImage],
    metrics: [{ _key: key(), value: "100%", label: "Reported storage capacity increase" }, { _key: key(), value: "12 months", label: "Reported payback" }],
    background: [block("A washing-machine manufacturer required a pallet ASRS for finished goods to improve safety and increase storage capacity without expanding the warehouse footprint.")],
    objectives: [h2("Project objectives"), ...bullets(["Increase finished-goods storage capacity without adding floor area.", "Improve handling safety for palletized products.", "Connect storage data with the manufacturer’s ERP system."])],
    assessment: [block("The assessment reviewed inbound and outbound pallet movement, rack height, storage density, and the interface between an AGV forklift, the ASRS stacker crane, and the warehouse software layer.")],
    solution: [block("The solution used four-level racking at a 4 m height, one AGV forklift, and an ASRS stacker crane. The logistics control system provided real-time storage data and ERP integration.")],
    workflow: [block("Finished goods are received by the AGV forklift, stored through the ASRS stacker crane, and released through a controlled outbound process supported by warehouse software.")],
    specifications: table(["Item", "Project information"], [["Racking", "Four levels at 4 m height"], ["Material handling", "One AGV forklift and ASRS stacker crane"], ["Data layer", "Real-time storage data and ERP integration"]]),
    scope: table(["Scope area", "Delivered capability"], [["Finished goods", "Pallet storage and retrieval"], ["Warehouse safety", "Automated handling flow"], ["Software", "Logistics control and ERP connection"]]),
    result: [block("The deployment increased washing-machine storage capacity without additional floor space. Following commissioning and on-site support, the system was reported as stable in operation.")],
    seo: seo("Unit Load ASRS for Finished Goods Pallet Handling", "Unit load ASRS case study for finished-goods pallet storage and ERP-connected warehouse handling.", "unit-load-asrs-pallet-handling")
  },
  {
    _id: "case-study-workshop-intralogistics-automation", _type: "caseStudy", orderRank: 4,
    title: "Workshop Intralogistics Automation", slug: { _type: "slug", current: "workshop-intralogistics-automation" }, category: "Material Handling", industry: "Packaging Manufacturing", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "Autonomous forklift project for workshop-to-warehouse material flow, production-line supply, and finished-goods handling.", coverImage: workshopImages[0], gallery: workshopImages,
    metrics: [{ _key: key(), value: "150,000 m²", label: "Facility area" }, { _key: key(), value: "4", label: "Autonomous forklifts" }, { _key: key(), value: "1.6 t", label: "Rated load" }, { _key: key(), value: "2 years", label: "Reported ROI" }],
    background: [block("A large packaging manufacturer in China operated a 150,000 m² facility with highly automated production lines but manual internal material handling. The project focused on first-floor workshop flow, a secondary warehouse, and finished-goods warehouse movements.")],
    objectives: [h2("Project objectives"), ...bullets(["Support full-process, pull-based logistics across workshop and warehouse operations.", "Automate raw-material delivery and finished-goods storage movement.", "Replace repeatable manual forklift transport with autonomous handling."])],
    assessment: [block("The assessment mapped four production lines and daily material movement. It identified 44 pallets per day from the secondary warehouse, 38 pallets per day from the raw-material warehouse, and 162 finished-goods pallets per day. The design also considered staging, receiving, floor conditions, wireless coverage, and the final manual 10 m where applicable.")],
    solution: [block("Four laser-SLAM autonomous forklifts were selected for central task dispatch, wireless communication, pickup and drop-off coordination, and workshop-to-warehouse material flow. The design included charging stations, network infrastructure, and operating safety measures."), ...bullets(["Central task calling and dispatch.", "Autonomous routes for raw materials, semi-finished materials, and finished goods.", "Staging and receiving station coordination.", "Wireless network and charging support."])],
    workflow: [block("The planned logistics model connects warehouse supply, workshop delivery, production-line movement, and finished-goods warehouse return through centrally dispatched autonomous forklifts.")],
    specifications: table(["Item", "Specification"], [["Navigation", "Laser SLAM"], ["Rated load", "1,600 kg"], ["Standard lift", "205 ±5 mm"], ["Speed", "1.5 m/s loaded; 1.8 m/s unloaded"], ["Navigation accuracy", "±10 mm"], ["Battery", "51.2 V / 40 Ah lithium iron phosphate"], ["Endurance", "8 hours"]]),
    scope: table(["Scope", "Quantity / detail"], [["Autonomous transport forklifts", "4 units, 1.6 t, 200 mm lifting"], ["Charging stations", "2 units"], ["Traffic and safety", "Task dispatch, charging, wireless, and safety support"], ["Expected manual replacement", "3–5 manual forklifts and operators"]]),
    result: [block("The design provided a repeatable autonomous handling model across workshop and warehouse routes. The legacy project assessment estimated a reduction of 3–5 manual forklifts and operators, with a two-year ROI estimate.")],
    seo: seo("Workshop Intralogistics Automation", "Autonomous forklift intralogistics case study for packaging manufacturing workshop and warehouse material flow.", "workshop-intralogistics-automation")
  },
  {
    _id: "case-study-automated-warehouse-upgrade", _type: "caseStudy", orderRank: 5,
    title: "Automated Warehouse Upgrade with ASRS System", slug: { _type: "slug", current: "automated-warehouse-upgrade" }, category: "ASRS", industry: "Electronics Manufacturing", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "ASRS warehouse upgrade combining stacker cranes, conveyors, inventory software, and AGV docking for automated storage and retrieval.", coverImage: upgradeImages[0], gallery: upgradeImages,
    metrics: [{ _key: key(), value: "5", label: "Stacker cranes" }, { _key: key(), value: "2,776", label: "Storage locations" }, { _key: key(), value: "10", label: "Conveyor sets" }, { _key: key(), value: "3 years", label: "Reported payback" }],
    background: [block("After an earlier AGV material-handling project, the manufacturer required a warehouse modernization to improve storage density, inventory control, and handling efficiency for semi-finished materials.")],
    objectives: [h2("Project objectives"), ...bullets(["Automate semi-finished material storage and warehouse logistics.", "Support end-of-line automatic putaway and pull-based inbound supply for downstream processes.", "Replace repeatable manual warehouse transport with driverless material handling."])],
    assessment: [block("The warehouse analysis covered SMT and insertion buffer inventory, storage categories, and inbound/outbound flow. The calculated design considered 120 SMT carts per day and 105 insertion carts per day, together with the required storage and transfer capacity.")],
    solution: [block("The upgrade combined stacker storage and retrieval, central control, wireless communication, capacity and workflow planning, floor and fire-preparation review, docking preparation, and AGV machine-side transfer. WMS and WCS were included for warehouse execution and control.")],
    workflow: [block("Semi-finished materials move from production to ASRS storage through automated putaway. WMS and WCS coordinate storage locations, stacker-crane tasks, conveyor interfaces, and pull-based release to downstream operations.")],
    specifications: table(["Item", "Specification"], [["Stacker crane payload", "Up to 25 kg"], ["Travel speed", "1 m/s"], ["Lift speed", "0.5 m/s"], ["Travel accuracy", "±5 mm"], ["Lift accuracy", "±3 mm"], ["Control", "PLC with industrial wireless communication"]]),
    scope: table(["Scope", "Quantity / detail"], [["Stacker cranes", "5 units"], ["Tray storage locations", "2,776"], ["Conveyor sets", "10 units"], ["WMS / WCS", "Warehouse management and control"], ["Labor reduction", "3 warehouse operators"]]),
    result: [block("The project defined a connected ASRS upgrade for automated storage, retrieval, and production interface handling. The legacy assessment estimated a reduction of three warehouse operators and a three-year payback period.")],
    seo: seo("Automated Warehouse Upgrade with ASRS System", "ASRS warehouse upgrade case study covering stacker cranes, conveyors, WMS, WCS, and automated material flow.", "automated-warehouse-upgrade")
  },
  {
    _id: "case-study-smart-home-manufacturing-agv", _type: "caseStudy", orderRank: 6,
    title: "Automated Guided Vehicle Project for Smart Home Manufacturing", slug: { _type: "slug", current: "smart-home-manufacturing-agv" }, category: "Material Handling", industry: "Smart Home Manufacturing", projectDate: "2026-04-06", publishedAt: "2026-04-06T00:00:00.000Z",
    summary: "Roller AGVs for empty-tray delivery and finished-goods transfer in a smart-home manufacturing workflow.", coverImage: smartImages[0], gallery: smartImages,
    metrics: [{ _key: key(), value: "150 kg", label: "Payload" }, { _key: key(), value: ">8 h", label: "Endurance" }, { _key: key(), value: "1.5 m/s", label: "Maximum speed" }, { _key: key(), value: "11", label: "Recommended AGVs for peak demand" }],
    background: [block("The smart-home manufacturer had automated production lines but relied on manual internal material handling. The project addressed empty-tray delivery and finished-goods transfer so employees could focus more on technical maintenance, monitoring, and adjustment.")],
    objectives: [h2("Project objectives"), ...bullets(["Automate empty-tray delivery and finished-goods transfer.", "Support full-process production logistics.", "Create a demonstrable smart-manufacturing material-handling workflow."])],
    assessment: [block("The route and cycle-time assessment covered six material lanes. The calculated baseline requirement was nine AGVs; the legacy recommendation was 11 units to address peak demand.")],
    solution: [block("The project used roller AGVs with laser-SLAM navigation, task scheduling, and digital-twin visibility. The equipment and control approach was designed for autonomous transfer between production stations and material-handling points.")],
    workflow: [block("Empty trays are dispatched to production points, finished goods are transferred away from the line, and AGV task status is coordinated through the scheduling and visualization layer.")],
    specifications: table(["Item", "Specification"], [["AGV type", "Roller AGV"], ["Navigation", "Laser SLAM"], ["Payload", "150 kg"], ["Endurance", ">8 hours"], ["Maximum speed", "1.5 m/s"], ["Repeat positioning", "±10 mm, ±0.5°"], ["Battery", "48 V / 24 Ah lithium iron phosphate"], ["Communication", "Dual-band Wi-Fi"], ["Structural and Electrical Design", "Chuangjingrui"], ["Overall Industrial Design", "Chuangjingrui"]]),
    scope: table(["Scope", "Quantity / detail"], [["AGV requirement", "9 calculated baseline units"], ["Peak-demand recommendation", "11 roller AGVs"], ["Transfer tasks", "Empty tray delivery and finished-goods transfer"], ["Control layer", "Task scheduling and digital-twin visualization"]]),
    result: [block("The project established an automated material-delivery model that supports labor reduction, delivery consistency, smart-factory presentation, and future system expansion. The legacy project assessment estimated a two-year ROI.")],
    seo: seo("Automated Guided Vehicle Project for Smart Home Manufacturing", "Roller AGV project case study for smart home manufacturing material handling and digital-twin visibility.", "smart-home-manufacturing-agv")
  }
];

await client.transaction(studies.map((study) => ({ createOrReplace: study }))).commit();
console.log(JSON.stringify({ status: "ok", caseStudies: studies.map(({ slug, title }) => ({ slug, title })) }, null, 2));

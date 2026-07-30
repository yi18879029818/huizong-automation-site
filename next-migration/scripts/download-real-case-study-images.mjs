import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("case-study-assets");
const base = "https://whse.robotlyne.com/wp-content/uploads/2026/04";
const files = [
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-01.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-1.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-02.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-2.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-03.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-3.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-04.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-4.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-05.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-5.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-06.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-7.webp"],
  ["electronics-manufacturer-warehouse-automation", "electronics-factory-07.webp", "Automated-Warehouse-Solutions-for-FuLaiDi-Factory-8.webp"],
  ["mini-load-asrs-bin-storage", "mini-load-asrs.webp", "Mini-Load-Automated-Storage-and-Retrieval-System-for-Bin-Storage-1.webp"],
  ["unit-load-asrs-pallet-handling", "unit-load-asrs.webp", "Unit-Load-ASRA-1.webp"],
  ["workshop-intralogistics-automation", "facility-layout-and-process-flow.webp", "Facility-Layout-and-Process-Flow.webp"],
  ["workshop-intralogistics-automation", "agv-route-planning-and-traffic-paths.webp", "AGV-Route-Planning-and-Traffic-Paths.webp"],
  ["workshop-intralogistics-automation", "workshop-intralogistics-agv.webp", "Meiruijia-Workshop-Intralogistics-Automation-5.webp"],
  ["automated-warehouse-upgrade", "warehouse-upgrade-01.webp", "Automated-Warehouse-Upgrade-with-ASRS-System-7.webp"],
  ["automated-warehouse-upgrade", "warehouse-upgrade-02.webp", "Automated-Warehouse-Upgrade-with-ASRS-System-1.webp"],
  ["automated-warehouse-upgrade", "warehouse-upgrade-03.webp", "Automated-Warehouse-Upgrade-with-ASRS-System-2.webp"],
  ["automated-warehouse-upgrade", "warehouse-upgrade-04.webp", "Automated-Warehouse-Upgrade-with-ASRS-System-3.webp"],
  ["automated-warehouse-upgrade", "warehouse-upgrade-workflow.webp", "19.webp"],
  ["smart-home-manufacturing-agv", "smart-home-agv-01.webp", "Automated-Guided-Vehicle-Project-for-Smart-Home-Manufacturing-1.webp"],
  ["smart-home-manufacturing-agv", "smart-home-agv-02.webp", "Automated-Guided-Vehicle-Project-for-Smart-Home-Manufacturing-2.webp"],
  ["smart-home-manufacturing-agv", "smart-home-agv-03.webp", "Automated-Guided-Vehicle-Project-for-Smart-Home-Manufacturing-3.webp"],
  ["smart-home-manufacturing-agv", "smart-home-agv-04.webp", "Automated-Guided-Vehicle-Project-for-Smart-Home-Manufacturing-4.webp"],
  ["smart-home-manufacturing-agv", "smart-home-agv-05.webp", "Automated-Guided-Vehicle-Project-for-Smart-Home-Manufacturing-5.webp"]
];

const manifest = [];
for (const [folder, targetName, sourceName] of files) {
  const outputDir = path.join(root, folder);
  const outputPath = path.join(outputDir, targetName);
  await fs.mkdir(outputDir, { recursive: true });
  const response = await fetch(`${base}/${sourceName}`);
  if (!response.ok) throw new Error(`Failed ${sourceName}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
  const metadata = await sharp(buffer).metadata();
  manifest.push({ src: `/images/case-studies/${folder}/${targetName}`, width: metadata.width, height: metadata.height });
}

await fs.writeFile(path.join(root, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));

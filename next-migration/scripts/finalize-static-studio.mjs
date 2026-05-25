import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const sourceStaticDir = path.join(appRoot, "public", "studio", "static");
const targetStaticDir = path.join(appRoot, ".open-next", "assets", "studio", "static");

const manifestFiles = [
  "create-manifest.json",
  "0b7750b6.create-schema.json",
  "e523f8b0.create-tools.json"
];

if (!fs.existsSync(sourceStaticDir) || !fs.existsSync(targetStaticDir)) {
  console.log("Skipping static studio finalization because source or target directory is missing.");
  process.exit(0);
}

for (const fileName of manifestFiles) {
  const sourcePath = path.join(sourceStaticDir, fileName);
  const targetPath = path.join(targetStaticDir, fileName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Missing studio manifest artifact: ${sourcePath}`);
    continue;
  }

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${fileName} into OpenNext assets.`);
}

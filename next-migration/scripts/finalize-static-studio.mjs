import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const sourceStaticDir = path.join(appRoot, "public", "studio", "static");
const sourceIndexPath = path.join(appRoot, "public", "studio", "index.html");
const targetStaticDir = path.join(appRoot, ".open-next", "assets", "studio", "static");
const targetIndexPath = path.join(appRoot, ".open-next", "assets", "studio", "index.html");

const manifestFiles = [
  "create-manifest.json",
  "0b7750b6.create-schema.json",
  "e523f8b0.create-tools.json"
];

function ensureStudioAssetPaths(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const original = fs.readFileSync(filePath, "utf8");
  const updated = original
    .replace(/="\s*\/static\//g, '="/studio/static/')
    .replace(/"\s*\/static\//g, '"/studio/static/');

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`Normalized Studio asset paths in ${path.relative(appRoot, filePath)}.`);
  }
}

if (!fs.existsSync(sourceStaticDir) || !fs.existsSync(targetStaticDir)) {
  console.log("Skipping static studio finalization because source or target directory is missing.");
  process.exit(0);
}

ensureStudioAssetPaths(sourceIndexPath);
ensureStudioAssetPaths(path.join(sourceStaticDir, "manifest.webmanifest"));

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

if (fs.existsSync(sourceIndexPath) && fs.existsSync(targetIndexPath)) {
  fs.copyFileSync(sourceIndexPath, targetIndexPath);
  console.log("Copied Studio index.html into OpenNext assets.");
}

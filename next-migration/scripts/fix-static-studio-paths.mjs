import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const studioDir = path.join(appRoot, "public", "studio");

const targetFiles = [
  path.join(studioDir, "index.html"),
  path.join(studioDir, "static", "manifest.webmanifest")
];

function replaceAll(content) {
  return content
    .replace(/="\s*\/static\//g, '="/studio/static/')
    .replace(/"\s*\/static\//g, '"/studio/static/');
}

let changedFiles = 0;

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping Studio path fix because file is missing: ${filePath}`);
    continue;
  }

  const original = fs.readFileSync(filePath, "utf8");
  const updated = replaceAll(original);

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    changedFiles += 1;
    console.log(`Updated Studio asset paths in ${path.relative(appRoot, filePath)}`);
  }
}

if (changedFiles === 0) {
  console.log("Studio asset paths already aligned with /studio/static.");
}

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "../../public");
const destinationDir = path.resolve(__dirname, "../public");

const CONFLICTING_HTML_PATHS = new Set(
  [
    "index.html",
    "about/index.html",
    "contact/index.html",
    "products/index.html",
    "products/agv-forklift.html",
    "products/agv-roller.html",
    "products/composite-mobile-robot.html",
    "products/lifting-agv.html",
    "products/storage-agv.html",
    "solutions/index.html",
    "solutions/asrs.html",
    "solutions/material-handling.html",
    "solutions/picking.html",
    "solutions/software.html",
    "case-studies/index.html",
    "case-studies/asrs.html",
    "case-studies/material-handling.html",
    "case-studies/picking.html",
    "case-studies/projects/automated-warehouse-upgrade.html"
  ].map((entry) => entry.split("/").join(path.sep))
);

function shouldCopyEntry(sourcePath) {
  const relativePath = path.relative(sourceDir, sourcePath);

  if (!relativePath || relativePath.startsWith(`..${path.sep}`)) {
    return true;
  }

  return !CONFLICTING_HTML_PATHS.has(relativePath);
}

fs.rmSync(destinationDir, { recursive: true, force: true });
fs.mkdirSync(destinationDir, { recursive: true });
fs.cpSync(sourceDir, destinationDir, {
  recursive: true,
  force: true,
  filter: shouldCopyEntry
});

console.log(`Synced legacy public assets from ${sourceDir} to ${destinationDir}`);

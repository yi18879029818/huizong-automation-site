import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const staticDir = path.join(appRoot, "public", "studio", "static");

function hasExistingManifestArtifacts() {
  if (!fs.existsSync(staticDir)) {
    return false;
  }

  const files = fs
    .readdirSync(staticDir)
    .filter((name) => !name.startsWith("."));

  return files.length > 0 && files.includes("manifest.webmanifest");
}

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["sanity", "manifest", "extract", "--path", "public/studio/static"],
  {
    cwd: appRoot,
    stdio: "inherit",
    shell: false,
    env: process.env
  }
);

if (result.status === 0) {
  process.exit(0);
}

if (hasExistingManifestArtifacts()) {
  console.warn(
    "Sanity manifest extract failed; reusing existing public/studio/static manifest artifacts."
  );
  process.exit(0);
}

process.exit(result.status || 1);

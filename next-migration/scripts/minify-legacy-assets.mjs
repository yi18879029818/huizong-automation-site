import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify } from "terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceAssetsDir = path.resolve(__dirname, "../../public/assets");
const appAssetsDir = path.resolve(__dirname, "../public/assets");

const targets = [
  {
    name: "site-shell",
    inputFile: "site-shell.js",
    outputFile: "site-shell.min.js",
  },
];

async function writeMinifiedAsset(baseDir, inputFile, outputFile) {
  const inputPath = path.join(baseDir, inputFile);
  const outputPath = path.join(baseDir, outputFile);
  const source = fs.readFileSync(inputPath, "utf8");
  const result = await minify(source, {
    compress: true,
    mangle: true,
    ecma: 2018,
  });

  if (!result.code) {
    throw new Error(`Failed to minify ${inputFile}`);
  }

  fs.writeFileSync(outputPath, result.code);
}

for (const { name, inputFile, outputFile } of targets) {
  await writeMinifiedAsset(sourceAssetsDir, inputFile, outputFile);
  await writeMinifiedAsset(appAssetsDir, inputFile, outputFile);
  console.log(`Minified ${name} -> ${outputFile}`);
}

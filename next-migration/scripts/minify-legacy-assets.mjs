import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

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

function writeMinifiedAsset(baseDir, inputFile, outputFile) {
  const inputPath = path.join(baseDir, inputFile);
  const outputPath = path.join(baseDir, outputFile);
  const source = fs.readFileSync(inputPath, "utf8");
  const result = transformSync(source, {
    loader: "js",
    minify: true,
    target: "es2018",
  });

  fs.writeFileSync(outputPath, result.code);
}

targets.forEach(({ name, inputFile, outputFile }) => {
  writeMinifiedAsset(sourceAssetsDir, inputFile, outputFile);
  writeMinifiedAsset(appAssetsDir, inputFile, outputFile);
  console.log(`Minified ${name} -> ${outputFile}`);
});

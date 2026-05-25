import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const binDir = path.join(appRoot, "node_modules", ".bin");
const binExt = process.platform === "win32" ? ".cmd" : "";

function resolveBin(name) {
  return path.join(binDir, `${name}${binExt}`);
}

function launch(label, command, args, extraEnv = {}) {
  const commandLine = `"${command}" ${args.join(" ")}`;
  const child = spawn(commandLine, {
    cwd: appRoot,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      ...extraEnv
    }
  });

  child.on("error", (error) => {
    console.error(`[${label}] failed to start:`, error);
  });

  return child;
}

const children = new Map();

function stopAll() {
  for (const child of children.values()) {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  }
}

process.on("SIGINT", () => {
  stopAll();
});

process.on("SIGTERM", () => {
  stopAll();
});

const studio = launch("studio", resolveBin("sanity"), ["dev", "--host", "localhost", "--port", "3333"], {
  SANITY_STUDIO_BASE_PATH: "/"
});
children.set("studio", studio);

const site = launch("site", resolveBin("next"), ["dev"]);
children.set("site", site);

let liveChildren = children.size;

for (const [name, child] of children.entries()) {
  child.on("exit", (code, signal) => {
    liveChildren -= 1;

    if (name === "studio") {
      if (code && code !== 0) {
        process.exitCode = code;
      }
      if (liveChildren > 0) {
        stopAll();
      }
    } else if (code && code !== 0) {
      console.warn(`[${name}] exited with code ${code}. Studio is still available on http://localhost:3333 if it started successfully.`);
    }

    if (liveChildren === 0) {
      process.exit(process.exitCode || 0);
    }
  });
}

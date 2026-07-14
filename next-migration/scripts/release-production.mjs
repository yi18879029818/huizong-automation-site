import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const openNextCli = fileURLToPath(
  new URL("../node_modules/@opennextjs/cloudflare/dist/cli/index.js", import.meta.url)
);

function run(command, args, { inherit = false } = {}) {
  const outputOptions = inherit
    ? { stdio: "inherit" }
    : { encoding: "utf8", stdio: "pipe" };
  const result = spawnSync(command, args, {
    ...outputOptions
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${command} ${args.join(" ")} failed.${detail ? `\n${detail}` : ""}`);
  }

  return (result.stdout ?? "").trim();
}

function isAncestor(ancestor, descendant) {
  const result = spawnSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
    stdio: "ignore"
  });

  return result.status === 0;
}

function wait(milliseconds) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

function runWithRetry(command, args, options = {}) {
  const attempts = options.attempts ?? 3;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return run(command, args, options);
    } catch (error) {
      if (attempt === attempts) {
        throw error;
      }

      console.warn(`${command} failed (attempt ${attempt}/${attempts}). Retrying...`);
      wait(3000);
    }
  }
}

function fail(message) {
  console.error(`\nRelease blocked: ${message}`);
  process.exit(1);
}

try {
  const branch = run("git", ["branch", "--show-current"]);
  if (branch !== "main") {
    fail(`current branch is ${branch || "detached HEAD"}; merge the approved changes into main first.`);
  }

  if (run("git", ["status", "--porcelain=v1"])) {
    fail("working tree is not clean; commit or stash changes before release.");
  }

  console.log("Fetching origin/main...");
  runWithRetry("git", ["fetch", "origin", "main"], { inherit: true });

  const localHead = run("git", ["rev-parse", "HEAD"]);
  const remoteHead = run("git", ["rev-parse", "origin/main"]);

  if (localHead !== remoteHead && !isAncestor("origin/main", "HEAD")) {
    fail("origin/main contains changes not merged into local main. Sync and resolve the merge before deployment.");
  }

  console.log("Pushing main to origin...");
  runWithRetry("git", ["push", "origin", "main"], { inherit: true });

  const publishedHead = runWithRetry("git", ["ls-remote", "origin", "refs/heads/main"]).split(/\s+/)[0];
  if (publishedHead !== localHead) {
    fail("origin/main does not match the local main commit after push.");
  }

  console.log(`Repository confirmed at ${localHead}. Deploying production...`);
  run(process.execPath, [openNextCli, "build"], { inherit: true });
  run(process.execPath, [openNextCli, "deploy"], { inherit: true });
  console.log("\nProduction release completed.");
} catch (error) {
  console.error(`\nRelease failed: ${error.message}`);
  process.exit(1);
}

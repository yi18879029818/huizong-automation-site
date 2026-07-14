import { spawnSync } from "node:child_process";

function executable(command) {
  return process.platform === "win32" && command === "npm" ? "npm.cmd" : command;
}

function run(command, args, { inherit = false } = {}) {
  const result = spawnSync(executable(command), args, {
    encoding: "utf8",
    stdio: inherit ? "inherit" : "pipe"
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
  run("git", ["fetch", "origin", "main"], { inherit: true });

  const localHead = run("git", ["rev-parse", "HEAD"]);
  const remoteHead = run("git", ["rev-parse", "origin/main"]);

  if (localHead !== remoteHead && !isAncestor("origin/main", "HEAD")) {
    fail("origin/main contains changes not merged into local main. Sync and resolve the merge before deployment.");
  }

  console.log("Pushing main to origin...");
  run("git", ["push", "origin", "main"], { inherit: true });

  const publishedHead = run("git", ["ls-remote", "origin", "refs/heads/main"]).split(/\s+/)[0];
  if (publishedHead !== localHead) {
    fail("origin/main does not match the local main commit after push.");
  }

  console.log(`Repository confirmed at ${localHead}. Deploying production...`);
  run("npm", ["run", "deploy"], { inherit: true });
  console.log("\nProduction release completed.");
} catch (error) {
  console.error(`\nRelease failed: ${error.message}`);
  process.exit(1);
}

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../components/project-review-form.js", import.meta.url), "utf8");

test("project review submission retains the form before awaiting the contact API", () => {
  assert.match(
    source,
    /event\.preventDefault\(\);\s*const form = event\.currentTarget;\s*setPending\(true\);/s,
  );
  assert.match(source, /form\?\.reset\(\);/);
  assert.doesNotMatch(source, /event\.currentTarget\.reset\(\)/);
});

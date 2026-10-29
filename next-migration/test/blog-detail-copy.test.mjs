import test from "node:test";
import assert from "node:assert/strict";
import { getBlogDetailCopy } from "../lib/blog-detail-copy.mjs";

const block = (text, style = "normal") => ({ _type: "block", style, children: [{ _type: "span", text }] });

test("new articles derive two distinct concise descriptions from their body", () => {
  const post = { slug: "new-conveyor-guide", title: "Conveyor Systems", excerpt: "Repeated marketing excerpt.", body: [
    block("Conveyors transport goods between warehouse workstations."),
    block("Types of Conveyors", "h2"), block("Roller and belt systems support different load types."),
    block("Layout Planning", "h2"), block("Plan transfer points around the available floor space."),
    block("Software Integration", "h2"), block("Controllers coordinate equipment handoffs."),
    block("Related Reading", "h2"), block("Contact Coolyne", "h2")
  ] };
  const original = JSON.stringify(post);
  const copy = getBlogDetailCopy(post);
  assert.equal(copy.intro, "Conveyors transport goods between warehouse workstations.");
  assert.match(copy.summary, /Types of Conveyors/);
  assert.match(copy.summary, /Layout Planning/);
  assert.doesNotMatch(copy.summary, /Related Reading|Contact Coolyne|Repeated marketing/);
  assert.notEqual(copy.intro, copy.summary);
  assert.ok(copy.intro.length <= 240 && copy.summary.length <= 240);
  assert.equal(JSON.stringify(post), original);
});

test("articles without headings use a different complete body sentence", () => {
  const copy = getBlogDetailCopy({ body: [block("Mobile robots carry materials between stations. Fleet software assigns tasks and coordinates routes.")] });
  assert.equal(copy.intro, "Mobile robots carry materials between stations.");
  assert.equal(copy.summary, "Fleet software assigns tasks and coordinates routes.");
});

test("short content never repeats its only sentence in both regions", () => {
  const copy = getBlogDetailCopy({ body: [block("Robots move loads.")] });
  assert.equal(copy.intro, "Robots move loads.");
  assert.equal(copy.summary, "");
  assert.deepEqual(getBlogDetailCopy({}), { intro: "", summary: "" });
});

test("uses the rendered body when an article has a frontend body override", () => {
  const copy = getBlogDetailCopy({ body: [block("Outdated source content.")] }, [
    block("Storage robots retrieve totes from high-density racks."),
    block("Shuttle Systems", "h2"), block("Inventory Integration", "h2")
  ]);
  assert.match(copy.intro, /Storage robots/);
  assert.doesNotMatch(JSON.stringify(copy), /Outdated/);
});

test("ignores non-text media and repeated or definition headings", () => {
  const copy = getBlogDetailCopy({ body: [
    { _type: "imageWithAlt", alt: "An unrelated image caption" },
    block("What Is a Robot?", "h2"), block("A robot is a programmable machine that carries out repeatable physical tasks."),
    block("1. Safety Planning", "h2"), block("Safety Planning", "h3"), block("Applications", "h2")
  ] });
  assert.doesNotMatch(copy.summary, /What Is|caption|1\./);
  assert.equal(copy.summary.match(/Safety Planning/g).length, 1);
});

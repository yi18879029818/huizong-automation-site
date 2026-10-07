import assert from "node:assert/strict";
import test from "node:test";

import {
  insertBlogProductSpecificationBlocks
} from "../lib/blog-product-specifications.mjs";

const anchorText =
  "When these carriers are mainly moved by workers or require manually operated forklifts for frequent short-distance transfers, repetitive handling, waiting time, and logistics coordination can gradually become bottlenecks as task volumes increase.";

function block(text) {
  return {
    _type: "block",
    _key: text,
    children: [{ text }]
  };
}

test("adds the two lifting AGV specification cards immediately after the requested blog paragraph", () => {
  const result = insertBlogProductSpecificationBlocks("lifting-automated-robot", [
    block("Opening paragraph"),
    block(anchorText),
    block("Following paragraph")
  ]);

  assert.equal(result.length, 4);
  assert.equal(result[2]._type, "productSpecifications");
  assert.deepEqual(
    result[2].products.map((product) => ({
      name: product.name,
      href: product.href,
      ratedLoad: product.specifications[0].value,
      liftingHeight: product.specifications[1].value,
      navigation: product.specifications[3].value
    })),
    [
      {
        name: "600kg Lifting AGV",
        href: "/products/lifting-agv",
        ratedLoad: "600kg",
        liftingHeight: "60mm",
        navigation: "Laser SLAM + QR Code"
      },
      {
        name: "1000kg Lifting AGV",
        href: "/products/lifting-agv",
        ratedLoad: "1000kg",
        liftingHeight: "60mm",
        navigation: "Laser SLAM + QR Code"
      }
    ]
  );
});

test("leaves unrelated blog bodies unchanged", () => {
  const body = [block(anchorText)];

  assert.equal(
    insertBlogProductSpecificationBlocks("warehouse-automation-guide", body),
    body
  );
});

test("adds AGV forklift and stacking forklift cards after the requested forklift blog paragraph", () => {
  const forkliftAnchor =
    "When these transport routes are relatively fixed, pallet volumes are stable, and the same tasks need to be repeated many times every day, a robotic pallet stacker can turn pallet movements that traditionally depend on manually operated forklifts into logistics processes that are automatically scheduled and executed by the system.";

  const result = insertBlogProductSpecificationBlocks("agv-forklift-meaning", [
    block("Opening paragraph"),
    block(forkliftAnchor),
    block("Following paragraph")
  ]);

  assert.equal(result.length, 4);
  assert.equal(result[2]._type, "productSpecifications");
  assert.deepEqual(
    result[2].products.map((product) => ({
      name: product.name,
      href: product.href,
      ratedLoad: product.specifications[0].value,
      liftingHeight: product.specifications[4].value,
      navigation: product.specifications[3].value
    })),
    [
      {
        name: "AGV Forklift",
        href: "/products/agv-forklift",
        ratedLoad: "1600kg",
        liftingHeight: "200mm",
        navigation: "Laser SLAM + 3D Vision"
      },
      {
        name: "Stacking AGV Forklift",
        href: "/products/agv-forklift",
        ratedLoad: "1400kg",
        liftingHeight: "3000mm",
        navigation: "Laser SLAM + 3D Vision"
      }
    ]
  );
});

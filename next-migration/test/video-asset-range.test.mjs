import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { serveVideoAsset } from "../lib/video-asset-range.mjs";
import { workflowVideo } from "../lib/dual-roller-workflow-media.mjs";

const text = "0123456789abcdefghijklmn";
test("asset length manifest matches the published file and covers bindings without Content-Length", async () => {
  assert.equal(fs.statSync(new URL("../../public" + workflowVideo.path, import.meta.url)).size, workflowVideo.bytes);
  const noLength = { fetch: async () => new Response(text, { headers: { "Content-Type": "video/mp4" } }) };
  const response = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: "bytes=3-7" } }), noLength, text.length);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get("Content-Range"), `bytes 3-7/${text.length}`);
  assert.equal(await response.text(), "34567");
});
const asset = { async fetch(request) {
  assert.equal(request.headers.get("Range"), null);
  const headers = { "Content-Length": String(text.length), "Content-Type": "video/mp4", ETag: '"video-v1"' };
  if (request.method === "HEAD") return new Response(null, { headers });
  const chunks = [text.slice(0, 5), text.slice(5, 11), text.slice(11)];
  return new Response(new ReadableStream({ pull(controller) {
    if (chunks.length) controller.enqueue(new TextEncoder().encode(chunks.shift()));
    else controller.close();
  }}), { headers });
}};

test("video serves requested byte intervals across upstream chunks", async () => {
  for (const [range, start, end] of [["bytes=0-3", 0, 3], ["bytes=3-12", 3, 12], ["bytes=18-", 18, 23], ["bytes=-4", 20, 23], ["bytes=20-99", 20, 23]]) {
    const response = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: range } }), asset);
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("Content-Range"), `bytes ${start}-${end}/${text.length}`);
    assert.equal(response.headers.get("Content-Length"), String(end - start + 1));
    assert.equal(response.headers.get("Content-Type"), "video/mp4");
    assert.equal(response.headers.get("Accept-Ranges"), "bytes");
    assert.equal(await response.text(), text.slice(start, end + 1));
  }
});

test("video rejects unsatisfiable ranges and ignores malformed or multiple ranges", async () => {
  for (const range of ["bytes=24-", "bytes=-0", "bytes=12-8"]) {
    const response = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: range } }), asset);
    assert.equal(response.status, 416);
    assert.equal(response.headers.get("Content-Range"), `bytes */${text.length}`);
    assert.equal(await response.text(), "");
  }
  for (const range of ["bytes=bad", "bytes=0-2,5-7", "bytes=-"]) {
    const response = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: range } }), asset);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), text);
  }
});

test("video preserves whole responses, HEAD and If-Range validators", async () => {
  for (const validator of ['"older-version"', 'W/"video-v1"']) {
    const response = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: "bytes=0-3", "If-Range": validator } }), asset);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), text);
  }
  const matching = await serveVideoAsset(new Request("https://example.com/video.mp4", { headers: { Range: "bytes=0-3", "If-Range": '"video-v1"' } }), asset);
  assert.equal(matching.status, 206);
  assert.equal(await matching.text(), "0123");
  const head = await serveVideoAsset(new Request("https://example.com/video.mp4", { method: "HEAD", headers: { Range: "bytes=0-3" } }), asset);
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  const whole = await serveVideoAsset(new Request("https://example.com/video.mp4"), asset);
  assert.equal(whole.status, 200);
  assert.equal(await whole.text(), text);
});

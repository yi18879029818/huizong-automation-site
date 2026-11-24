function selectBytes(body, start, end) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) throw new Error("Video asset ended before its declared length");
          const next = offset + value.byteLength;
          const left = Math.max(0, start - offset);
          const right = Math.min(value.byteLength, end + 1 - offset);
          offset = next;
          if (right > left) controller.enqueue(value.subarray(left, right));
          if (next > end) {
            controller.close();
            await reader.cancel();
            return;
          }
          if (right > left) return;
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel(reason) { return reader.cancel(reason); }
  });
}

export async function serveVideoAsset(request, assets, expectedLength) {
  const upstreamRequest = new Request(request);
  upstreamRequest.headers.delete("Range");
  upstreamRequest.headers.delete("If-Range");
  const response = await assets.fetch(upstreamRequest);
  if (request.method !== "GET" || response.status !== 200 || !response.body) return response;
  const length = Number(response.headers.get("Content-Length") ?? expectedLength);
  if (!Number.isSafeInteger(length) || length <= 0) return response;
  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  const validator = request.headers.get("If-Range");
  const match = request.headers.get("Range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || (!match[1] && !match[2]) || (validator && (validator.startsWith("W/") || (validator !== headers.get("ETag") && validator !== headers.get("Last-Modified"))))) {
    return new Response(response.body, { headers });
  }
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(length - 1, Number(match[2])) : length - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || end < start || (!match[1] && Number(match[2]) === 0)) {
    await response.body.cancel();
    headers.set("Content-Range", `bytes */${length}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }
  const size = end - start + 1;
  headers.set("Content-Range", `bytes ${start}-${end}/${length}`);
  headers.set("Content-Length", String(size));
  headers.delete("Content-Encoding");
  const selected = selectBytes(response.body, start, end);
  const body = typeof globalThis.FixedLengthStream === "function" ? selected.pipeThrough(new globalThis.FixedLengthStream(size)) : selected;
  return new Response(body, { status: 206, headers });
}

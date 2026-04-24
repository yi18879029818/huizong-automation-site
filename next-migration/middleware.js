import { NextResponse } from "next/server";
import { getAgentResponsePolicy } from "@/lib/agent-view";
import { SITE_URL } from "@/lib/site-config";

function markdownRewriteUrl(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/api/markdown";
  url.searchParams.set("path", request.nextUrl.pathname);
  url.searchParams.delete("view");

  return url;
}

async function markdownProxyResponse(request) {
  const url = markdownRewriteUrl(request);
  const upstream = await fetch(url, {
    method: "GET",
    headers: request.headers
  });

  const headers = new Headers(upstream.headers);
  headers.set("x-ai-view", "markdown");
  headers.set("Cache-Control", "public, max-age=0, s-maxage=600");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  });
}

function attachAgentHeaders(response, profile) {
  const alternates = [
    `<${SITE_URL}/llms.json>; rel="alternate"; type="application/json"`,
    `<${SITE_URL}/llms.txt>; rel="alternate"; type="text/plain"`,
    `<${SITE_URL}/llms-full.txt>; rel="alternate"; type="text/markdown"`
  ];
  const existing = response.headers.get("Link");
  const merged = Array.from(
    new Set([...(existing ? existing.split(",").map((entry) => entry.trim()) : []), ...alternates])
  ).join(", ");

  response.headers.set("x-ai-agent-family", profile.family);
  response.headers.set("x-ai-agent-profile", profile.id);
  response.headers.set("x-ai-view-strategy", profile.strategy);
  response.headers.set("Link", merged);

  return response;
}

export async function middleware(request) {
  const policy = getAgentResponsePolicy({
    pathname: request.nextUrl.pathname,
    searchParams: request.nextUrl.searchParams,
    userAgent: request.headers.get("user-agent") || "",
    method: request.method
  });

  if (policy.response === "markdown") {
    return attachAgentHeaders(await markdownProxyResponse(request), policy.profile);
  }

  return attachAgentHeaders(NextResponse.next(), policy.profile);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

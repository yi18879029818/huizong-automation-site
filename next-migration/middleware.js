import { NextResponse } from "next/server";
import { getAgentResponsePolicy } from "@/lib/agent-view";
import { SITE_HOST, SITE_URL } from "@/lib/site-config";

const SECURITY_HEADERS = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), browsing-topics=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN"
};

function isLocalHost(hostname = "") {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function requestProtocol(request) {
  const cfVisitor = request.headers.get("cf-visitor");
  const cfVisitorScheme = cfVisitor?.match(/"scheme":"(https|http)"/)?.[1];

  return (
    request.headers.get("x-forwarded-proto") ||
    cfVisitorScheme ||
    request.nextUrl.protocol.replace(":", "")
  );
}

function secureRedirect(request) {
  const protocol = requestProtocol(request);
  const hostname = request.nextUrl.hostname;

  if (protocol === "https" || isLocalHost(hostname)) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.host = hostname === SITE_HOST ? SITE_HOST : hostname;

  return NextResponse.redirect(redirectUrl, 308);
}

function canonicalHostRedirect(request) {
  const hostname = request.nextUrl.hostname;

  if (isLocalHost(hostname) || hostname === SITE_HOST) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.host = SITE_HOST;

  return NextResponse.redirect(redirectUrl, 308);
}

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

function applySecurityHeaders(response, pathname = "/") {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
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
  const pathname = request.nextUrl.pathname;
  const redirectResponse = secureRedirect(request);
  if (redirectResponse) {
    return applySecurityHeaders(redirectResponse, pathname);
  }

  const canonicalRedirect = canonicalHostRedirect(request);
  if (canonicalRedirect) {
    return applySecurityHeaders(canonicalRedirect, pathname);
  }

  const policy = getAgentResponsePolicy({
    pathname: request.nextUrl.pathname,
    searchParams: request.nextUrl.searchParams,
    userAgent: request.headers.get("user-agent") || "",
    method: request.method
  });

  if (policy.response === "markdown") {
    const markdownResponse = await markdownProxyResponse(request);
    return attachAgentHeaders(applySecurityHeaders(markdownResponse, pathname), policy.profile);
  }

  const response = NextResponse.next();
  return attachAgentHeaders(applySecurityHeaders(response, pathname), policy.profile);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

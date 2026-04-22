import { NextResponse } from "next/server";
import { shouldServeMarkdownView } from "@/lib/agent-view";

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

export async function middleware(request) {
  if (
    shouldServeMarkdownView({
      pathname: request.nextUrl.pathname,
      searchParams: request.nextUrl.searchParams,
      userAgent: request.headers.get("user-agent") || "",
      method: request.method
    })
  ) {
    return markdownProxyResponse(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

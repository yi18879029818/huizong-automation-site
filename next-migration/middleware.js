import { NextResponse } from "next/server";
import { shouldServeMarkdownView } from "@/lib/agent-view";

function markdownRewriteUrl(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/api/markdown";
  url.searchParams.set("path", request.nextUrl.pathname);
  url.searchParams.delete("view");

  return url;
}

export function middleware(request) {
  if (
    shouldServeMarkdownView({
      pathname: request.nextUrl.pathname,
      searchParams: request.nextUrl.searchParams,
      userAgent: request.headers.get("user-agent") || "",
      method: request.method
    })
  ) {
    return NextResponse.rewrite(markdownRewriteUrl(request), {
      headers: {
        "x-ai-view": "markdown"
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

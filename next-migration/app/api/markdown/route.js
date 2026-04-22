import { NextResponse } from "next/server";
import { renderStructuredPageMarkdown } from "@/lib/markdown-view";
import { getStructuredPage } from "@/lib/structured-content";

export const dynamic = "force-dynamic";

function normalizeSlugFromPath(pathname = "/") {
  if (pathname === "/" || pathname === "") {
    return [];
  }

  return pathname
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean);
}

export async function GET(request) {
  const pathname = request.nextUrl.searchParams.get("path") || "/";
  const page = getStructuredPage(normalizeSlugFromPath(pathname));

  if (!page) {
    return NextResponse.json({ ok: false, error: "Structured markdown view not found." }, { status: 404 });
  }

  return new NextResponse(renderStructuredPageMarkdown(page), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=600",
      Vary: "User-Agent"
    }
  });
}

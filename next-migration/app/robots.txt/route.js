import { SITE_HOST, SITE_URL } from "@/lib/site-config";

const ROBOTS_TXT = [
  "User-agent: *",
  "Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference",
  "Allow: /",
  "Disallow: /studio",
  "",
  `Host: ${SITE_HOST}`,
  `Sitemap: ${SITE_URL}/sitemap.xml`
].join("\n");

function buildHeaders() {
  return {
    "content-type": "text/plain; charset=UTF-8",
    "cache-control": "public, max-age=0, must-revalidate"
  };
}

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: buildHeaders()
  });
}

export function HEAD() {
  return new Response(null, {
    headers: buildHeaders()
  });
}

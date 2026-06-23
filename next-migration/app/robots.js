import { SITE_HOST, SITE_URL } from "@/lib/site-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST
  };
}

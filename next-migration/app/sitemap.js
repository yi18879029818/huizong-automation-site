import { STRUCTURED_ROUTES } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap() {
  const staticRoutes = ["/", "/about", "/contact"];
  const now = new Date();

  return [...staticRoutes, ...STRUCTURED_ROUTES].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}

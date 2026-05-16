import { STRUCTURED_ROUTES } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap() {
  const now = new Date();
  const routes = [...new Set(STRUCTURED_ROUTES)];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}

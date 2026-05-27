import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { renderStructuredPageMarkdown } from "@/lib/markdown-view";
import { COMPANY, SITE_URL } from "@/lib/site-config";

function absoluteUrl(href = "/") {
  return `${SITE_URL}${href === "/" ? "" : href}`;
}

function getStructuredRoutes() {
  return Array.from(
    new Set(
      [
        "/",
        "/about",
        "/contact",
        "/faq",
        "/blog",
        ...getAllStructuredRoutes().filter(
          (route) => !["/", "/about", "/contact", "/faq", "/blog"].includes(route)
        )
      ]
    )
  );
}

async function pageEntryForRoute(route) {
  const page = await getStructuredPage(route === "/" ? [] : route.slice(1).split("/"));

  if (!page) {
    return null;
  }

  return {
    title: page.data.title,
    kind: page.kind,
    section: page.section,
    canonical: absoluteUrl(route),
    markdown: absoluteUrl(`/api/markdown?path=${route}`),
    hasJsonLd: true,
    schemas:
      page.kind === "product-detail"
        ? ["Organization", "WebSite", "WebPage", "Product", "BreadcrumbList", "FAQPage"]
        : page.kind === "solution-detail"
          ? ["Organization", "WebSite", "WebPage", "Service", "BreadcrumbList", "FAQPage"]
          : page.kind === "case-project-detail"
            ? ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList"]
            : ["Organization", "WebSite", "WebPage", "BreadcrumbList"],
    offer: undefined
  };
}

export async function getLlmsIndexText() {
  const routes = getStructuredRoutes();
  const pages = await Promise.all(
    routes.map(async (route) => ({
      route,
      page: await getStructuredPage(route === "/" ? [] : route.slice(1).split("/"))
    }))
  );

  return [
    `# ${COMPANY.name}`,
    "",
    COMPANY.description,
    "",
    "## Contact",
    `- Email: ${COMPANY.email}`,
    `- Phone: ${COMPANY.telephone}`,
    "",
    "## Recommended entrypoints for language models",
    `- Canonical site: ${SITE_URL}`,
    `- Machine-readable index: ${absoluteUrl("/llms.json")}`,
    `- Full markdown corpus: ${absoluteUrl("/llms-full.txt")}`,
    `- Per-page markdown endpoint: ${absoluteUrl("/api/markdown?path=/products/agv-forklift")}`,
    "",
    "## Structured pages",
    ...pages.map(({ route, page }) => {
      const label = page?.data?.title || route;
      return `- ${label}: ${absoluteUrl(route)} | markdown: ${absoluteUrl(`/api/markdown?path=${route}`)}`;
    }),
    "",
    "## Notes",
    "- JSON-LD is embedded on public pages.",
    "- Product pages embed Product schema with B2B Offer metadata and omit reviews or ratings when none are available.",
    "- Solution and case-study pages expose structured markdown views for AI crawlers.",
    "- Prefer canonical HTML URLs for citations and markdown URLs for extraction."
  ].join("\n");
}

export async function getLlmsFullText() {
  const routes = getStructuredRoutes();

  const sections = (
    await Promise.all(
      routes.map(async (route) => {
        const page = await getStructuredPage(route === "/" ? [] : route.slice(1).split("/"));

        if (!page) {
          return null;
        }

        return [
          `\n\n<!-- ${page.kind} | ${absoluteUrl(route)} -->`,
          renderStructuredPageMarkdown(page)
        ].join("\n");
      })
    )
  ).filter(Boolean);

  return [
    `# ${COMPANY.name} - Full AI Readable Corpus`,
    "",
    `Canonical site: ${SITE_URL}`,
    `Generated for crawlers and language models on ${new Date().toISOString()}`,
    "",
    ...sections
  ].join("\n");
}

export async function getLlmsJsonIndex() {
  const pages = (await Promise.all(getStructuredRoutes().map(pageEntryForRoute))).filter(Boolean);

  return {
    site: {
      name: COMPANY.name,
      canonical: SITE_URL,
      description: COMPANY.description,
      contact: {
        email: COMPANY.email,
        telephone: COMPANY.telephone,
        inquiryUrl: absoluteUrl("/contact")
      }
    },
    generatedAt: new Date().toISOString(),
    endpoints: {
      llmsTxt: absoluteUrl("/llms.txt"),
      llmsFull: absoluteUrl("/llms-full.txt"),
      markdownTemplate: absoluteUrl("/api/markdown?path=/products/agv-forklift")
    },
    agentStrategies: {
      GPTBot: {
        family: "openai",
        preferredResponse: "markdown",
        endpoint: absoluteUrl("/api/markdown?path=/products/agv-forklift")
      },
      ClaudeBot: {
        family: "anthropic",
        preferredResponse: "markdown",
        endpoint: absoluteUrl("/api/markdown?path=/products/agv-forklift")
      },
      "Google-Extended": {
        family: "google",
        preferredResponse: "html-canonical",
        discovery: [absoluteUrl("/llms.json"), absoluteUrl("/llms.txt"), absoluteUrl("/llms-full.txt")]
      }
    },
    pages
  };
}

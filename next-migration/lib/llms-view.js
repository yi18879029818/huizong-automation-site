import { getAllStructuredRoutes, getStructuredPage } from "@/lib/structured-content";
import { renderStructuredPageMarkdown } from "@/lib/markdown-view";
import { COMPANY, SITE_URL } from "@/lib/site-config";

function absoluteUrl(href = "/") {
  return `${SITE_URL}${href === "/" ? "" : href}`;
}

function getStructuredRoutes() {
  return Array.from(
    new Set(
      ["/", "/about", "/contact", ...getAllStructuredRoutes().filter((route) => !["/", "/about", "/contact"].includes(route))]
    )
  );
}

function pageEntryForRoute(route) {
  const page = getStructuredPage(route === "/" ? [] : route.slice(1).split("/"));

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
        ? ["Organization", "WebSite", "WebPage", "Product", "Offer", "BreadcrumbList", "FAQPage"]
        : page.kind === "solution-detail"
          ? ["Organization", "WebSite", "WebPage", "Service", "BreadcrumbList", "FAQPage"]
          : page.kind === "case-project-detail"
            ? ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList"]
            : ["Organization", "WebSite", "WebPage", "BreadcrumbList"],
    offer:
      page.kind === "product-detail"
        ? {
            model: "custom-quotation",
            seller: COMPANY.name,
            quoteUrl: absoluteUrl("/contact"),
            eligibleRegion: "Worldwide",
            businessFunction: "Sell",
            itemCondition: "NewCondition"
          }
        : undefined
  };
}

export function getLlmsIndexText() {
  const routes = getStructuredRoutes();

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
    ...routes.map((route) => {
      const page = getStructuredPage(route === "/" ? [] : route.slice(1).split("/"));
      const label = page?.data?.title || route;
      return `- ${label}: ${absoluteUrl(route)} | markdown: ${absoluteUrl(`/api/markdown?path=${route}`)}`;
    }),
    "",
    "## Notes",
    "- JSON-LD is embedded on public pages.",
    "- Product pages include Product and Offer schema with B2B quotation facts.",
    "- Solution and case-study pages expose structured markdown views for AI crawlers.",
    "- Prefer canonical HTML URLs for citations and markdown URLs for extraction."
  ].join("\n");
}

export function getLlmsFullText() {
  const routes = getStructuredRoutes();

  const sections = routes
    .map((route) => {
      const page = getStructuredPage(route === "/" ? [] : route.slice(1).split("/"));

      if (!page) {
        return null;
      }

      return [
        `\n\n<!-- ${page.kind} | ${absoluteUrl(route)} -->`,
        renderStructuredPageMarkdown(page)
      ].join("\n");
    })
    .filter(Boolean);

  return [
    `# ${COMPANY.name} - Full AI Readable Corpus`,
    "",
    `Canonical site: ${SITE_URL}`,
    `Generated for crawlers and language models on ${new Date().toISOString()}`,
    "",
    ...sections
  ].join("\n");
}

export function getLlmsJsonIndex() {
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
    pages: getStructuredRoutes().map(pageEntryForRoute).filter(Boolean)
  };
}

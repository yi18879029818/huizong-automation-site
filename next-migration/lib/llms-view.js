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
    hasJsonLd: true,
    schemas:
      page.kind === "product-detail"
        ? ["Organization", "WebSite", "WebPage", "BreadcrumbList", "FAQPage"]
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
    "",
    "## Structured pages",
    ...pages.map(({ route, page }) => {
      const label = page?.data?.title || route;
      return `- ${label}: ${absoluteUrl(route)}`;
    }),
    "",
    "## Notes",
    "- JSON-LD is embedded on public pages.",
    "- Product detail pages use neutral webpage schema for B2B inquiry content rather than merchant product rich-result markup.",
    "- Prefer canonical HTML URLs for citations and extraction."
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
      llmsFull: absoluteUrl("/llms-full.txt")
    },
    agentStrategies: {
      GPTBot: {
        family: "openai",
        preferredResponse: "html-canonical"
      },
      ClaudeBot: {
        family: "anthropic",
        preferredResponse: "html-canonical"
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

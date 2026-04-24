import { COMPANY, SITE_URL } from "@/lib/site-config";

function absoluteUrl(href = "/") {
  return `${SITE_URL}${href === "/" ? "" : href}`;
}

function stringifyList(items = [], ordered = false) {
  return items
    .map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${item}`)
    .join("\n");
}

function metricLines(metrics = []) {
  if (!metrics.length) {
    return "";
  }

  return metrics.map((metric) => `- ${metric.label}: ${metric.value}`).join("\n");
}

function featureSections(features = []) {
  return features
    .map(
      (feature) =>
        `### ${feature.title}\n\n- Label: ${feature.label}\n- Description: ${feature.description}`
    )
    .join("\n\n");
}

function faqSections(faqs = []) {
  return faqs
    .map((faq) => `### Q: ${faq.question}\n\nA: ${faq.answer}`)
    .join("\n\n");
}

function cardSections(cards = [], page) {
  return cards
    .map((card) => {
      const href =
        card.href ||
        (page.section === "case-studies" ? `/case-studies/${card.slug}` : `/${page.section}/${card.slug}`);

      return [
        `### ${card.title}`,
        card.summary || "",
        card.label ? `- Label: ${card.label}` : "",
        card.metrics?.length ? metricLines(card.metrics) : "",
        `- URL: ${absoluteUrl(href)}`
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function baseHeader(page) {
  const description = page.data.heroSummary || page.data.summary || COMPANY.description;

  return [
    "---",
    `title: ${page.data.title}`,
    `kind: ${page.kind}`,
    `section: ${page.section}`,
    `url: ${absoluteUrl(page.currentHref)}`,
    `canonical: ${absoluteUrl(page.currentHref)}`,
    `organization: ${COMPANY.name}`,
    `view: ai-markdown`,
    "---",
    "",
    `# ${page.data.title}`,
    "",
    description
  ].join("\n");
}

function homeOrOverviewMarkdown(page) {
  return [
    baseHeader(page),
    "",
    "## Summary",
    "",
    page.data.summary || "",
    page.data.metrics?.length ? "\n## Key Metrics\n\n" + metricLines(page.data.metrics) : "",
    page.data.capabilities?.length
      ? "\n## Capabilities\n\n" + stringifyList(page.data.capabilities)
      : "",
    page.data.cards?.length ? "\n## Structured Items\n\n" + cardSections(page.data.cards, page) : "",
    page.data.faqs?.length ? "\n## FAQs\n\n" + faqSections(page.data.faqs) : "",
    "\n## Contact\n",
    `- Email: ${COMPANY.email}`,
    `- Telephone: ${COMPANY.telephone}`,
    `- Contact URL: ${absoluteUrl("/contact")}`
  ]
    .filter(Boolean)
    .join("\n");
}

function productDetailMarkdown(page) {
  return [
    baseHeader(page),
    "",
    "## Product Snapshot",
    "",
    `- Category: Warehouse automation equipment`,
    `- Inquiry URL: ${absoluteUrl("/contact")}`,
    `- Image: ${page.data.image ? absoluteUrl(page.data.image) : "N/A"}`,
    page.data.metrics?.length ? "\n## Commercial Facts\n\n" + metricLines(page.data.metrics) : "",
    page.data.features?.length ? "\n## Features\n\n" + featureSections(page.data.features) : "",
    page.data.scenarios?.length ? "\n## Use Cases\n\n" + stringifyList(page.data.scenarios) : "",
    page.data.integrations?.length
      ? "\n## Integration Surface\n\n" + stringifyList(page.data.integrations)
      : "",
    page.data.faqs?.length ? "\n## FAQs\n\n" + faqSections(page.data.faqs) : "",
    "\n## Offer",
    "",
    `- Offer type: Custom quotation`,
    `- Procurement model: Request for quotation`,
    `- Seller: ${COMPANY.name}`,
    `- Item condition: New equipment`,
    `- Eligible region: Worldwide`,
    `- Pricing basis: Scope, payload class, lift height, software integration, commissioning, lifecycle support`,
    `- Contact for quote: ${absoluteUrl("/contact")}`
  ]
    .filter(Boolean)
    .join("\n");
}

function solutionDetailMarkdown(page) {
  return [
    baseHeader(page),
    "",
    "## Service Snapshot",
    "",
    `- Provider: ${COMPANY.name}`,
    `- Area served: Worldwide`,
    `- Contact URL: ${absoluteUrl("/contact")}`,
    page.data.metrics?.length ? "\n## Key Metrics\n\n" + metricLines(page.data.metrics) : "",
    page.data.features?.length ? "\n## Delivery Scope\n\n" + featureSections(page.data.features) : "",
    page.data.scenarios?.length ? "\n## Scenarios\n\n" + stringifyList(page.data.scenarios) : "",
    page.data.integrations?.length
      ? "\n## Integrations\n\n" + stringifyList(page.data.integrations)
      : "",
    page.data.faqs?.length ? "\n## FAQs\n\n" + faqSections(page.data.faqs) : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function caseProjectMarkdown(page) {
  return [
    baseHeader(page),
    "",
    "## Outcome Summary",
    "",
    page.data.metrics?.length ? metricLines(page.data.metrics) : "",
    page.data.bottlenecks?.length
      ? "\n## Bottlenecks\n\n" +
        page.data.bottlenecks
          .map((item) => `### ${item.title}\n\n${item.description}`)
          .join("\n\n")
      : "",
    page.data.solutionStack?.length
      ? "\n## Solution Stack\n\n" + stringifyList(page.data.solutionStack)
      : "",
    page.data.commissioning?.length
      ? "\n## Commissioning Phases\n\n" + stringifyList(page.data.commissioning, true)
      : "",
    page.data.faqs?.length ? "\n## FAQs\n\n" + faqSections(page.data.faqs) : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function caseCategoryMarkdown(page) {
  return [
    baseHeader(page),
    "",
    "## Featured Projects",
    "",
    page.data.projects
      ?.map((project) => `### ${project.title}\n\n${project.description}`)
      .join("\n\n") || "",
    page.data.metrics?.length ? "\n## Key Metrics\n\n" + metricLines(page.data.metrics) : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function basicPageMarkdown(page) {
  return [
    baseHeader(page),
    "",
    page.data.metrics?.length ? "## Key Metrics\n\n" + metricLines(page.data.metrics) : "",
    page.data.features?.length ? "\n## Features\n\n" + featureSections(page.data.features) : "",
    page.data.scenarios?.length ? "\n## Scenarios\n\n" + stringifyList(page.data.scenarios) : "",
    page.data.integrations?.length
      ? "\n## Integrations\n\n" + stringifyList(page.data.integrations)
      : "",
    page.data.faqs?.length ? "\n## FAQs\n\n" + faqSections(page.data.faqs) : "",
    "\n## Contact",
    "",
    `- Email: ${COMPANY.email}`,
    `- Telephone: ${COMPANY.telephone}`,
    `- Contact URL: ${absoluteUrl("/contact")}`
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderStructuredPageMarkdown(page) {
  if (
    page.kind === "home-page" ||
    page.kind === "product-overview" ||
    page.kind === "solution-overview" ||
    page.kind === "case-overview"
  ) {
    return homeOrOverviewMarkdown(page);
  }

  if (page.kind === "product-detail") {
    return productDetailMarkdown(page);
  }

  if (page.kind === "solution-detail") {
    return solutionDetailMarkdown(page);
  }

  if (page.kind === "case-project-detail") {
    return caseProjectMarkdown(page);
  }

  if (page.kind === "case-category") {
    return caseCategoryMarkdown(page);
  }

  return basicPageMarkdown(page);
}

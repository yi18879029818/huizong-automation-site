import { COMPANY, SITE_URL } from "@/lib/site-config";

const SCHEMA_CONTEXT = "https://schema.org";
const GOOD_RELATIONS_SELL = "http://purl.org/goodrelations/v1#Sell";
const GLOBAL_MARKET = "https://schema.org/Worldwide";

function absoluteUrl(href = "/") {
  return `${SITE_URL}${href === "/" ? "" : href}`;
}

function cleanNode(value) {
  if (Array.isArray(value)) {
    const entries = value.map(cleanNode).filter((item) => item !== undefined);
    return entries.length ? entries : undefined;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, entryValue]) => [key, cleanNode(entryValue)])
      .filter(([, entryValue]) => entryValue !== undefined);

    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return value;
}

function idsFor(url) {
  return {
    organization: `${SITE_URL}#organization`,
    website: `${SITE_URL}#website`,
    page: `${url}#webpage`,
    breadcrumb: `${url}#breadcrumb`,
    faq: `${url}#faq`,
    image: `${url}#primaryimage`,
    list: `${url}#itemlist`,
    catalog: `${url}#catalog`,
    entity: `${url}#entity`,
    offer: `${url}#offer`,
    contactPoint: `${SITE_URL}#sales-contact`
  };
}

function baseOrganization() {
  return {
    "@type": "Organization",
    "@id": idsFor(SITE_URL).organization,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: COMPANY.description,
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    address: {
      "@type": "PostalAddress",
      ...COMPANY.address
    },
    areaServed: GLOBAL_MARKET,
    contactPoint: {
      "@type": "ContactPoint",
      "@id": idsFor(SITE_URL).contactPoint,
      contactType: "sales",
      email: COMPANY.email,
      telephone: COMPANY.telephone,
      areaServed: GLOBAL_MARKET,
      availableLanguage: ["en"]
    },
    knowsAbout: [
      "Warehouse automation",
      "AGV systems",
      "ASRS engineering",
      "Intralogistics software orchestration"
    ]
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": idsFor(SITE_URL).website,
    url: SITE_URL,
    name: COMPANY.name,
    description: COMPANY.description,
    publisher: {
      "@id": idsFor(SITE_URL).organization
    },
    inLanguage: "en"
  };
}

function metricProperties(metrics = []) {
  return metrics.map((metric) => ({
    "@type": "PropertyValue",
    name: metric.label,
    value: metric.value
  }));
}

function detailTypeForPage(page) {
  if (page.kind === "product-detail") {
    return "Product";
  }

  if (page.kind === "solution-detail") {
    return "Service";
  }

  if (page.kind === "case-project-detail") {
    return "Article";
  }

  return "Thing";
}

function itemHref(card, page) {
  if (card.href) {
    return card.href;
  }

  if (page.kind === "case-category") {
    return undefined;
  }

  if (page.section === "case-studies") {
    return `/case-studies/${card.slug}`;
  }

  return `/${page.section}/${card.slug}`;
}

function imageSchema(page, url) {
  if (!page.data.image) {
    return null;
  }

  const ids = idsFor(url);

  return {
    "@type": "ImageObject",
    "@id": ids.image,
    url: absoluteUrl(page.data.image),
    contentUrl: absoluteUrl(page.data.image),
    name: page.data.title
  };
}

function pageTypeForKind(kind) {
  if (kind === "about-page") {
    return "AboutPage";
  }

  if (kind === "contact-page") {
    return "ContactPage";
  }

  if (
    kind === "product-overview" ||
    kind === "solution-overview" ||
    kind === "case-overview" ||
    kind === "case-category"
  ) {
    return "CollectionPage";
  }

  return "WebPage";
}

function pageNode(page, url, mainEntityId) {
  const ids = idsFor(url);
  const description = page.data.heroSummary || page.data.summary || COMPANY.description;

  return {
    "@type": pageTypeForKind(page.kind),
    "@id": ids.page,
    url,
    name: page.data.title,
    description,
    isPartOf: {
      "@id": ids.website
    },
    about: page.kind === "about-page" ? { "@id": ids.organization } : undefined,
    breadcrumb: page.breadcrumbs?.length ? { "@id": ids.breadcrumb } : undefined,
    primaryImageOfPage: page.data.image ? { "@id": ids.image } : undefined,
    mainEntity: mainEntityId ? { "@id": mainEntityId } : undefined,
    inLanguage: "en"
  };
}

function itemEntityStub(card, href, page) {
  const url = href ? absoluteUrl(href) : undefined;
  const type =
    page.section === "products"
      ? "Product"
      : page.section === "solutions"
        ? "Service"
        : page.kind === "case-category"
          ? "Article"
          : "CreativeWork";

  return cleanNode({
    "@type": type,
    "@id": url ? `${url}#entity` : undefined,
    name: card.title,
    description: card.summary || card.description,
    url
  });
}

function collectionListSchema(page, url) {
  const sourceItems = page.kind === "case-category" ? page.data.projects : page.data.cards;

  if (!sourceItems?.length) {
    return null;
  }

  const ids = idsFor(url);

  return {
    "@type": "ItemList",
    "@id": ids.list,
    name: page.data.title,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: sourceItems.length,
    itemListElement: sourceItems.map((card, index) => {
      const href = itemHref(card, page);

      return cleanNode({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        url: href ? absoluteUrl(href) : undefined,
        item: itemEntityStub(card, href, page)
      });
    })
  };
}

function offerCatalogSchema(page, url) {
  if (page.kind !== "product-overview" && page.kind !== "solution-overview") {
    return null;
  }

  const ids = idsFor(url);

  return {
    "@type": "OfferCatalog",
    "@id": ids.catalog,
    name: page.data.title,
    url,
    itemListElement: page.data.cards.map((card, index) => {
      const href = itemHref(card, page);
      const itemUrl = href ? absoluteUrl(href) : undefined;

      return cleanNode({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": page.kind === "product-overview" ? "Product" : "Service",
          "@id": itemUrl ? `${itemUrl}#entity` : undefined,
          name: card.title,
          description: card.summary,
          url: itemUrl
        }
      });
    })
  };
}

function productOfferSchema(page, url) {
  if (page.kind !== "product-detail") {
    return null;
  }

  const ids = idsFor(url);

  return {
    "@type": "Offer",
    "@id": ids.offer,
    name: `${page.data.title} custom quotation`,
    url,
    itemOffered: {
      "@id": ids.entity
    },
    seller: {
      "@id": ids.organization
    },
    eligibleRegion: GLOBAL_MARKET,
    category: "B2B warehouse automation procurement",
    businessFunction: GOOD_RELATIONS_SELL,
    itemCondition: "https://schema.org/NewCondition",
    priceSpecification: {
      "@type": "PriceSpecification",
      name: "Custom project quotation",
      description: `Pricing is quoted per ${page.data.title} scope, payload class, lift height, navigation stack, software integration, commissioning, and lifecycle support.`
    },
    eligibleCustomerType: {
      "@type": "BusinessAudience",
      audienceType: "Warehouse and manufacturing operators"
    },
    description: `Custom quotation available for ${page.data.title} deployment, integration, commissioning, and lifecycle support.`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Procurement model",
        value: "Request for quotation"
      },
      {
        "@type": "PropertyValue",
        name: "Commercial path",
        value: absoluteUrl("/contact")
      }
    ]
  };
}

function detailEntitySchema(page, url) {
  const ids = idsFor(url);
  const description = page.data.heroSummary || page.data.summary || COMPANY.description;

  if (page.kind === "product-detail") {
    return {
      "@type": "Product",
      "@id": ids.entity,
      name: page.data.title,
      description,
      url,
      image: page.data.image ? { "@id": ids.image } : undefined,
      category: "Warehouse automation equipment",
      brand: {
        "@id": ids.organization
      },
      manufacturer: {
        "@id": ids.organization
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Warehouse and manufacturing operators"
      },
      additionalProperty: metricProperties(page.data.metrics),
      offers: {
        "@id": ids.offer
      }
    };
  }

  if (page.kind === "solution-detail") {
    return {
      "@type": "Service",
      "@id": ids.entity,
      name: page.data.title,
      description,
      url,
      provider: {
        "@id": ids.organization
      },
      areaServed: GLOBAL_MARKET,
      serviceType: "Warehouse automation solution",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "B2B logistics operators"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${page.data.title} delivery scope`,
        itemListElement: [
          ...((page.data.features || []).map((feature, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: feature.title
          })) || []),
          ...((page.data.integrations || []).map((item, index) => ({
            "@type": "ListItem",
            position: (page.data.features || []).length + index + 1,
            name: item
          })) || [])
        ]
      }
    };
  }

  if (page.kind === "case-project-detail") {
    return {
      "@type": "Article",
      "@id": ids.entity,
      headline: page.data.title,
      description,
      url,
      author: {
        "@id": ids.organization
      },
      publisher: {
        "@id": ids.organization
      },
      mainEntityOfPage: {
        "@id": ids.page
      },
      articleSection: "Warehouse automation case study",
      abstract: page.data.summary,
      about: page.data.solutionStack?.map((entry) => ({
        "@type": "Thing",
        name: entry
      })),
      hasPart: [
        ...((page.data.bottlenecks || []).map((item) => ({
          "@type": "DefinedTerm",
          name: item.title,
          description: item.description
        })) || []),
        ...((page.data.commissioning || []).map((phase) => ({
          "@type": "HowToStep",
          name: phase
        })) || [])
      ]
    };
  }

  return null;
}

function homeEntitySchema(page, url) {
  if (page.kind !== "home-page") {
    return null;
  }

  const ids = idsFor(url);

  return {
    "@type": "ItemList",
    "@id": ids.list,
    name: "Primary navigation pathways",
    itemListElement: page.data.cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.title,
      url: absoluteUrl(card.href)
    }))
  };
}

function contactPageEntity(page, url) {
  if (page.kind !== "contact-page") {
    return null;
  }

  return {
    "@type": "ContactPoint",
    "@id": idsFor(url).entity,
    contactType: "sales",
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    areaServed: GLOBAL_MARKET,
    availableLanguage: ["en"]
  };
}

function aboutPageEntity(page, url) {
  if (page.kind !== "about-page") {
    return null;
  }

  return {
    "@type": "Organization",
    "@id": idsFor(url).entity,
    name: COMPANY.name,
    description: page.data.summary,
    parentOrganization: {
      "@id": idsFor(url).organization
    }
  };
}

function breadcrumbSchema(page, url) {
  if (!page.breadcrumbs?.length) {
    return null;
  }

  return {
    "@type": "BreadcrumbList",
    "@id": idsFor(url).breadcrumb,
    itemListElement: page.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };
}

function faqSchema(page, url) {
  if (!page.data.faqs?.length) {
    return null;
  }

  return {
    "@type": "FAQPage",
    "@id": idsFor(url).faq,
    mainEntity: page.data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

function mainEntityIdForPage(page, url) {
  if (
    page.kind === "home-page" ||
    page.kind === "product-overview" ||
    page.kind === "solution-overview" ||
    page.kind === "case-overview" ||
    page.kind === "case-category"
  ) {
    return idsFor(url).list;
  }

  if (page.kind === "about-page" || page.kind === "contact-page") {
    return idsFor(url).entity;
  }

  if (
    page.kind === "product-detail" ||
    page.kind === "solution-detail" ||
    page.kind === "case-project-detail"
  ) {
    return idsFor(url).entity;
  }

  return null;
}

function entitySchemas(page, url) {
  return [
    homeEntitySchema(page, url),
    aboutPageEntity(page, url),
    contactPageEntity(page, url),
    collectionListSchema(page, url),
    offerCatalogSchema(page, url),
    detailEntitySchema(page, url),
    productOfferSchema(page, url)
  ].filter(Boolean);
}

export function StructuredData({ page }) {
  const url = absoluteUrl(page.currentHref);
  const graph = cleanNode([
    baseOrganization(),
    websiteSchema(),
    imageSchema(page, url),
    pageNode(page, url, mainEntityIdForPage(page, url)),
    ...entitySchemas(page, url),
    breadcrumbSchema(page, url),
    faqSchema(page, url)
  ]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": SCHEMA_CONTEXT,
          "@graph": graph
        })
      }}
    />
  );
}

import { COMPANY, SITE_URL } from "@/lib/site-config";

function absoluteUrl(href = "/") {
  return `${SITE_URL}${href === "/" ? "" : href}`;
}

function baseOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: COMPANY.description,
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    address: {
      "@type": "PostalAddress",
      ...COMPANY.address
    }
  };
}

function metricProperties(metrics = []) {
  return metrics.map((metric) => ({
    "@type": "PropertyValue",
    name: metric.label,
    value: metric.value
  }));
}

function itemListElements(cards = [], section) {
  return cards.map((card, index) => {
    const href =
      card.href ||
      (section === "case-studies" ? `/case-studies/${card.slug}` : `/${section}/${card.slug}`);

    return {
      "@type": "ListItem",
      position: index + 1,
      name: card.title,
      url: absoluteUrl(href)
    };
  });
}

function breadcrumbSchema(page) {
  if (!page.breadcrumbs?.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href)
    }))
  };
}

function faqSchema(page) {
  if (!page.data.faqs?.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

function pageSchema(page) {
  const url = absoluteUrl(page.currentHref);
  const description = page.data.heroSummary || page.data.summary || COMPANY.description;

  if (page.kind === "home-page") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.data.title,
      description,
      url,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: itemListElements(page.data.cards, "home")
      }
    };
  }

  if (page.kind === "about-page") {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: page.data.title,
      description,
      url,
      about: {
        "@type": "Organization",
        name: COMPANY.name
      }
    };
  }

  if (page.kind === "contact-page") {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: page.data.title,
      description,
      url,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.telephone
      }
    };
  }

  if (
    page.kind === "product-overview" ||
    page.kind === "solution-overview" ||
    page.kind === "case-overview"
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.data.title,
      description,
      url,
      isPartOf: SITE_URL,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: itemListElements(page.data.cards, page.section)
      }
    };
  }

  if (page.kind === "product-detail") {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: page.data.title,
      description,
      url,
      category: "Warehouse automation equipment",
      image: page.data.image ? absoluteUrl(page.data.image) : undefined,
      brand: {
        "@type": "Brand",
        name: COMPANY.name
      },
      manufacturer: {
        "@type": "Organization",
        name: COMPANY.name
      },
      additionalProperty: metricProperties(page.data.metrics)
    };
  }

  if (page.kind === "solution-detail") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.data.title,
      description,
      url,
      provider: {
        "@type": "Organization",
        name: COMPANY.name
      },
      areaServed: "Global",
      serviceType: "Warehouse automation solution"
    };
  }

  if (page.kind === "case-category") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.data.title,
      description,
      url,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: page.data.projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title
        }))
      }
    };
  }

  if (page.kind === "case-project-detail") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.data.title,
      description,
      url,
      author: {
        "@type": "Organization",
        name: COMPANY.name
      },
      publisher: {
        "@type": "Organization",
        name: COMPANY.name
      },
      mainEntityOfPage: url,
      about: page.data.solutionStack?.map((entry) => ({
        "@type": "Thing",
        name: entry
      }))
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.data.title,
    description,
    url
  };
}

export function StructuredData({ page }) {
  const payload = [baseOrganization(), pageSchema(page), breadcrumbSchema(page), faqSchema(page)]
    .filter(Boolean);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

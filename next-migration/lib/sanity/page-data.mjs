import {
  aboutPageQuery,
  contactPageQuery,
  homePageQuery,
  siteSettingsQuery
} from "./queries.mjs";
import { sanityFetch } from "./fetch.mjs";

function normalizeImageAsset(image) {
  if (!image?.asset?.url) {
    return null;
  }

  return {
    src: image.asset.url,
    alt: image.alt || "",
    caption: image.caption || "",
    width: image.asset.metadata?.dimensions?.width || null,
    height: image.asset.metadata?.dimensions?.height || null,
    lqip: image.asset.metadata?.lqip || null
  };
}

function normalizeLink(link) {
  if (!link?.href && !link?.title) {
    return null;
  }

  return {
    href: link.href || "/",
    label: link.title || "Learn more"
  };
}

function normalizeMetric(metric) {
  if (!metric?.value && !metric?.label) {
    return null;
  }

  return {
    value: metric.value || "",
    label: metric.label || "",
    copy: metric.copy || "",
    icon: metric.icon || ""
  };
}

function normalizeFeatureCard(card) {
  if (!card?.title) {
    return null;
  }

  return {
    label: card.label || "",
    title: card.title,
    description: card.description || "",
    icon: card.icon || "",
    bullets: Array.isArray(card.bullets) ? card.bullets.filter(Boolean) : []
  };
}

function normalizeFaqItem(item) {
  if (!item?.question || !item?.answer) {
    return null;
  }

  return {
    question: item.question,
    answer: item.answer
  };
}

function normalizeBrand(brand) {
  if (!brand?.name || !brand?.image) {
    return null;
  }

  const image = normalizeImageAsset(brand.image);

  if (!image) {
    return null;
  }

  return {
    name: brand.name,
    href: brand.href || "",
    src: image.src,
    alt: image.alt || brand.name
  };
}

function normalizeTrustShowcaseItem(item) {
  if (!item?.kind) {
    return null;
  }

  const image = normalizeImageAsset(item.image);

  return {
    id: item.id || item.title || item.label || item.value || "trust-item",
    kind: item.kind,
    stage: item.stage || "edge-metric",
    tab: item.tab || "",
    value: item.value || "",
    label: item.label || "",
    copy: item.copy || "",
    eyebrow: item.eyebrow || "",
    title: item.title || "",
    image: image?.src || ""
  };
}

function normalizeTimelineItem(item) {
  if (!item?.year || !item?.title) {
    return null;
  }

  return {
    year: item.year,
    title: item.title,
    copy: item.description || "",
    side: item.side === "right" ? "right" : "left"
  };
}

function normalizeCertificateItem(item) {
  if (!item?.title || !item?.image) {
    return null;
  }

  const image = normalizeImageAsset(item.image);

  if (!image) {
    return null;
  }

  return {
    title: item.title,
    src: image.src,
    alt: image.alt || item.title,
    href: item.href || image.src
  };
}

function normalizeContactMethod(item) {
  if (!item?.title || !item?.value) {
    return null;
  }

  return {
    icon: item.icon || "",
    accentTone: item.accentTone || "primary",
    title: item.title,
    value: item.value,
    caption: item.caption || ""
  };
}

function normalizeSeo(seo) {
  if (!seo) {
    return null;
  }

  return {
    title: seo.title || "",
    description: seo.description || "",
    keywords: Array.isArray(seo.keywords) ? seo.keywords.filter(Boolean) : [],
    canonicalUrl: seo.canonicalUrl || "",
    noindex: Boolean(seo.noindex),
    ogTitle: seo.ogTitle || "",
    ogDescription: seo.ogDescription || "",
    ogImage: normalizeImageAsset(seo.ogImage),
    twitterCard: seo.twitterCard || "summary_large_image"
  };
}

function normalizeArray(items, normalizer) {
  if (!Array.isArray(items)) {
    return undefined;
  }

  const normalized = items.map(normalizer).filter(Boolean);
  return normalized.length ? normalized : undefined;
}

export async function getSiteSettings() {
  const doc = await sanityFetch({ query: siteSettingsQuery });

  if (!doc) {
    return null;
  }

  return {
    title: doc.title || "",
    description: doc.description || "",
    contactEmail: doc.contactEmail || "",
    contactPhone: doc.contactPhone || "",
    address: doc.address || "",
    defaultOgImage: normalizeImageAsset(doc.defaultOgImage),
    socialLinks: normalizeArray(doc.socialLinks, normalizeLink),
    seo: normalizeSeo(doc.seo)
  };
}

export async function getHomePageData() {
  const doc = await sanityFetch({ query: homePageQuery });

  if (!doc) {
    return null;
  }

  return {
    title: doc.title || "",
    kicker: doc.kicker || doc.hero?.kicker || "",
    summary: doc.summary || doc.hero?.summary || "",
    heroTitle: doc.hero?.title || doc.title || "",
    heroSummary: doc.hero?.summary || doc.summary || "",
    heroBackgroundImage: normalizeImageAsset(doc.hero?.backgroundImage),
    heroPrimaryCta: normalizeLink(doc.hero?.primaryCta),
    heroSecondaryCta: normalizeLink(doc.hero?.secondaryCta),
    heroPanelKicker: doc.hero?.panelKicker || "",
    heroPanelChip: doc.hero?.panelChip || "",
    heroPanelPosterImage: normalizeImageAsset(doc.hero?.panelPosterImage),
    metrics: normalizeArray(doc.metrics, normalizeMetric),
    cards: Array.isArray(doc.cards)
      ? doc.cards
          .map((card) => ({
            href: card?.href || "",
            title: card?.title || "",
            label: card?.label || "",
            summary: card?.summary || "",
            metrics: normalizeArray(card?.metrics, normalizeMetric) || []
          }))
          .filter((card) => card.title && card.href)
      : undefined,
    capabilities: Array.isArray(doc.capabilities) ? doc.capabilities.filter(Boolean) : undefined,
    industryTitle: doc.industryTitle || "",
    industrySummary: doc.industrySummary || "",
    industryCards: normalizeArray(doc.industryCards, normalizeFeatureCard),
    trustTitle: doc.trustTitle || "",
    trustSummary: doc.trustSummary || "",
    trustShowcase: normalizeArray(doc.trustShowcase, normalizeTrustShowcaseItem),
    partnerTitle: doc.partnerTitle || "",
    partnerSummary: doc.partnerSummary || "",
    partnerBrands: normalizeArray(doc.partnerBrands, normalizeBrand),
    faqs: normalizeArray(doc.faqs, normalizeFaqItem),
    seo: normalizeSeo(doc.seo)
  };
}

export async function getAboutPageData() {
  const doc = await sanityFetch({ query: aboutPageQuery });

  if (!doc) {
    return null;
  }

  return {
    title: doc.title || "",
    kicker: doc.kicker || doc.hero?.kicker || "",
    summary: doc.summary || doc.hero?.summary || "",
    heroTitle: doc.hero?.title || doc.title || "",
    heroSummary: doc.hero?.summary || doc.summary || "",
    heroBackgroundImage: normalizeImageAsset(doc.hero?.backgroundImage),
    metrics: normalizeArray(doc.metrics, normalizeMetric),
    timelineEyebrow: doc.timelineEyebrow || "",
    introTitle: doc.introTitle || "",
    introParagraphs: Array.isArray(doc.introParagraphs) ? doc.introParagraphs.filter(Boolean) : undefined,
    features: normalizeArray(doc.features, normalizeFeatureCard),
    timelineTitle: doc.timelineTitle || "",
    timelineItems: normalizeArray(doc.timelineItems, normalizeTimelineItem),
    certificateTitle: doc.certificateTitle || "",
    certificateEyebrow: doc.certificateEyebrow || "",
    certificateSummary: doc.certificateSummary || "",
    certificateStats: normalizeArray(doc.certificateStats, normalizeMetric),
    certificates: normalizeArray(doc.certificates, normalizeCertificateItem),
    certificateGalleryNote: doc.certificateGalleryNote || "",
    certificateBadgeLabel: doc.certificateBadgeLabel || "",
    ctaTitle: doc.ctaTitle || "",
    ctaSummary: doc.ctaSummary || "",
    ctaLink: normalizeLink(doc.ctaLink),
    faqs: normalizeArray(doc.faqs, normalizeFaqItem),
    seo: normalizeSeo(doc.seo)
  };
}

export async function getContactPageData() {
  const doc = await sanityFetch({ query: contactPageQuery });

  if (!doc) {
    return null;
  }

  return {
    title: doc.title || "",
    kicker: doc.kicker || doc.hero?.kicker || "",
    summary: doc.summary || doc.hero?.summary || "",
    heroTitle: doc.hero?.title || doc.title || "",
    heroSummary: doc.hero?.summary || doc.summary || "",
    heroBackgroundImage: normalizeImageAsset(doc.hero?.backgroundImage),
    heroPrimaryCta: normalizeLink(doc.hero?.primaryCta),
    heroSecondaryCta: normalizeLink(doc.hero?.secondaryCta),
    metrics: normalizeArray(doc.metrics, normalizeMetric),
    contactSectionTitle: doc.contactSectionTitle || "",
    contactSectionSummary: doc.contactSectionSummary || "",
    contactMethods: normalizeArray(doc.contactMethods, normalizeContactMethod),
    formTitle: doc.formTitle || "",
    formSummary: doc.formSummary || "",
    consentCopy: doc.consentCopy || "",
    submitLabel: doc.submitLabel || "",
    mapImage: normalizeImageAsset(doc.mapImage),
    mapLabel: doc.mapLabel || "",
    faqs: normalizeArray(doc.faqs, normalizeFaqItem),
    seo: normalizeSeo(doc.seo)
  };
}

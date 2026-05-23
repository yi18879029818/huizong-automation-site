export const imageProjection = `{
  ...,
  asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions
    }
  }
}`;

export const seoProjection = `{
  title,
  description,
  keywords,
  canonicalUrl,
  noindex,
  ogTitle,
  ogDescription,
  ogImage${imageProjection},
  twitterCard
}`;

export const linkProjection = `{
  title,
  href
}`;

export const metricProjection = `{
  value,
  label,
  copy,
  icon
}`;

export const faqItemProjection = `{
  question,
  answer
}`;

export const featureCardProjection = `{
  label,
  title,
  description,
  icon,
  bullets[]
}`;

export const logoItemProjection = `{
  name,
  href,
  image${imageProjection}
}`;

export const heroProjection = `{
  kicker,
  title,
  summary,
  backgroundImage${imageProjection},
  primaryCta${linkProjection},
  secondaryCta${linkProjection},
  panelKicker,
  panelChip,
  panelPosterImage${imageProjection}
}`;

export const timelineItemProjection = `{
  year,
  title,
  description,
  side
}`;

export const certificateItemProjection = `{
  title,
  href,
  image${imageProjection}
}`;

export const trustShowcaseItemProjection = `{
  id,
  kind,
  stage,
  tab,
  value,
  label,
  copy,
  eyebrow,
  title,
  image${imageProjection}
}`;

export const contactMethodProjection = `{
  icon,
  accentTone,
  title,
  value,
  caption
}`;

export const portableTextProjection = `[]{
  ...,
  _type == "imageWithAlt" => ${imageProjection}
}`;

export const postListQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  heroImage${imageProjection},
  seo${seoProjection}
}`;

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body${portableTextProjection},
  heroImage${imageProjection},
  seo${seoProjection}
}`;

export const caseStudyListQuery = `*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  heroImage${imageProjection},
  seo${seoProjection}
}`;

export const caseStudyQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  challenge${portableTextProjection},
  solution${portableTextProjection},
  result${portableTextProjection},
  heroImage${imageProjection},
  seo${seoProjection}
}`;

export const faqListQuery = `*[_type == "faq"] | order(orderRank asc, _createdAt asc) {
  _id,
  question,
  answer${portableTextProjection},
  orderRank,
  seo${seoProjection}
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  contactEmail,
  contactPhone,
  address,
  defaultOgImage${imageProjection},
  socialLinks[]${linkProjection},
  seo${seoProjection}
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  kicker,
  summary,
  hero${heroProjection},
  metrics[]${metricProjection},
  cards[]{
    href,
    title,
    label,
    summary,
    metrics[]${metricProjection}
  },
  capabilities[],
  industryTitle,
  industrySummary,
  industryCards[]${featureCardProjection},
  trustTitle,
  trustSummary,
  trustShowcase[]${trustShowcaseItemProjection},
  partnerTitle,
  partnerSummary,
  partnerBrands[]${logoItemProjection},
  faqs[]${faqItemProjection},
  seo${seoProjection}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title,
  kicker,
  summary,
  hero${heroProjection},
  metrics[]${metricProjection},
  timelineEyebrow,
  introTitle,
  introParagraphs[],
  features[]${featureCardProjection},
  timelineTitle,
  timelineItems[]${timelineItemProjection},
  certificateTitle,
  certificateEyebrow,
  certificateSummary,
  certificateStats[]${metricProjection},
  certificates[]${certificateItemProjection},
  certificateGalleryNote,
  certificateBadgeLabel,
  ctaTitle,
  ctaSummary,
  ctaLink${linkProjection},
  faqs[]${faqItemProjection},
  seo${seoProjection}
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  kicker,
  summary,
  hero${heroProjection},
  metrics[]${metricProjection},
  contactSectionTitle,
  contactSectionSummary,
  contactMethods[]${contactMethodProjection},
  formTitle,
  formSummary,
  consentCopy,
  submitLabel,
  mapImage${imageProjection},
  mapLabel,
  faqs[]${faqItemProjection},
  seo${seoProjection}
}`;

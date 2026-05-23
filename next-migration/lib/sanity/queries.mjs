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
  canonicalUrl,
  noindex,
  ogTitle,
  ogDescription,
  ogImage${imageProjection},
  twitterCard
}`;

export const portableTextProjection = `[]{
  ...,
  _type == "image" => ${imageProjection}
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

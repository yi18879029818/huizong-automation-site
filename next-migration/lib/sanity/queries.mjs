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

export const portableTextProjection = `[]{
  ...,
  _type == "image" => ${imageProjection},
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

export const relatedPostListQuery = `*[_type == "post" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc, _createdAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt
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

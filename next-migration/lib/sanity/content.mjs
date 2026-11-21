import { getLocale } from "@/lib/i18n/server";
import { imageProjection, portableTextProjection, seoProjection } from "./queries.mjs";
import {
  caseStudyListQuery,
  caseStudyQuery,
  faqListQuery,
  relatedPostListQuery,
  postListQuery,
  postQuery
} from "./queries.mjs";
import { sanityFetch } from "./fetch.mjs";

const translatedListQuery = `*[_type=="postTranslation" && locale==$locale && status=="published" && !(_id in path("drafts.**"))] | order(source->publishedAt desc) {
  _id, title, excerpt, "slug":source->slug.current, "publishedAt":source->publishedAt,
  _updatedAt, "heroImage":source->heroImage${imageProjection}, seo${seoProjection}, locale
}`;

export async function getPostList() {
  const locale = getLocale();
  if (locale !== "en") return (await sanityFetch({ query: translatedListQuery, params: { locale } })) || [];
  return (await sanityFetch({ query: postListQuery })) || [];
}

export async function getPostBySlug(slug) {
  if (!slug) {
    return null;
  }

  const locale = getLocale();
  if (locale !== "en") {
    return sanityFetch({
      query: `*[_type=="postTranslation" && source->slug.current==$slug && locale==$locale && status=="published" && !(_id in path("drafts.**"))][0] {
        _id, title, excerpt, "slug":source->slug.current, "publishedAt":source->publishedAt,
        "heroImage":source->heroImage${imageProjection}, body${portableTextProjection},
        seo${seoProjection}, locale
      }`,
      params: { slug, locale }
    });
  }
  return sanityFetch({
    query: postQuery,
    params: { slug }
  });
}

export async function getRelatedPosts(slug) {
  const locale = getLocale();
  if (locale !== "en") return (await getPostList()).filter(post => post.slug !== slug).slice(0, 3);
  return (await sanityFetch({
    query: relatedPostListQuery,
    params: { slug }
  })) || [];
}

export async function getFaqList() {
  return (await sanityFetch({ query: faqListQuery })) || [];
}

export async function getCaseStudyList() {
  return (await sanityFetch({ query: caseStudyListQuery })) || [];
}

export async function getCaseStudyBySlug(slug) {
  if (!slug) {
    return null;
  }

  return sanityFetch({
    query: caseStudyQuery,
    params: { slug }
  });
}

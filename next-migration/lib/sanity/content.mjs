import {
  caseStudyListQuery,
  caseStudyQuery,
  faqListQuery,
  postListQuery,
  postQuery
} from "./queries.mjs";
import { sanityFetch } from "./fetch.mjs";

export async function getPostList() {
  return (await sanityFetch({ query: postListQuery })) || [];
}

export async function getPostBySlug(slug) {
  if (!slug) {
    return null;
  }

  return sanityFetch({
    query: postQuery,
    params: { slug }
  });
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

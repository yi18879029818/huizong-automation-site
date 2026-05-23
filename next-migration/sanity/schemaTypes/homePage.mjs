import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string"
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroBlock"
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metricItem" })]
    }),
    defineField({
      name: "cards",
      title: "Navigation cards",
      type: "array",
      of: [defineArrayMember({ type: "navCardItem" })]
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "industryTitle",
      title: "Industry section title",
      type: "string"
    }),
    defineField({
      name: "industrySummary",
      title: "Industry section summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "industryCards",
      title: "Industry cards",
      type: "array",
      of: [defineArrayMember({ type: "featureCard" })]
    }),
    defineField({
      name: "trustTitle",
      title: "Trust section title",
      type: "string"
    }),
    defineField({
      name: "trustSummary",
      title: "Trust section summary",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "trustShowcase",
      title: "Trust showcase",
      type: "array",
      of: [defineArrayMember({ type: "trustShowcaseItem" })]
    }),
    defineField({
      name: "partnerTitle",
      title: "Partner section title",
      type: "string"
    }),
    defineField({
      name: "partnerSummary",
      title: "Partner section summary",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "partnerBrands",
      title: "Partner brands",
      type: "array",
      of: [defineArrayMember({ type: "logoItem" })]
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "kicker"
    }
  }
});

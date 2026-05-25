import { defineArrayMember, defineField, defineType } from "sanity";

const catalogSections = [
  { title: "Products", value: "products" },
  { title: "Solutions", value: "solutions" },
  { title: "Case Studies", value: "case-studies" }
];

export const catalogOverviewPage = defineType({
  name: "catalogOverviewPage",
  title: "Catalog overview page",
  type: "document",
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: catalogSections,
        layout: "radio"
      },
      validation: (Rule) => Rule.required()
    }),
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
      rows: 4
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
      subtitle: "section"
    }
  }
});

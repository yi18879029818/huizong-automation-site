import { defineArrayMember, defineField, defineType } from "sanity";

const catalogSections = [
  { title: "Products", value: "products" },
  { title: "Solutions", value: "solutions" },
  { title: "Case Studies", value: "case-studies" }
];

export const catalogDetailPage = defineType({
  name: "catalogDetailPage",
  title: "Catalog detail page",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Use the route slug relative to the section. Example: agv-forklift or projects/automated-warehouse-upgrade.",
      options: {
        source: "title",
        maxLength: 120
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string"
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
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "featureCard" })]
    }),
    defineField({
      name: "scenarios",
      title: "Scenarios",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "integrations",
      title: "Integrations",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [defineArrayMember({ type: "detailListItem" })]
    }),
    defineField({
      name: "bottlenecks",
      title: "Bottlenecks",
      type: "array",
      of: [defineArrayMember({ type: "detailListItem" })]
    }),
    defineField({
      name: "solutionStack",
      title: "Solution stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "commissioning",
      title: "Commissioning",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
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

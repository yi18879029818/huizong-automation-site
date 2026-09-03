import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
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
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "ASRS", value: "ASRS" },
          { title: "Material Handling", value: "Material Handling" }
        ]
      }
    }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "projectDate", title: "Project date", type: "date" }),
    defineField({ name: "orderRank", title: "Listing order", type: "number" }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt"
    }),
    defineField({ name: "coverImage", title: "Local cover image", type: "staticImage" }),
    defineField({
      name: "gallery",
      title: "Local project gallery",
      type: "array",
      of: [{ type: "staticImage" }]
    }),
    defineField({
      name: "metrics",
      title: "Verified project metrics",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() })
        ]
      }]
    }),
    defineField({ name: "background", title: "Background", type: "portableText" }),
    defineField({ name: "objectives", title: "Objectives", type: "portableText" }),
    defineField({ name: "assessment", title: "Site assessment", type: "portableText" }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "portableText"
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "portableText"
    }),
    defineField({ name: "workflow", title: "Workflow", type: "portableText" }),
    defineField({ name: "specifications", title: "Specifications", type: "comparisonTable" }),
    defineField({ name: "scope", title: "Project scope", type: "comparisonTable" }),
    defineField({
      name: "result",
      title: "Result",
      type: "portableText"
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
      subtitle: "summary"
    }
  }
});

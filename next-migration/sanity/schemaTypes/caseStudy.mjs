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
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt"
    }),
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

import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "portableText"
    }),
    defineField({
      name: "orderRank",
      title: "Order rank",
      type: "number",
      initialValue: 0
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ],
  preview: {
    select: {
      title: "question"
    }
  }
});

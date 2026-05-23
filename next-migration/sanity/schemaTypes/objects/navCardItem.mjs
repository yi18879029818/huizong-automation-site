import { defineArrayMember, defineField, defineType } from "sanity";

export const navCardItem = defineType({
  name: "navCardItem",
  title: "Navigation card",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string"
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metricItem" })]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href"
    }
  }
});

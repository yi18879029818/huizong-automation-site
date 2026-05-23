import { defineField, defineType } from "sanity";

export const metricItem = defineType({
  name: "metricItem",
  title: "Metric item",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "copy",
      title: "Supporting copy",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value"
    }
  }
});

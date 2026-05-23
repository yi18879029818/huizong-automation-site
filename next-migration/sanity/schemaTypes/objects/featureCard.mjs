import { defineArrayMember, defineField, defineType } from "sanity";

export const featureCard = defineType({
  name: "featureCard",
  title: "Feature card",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string"
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label"
    }
  }
});

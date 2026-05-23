import { defineField, defineType } from "sanity";

export const contactMethod = defineType({
  name: "contactMethod",
  title: "Contact method",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string"
    }),
    defineField({
      name: "accentTone",
      title: "Accent tone",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Primary container", value: "primary-container" },
          { title: "Tertiary", value: "tertiary" }
        ]
      }
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "value"
    }
  }
});

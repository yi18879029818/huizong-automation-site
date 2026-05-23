import { defineField, defineType } from "sanity";

export const certificateItem = defineType({
  name: "certificateItem",
  title: "Certificate item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "href",
      title: "Link href",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "image"
    }
  }
});

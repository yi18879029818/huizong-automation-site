import { defineField, defineType } from "sanity";

export const logoItem = defineType({
  name: "logoItem",
  title: "Logo item",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      title: "name",
      media: "image"
    }
  }
});

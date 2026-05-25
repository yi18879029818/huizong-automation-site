import { defineField, defineType } from "sanity";

export const detailListItem = defineType({
  name: "detailListItem",
  title: "Detail list item",
  type: "object",
  fields: [
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
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    }
  }
});

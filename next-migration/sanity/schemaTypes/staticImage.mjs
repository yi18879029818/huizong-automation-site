import { defineField, defineType } from "sanity";

export const staticImage = defineType({
  name: "staticImage",
  title: "Local static image",
  type: "object",
  fields: [
    defineField({ name: "src", title: "Project path", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "width", title: "Width", type: "number" }),
    defineField({ name: "height", title: "Height", type: "number" })
  ],
  preview: {
    select: { title: "alt", subtitle: "src" }
  }
});

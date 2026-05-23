import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url"
    }),
    defineField({
      name: "noindex",
      title: "No index",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph title",
      type: "string"
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "twitterCard",
      title: "Twitter card",
      type: "string",
      initialValue: "summary_large_image",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Large image", value: "summary_large_image" }
        ]
      }
    })
  ]
});

import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string"
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string"
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })]
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "contactEmail"
    }
  }
});

import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero block",
  type: "object",
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "linkItem"
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "linkItem"
    }),
    defineField({
      name: "panelKicker",
      title: "Panel kicker",
      type: "string"
    }),
    defineField({
      name: "panelChip",
      title: "Panel chip",
      type: "string"
    }),
    defineField({
      name: "panelPosterImage",
      title: "Panel poster image",
      type: "imageWithAlt"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "kicker",
      media: "backgroundImage"
    }
  }
});

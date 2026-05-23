import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "string"
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "heroBlock"
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metricItem" })]
    }),
    defineField({
      name: "contactSectionTitle",
      title: "Contact section title",
      type: "string"
    }),
    defineField({
      name: "contactSectionSummary",
      title: "Contact section summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "contactMethods",
      title: "Contact methods",
      type: "array",
      of: [defineArrayMember({ type: "contactMethod" })]
    }),
    defineField({
      name: "formTitle",
      title: "Form title",
      type: "string"
    }),
    defineField({
      name: "formSummary",
      title: "Form summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "consentCopy",
      title: "Consent copy",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "submitLabel",
      title: "Submit label",
      type: "string"
    }),
    defineField({
      name: "mapImage",
      title: "Map image",
      type: "imageWithAlt"
    }),
    defineField({
      name: "mapLabel",
      title: "Map label",
      type: "string"
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })]
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
      subtitle: "kicker"
    }
  }
});

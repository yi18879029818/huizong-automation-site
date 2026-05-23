import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
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
      name: "timelineEyebrow",
      title: "Timeline eyebrow",
      type: "string"
    }),
    defineField({
      name: "introTitle",
      title: "Intro title",
      type: "string"
    }),
    defineField({
      name: "introParagraphs",
      title: "Intro paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text" })]
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "featureCard" })]
    }),
    defineField({
      name: "timelineTitle",
      title: "Timeline title",
      type: "string"
    }),
    defineField({
      name: "timelineItems",
      title: "Timeline items",
      type: "array",
      of: [defineArrayMember({ type: "timelineItem" })]
    }),
    defineField({
      name: "certificateTitle",
      title: "Certificate title",
      type: "string"
    }),
    defineField({
      name: "certificateEyebrow",
      title: "Certificate eyebrow",
      type: "string"
    }),
    defineField({
      name: "certificateSummary",
      title: "Certificate summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "certificateStats",
      title: "Certificate stats",
      type: "array",
      of: [defineArrayMember({ type: "metricItem" })]
    }),
    defineField({
      name: "certificates",
      title: "Certificates",
      type: "array",
      of: [defineArrayMember({ type: "certificateItem" })]
    }),
    defineField({
      name: "certificateGalleryNote",
      title: "Certificate gallery note",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "certificateBadgeLabel",
      title: "Certificate badge label",
      type: "string"
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "string"
    }),
    defineField({
      name: "ctaSummary",
      title: "CTA summary",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "ctaLink",
      title: "CTA link",
      type: "linkItem"
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

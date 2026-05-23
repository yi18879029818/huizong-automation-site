import { defineField, defineType } from "sanity";

export const trustShowcaseItem = defineType({
  name: "trustShowcaseItem",
  title: "Trust showcase item",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string"
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      initialValue: "metric",
      options: {
        list: [
          { title: "Metric", value: "metric" },
          { title: "Proof", value: "proof" }
        ]
      }
    }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "string",
      options: {
        list: [
          { title: "Edge metric", value: "edge-metric" },
          { title: "Feature metric", value: "feature-metric" },
          { title: "Wide metric", value: "wide-metric" },
          { title: "Hero proof", value: "hero-proof" },
          { title: "Edge proof", value: "edge-proof" },
          { title: "Feature proof", value: "feature-proof" }
        ]
      }
    }),
    defineField({
      name: "tab",
      title: "Tab",
      type: "string"
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string"
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string"
    }),
    defineField({
      name: "copy",
      title: "Copy",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "kind",
      media: "image"
    }
  }
});

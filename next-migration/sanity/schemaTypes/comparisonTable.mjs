import { defineField, defineType } from "sanity";

export const comparisonTable = defineType({
  name: "comparisonTable",
  title: "Comparison Table",
  type: "object",
  fields: [
    defineField({
      name: "headers",
      title: "Headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "array",
          of: [{ type: "string" }]
        }
      ],
      validation: (Rule) => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      headers: "headers",
      rows: "rows"
    },
    prepare({ headers, rows }) {
      const columnCount = Array.isArray(headers) ? headers.length : 0;
      const rowCount = Array.isArray(rows) ? rows.length : 0;

      return {
        title: "Comparison Table",
        subtitle: `${columnCount} columns / ${rowCount} rows`
      };
    }
  }
});

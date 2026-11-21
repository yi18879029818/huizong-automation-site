import { defineField, defineType } from "sanity";
import { post } from "./post.mjs";

export const postTranslation = defineType({
  name: "postTranslation",
  title: "Post translation",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "English article",
      type: "reference",
      to: [{ type: "post" }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "locale",
      title: "Language",
      type: "string",
      options: { list: [{ title: "Français", value: "fr" }, { title: "Deutsch", value: "de" }, { title: "Español", value: "es" }] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "status",
      title: "Translation status",
      type: "string",
      initialValue: "draft",
      options: { list: [{ title: "Draft", value: "draft" }, { title: "Published", value: "published" }] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "sourceRevision",
      title: "Translated English revision",
      type: "string",
      readOnly: true,
      validation: Rule => Rule.custom(async (revision, context) => {
        if (!context.document?.source?._ref || !revision) return true;
        const current = await context.getClient({ apiVersion: "2025-05-23" })
          .fetch('*[_id==$id][0]._rev', { id: context.document.source._ref });
        return current === revision ? true : "The English article has changed. Review and refresh this translation.";
      }).warning()
    }),
    ...post.fields.filter(field => ["title", "excerpt", "body", "seo"].includes(field.name))
  ],
  validation: Rule => Rule.custom(async (document, context) => {
    if (!document?.source?._ref || !document.locale) return true;
    const id = document._id.replace(/^drafts\./, "");
    const count = await context.getClient({ apiVersion: "2025-05-23" }).fetch(
      'count(*[_type=="postTranslation" && source._ref==$source && locale==$locale && !(_id in [$id, "drafts."+$id])])',
      { source: document.source._ref, locale: document.locale, id }
    );
    return count === 0 ? true : "A translation for this article and language already exists.";
  }),
  preview: {
    select: { title: "title", language: "locale", status: "status" },
    prepare: ({ title, language, status }) => ({ title, subtitle: language + " · " + status })
  }
});

import { BLOG_DETAIL_INTROS, BLOG_DETAIL_SUMMARIES } from "./blog-detail-editorial-copy.mjs";

const LIMIT = 240;
const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });

function clean(text = "") {
  return text.replace(/^EN:\s*/i, "").replace(/\s+/g, " ").trim();
}

function textOf(block) {
  return clean((block.children || []).map((span) => span.text || "").join(""));
}

function comparable(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function overlaps(left, right) {
  const a = comparable(left);
  const b = comparable(right);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

function shorten(text) {
  if (text.length <= LIMIT) return text;
  const words = text.slice(0, LIMIT - 1).replace(/\s+\S*$/, "");
  return `${words || text.slice(0, LIMIT - 1)}…`;
}

export function getBlogDetailCopy(post = {}, body = post.body) {
  const blocks = (Array.isArray(body) ? body : []).filter((block) => block?._type === "block");
  const paragraphs = blocks.filter((block) => !block.listItem && (!block.style || block.style === "normal"))
    .map(textOf).filter(Boolean);
  const sentences = paragraphs.flatMap((text) => [...segmenter.segment(text)].map(({ segment }) => clean(segment)))
    .filter((text) => text && !/^(?:contact us|contact coolyne|related reading|read more|learn more)\b/i.test(text));
  const definitionIndex = blocks.findIndex((block) => /^h[2-4]$/.test(block.style)
    && /^(?:what (?:is|are)\b|understanding\b)|overview$/i.test(textOf(block)) && !/\bcoolyne\b/i.test(textOf(block)));
  const definitionBlock = definitionIndex < 0 ? null : blocks.slice(definitionIndex + 1)
    .find((block) => !block.listItem && (!block.style || block.style === "normal"));
  const definitions = definitionBlock ? [...segmenter.segment(textOf(definitionBlock))].map(({ segment }) => clean(segment)) : [];
  const standalone = (text) => text.length >= 45 && text.length <= LIMIT && /[.!。！]$/.test(text)
    && !/^(?:these|those|this|it|they|however|for example|as a result|after |instead|the information)\b/i.test(text);
  const introSource = BLOG_DETAIL_INTROS[post.slug] || definitions.find(standalone) || sentences.slice(0, 12).find(standalone)
    || sentences[0] || clean(post.excerpt);
  const intro = shorten(introSource);
  const topics = [];

  const headings = blocks.filter((item) => /^h[2-4]$/.test(item.style))
    .sort((a, b) => Number(a.style[1]) - Number(b.style[1]));
  for (const block of headings) {
    const topic = textOf(block).replace(/^\d+[.)]\s*/, "").replace(/[.:：]+$/, "");
    if (topic.length < 5 || topic.length > 85 || /^(?:what (?:is|are)\b|introduction\b|understanding\b|overview$|conclusion\b|(?:in )?summary$|related\b|references?$|faq\b|frequently asked|contact\b)/i.test(topic)
      || /\bcoolyne\b/i.test(topic) || overlaps(topic, introSource) || topics.some((item) => overlaps(item, topic))) continue;
    if ([...topics, topic].join(" · ").length > LIMIT) continue;
    topics.push(topic);
    if (topics.length === 3) break;
  }

  const summary = BLOG_DETAIL_SUMMARIES[post.slug] || (topics.length ? topics.join(" · ")
    : shorten(sentences.find((text) => !overlaps(text, introSource) && text.length <= LIMIT) || ""));
  return { intro, summary };
}

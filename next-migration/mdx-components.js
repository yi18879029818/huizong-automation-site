import { createElement } from "react";
import { Localized } from "@/components/localized";

const tags = ["p", "h1", "h2", "h3", "h4", "li", "a", "th", "td", "blockquote", "figcaption"];
const localizedComponents = Object.fromEntries(tags.map(tag => [
  tag, function TranslatedMdxElement(props) {
    return <Localized>{createElement(tag, props)}</Localized>;
  }
]));

export function useMDXComponents(components) {
  return { ...localizedComponents, ...components };
}

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image.mjs";

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} rel="noreferrer" target="_blank">
        {children}
      </a>
    )
  },
  types: {
    imageWithAlt: ({ value }) => {
      const imageUrl = urlFor(value)?.width(1200).url();

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="sanity-inline-image">
          <img alt={value.alt || ""} src={imageUrl} />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    }
  }
};

export function SanityPortableText({ value }) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={portableTextComponents} />;
}

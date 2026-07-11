import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { normalizeInternalHref } from "@/lib/blog-internal-links.mjs";
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
    link: ({ children, value }) => {
      const internalHref = normalizeInternalHref(value?.href);

      if (internalHref) {
        return <Link href={internalHref}>{children}</Link>;
      }

      return (
        <a href={value?.href} rel="noreferrer" target="_blank">
          {children}
        </a>
      );
    }
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
    },
    staticImage: ({ value }) => {
      if (!value?.src) {
        return null;
      }

      return (
        <figure className="sanity-inline-image">
          <img
            alt={value.alt || ""}
            decoding="async"
            loading="lazy"
            src={value.src}
          />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      if (!value?.src) {
        return null;
      }

      return (
        <figure className="sanity-inline-video">
          <video controls playsInline preload="metadata">
            <source src={value.src} type="video/mp4" />
          </video>
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    comparisonTable: ({ value }) => {
      if (!value?.headers?.length || !value?.rows?.length) {
        return null;
      }

      return (
        <div className="sanity-comparison-table">
          <table>
            <thead>
              <tr>
                {value.headers.map((header, index) => (
                  <th key={`${header}-${index}`}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

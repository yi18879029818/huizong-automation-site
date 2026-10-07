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
    },
    productSpecifications: ({ value }) => {
      if (!value?.products?.length) {
        return null;
      }

      return (
        <section className="blog-product-specifications" aria-label="Lifting AGV product specifications">
          <p className="blog-product-specifications-eyebrow">Product Specifications</p>
          <div className="blog-product-specifications-list">
            {value.products.map((product) => (
              <article className="blog-product-specification-card" key={product.name}>
                <div className="blog-product-specification-product">
                  <Link
                    aria-label={`View ${product.name} product page`}
                    className="blog-product-specification-image-link"
                    href={product.href}
                  >
                    <img alt={product.imageAlt} src={product.image} />
                  </Link>
                  <div>
                    <h3>{product.name}</h3>
                    <Link className="blog-product-specification-link" href={product.href}>
                      View product →
                    </Link>
                  </div>
                </div>
                <dl className="blog-product-specification-grid">
                  {product.specifications.map((specification) => (
                    <div key={specification.label}>
                      <dt>{specification.label}</dt>
                      <dd>{specification.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>
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

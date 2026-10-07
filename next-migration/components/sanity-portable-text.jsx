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

      const forkliftLayout = value.layout === "forklift-dashboard";

      return (
        <section
          className={`blog-product-specifications${forkliftLayout ? " blog-product-specifications-forklift" : ""}`}
          aria-label="Product specifications"
        >
          {!forkliftLayout ? (
            <p className="blog-product-specifications-eyebrow">Product Specifications</p>
          ) : null}
          <div className="blog-product-specifications-list">
            {value.products.map((product) => (
              <article className="blog-product-specification-card" key={product.name}>
                {forkliftLayout ? (
                  <>
                    <h3 className="blog-forklift-specification-title">{product.name}</h3>
                    <div className="blog-forklift-specification-layout">
                      <Link
                        aria-label={`View ${product.name} product page`}
                        className="blog-forklift-specification-image-link"
                        href={product.href}
                      >
                        <img alt={product.imageAlt} src={product.image} />
                      </Link>
                      <div className="blog-forklift-specification-tile blog-forklift-load-tile">
                        <span>Rated Load</span>
                        <div className="blog-forklift-load-ring" aria-hidden="true">
                          <span>KG</span>
                        </div>
                        <strong>{product.specifications.find((item) => item.label === "Rated Load")?.value}</strong>
                      </div>
                      <dl className="blog-forklift-specification-details">
                        {product.specifications
                          .filter((item) => ["Min. Aisle Width", "Battery Life / Charge", "Pallet Size", "Navigation Mode"].includes(item.label))
                          .map((item) => (
                            <div key={item.label}>
                              <dt>{item.label}:</dt>
                              <dd>{item.value}</dd>
                            </div>
                          ))}
                      </dl>
                      <div className="blog-forklift-specification-tile blog-forklift-height-tile">
                        <span>Lifting Height</span>
                        <div className="blog-forklift-height-meter" aria-hidden="true"><i /></div>
                        <strong>{product.specifications.find((item) => item.label === "Lifting Height")?.value}</strong>
                      </div>
                      <div className="blog-forklift-specification-tile blog-forklift-speed-tile">
                        <span>Max. No-load<br />Speed</span>
                        <svg className="blog-forklift-speed-icon" viewBox="0 0 100 68" aria-hidden="true">
                          <path d="M10 58a40 40 0 0 1 80 0" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                          <path d="M18 38a40 40 0 0 1 18-17" fill="none" stroke="#ff7a1a" strokeWidth="12" strokeLinecap="round" />
                          <path d="M50 55 27 34" fill="none" stroke="#ff7a1a" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="50" cy="55" r="5" fill="#ff7a1a" />
                        </svg>
                        <strong>{product.specifications.find((item) => item.label === "Max. No-load Speed")?.value}</strong>
                      </div>
                      <div className="blog-forklift-specification-tile blog-forklift-accuracy-tile">
                        <span>Positioning<br />Accuracy</span>
                        <svg className="blog-forklift-target-icon" viewBox="0 0 80 80" aria-hidden="true">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#dedede" strokeWidth="2" />
                          <circle cx="40" cy="40" r="23" fill="none" stroke="#dedede" strokeWidth="2" />
                          <circle cx="40" cy="40" r="14" fill="none" stroke="#dedede" strokeWidth="2" />
                          <circle cx="40" cy="40" r="6" fill="none" stroke="#ff7a1a" strokeWidth="2" />
                          <circle cx="40" cy="40" r="2.5" fill="#ff7a1a" />
                        </svg>
                        <strong>{product.specifications.find((item) => item.label === "Positioning Accuracy")?.value}</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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

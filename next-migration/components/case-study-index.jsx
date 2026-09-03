"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const filters = ["All Projects", "ASRS", "Material Handling"];

function CaseStudyImage({ image, title }) {
  if (!image?.src) {
    return <div aria-hidden="true" className="case-study-card-image case-study-card-image--fallback" />;
  }

  return (
    <Image
      alt={image.alt || title}
      className="case-study-card-image"
      height={image.height || 720}
      sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
      src={image.src}
      width={image.width || 1200}
    />
  );
}

export function CaseStudyIndex({ caseStudies }) {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const visibleStudies = caseStudies.filter(
    (study) => activeFilter === "All Projects" || study.category === activeFilter
  );

  return (
    <>
      <div aria-label="Filter case studies" className="case-study-filters" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter}
            className={`case-study-filter${activeFilter === filter ? " is-active" : ""}`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="case-study-grid">
        {visibleStudies.map((study) => (
          <article className="case-study-card" key={study.slug}>
            <Link
              aria-label={`View ${study.title}`}
              className="case-study-card-media"
              href={`/case-studies/projects/${study.slug}`}
            >
              <CaseStudyImage image={study.coverImage || study.heroImage} title={study.title} />
            </Link>
            <div className="case-study-card-body">
              <div className="case-study-card-meta">
                <span>{study.category || "Case Study"}</span>
                {study.industry ? <span>{study.industry}</span> : null}
              </div>
              <h2>
                <Link href={`/case-studies/projects/${study.slug}`}>{study.title}</Link>
              </h2>
              <p>{study.summary}</p>
              <Link className="case-study-card-link" href={`/case-studies/projects/${study.slug}`}>
                View Project <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

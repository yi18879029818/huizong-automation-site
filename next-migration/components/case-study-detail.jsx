import Image from "next/image";
import Link from "next/link";
import { SanityPortableText } from "@/components/sanity-portable-text";

function LocalImage({ image, className = "", priority = false }) {
  if (!image?.src) {
    return null;
  }

  return (
    <figure className={`case-study-image ${className}`.trim()}>
      <Image
        alt={image.alt || ""}
        height={image.height || 900}
        priority={priority}
        sizes={priority ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, 50vw"}
        src={image.src}
        width={image.width || 1600}
      />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function TextSection({ id, title, value }) {
  if (!value?.length) {
    return null;
  }

  return (
    <section aria-labelledby={id} className="case-study-content-section">
      <h2 id={id}>{title}</h2>
      <div className="mdx-prose case-study-prose">
        <SanityPortableText value={value} />
      </div>
    </section>
  );
}

function ProjectTable({ id, title, table }) {
  if (!table?.headers?.length || !table?.rows?.length) {
    return null;
  }

  return (
    <section aria-labelledby={id} className="case-study-content-section">
      <h2 id={id}>{title}</h2>
      <div className="case-study-table-wrap">
        <table>
          <thead>
            <tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${id}-${rowIndex}`}>
                {row.map((cell, cellIndex) => <td key={`${id}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MetricStrip({ metrics }) {
  if (!metrics?.length) {
    return null;
  }

  return (
    <section aria-label="Project metrics" className="case-study-metrics">
      {metrics.map((metric) => (
        <div className="case-study-metric" key={`${metric.label}-${metric.value}`}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </section>
  );
}

export function CaseStudyDetail({ caseStudy, nextStudy, previousStudy }) {
  const coverImage = caseStudy.coverImage || caseStudy.heroImage;
  const gallery = (caseStudy.gallery || []).filter((image) => image.src !== coverImage?.src);

  return (
    <main className="shell-main case-study-detail-page">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span>{caseStudy.title}</span>
      </nav>

      <section className="case-study-hero">
        <div className="case-study-hero-copy">
          <p className="case-study-kicker">{caseStudy.category || "Case Study"}</p>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.summary}</p>
          {caseStudy.industry ? <span className="case-study-industry">Industry: {caseStudy.industry}</span> : null}
        </div>
        <LocalImage image={coverImage} priority />
      </section>

      <MetricStrip metrics={caseStudy.metrics} />

      <div className="case-study-main-grid">
        <div>
          <TextSection id="background" title="Background" value={caseStudy.background || caseStudy.challenge} />
          <TextSection id="objectives" title="Objectives" value={caseStudy.objectives} />
          <TextSection id="assessment" title="Site Assessment" value={caseStudy.assessment} />
          <TextSection id="solution" title="Solution" value={caseStudy.solution} />
          <TextSection id="workflow" title="Workflow" value={caseStudy.workflow} />
          <ProjectTable id="specifications" title="Specifications" table={caseStudy.specifications} />
          <ProjectTable id="scope" title="Project Scope" table={caseStudy.scope} />
          <TextSection id="results" title="Results and ROI" value={caseStudy.result} />
        </div>
        <aside className="case-study-aside">
          <p>Planning a similar project?</p>
          <h2>Discuss your warehouse workflow with an engineer.</h2>
          <Link className="case-study-contact-link" href="/contact">Start a project review <span aria-hidden="true">&rarr;</span></Link>
        </aside>
      </div>

      {gallery.length ? (
        <section aria-labelledby="project-gallery" className="case-study-gallery-section">
          <div className="section-heading"><h2 id="project-gallery">Project Gallery</h2></div>
          <div className="case-study-gallery">
            {gallery.map((image, index) => <LocalImage image={image} key={`${image.src}-${index}`} />)}
          </div>
        </section>
      ) : null}

      <nav aria-label="Case study navigation" className="case-study-project-nav">
        {previousStudy ? <Link href={`/case-studies/projects/${previousStudy.slug}`}><span>Previous project</span>{previousStudy.title}</Link> : <span />}
        {nextStudy ? <Link href={`/case-studies/projects/${nextStudy.slug}`}><span>Next project</span>{nextStudy.title}</Link> : <span />}
      </nav>
    </main>
  );
}

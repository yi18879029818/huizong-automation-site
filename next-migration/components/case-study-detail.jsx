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

const electronicsApproach = [
  {
    title: "AGV Fleet Configuration & Analysis",
    description: "Material-flow and payload analysis guide the vehicle mix, route logic, and handoff points needed for the factory workflow."
  },
  {
    title: "Bespoke Logistics Automation",
    description: "The delivery model aligns raw material, work-in-process, and finished-goods movement with the actual production cadence."
  },
  {
    title: "Line-side Storage Optimization",
    description: "Point-of-use storage and replenishment logic improve material access while keeping production areas organized."
  },
  {
    title: "Integrated Software Ecosystem",
    description: "WES, WMS, RCS, and digital-twin capabilities provide one coordinated layer for visibility, monitoring, and control."
  }
];

const electronicsEquipment = [
  "Stacker",
  "Forklift AGV",
  "Lifting AGV",
  "Line-side Warehouse",
  "AGV Charging Station",
  "Logistics Control System"
];

const narrativeCaseConfigs = {
  "electronics-manufacturer-warehouse-automation": {
    challengeTitle: "Line-side warehouse and logistics automation",
    approachTitle: "One connected logistics model for production flow",
    resultTitle: "A connected foundation for autonomous production logistics",
    approachCards: electronicsApproach,
    equipmentLabels: electronicsEquipment
  },
  "mini-load-asrs-bin-storage": {
    challengeTitle: "Small-parts storage and production-line supply",
    approachTitle: "A controlled small-parts storage and retrieval flow",
    resultTitle: "A stable foundation for connected small-parts supply"
  },
  "unit-load-asrs-pallet-handling": {
    challengeTitle: "Finished-goods pallet storage without more floor space",
    approachTitle: "Pallet storage, retrieval, and warehouse control in one system",
    resultTitle: "A safer, denser finished-goods storage model"
  },
  "workshop-intralogistics-automation": {
    challengeTitle: "Autonomous material flow between workshop and warehouse",
    approachTitle: "A centrally dispatched model for repeatable factory logistics",
    resultTitle: "A repeatable foundation for autonomous material handling"
  },
  "automated-warehouse-upgrade": {
    challengeTitle: "A connected ASRS modernization for semi-finished materials",
    approachTitle: "Storage, control, and production interfaces working together",
    resultTitle: "A connected foundation for warehouse modernization"
  },
  "smart-home-manufacturing-agv": {
    challengeTitle: "Empty-tray delivery and finished-goods transfer",
    approachTitle: "A scheduled AGV flow across production stations",
    resultTitle: "A scalable base for automated factory logistics"
  }
};

function tableCards(table, maximum = 4) {
  return (table?.rows || []).slice(0, maximum).map(([title, description]) => ({ title, description }));
}

function NarrativeCaseStudy({ caseStudy, nextStudy, previousStudy }) {
  const config = narrativeCaseConfigs[caseStudy.slug];
  const coverImage = caseStudy.coverImage || caseStudy.heroImage;
  const gallery = caseStudy.gallery || [];
  const challengeImage = gallery[0];
  const equipmentImages = gallery.slice(1, 7);
  const solutionBody = (caseStudy.solution || []).filter(
    (block) => block._type !== "block" || block.style !== "h2"
  );
  const approachCards = config.approachCards || tableCards(caseStudy.scope);
  const capabilityCards = tableCards(caseStudy.specifications);

  return (
    <main className="shell-main case-study-detail-page case-study-electronics-page">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span>{caseStudy.title}</span>
      </nav>

      <header className="case-study-electronics-hero">
        <LocalImage className="case-study-electronics-hero-media" image={coverImage} priority />
        <div className="case-study-electronics-hero-copy">
          <p className="case-study-kicker">{caseStudy.projectDate ? new Date(`${caseStudy.projectDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Project case study"}</p>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.summary}</p>
          <Link className="case-study-electronics-text-link" href="#project-approach">Explore the solution <span aria-hidden="true">&darr;</span></Link>
        </div>
      </header>

      <section aria-labelledby="project-challenge" className="case-study-electronics-challenge">
        <div>
          <p className="case-study-kicker">Client & Challenge</p>
          <h2 id="project-challenge">{config.challengeTitle}</h2>
          <div className="mdx-prose case-study-prose"><SanityPortableText value={caseStudy.background || caseStudy.challenge} /></div>
        </div>
        <LocalImage image={challengeImage || coverImage} />
      </section>

      <section aria-labelledby="project-approach-title" className="case-study-electronics-approach" id="project-approach">
        <div className="case-study-electronics-section-heading">
          <p className="case-study-kicker">Our Approach</p>
          <h2 id="project-approach-title">{config.approachTitle}</h2>
          <div className="mdx-prose case-study-prose"><SanityPortableText value={solutionBody} /></div>
        </div>
        <div className="case-study-electronics-approach-grid">
          {approachCards.map((item, index) => (
            <article className="case-study-electronics-approach-card" key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {equipmentImages.length || capabilityCards.length ? (
        <section aria-labelledby="project-equipment" className="case-study-electronics-equipment">
          <div className="case-study-electronics-section-heading">
            <p className="case-study-kicker">Delivered System</p>
            <h2 id="project-equipment">Equipment and control capabilities</h2>
          </div>
          {equipmentImages.length ? (
            <div className="case-study-electronics-equipment-grid">
              {equipmentImages.map((image, index) => (
              <figure className="case-study-electronics-equipment-card" key={image.src}>
                <Image alt={image.alt || config.equipmentLabels?.[index] || "Project equipment"} height={image.height || 900} sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw" src={image.src} width={image.width || 1200} />
                <figcaption>{config.equipmentLabels?.[index] || "Automation equipment"}</figcaption>
              </figure>
              ))}
            </div>
          ) : (
            <div className="case-study-electronics-capability-grid">
              {capabilityCards.map((item) => (
                <article className="case-study-electronics-capability-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section aria-labelledby="project-results" className="case-study-electronics-results">
        <div>
          <p className="case-study-kicker">The Results</p>
          <h2 id="project-results">{config.resultTitle}</h2>
        </div>
        <div className="mdx-prose case-study-prose"><SanityPortableText value={caseStudy.result || caseStudy.workflow} /></div>
      </section>

      <section className="case-study-electronics-cta">
        <div>
          <p className="case-study-kicker">Plan a similar project</p>
          <h2>Request a technical consultation and workflow review.</h2>
        </div>
        <Link className="case-study-electronics-cta-link" href="/contact">Speak with an expert <span aria-hidden="true">&rarr;</span></Link>
      </section>

      <nav aria-label="Case study navigation" className="case-study-project-nav">
        {previousStudy ? <Link href={`/case-studies/projects/${previousStudy.slug}`}><span>Previous project</span>{previousStudy.title}</Link> : <span />}
        {nextStudy ? <Link href={`/case-studies/projects/${nextStudy.slug}`}><span>Next project</span>{nextStudy.title}</Link> : <span />}
      </nav>
    </main>
  );
}

export function CaseStudyDetail({ caseStudy, nextStudy, previousStudy }) {
  if (narrativeCaseConfigs[caseStudy.slug]) {
    return <NarrativeCaseStudy caseStudy={caseStudy} nextStudy={nextStudy} previousStudy={previousStudy} />;
  }

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

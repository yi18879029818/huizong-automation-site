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
    resultTitle: "A stable foundation for connected small-parts supply",
    challengeVideo: {
      src: "https://www.youtube-nocookie.com/embed/7Ca3GWa7XoI?start=91&rel=0",
      title: "Mini load ASRS operation"
    }
  },
  "unit-load-asrs-pallet-handling": {
    challengeTitle: "Finished-goods pallet storage without more floor space",
    approachTitle: "Pallet storage, retrieval, and warehouse control in one system",
    resultTitle: "A safer, denser finished-goods storage model",
    challengeVideo: {
      src: "https://www.youtube-nocookie.com/embed/QVyJqnM42VY?rel=0",
      title: "Unit load ASRS pallet handling"
    }
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

const workshopReferenceImages = [
  {
    src: "/images/case-studies/workshop-intralogistics-automation/facility-layout-and-process-flow.webp",
    width: 1076,
    height: 611,
    alt: "Facility layout and material flow diagram from the workshop intralogistics reference project"
  },
  {
    src: "/images/case-studies/workshop-intralogistics-automation/agv-route-planning-and-traffic-paths.webp",
    width: 1639,
    height: 914,
    alt: "AGV route planning and traffic paths from the workshop intralogistics reference project"
  },
  {
    src: "/images/case-studies/workshop-intralogistics-automation/workshop-intralogistics-agv.webp",
    width: 1296,
    height: 1884,
    alt: "Laser SLAM autonomous transport forklift from the workshop intralogistics reference project"
  }
];

function referenceBody(value) {
  return (value || []).filter((block) => block._type !== "block" || block.style !== "h2");
}

function ReferenceTextSection({ id, title, value, children }) {
  return (
    <section aria-labelledby={id} className="case-study-reference-section">
      <h2 id={id}>{title}</h2>
      {value?.length ? <div className="mdx-prose case-study-reference-prose"><SanityPortableText value={referenceBody(value)} /></div> : null}
      {children}
    </section>
  );
}

function ReferenceTableSection({ id, title, table }) {
  if (!table?.headers?.length || !table?.rows?.length) {
    return null;
  }

  return (
    <section aria-labelledby={id} className="case-study-reference-section">
      <h2 id={id}>{title}</h2>
      <div className="case-study-reference-table-wrap">
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

function ReferenceImage({ image, portrait = false }) {
  return (
    <LocalImage className={`case-study-reference-image${portrait ? " case-study-reference-image--portrait" : ""}`} image={image} />
  );
}

function AutomatedWarehouseUpgradeReference({ caseStudy, nextStudy, previousStudy }) {
  const [facilityImage, routeImage, equipmentImage] = workshopReferenceImages;

  return (
    <main className="shell-main case-study-detail-page case-study-reference-page">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span>{caseStudy.title}</span>
      </nav>

      <header className="case-study-reference-header">
        <p className="case-study-kicker">{caseStudy.projectDate ? new Date(`${caseStudy.projectDate}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Project case study"}</p>
        <h1>{caseStudy.title}</h1>
      </header>

      <article className="case-study-reference-article">
        <ReferenceTextSection id="project-background" title="Project Background" value={caseStudy.background || caseStudy.challenge} />
        <ReferenceTextSection id="project-objectives" title="Project Objectives" value={caseStudy.objectives} />

        <ReferenceTextSection id="site-assessment" title="On Site Assessment and Data Analysis" value={caseStudy.assessment}>
          <h3>Facility Layout</h3>
          <ReferenceImage image={facilityImage} />
        </ReferenceTextSection>

        <ReferenceTextSection id="solution-approach" title="Solution Approach" value={caseStudy.solution} />

        <ReferenceTextSection id="warehouse-workflow" title="Warehouse Workflow and Control Logic" value={caseStudy.workflow}>
          <ReferenceImage image={routeImage} />
        </ReferenceTextSection>

        <ReferenceTableSection id="equipment-overview" title="Equipment Overview" table={caseStudy.specifications} />
        <ReferenceImage image={equipmentImage} portrait />

        <ReferenceTableSection id="project-scope" title="Project Scope and ROI Analysis" table={caseStudy.scope} />
        <ReferenceTextSection id="project-results" title="Project Results" value={caseStudy.result} />

        <section className="case-study-reference-cta">
          <div>
            <p className="case-study-kicker">Interested in our solutions?</p>
            <h2>Discuss an ASRS upgrade for your warehouse workflow.</h2>
            <p>Share your layout and operating requirements for a clear project scope and engineering review.</p>
          </div>
          <Link href="/contact">Speak with an expert <span aria-hidden="true">&rarr;</span></Link>
        </section>
      </article>

      <nav aria-label="Case study navigation" className="case-study-project-nav">
        {previousStudy ? <Link href={`/case-studies/projects/${previousStudy.slug}`}><span>Previous project</span>{previousStudy.title}</Link> : <span />}
        {nextStudy ? <Link href={`/case-studies/projects/${nextStudy.slug}`}><span>Next project</span>{nextStudy.title}</Link> : <span />}
      </nav>
    </main>
  );
}

const workshopReferenceEquipment = {
  headers: ["Item", "Specification"],
  rows: [
    ["Navigation", "Laser SLAM"],
    ["Rated load", "1,600 kg"],
    ["Standard lift", "205 +/- 5 mm"],
    ["Travel speed", "1.5 m/s loaded; 1.8 m/s unloaded"],
    ["Navigation accuracy", "+/- 10 mm"],
    ["Battery", "51.2 V / 40 Ah lithium iron phosphate"],
    ["Operating endurance", "Up to 8 hours"],
    ["Charging", "Automatic charging support"]
  ]
};

const workshopReferenceScope = {
  headers: ["Project scope", "Delivered capability"],
  rows: [
    ["Autonomous transport forklifts", "4 Laser SLAM forklifts with 1.6 t rated load and 200 mm lifting"],
    ["Charging stations", "2 charging stations"],
    ["Logistics coverage", "Secondary warehouse, workshop production lines, and finished-goods warehouse"],
    ["Control and safety", "Central task dispatch, wireless communication, charging logic, and operating safety support"],
    ["Expected labor replacement", "3-5 manual forklifts and operators"],
    ["Reported ROI", "Estimated two-year payback period"]
  ]
};

function WorkshopReferenceCaseStudy({ caseStudy, nextStudy, previousStudy }) {
  const [facilityImage, routeImage, equipmentImage] = workshopReferenceImages;

  return (
    <main className="shell-main case-study-detail-page case-study-reference-page">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span>{caseStudy.title}</span>
      </nav>

      <header className="case-study-reference-header">
        <p className="case-study-kicker">Packaging Manufacturing</p>
        <h1>{caseStudy.title}</h1>
      </header>

      <article className="case-study-reference-article">
        <section aria-labelledby="workshop-project-background" className="case-study-reference-section">
          <h2 id="workshop-project-background">Project Background</h2>
          <div className="case-study-reference-prose">
            <p>A large packaging manufacturer in China operates a 150,000 square meter facility. While its production lines had already achieved a high level of automation, material handling within the plant still depended on manual labor. To improve overall production efficiency, the company decided to implement an intelligent intralogistics system for its workshop operations.</p>
          </div>
        </section>

        <section aria-labelledby="workshop-project-objectives" className="case-study-reference-section">
          <h2 id="workshop-project-objectives">Project Objectives</h2>
          <div className="case-study-reference-prose">
            <ul>
              <li>Achieve full-process automation for workshop logistics and enable pull-based material handling.</li>
              <li>Automate raw-material delivery to the production line and automate finished-goods storage.</li>
              <li>Use autonomous forklifts to replace repeatable manual forklift work, reducing labor demand and improving efficiency.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="workshop-site-assessment" className="case-study-reference-section">
          <h2 id="workshop-site-assessment">On-Site Assessment and Data Analysis</h2>
          <div className="case-study-reference-prose">
            <h3>Facility Layout</h3>
            <p>The site includes eight buildings. The assembly workshop uses a two-story layout, while the other areas are single-story. The project scope covers the first-floor workshop, the secondary warehouse, and the finished-goods warehouse.</p>
            <h3>Material Flow Volume Analysis</h3>
            <p>The assessment mapped four production lines and their daily movement requirements: 44 pallets from the secondary warehouse to the workshop, 38 pallets from the raw-material warehouse to the workshop, and 162 finished-goods pallets from the workshop to the finished-goods warehouse.</p>
          </div>
          <ReferenceImage image={facilityImage} />
        </section>

        <section aria-labelledby="workshop-solution" className="case-study-reference-section">
          <h2 id="workshop-solution">Solution Approach</h2>
          <div className="case-study-reference-prose">
            <ul>
              <li>Deploy autonomous forklifts to replace manual handling for repeatable workshop and warehouse routes.</li>
              <li>Use a central control system for task calling, dispatch, and fleet coordination.</li>
              <li>Provide wireless communication coverage across the operating area.</li>
              <li>Coordinate staging, receiving, pickup, and drop-off points across each logistics route.</li>
              <li>Review floor conditions, safety requirements, and route readiness before commissioning.</li>
              <li>Keep the final manual handoff where process conditions require the last 10 meters to remain operator-led.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="workshop-routes" className="case-study-reference-section">
          <h2 id="workshop-routes">AGV Route Planning and Traffic Paths</h2>
          <div className="case-study-reference-prose">
            <p>The route design connects the secondary warehouse, raw-material warehouse, production lines, and finished-goods warehouse. It includes warehouse staging, line-side receiving, circulation paths, and controlled handoff points so autonomous forklifts can support material delivery and finished-goods return without interrupting production flow.</p>
          </div>
          <ReferenceImage image={routeImage} />
        </section>

        <ReferenceTableSection id="workshop-equipment-overview" title="Autonomous Forklift Overview" table={workshopReferenceEquipment} />
        <ReferenceImage image={equipmentImage} portrait />

        <ReferenceTableSection id="workshop-project-scope" title="Project Scope and ROI Analysis" table={workshopReferenceScope} />

        <section aria-labelledby="workshop-results" className="case-study-reference-section">
          <h2 id="workshop-results">Project Results</h2>
          <div className="case-study-reference-prose">
            <p>The project created a connected intralogistics model for raw-material supply, workshop transfer, and finished-goods handling. The legacy assessment estimated that the autonomous-forklift fleet could replace three to five manual forklifts and operators, with an estimated two-year payback period.</p>
          </div>
        </section>

        <section className="case-study-reference-cta">
          <div>
            <p className="case-study-kicker">Interested in our solutions?</p>
            <h2>Plan an autonomous intralogistics workflow for your workshop.</h2>
            <p>Share your layout, material flow, payloads, and production interfaces for an engineering review.</p>
          </div>
          <Link href="/contact">Speak with an expert <span aria-hidden="true">&rarr;</span></Link>
        </section>
      </article>

      <nav aria-label="Case study navigation" className="case-study-project-nav">
        {previousStudy ? <Link href={`/case-studies/projects/${previousStudy.slug}`}><span>Previous project</span>{previousStudy.title}</Link> : <span />}
        {nextStudy ? <Link href={`/case-studies/projects/${nextStudy.slug}`}><span>Next project</span>{nextStudy.title}</Link> : <span />}
      </nav>
    </main>
  );
}

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
        {config.challengeVideo ? (
          <div className="case-study-video-embed">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={config.challengeVideo.src}
              title={config.challengeVideo.title}
            />
          </div>
        ) : (
          <LocalImage image={challengeImage || coverImage} />
        )}
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
                <figure
                  className={`case-study-electronics-equipment-card${image.height > image.width ? " case-study-electronics-equipment-card--portrait" : ""}`}
                  key={image.src}
                >
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

const compactAsrsCaseConfigs = {
  "mini-load-asrs-bin-storage": {
    projectName: "Mini Load ASRS System for Bin Storage",
    consultationCopy: "Share your bin sizes, storage profile, production interfaces, and layout for an engineering review."
  },
  "unit-load-asrs-pallet-handling": {
    projectName: "Unit Load ASRS for Large Home Appliance Storage",
    consultationCopy: "Share your pallet dimensions, storage profile, inbound and outbound flow, and layout for an engineering review."
  }
};

function CompactAsrsReferenceCaseStudy({ caseStudy, nextStudy, previousStudy }) {
  const video = narrativeCaseConfigs[caseStudy.slug].challengeVideo;
  const config = compactAsrsCaseConfigs[caseStudy.slug];
  const metrics = (caseStudy.metrics || []).slice(0, 2);

  return (
    <main className="shell-main case-study-detail-page mini-load-reference-page">
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/case-studies">Case Studies</Link>
        <span aria-hidden="true">/</span>
        <span>{caseStudy.title}</span>
      </nav>

      <h1 className="mini-load-reference-title">{caseStudy.title}</h1>

      <section className="mini-load-reference-intro">
        <div className="case-study-video-embed">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            src={video.src}
            title={video.title}
          />
        </div>
        <div className="mini-load-reference-copy">
          <h2>Project Name</h2>
          <p className="mini-load-reference-project-name">{config.projectName}</p>
          <h2>Project Background</h2>
          <div className="mdx-prose case-study-prose"><SanityPortableText value={caseStudy.background || caseStudy.challenge} /></div>
        </div>
      </section>

      <section aria-labelledby="solution-technology" className="mini-load-reference-section">
        <h2 id="solution-technology">Our Solution &amp; Technology</h2>
        <div className="mdx-prose case-study-prose"><SanityPortableText value={caseStudy.solution} /></div>
      </section>

      <section aria-labelledby="project-results" className="mini-load-reference-section">
        <h2 id="project-results">Project Results</h2>
        <div className="mdx-prose case-study-prose"><SanityPortableText value={caseStudy.result || caseStudy.workflow} /></div>
      </section>

      <MetricStrip metrics={metrics} />

      <section className="mini-load-reference-cta">
        <div>
          <p className="case-study-kicker">Need expert automation guidance?</p>
          <h2>Request a Technical Consultation and ROI Estimate</h2>
          <p>{config.consultationCopy}</p>
        </div>
        <Link href="/contact">Speak with an expert <span aria-hidden="true">&rarr;</span></Link>
      </section>

      <nav aria-label="Case study navigation" className="case-study-project-nav">
        {previousStudy ? <Link href={`/case-studies/projects/${previousStudy.slug}`}><span>Previous project</span>{previousStudy.title}</Link> : <span />}
        {nextStudy ? <Link href={`/case-studies/projects/${nextStudy.slug}`}><span>Next project</span>{nextStudy.title}</Link> : <span />}
      </nav>
    </main>
  );
}

export function CaseStudyDetail({ caseStudy, nextStudy, previousStudy }) {
  if (caseStudy.slug === "automated-warehouse-upgrade") {
    return <AutomatedWarehouseUpgradeReference caseStudy={caseStudy} nextStudy={nextStudy} previousStudy={previousStudy} />;
  }

  if (caseStudy.slug === "workshop-intralogistics-automation") {
    return <WorkshopReferenceCaseStudy caseStudy={caseStudy} nextStudy={nextStudy} previousStudy={previousStudy} />;
  }

  if (compactAsrsCaseConfigs[caseStudy.slug]) {
    return <CompactAsrsReferenceCaseStudy caseStudy={caseStudy} nextStudy={nextStudy} previousStudy={previousStudy} />;
  }

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

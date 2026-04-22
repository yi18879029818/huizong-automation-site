import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { StructuredData } from "@/components/structured-data";
import { NAV_SECTIONS } from "@/lib/navigation";

function Breadcrumbs({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="hsa-breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span className="shell-breadcrumb-item" key={item.href}>
            {isLast ? (
              <span className="hsa-crumb-current">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
            {!isLast ? <span className="hsa-crumb-sep">/</span> : null}
          </span>
        );
      })}
    </div>
  );
}

function Header({ currentSection }) {
  return (
    <header className="hsa-header">
      <div className="hsa-header-inner">
        <Link className="hsa-brand" href="/">
          <span className="hsa-brand-mark">H</span>
          <span className="hsa-brand-copy">
            <strong>Huizong Intelligent Automation</strong>
            <em>Global Warehouse Automation Systems</em>
          </span>
        </Link>
        <nav aria-label="Main Navigation" className="hsa-top-nav">
          <Link
            className={`hsa-top-link${currentSection === "home" ? " hsa-top-active" : ""}`}
            href="/"
          >
            Home
          </Link>
          {NAV_SECTIONS.map((section) => (
            <details
              className={`hsa-top-group${currentSection === section.key ? " hsa-top-active" : ""}`}
              key={section.key}
              open={currentSection === section.key}
            >
              <summary>{section.label}</summary>
              <div className="hsa-dropdown">
                {section.items.map((item) => (
                  <Link className="hsa-dropdown-link" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
          <Link
            className={`hsa-top-link${currentSection === "about" ? " hsa-top-active" : ""}`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`hsa-top-link${currentSection === "contact" ? " hsa-top-active" : ""}`}
            href="/contact"
          >
            Contact
          </Link>
        </nav>
        <Link className="hsa-cta" href="/contact">
          Speak With An Expert
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="hsa-footer">
      <div className="hsa-footer-inner">
        <div>
          <div className="hsa-footer-brand">Huizong Intelligent Automation</div>
          <p className="hsa-footer-copy">
            Integrated warehouse automation, robotics, software orchestration, and project
            delivery for global B2B intralogistics operations.
          </p>
        </div>
        {NAV_SECTIONS.map((section) => (
          <div key={section.key}>
            <h4>{section.label}</h4>
            <div className="hsa-footer-links">
              {section.items.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hsa-footer-bottom">
        <span>Copyright 2026 Huizong Intelligent Automation</span>
        <span>Next.js content layer with MDX, schema, and agent-ready metadata</span>
      </div>
    </footer>
  );
}

function Hero({ kicker, title, summary, metrics = [], image, detail = false }) {
  return (
    <section className={`hero-panel${detail ? " is-detail" : ""}`}>
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{kicker}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
          <div className="hero-actions">
            <Link className="hero-button" href="/contact">
              {detail ? "View Specifications" : "Speak With An Expert"}
            </Link>
            <Link className="secondary-button" href="/solutions">
              {detail ? "Explore Systems" : "Explore Systems"}
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <div className="hero-visual">{image ? <img alt={title} src={image} /> : null}</div>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <div className="metric-panel" key={metric.label}>
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>Reusable content metric ready for schema, search, and filtering.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="section-panel">
      <div className="section-heading">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function LinkChip({ href, children }) {
  return (
    <Link className="link-chip" href={href}>
      {children}
    </Link>
  );
}

function ContentSection({ Content }) {
  if (!Content) {
    return null;
  }

  return (
    <Section
      description="This prose now lives in MDX files, which means editorial updates no longer require touching the page template."
      title="Editorial Content"
    >
      <div className="mdx-prose">
        <Content />
      </div>
    </Section>
  );
}

function Subnav({ currentHref, items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="hsa-subnav">
      {items.map((item) => (
        <Link
          className={`hsa-sub-link${item.href === currentHref ? " hsa-sub-active" : ""}`}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function SecondaryBar({ page }) {
  if ((page.breadcrumbs?.length || 0) <= 1 && !(page.subnav?.length || 0)) {
    return null;
  }

  return (
    <div className="hsa-secondary">
      <div className="hsa-secondary-inner">
        <Breadcrumbs items={page.breadcrumbs} />
        <Subnav currentHref={page.currentHref} items={page.subnav} />
      </div>
    </div>
  );
}

function FaqSection({ faqs = [] }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <Section
      description="These Q&A blocks are now available for on-page support, schema output, and future search or agent-facing retrieval."
      title="Frequently Asked Questions"
    >
      <div className="faq-list">
        {faqs.map((faq) => (
          <article className="faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section
      description="This form now runs through the existing contact endpoint while living inside the new structured Next.js content layer."
      title="Project Briefing"
    >
      <ContactForm />
    </Section>
  );
}

function getCardHref({ card, page }) {
  if (card.href) {
    return card.href;
  }

  if (page.section === "case-studies") {
    return `/case-studies/${card.slug}`;
  }

  return `/${page.section}/${card.slug}`;
}

export function StructuredOverviewPage({ page }) {
  return (
    <div className={`content-shell shell-kind-${page.kind}`}>
      <StructuredData page={page} />
      <Header currentSection={page.section} />
      <SecondaryBar page={page} />
      <main className="shell-main">
        <Hero
          kicker={page.data.kicker}
          metrics={page.data.metrics}
          summary={page.data.heroSummary || page.data.summary}
          title={page.data.heroTitle || page.data.title}
        />
        <ContentSection Content={page.data.Content} />
        <Section
          description="The overview cards are now derived from MDX metadata instead of hard-coded HTML blocks. That keeps the route stable while making content maintenance much safer."
          title="Structured Content Cards"
        >
          <div className="card-grid">
            {page.data.cards.map((card, index) => (
              <article
                className={`card-panel${index % 3 === 0 ? " is-accent" : ""}`}
                key={card.href || card.slug}
                style={{ gridColumn: "span 4" }}
              >
                <span className="card-label">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.summary}</p>
                <div className="chip-row">
                  {(card.metrics || []).map((metric) => (
                    <span className="link-chip" key={metric.label}>
                      {metric.value} {metric.label}
                    </span>
                  ))}
                </div>
                <div className="panel-action">
                  <LinkChip href={getCardHref({ card, page })}>View Details</LinkChip>
                </div>
              </article>
            ))}
          </div>
        </Section>
        {page.data.capabilities ? (
          <Section
            description="These supporting blocks are now content arrays, so they can move to CMS, translation workflows, or search indexes later without refactoring the layout."
            title={page.data.capabilityTitle || "Core Capabilities"}
          >
            <div className="card-grid">
              {page.data.capabilities.map((item, index) => (
                <article className="card-panel" key={item} style={{ gridColumn: "span 3" }}>
                  <span className="card-label">0{index + 1}</span>
                  <h4>{item}</h4>
                  <p>
                    This section is now ready for future taxonomy, schema, and AI-summary use
                    cases.
                  </p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        <FaqSection faqs={page.data.faqs} />
        <section className="cta-panel">
          <div className="cta-copy">
            <h2>Ready for the AI-SEO layer?</h2>
            <p>
              With MDX now in place, the site can safely add JSON-LD, llms.txt, and future search
              or retrieval features without reworking each page again.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="hero-button" href="/contact">
              Start the Content Model
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function StructuredDetailPage({ page }) {
  const item = page.data;

  return (
    <div className={`content-shell shell-kind-${page.kind}`}>
      <StructuredData page={page} />
      <Header currentSection={page.section} />
      <SecondaryBar page={page} />
      <main className="shell-main">
        <Hero
          detail
          image={item.image}
          kicker={item.kicker}
          metrics={item.metrics}
          summary={item.heroSummary || item.summary}
          title={item.heroTitle || item.title}
        />
        <ContentSection Content={item.Content} />
        {"features" in item && item.features ? (
          <Section
            description="Feature groups now come from content files, which makes them much easier to validate, reuse, and later expose through structured APIs."
            title="Key Building Blocks"
          >
            <div className="card-grid">
              {item.features.map((feature) => (
                <article className="card-panel" key={feature.title} style={{ gridColumn: "span 6" }}>
                  <span className="card-label">{feature.label}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"projects" in item && item.projects ? (
          <Section
            description="Case-study category pages now render project references from MDX data modules rather than layout-specific markup."
            title="Featured Programs"
          >
            <div className="card-grid">
              {item.projects.map((project, index) => (
                <article
                  className={`card-panel${index === 0 ? " is-accent" : ""}`}
                  key={project.title}
                  style={{ gridColumn: "span 4" }}
                >
                  <span className="card-label">Program {index + 1}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"scenarios" in item && item.scenarios ? (
          <Section
            description="Scenario lists are now content arrays, ready for filtering, comparison pages, or agent-friendly summaries."
            title="Application Scenarios"
          >
            <div className="card-grid">
              {item.scenarios.map((scenario, index) => (
                <article className="card-panel" key={scenario} style={{ gridColumn: "span 4" }}>
                  <span className="card-label">Scenario 0{index + 1}</span>
                  <h4>{scenario}</h4>
                  <p>
                    Structured scenario blocks can later carry optional media, proof points, and
                    industry tags without changing the page template.
                  </p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"integrations" in item && item.integrations ? (
          <Section
            description="This section is where future FastAPI, search, and AI-agent tooling can attach to operational content with much less friction."
            title="Integration Layer"
          >
            <div className="card-grid">
              {item.integrations.map((integration, index) => (
                <article className="card-panel" key={integration} style={{ gridColumn: "span 4" }}>
                  <span className="card-label">Layer 0{index + 1}</span>
                  <h4>{integration}</h4>
                  <p>
                    The presentation is now separate from the source content, which is exactly what
                    we want before introducing APIs or retrieval workflows.
                  </p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"bottlenecks" in item && item.bottlenecks ? (
          <Section
            description="Project constraints, stack choices, and rollout phases are all now independently structured, which opens the door to better proof storytelling and programmatic indexing."
            title="Critical Bottlenecks"
          >
            <div className="card-grid">
              {item.bottlenecks.map((bottleneck) => (
                <article className="card-panel" key={bottleneck.title} style={{ gridColumn: "span 4" }}>
                  <span className="card-label">Constraint</span>
                  <h4>{bottleneck.title}</h4>
                  <p>{bottleneck.description}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"solutionStack" in item && item.solutionStack ? (
          <Section
            description="Solution stack arrays can later map directly to product references, software modules, and linked proof points."
            title="Integrated Ecosystem"
          >
            <div className="card-grid">
              {item.solutionStack.map((entry, index) => (
                <article
                  className={`card-panel${index === 0 ? " is-accent" : ""}`}
                  key={entry}
                  style={{ gridColumn: "span 4" }}
                >
                  <span className="card-label">Stack 0{index + 1}</span>
                  <h4>{entry}</h4>
                  <p>Reusable stack content helps future project pages stay consistent and searchable.</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {"commissioning" in item && item.commissioning ? (
          <Section
            description="Commissioning phases now live in a dedicated content list instead of buried page markup."
            title="Zero-Tolerance Commissioning"
          >
            <div className="card-grid">
              {item.commissioning.map((phase, index) => (
                <article className="card-panel" key={phase} style={{ gridColumn: "span 2" }}>
                  <span className="card-label">Phase 0{index + 1}</span>
                  <h4>{phase}</h4>
                  <p>Ready for future timeline views, deployment notes, or rollout reporting.</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}
        {item.contactForm ? <ContactSection /> : null}
        <FaqSection faqs={item.faqs} />
        <section className="cta-panel">
          <div className="cta-copy">
            <h2>From content files to structured APIs.</h2>
            <p>
              These pages now have a clean editorial layer, structured metadata, and reusable
              content fields that can power JSON-LD, llms.txt, search, and future backend services.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="hero-button" href="/contact">
              Plan the Next Step
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

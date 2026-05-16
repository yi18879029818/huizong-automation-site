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
          <span className="hsa-brand-mark">
            <img alt="coolyne logo" src="/assets/logo/coolyne-logo-transparent.png" />
          </span>
          <span className="hsa-brand-copy">
            <strong>coolyne</strong>
            <em>Warehouse Automation and AGV Systems</em>
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
          <div className="hsa-footer-brand">
            <img
              alt="coolyne logo"
              className="hsa-footer-brand-logo"
              src="/assets/logo/coolyne-logo-white.png"
            />
          </div>
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
        <span>Copyright 2026 coolyne</span>
        <span>Integrated AGV, ASRS, and warehouse automation systems</span>
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
                <p>Benchmark data used to qualify throughput, safety, or integration scope.</p>
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
      description="Supporting guidance, deployment notes, and industry context for the solution set."
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
      description="Common engineering, deployment, and operating questions collected for faster buyer review."
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
      description="Share your site conditions, throughput targets, and project brief with the engineering team."
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
          description="A structured overview of solution families, project priorities, and the system building blocks most buyers compare first."
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
            description="Core capabilities that define the warehouse performance, software coordination, and operational fit of this category."
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
            <h2>Ready to scope the right automation stack?</h2>
            <p>
              Talk through facility constraints, throughput goals, and integration dependencies with
              the coolyne engineering team.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="hero-button" href="/contact">
              Start Your Project Brief
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
            description="The major subsystems and engineering choices that shape operational fit, control architecture, and deployment scope."
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
            description="Representative projects and rollout programs that show how this system is deployed in live facilities."
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
            description="Operational scenarios where this solution delivers the best fit across flow, handling, and system coordination."
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
            description="The software, controls, and upstream systems that connect this equipment into a complete warehouse program."
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
            description="The main risk factors, throughput bottlenecks, and operating constraints teams typically need to solve first."
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
            description="A coordinated ecosystem view of hardware, software, and operational interfaces supporting the delivery plan."
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
            description="Commissioning and go-live phases designed to reduce risk during installation, validation, and production ramp."
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
            <h2>Need a sharper automation roadmap?</h2>
            <p>
              We can map system scope, software interfaces, and deployment stages around your
              facility’s actual handling flow.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="hero-button" href="/contact">
              Talk With Engineering
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

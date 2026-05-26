import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { SanityPortableText } from "@/components/sanity-portable-text";
import { getFaqList } from "@/lib/sanity/content.mjs";

export const revalidate = 300;

export const metadata = {
  title: "FAQ | coolyne",
  description: "Frequently asked questions about coolyne warehouse automation systems and delivery scope.",
  alternates: {
    canonical: "/faq"
  }
};

export default async function FaqPage() {
  const faqs = await getFaqList();
  const totalQuestions = faqs.length;

  return (
    <CmsPageShell currentSection="faq">
      <main className="shell-main">
        <section className="hero-panel is-detail faq-hero-panel">
          <div className="faq-hero-layout">
            <div className="hero-copy faq-hero-copy">
              <span className="eyebrow">FAQ</span>
              <h1>Clear answers for procurement, engineering, and rollout planning.</h1>
              <p>
                Browse a structured knowledge base for common buyer questions, project
                coordination topics, and implementation guidance across coolyne automation
                systems.
              </p>
              <div className="faq-topic-row" aria-label="FAQ focus areas">
                <span className="faq-topic-chip">Project scope</span>
                <span className="faq-topic-chip">System integration</span>
                <span className="faq-topic-chip">Delivery planning</span>
                <span className="faq-topic-chip">After-sales support</span>
              </div>
              <div className="hero-actions">
                <Link className="hero-button" href="/contact">
                  Ask The Team
                </Link>
                <Link className="secondary-button" href="/blog">
                  Visit Blog
                </Link>
              </div>
            </div>
            <div className="faq-hero-aside">
              <div className="faq-hero-card">
                <span className="card-label">Knowledge Base</span>
                <div className="faq-hero-metrics">
                  <div className="faq-hero-metric">
                    <strong>{String(totalQuestions).padStart(2, "0")}</strong>
                    <span>Published answers</span>
                  </div>
                  <div className="faq-hero-metric">
                    <strong>CMS</strong>
                    <span>Sanity-managed source</span>
                  </div>
                  <div className="faq-hero-metric">
                    <strong>1</strong>
                    <span>Single reference page</span>
                  </div>
                </div>
              </div>
              <div className="faq-hero-card faq-hero-card-muted">
                <span className="card-label">Support Path</span>
                <p>
                  If your question is project-specific, use the contact page and our team can
                  reply with a tailored recommendation.
                </p>
                <Link className="link-chip" href="/contact">
                  Contact coolyne
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section-panel faq-section-panel">
          <div className="faq-page-grid">
            <aside className="faq-sidebar">
              <div className="faq-sidebar-card">
                <span className="card-label">Overview</span>
                <h2>Frequently asked questions</h2>
                <p>
                  This page collects common questions from buyers, system planners, and
                  implementation teams into one cleaner reference flow.
                </p>
                <div className="faq-sidebar-stats">
                  <div>
                    <strong>{String(totalQuestions).padStart(2, "0")}</strong>
                    <span>Total entries</span>
                  </div>
                  <div>
                    <strong>Live</strong>
                    <span>Website route</span>
                  </div>
                  <div>
                    <strong>Direct</strong>
                    <span>No extra navigation layers</span>
                  </div>
                </div>
              </div>
              <div className="faq-sidebar-card faq-sidebar-card-outline">
                <span className="card-label">Need More Detail</span>
                <p>
                  For application design, throughput targets, or integration details, send your
                  project brief directly to the sales and engineering team.
                </p>
                <Link className="link-chip" href="/contact">
                  Start an inquiry
                </Link>
              </div>
            </aside>
            <div className="faq-content-column">
              <div className="faq-section-header">
                <span className="card-label">Reference</span>
                <h2>Browse answers</h2>
                <p>
                  Expand each topic to read the full response. The first item opens by default
                  for faster scanning.
                </p>
              </div>
              <div className="faq-accordion-list">
                {faqs.length ? (
                  faqs.map((faq, index) => (
                    <details className="faq-accordion-item" key={faq._id} open={index === 0}>
                      <summary>
                        <span className="faq-accordion-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="faq-accordion-question">{faq.question}</span>
                        <span className="faq-accordion-toggle" aria-hidden="true" />
                      </summary>
                      <div className="faq-accordion-body">
                        <div className="mdx-prose">
                          <SanityPortableText value={faq.answer} />
                        </div>
                      </div>
                    </details>
                  ))
                ) : (
                  <article className="faq-empty-panel">
                    <span className="card-label">Sanity Ready</span>
                    <h3>No FAQ entries published yet</h3>
                    <p>
                      Create documents of type <code>faq</code> in Sanity and they will appear in
                      this structured layout automatically.
                    </p>
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

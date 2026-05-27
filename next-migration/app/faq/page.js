import Link from "next/link";
import { CmsPageShell } from "@/components/cms-page-shell";
import { SITE_URL } from "@/lib/site-config";

const FAQ_PAGE_TITLE = "Frequently Asked Questions About Warehouse Automation and AGV Systems";

const FAQ_CATEGORIES = [
  {
    id: "agv-products",
    title: "AGV Products",
    intro: "Selection questions for pallet movement, forklift-style AGVs, payload range, and navigation fit.",
    items: [
      {
        question: "How do I choose between AMR, pallet AGV, and forklift-style AGV solutions?",
        answer:
          "The right platform depends on payload, pallet type, aisle width, floor condition, and how much process control you need. Pallet AGVs are usually better for repeat transport loops, while forklift-style AGVs are more suitable for rack putaway, pallet stacking, and inbound or outbound warehouse tasks."
      },
      {
        question: "What site information do you need before recommending an AGV model?",
        answer:
          "We normally review pallet dimensions, load weight, travel distance, lifting height, throughput target, aisle layout, docking points, and any special handling constraints. A simple layout drawing and a short description of the workflow are usually enough to start the first proposal."
      },
      {
        question: "Can your AGVs work with different pallet sizes or non-standard loads?",
        answer:
          "Yes, but we confirm the load profile early in the project. If the application includes mixed pallet sizes, custom fixtures, cages, paper rolls, or unstable loads, we may recommend customized forks, carrier interfaces, or extra sensing to maintain positioning accuracy and safety."
      }
    ]
  },
  {
    id: "warehouse-automation",
    title: "Warehouse Automation",
    intro: "Practical questions about material flow, conveyor handoff, staging, and multi-process automation.",
    items: [
      {
        question: "Can warehouse automation be introduced step by step instead of all at once?",
        answer:
          "Yes. Many customers begin with one transport loop, one production feeding line, or one pallet transfer zone, then expand after the first phase is stable. This phased approach reduces risk and helps validate ROI before scaling the full automation program."
      },
      {
        question: "Will AGVs integrate with conveyors, elevators, doors, or wrapping stations?",
        answer:
          "That is a standard part of most projects. We usually define handoff logic, sensor points, interlocks, and traffic priorities together with the upstream and downstream equipment so the AGV system fits the complete material flow instead of operating as an isolated island."
      },
      {
        question: "What are the main conditions that affect AGV performance on site?",
        answer:
          "The biggest factors are floor flatness, traffic intersections, pallet quality, docking repeatability, signal coverage, and the discipline of manual operations around the AGV lanes. We review these items during solution design because they directly affect cycle time and system stability."
      }
    ]
  },
  {
    id: "asrs-integration",
    title: "ASRS Integration",
    intro: "Questions around WMS or WCS coordination, rack interfaces, and warehouse automation orchestration.",
    items: [
      {
        question: "Can your AGV system connect with an ASRS, shuttle system, or stacker crane warehouse?",
        answer:
          "Yes. We can coordinate transport tasks between AGVs and ASRS-related equipment through WMS, WCS, PLC, or API-based orchestration. The exact integration method depends on the existing system architecture and who owns the master task logic."
      },
      {
        question: "Who is responsible for the software interface during an ASRS integration project?",
        answer:
          "That is clarified during project definition. In some projects we provide the AGV-side interface only, and in others we also coordinate the WCS logic together with the ASRS or warehouse software partner. We prefer to lock interface responsibility early to avoid delays during commissioning."
      },
      {
        question: "How do you handle pallet pickup and drop-off accuracy at ASRS transfer points?",
        answer:
          "We use a mix of mechanical design, sensor confirmation, and station tolerance control. Transfer points are reviewed carefully because even a good AGV can suffer poor performance if the rack interface, conveyor stop position, or pallet presentation is inconsistent."
      }
    ]
  },
  {
    id: "project-delivery",
    title: "Project Delivery",
    intro: "Buyer questions about lead time, commissioning, acceptance, and rollout planning.",
    items: [
      {
        question: "What is the typical delivery timeline for an AGV or warehouse automation project?",
        answer:
          "Lead time depends on system complexity, quantity, customization scope, and software integration depth. A standard equipment project can move faster, while a multi-station automation project with interfaces, traffic logic, and on-site commissioning usually needs a longer schedule with staged milestones."
      },
      {
        question: "What happens during site survey, commissioning, and final acceptance?",
        answer:
          "We usually move through layout review, risk check, interface confirmation, equipment installation, software testing, route teaching, trial operation, and final acceptance. The acceptance criteria are better defined before manufacturing starts so both teams know how throughput, stability, and safety will be measured."
      },
      {
        question: "Can you support overseas projects or multi-site rollout programs?",
        answer:
          "Yes. We can support export projects, remote coordination, and staged rollout programs when scope and support boundaries are defined in advance. For larger multi-site projects, we normally standardize the hardware, interface rules, and commissioning template to keep later expansion more efficient."
      }
    ]
  },
  {
    id: "customization",
    title: "Customization",
    intro: "Engineering fit questions for dimensions, control logic, attachment design, and special workflows.",
    items: [
      {
        question: "How much customization is possible for a project with unusual handling requirements?",
        answer:
          "Customization is common in industrial automation projects. We can review body dimensions, load interface, sensor package, docking logic, charging strategy, and software behavior to fit the actual workflow, especially when the line uses special pallets, tight layouts, or mixed handling tasks."
      },
      {
        question: "Can you adapt the system for cleanroom, cold storage, or other special environments?",
        answer:
          "Potentially yes, but those environments need to be evaluated case by case. Ambient temperature, humidity, floor condition, material specification, and safety requirements all influence the equipment selection and sometimes require changes to electrical design, protective structure, or maintenance planning."
      },
      {
        question: "Can the AGV control logic be adjusted to match our plant rules?",
        answer:
          "Yes. Traffic logic, task priority, station call rules, manual override behavior, and alarm handling can usually be aligned with the plant workflow. We normally capture those rules during the solution and software definition phase so the commissioning team is not guessing on site."
      }
    ]
  },
  {
    id: "after-sales-support",
    title: "After-sales Support",
    intro: "Questions about training, spare parts, remote troubleshooting, and long-term service.",
    items: [
      {
        question: "What kind of after-sales support do you provide after system handover?",
        answer:
          "Support can include remote diagnosis, spare parts planning, operator training, maintenance guidance, and on-site service when needed. The exact support model depends on project geography, installed scope, and the response level agreed during quotation."
      },
      {
        question: "Do you provide training for operators and maintenance teams?",
        answer:
          "Yes. Training is typically included around commissioning or handover and covers daily operation, safety practice, alarm response, and routine maintenance items. For more complex systems, we can also prepare role-based training for operators, supervisors, and engineering teams."
      },
      {
        question: "How should we plan spare parts and preventive maintenance for AGV systems?",
        answer:
          "We recommend planning key wear parts, standard electrical components, and critical sensors based on operating intensity and site importance. Preventive maintenance is most effective when paired with inspection routines, battery management, and a clear escalation path for abnormal behavior."
      }
    ]
  }
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/faq`,
  name: FAQ_PAGE_TITLE,
  mainEntity: FAQ_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  )
};

export const metadata = {
  title: FAQ_PAGE_TITLE,
  description:
    "Answers to common buyer questions about AGV selection, ASRS integration, pallet handling, project delivery, customization, and after-sales support.",
  alternates: {
    canonical: "/faq"
  }
};

export default function FaqPage() {
  return (
    <CmsPageShell currentSection="faq">
      <main className="shell-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
        />
        <section className="hero-panel is-detail faq-hero-panel">
          <div className="faq-hero-layout">
            <div className="hero-copy faq-hero-copy">
              <span className="eyebrow">FAQ</span>
              <h1>{FAQ_PAGE_TITLE}</h1>
              <p>
                Explore practical answers around AGV selection, ASRS integration, pallet
                handling, project delivery, customization, and after-sales support for
                warehouse automation projects.
              </p>
              <nav className="faq-topic-row" aria-label="FAQ categories">
                {FAQ_CATEGORIES.map((category) => (
                  <a className="faq-topic-chip" href={`#${category.id}`} key={category.id}>
                    {category.title}
                  </a>
                ))}
              </nav>
              <div className="hero-actions">
                <Link className="hero-button" href="/contact">
                  Speak With An Expert
                </Link>
                <Link className="secondary-button" href="/contact">
                  Contact coolyne
                </Link>
              </div>
            </div>
            <div className="faq-hero-aside">
              <div className="faq-hero-card faq-hero-card-muted">
                <span className="card-label">Buyer Focus</span>
                <p>
                  This page is designed for factories, warehouses, and system planners comparing
                  AGV and automation options before a formal inquiry.
                </p>
              </div>
              <div className="faq-hero-card">
                <span className="card-label">Next Step</span>
                <p>
                  If your application involves non-standard pallets, rack interfaces, throughput
                  targets, or software integration, share the project brief and we can recommend
                  a suitable solution path.
                </p>
                <div className="faq-hero-cta-stack">
                  <Link className="link-chip" href="/contact">
                    Contact coolyne
                  </Link>
                  <Link className="link-chip link-chip-accent" href="/contact">
                    Speak With An Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-panel faq-section-panel">
          <div className="faq-page-grid">
            <aside className="faq-sidebar">
              <div className="faq-sidebar-card">
                <span className="card-label">Browse Topics</span>
                <h2>Procurement questions, organized by project stage.</h2>
                <p>
                  Start with the product and workflow topics below, then contact the team if you
                  need layout review, interface planning, or a customized proposal.
                </p>
                <div className="faq-category-nav">
                  {FAQ_CATEGORIES.map((category) => (
                    <a className="faq-category-link" href={`#${category.id}`} key={category.id}>
                      <span>{category.title}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="faq-sidebar-card faq-sidebar-card-outline">
                <span className="card-label">Need A Proposal</span>
                <p>
                  For pallet handling flow, ASRS transfer points, software interface definition,
                  or on-site constraints, our sales and engineering team can review the project
                  directly with you.
                </p>
                <div className="faq-sidebar-actions">
                  <Link className="hero-button faq-sidebar-button" href="/contact">
                    Speak With An Expert
                  </Link>
                  <Link className="secondary-button faq-sidebar-button" href="/contact">
                    Contact coolyne
                  </Link>
                </div>
              </div>
            </aside>
            <div className="faq-content-column">
              {FAQ_CATEGORIES.map((category) => (
                <section className="faq-category-section" id={category.id} key={category.id}>
                  <div className="faq-section-header">
                    <span className="card-label">{category.title}</span>
                    <h2>{category.title}</h2>
                    <p>{category.intro}</p>
                  </div>
                  <div className="faq-accordion-list">
                    {category.items.map((item, index) => (
                      <details
                        className="faq-accordion-item"
                        key={`${category.id}-${index}`}
                        open={index === 0}
                      >
                        <summary>
                          <span className="faq-accordion-index">Q{index + 1}</span>
                          <span className="faq-accordion-question">{item.question}</span>
                          <span className="faq-accordion-toggle" aria-hidden="true" />
                        </summary>
                        <div className="faq-accordion-body">
                          <div className="mdx-prose">
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

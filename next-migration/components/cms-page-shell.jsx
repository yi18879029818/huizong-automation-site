import Link from "next/link";
import { NAV_SECTIONS } from "@/lib/navigation";

function Header({ currentSection }) {
  return (
    <header className="hsa-header">
      <div className="hsa-header-inner">
        <Link className="hsa-brand" href="/">
          <span className="hsa-brand-mark">
            <img
              alt="coolyne logo"
              decoding="async"
              fetchPriority="high"
              src="/assets/logo/coolyne-header-mark-home.webp"
              width="156"
              height="94"
            />
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
          <Link className="hsa-top-link" href="/about">
            About
          </Link>
          <Link
            className={`hsa-top-link${currentSection === "faq" ? " hsa-top-active" : ""}`}
            href="/faq"
          >
            FAQ
          </Link>
          <Link className="hsa-top-link" href="/contact">
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
              decoding="async"
              src="/assets/logo/coolyne-logo-white.png"
              width="635"
              height="460"
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

export function CmsPageShell({ children, currentSection = "" }) {
  return (
    <div className="content-shell" data-hsa-theme="standard" id="hsa-content-shell">
      <Header currentSection={currentSection} />
      {children}
      <Footer />
    </div>
  );
}

import { StructuredData } from "@/components/structured-data";
import { BodyPageAttributes } from "@/components/body-page-attributes";
import { NAV_SECTIONS } from "@/lib/navigation";

function NavLink(props) {
  return <a {...props} />;
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPageKey(page) {
  if (page?.kind === "home-page") {
    return "home";
  }

  if (page?.kind === "about-page") {
    return "about";
  }

  if (page?.kind === "contact-page") {
    return "contact";
  }

  const explicitHref = page?.currentHref || page?.href;
  if (explicitHref && explicitHref !== "/") {
    return explicitHref.replace(/^\/+/, "").replace(/\/+/g, "-");
  }

  const titleSlug = slugify(page?.data?.title || page?.title || "");
  if (page?.section && titleSlug) {
    return `${page.section}-${titleSlug}`;
  }

  if (page?.section) {
    return page.section;
  }

  return "home";
}

function DesktopNavigation({ currentSection }) {
  return (
    <nav aria-label="Main Navigation" className="hsa-top-nav">
      <NavLink
        className={`hsa-top-link${currentSection === "home" ? " hsa-top-active" : ""}`}
        href="/"
      >
        Home
      </NavLink>
      {NAV_SECTIONS.map((section) => (
        <details
          className={`hsa-top-group${currentSection === section.key ? " hsa-top-active" : ""}`}
          key={section.key}
        >
          <summary>{section.label}</summary>
          <div className="hsa-dropdown">
            {section.items.map((item) => (
              <NavLink
                className="hsa-dropdown-link"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </details>
      ))}
      <NavLink
        className={`hsa-top-link${currentSection === "about" ? " hsa-top-active" : ""}`}
        href="/about"
      >
        About
      </NavLink>
      <NavLink
        className={`hsa-top-link${currentSection === "contact" ? " hsa-top-active" : ""}`}
        href="/contact"
      >
        Contact
      </NavLink>
    </nav>
  );
}

function MobileNavigation() {
  return (
    <div className="hsa-mobile-menu" id="hsa-mobile-menu">
      <NavLink href="/">Home</NavLink>
      {NAV_SECTIONS.map((section) => (
        <details key={section.key}>
          <summary>{section.label}</summary>
          {section.items.map((item) => (
            <NavLink href={item.href} key={item.href}>
              {item.label}
            </NavLink>
          ))}
        </details>
      ))}
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </div>
  );
}

function Header({ currentSection }) {
  return (
    <header className="hsa-header">
      <div className="hsa-header-inner">
        <NavLink className="hsa-brand" href="/">
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
        </NavLink>
        <DesktopNavigation currentSection={currentSection} />
        <NavLink className="hsa-cta" href="/contact">
          Speak With An Expert
        </NavLink>
        <button
          aria-controls="hsa-mobile-menu"
          aria-expanded="false"
          className="hsa-mobile-toggle"
          type="button"
        >
          Menu
        </button>
      </div>
      <MobileNavigation />
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
            Integrated warehouse automation, robotics, software orchestration,
            and project delivery for global B2B intralogistics operations.
          </p>
        </div>
        {NAV_SECTIONS.map((section) => (
          <div key={section.key}>
            <h4>{section.label}</h4>
            <div className="hsa-footer-links">
              {section.items.map((item) => (
                <NavLink href={item.href} key={item.href}>
                  {item.label}
                </NavLink>
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

export function PublicPageChrome({ children, page }) {
  const theme = page.kind === "home-page" ? "home" : "standard";
  const pageKey = getPageKey(page);

  return (
    <div
      className="content-shell"
      data-hsa-theme={theme}
      data-page-key={pageKey}
      id="hsa-content-shell"
    >
      <BodyPageAttributes pageKey={pageKey} theme={theme} />
      <StructuredData page={page} />
      <Header currentSection={page.section} />
      {children}
      <Footer />
    </div>
  );
}

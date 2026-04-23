import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { NAV_SECTIONS } from "@/lib/navigation";

function DesktopNavigation({ currentSection }) {
  return (
    <nav aria-label="Main Navigation" className="hsa-top-nav">
      <Link className={`hsa-top-link${currentSection === "home" ? " hsa-top-active" : ""}`} href="/">
        Home
      </Link>
      {NAV_SECTIONS.map((section) => (
        <div className={`hsa-top-group${currentSection === section.key ? " hsa-top-active" : ""}`} key={section.key}>
          <Link className="hsa-top-link" href={section.href}>
            {section.label}
          </Link>
          <div className="hsa-dropdown">
            {section.items.map((item) => (
              <Link className="hsa-dropdown-link" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Link className={`hsa-top-link${currentSection === "about" ? " hsa-top-active" : ""}`} href="/about">
        About
      </Link>
      <Link
        className={`hsa-top-link${currentSection === "contact" ? " hsa-top-active" : ""}`}
        href="/contact"
      >
        Contact
      </Link>
    </nav>
  );
}

function MobileNavigation() {
  return (
    <div className="hsa-mobile-menu" id="hsa-mobile-menu">
      <Link href="/">Home</Link>
      {NAV_SECTIONS.map((section) => (
        <details key={section.key}>
          <summary>{section.label}</summary>
          {section.items.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </details>
      ))}
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
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
        <DesktopNavigation currentSection={currentSection} />
        <Link className="hsa-cta" href="/contact">
          Speak With An Expert
        </Link>
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

function FooterSignup() {
  return (
    <div className="hsa-footer-signup">
      <h4 className="hsa-footer-signup-title">Newsletter signup</h4>
      <p className="hsa-footer-signup-copy">
        Get monthly updates on warehouse automation systems, software releases, and new case studies.
      </p>
      <form
        className="hsa-news-form"
        data-form-label="Footer Newsletter Signup"
        data-form-type="newsletter"
        data-hsa-form=""
        data-success-message="Thanks, your newsletter signup has been emailed to our team."
      >
        <label className="hsa-news-label" htmlFor="hsa-news-email">
          Email
        </label>
        <input className="hsa-news-input" id="hsa-news-email" name="email" placeholder="Email" required type="email" />
        <label className="hsa-news-check">
          <input defaultChecked name="consent" type="checkbox" value="Yes" />
          <span>Yes, I agree to receive monthly newsletter content from Huizong Intelligent Automation.</span>
        </label>
        <div aria-hidden="true" className="hsa-news-captcha">
          <div className="hsa-news-captcha-box" />
          <div className="hsa-news-captcha-copy">
            <strong>Human verification</strong>
            <span>Local preview placeholder</span>
          </div>
          <div className="hsa-news-captcha-badge">CAPTCHA</div>
        </div>
        <button className="hsa-news-submit" type="submit">
          Subscription
        </button>
      </form>
      <div className="hsa-social">
        <h4>Follow Us</h4>
        <div className="hsa-social-links">
          <a
            aria-label="Facebook"
            className="hsa-social-link"
            href="https://www.facebook.com/people/Robotlyne/61585733840584/"
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="hsa-social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.37 20.5v-7.53h2.54l.38-2.94h-2.92V8.15c0-.85.23-1.43 1.45-1.43H16V4.09c-.56-.06-1.12-.09-1.68-.09-2.5 0-4.2 1.53-4.2 4.33v1.7H7.5v2.94h2.62v7.53h3.25Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
          <a
            aria-label="LinkedIn"
            className="hsa-social-link"
            href="https://www.linkedin.com/company/huizongzhineng/"
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="hsa-social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.43 8.56a1.86 1.86 0 1 1 0-3.72 1.86 1.86 0 0 1 0 3.72Zm-1.6 11.1h3.19V9.83H4.83v9.83ZM10.4 9.83h3.06v1.34h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.82 2.13 3.82 4.9v5.24h-3.18V15c0-1.1-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.44v4.75H10.4V9.83Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
          <a
            aria-label="YouTube"
            className="hsa-social-link"
            href="https://www.youtube.com/@Robotlyne"
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="hsa-social-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.62 7.24a2.48 2.48 0 0 0-1.74-1.75C16.34 5 12 5 12 5s-4.34 0-5.88.49A2.48 2.48 0 0 0 4.38 7.24 25.7 25.7 0 0 0 4 12a25.7 25.7 0 0 0 .38 4.76 2.48 2.48 0 0 0 1.74 1.75C7.66 19 12 19 12 19s4.34 0 5.88-.49a2.48 2.48 0 0 0 1.74-1.75A25.7 25.7 0 0 0 20 12a25.7 25.7 0 0 0-.38-4.76ZM10.5 15.5v-7l6 3.5-6 3.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function FooterContactLinks() {
  return (
    <div className="hsa-footer-contact">
      <a aria-label="Email" className="hsa-footer-contact-link" href="mailto:sales@robotlyne.com">
        <span className="material-symbols-outlined">mail</span>
      </a>
      <a
        aria-label="WhatsApp"
        className="hsa-footer-contact-link"
        href="https://wa.me/8613510816743?text=Hello%20there!"
        rel="noreferrer"
        target="_blank"
      >
        <span aria-hidden="true" className="hsa-footer-contact-icon-svg">
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.56 0 .26 5.29.26 11.79c0 2.08.54 4.1 1.58 5.89L0 24l6.49-1.71a11.8 11.8 0 0 0 5.58 1.42h.01c6.51 0 11.8-5.29 11.8-11.79 0-3.15-1.22-6.11-3.36-8.44Z"
              fill="currentColor"
            />
            <path
              d="M12.08 21.71h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.85 1.01 1.03-3.76-.23-.39a9.8 9.8 0 0 1-1.49-5.2c0-5.4 4.4-9.79 9.82-9.79 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 0 1 2.88 6.92c0 5.39-4.41 9.79-9.8 9.79Z"
              fill="#fff"
            />
            <path
              d="M8.17 6.76c-.2 0-.42.01-.64.52-.21.49-.79 1.9-.79 2.05 0 .16-.02.34.1.51.11.18.82 1.33 1.97 2.38 1.48 1.34 2.74 1.76 3.12 1.95.38.2.61.17.83-.1.23-.28.94-1.09 1.19-1.46.25-.36.5-.3.85-.18.35.12 2.22 1.05 2.6 1.24.38.18.63.27.72.42.1.16.1.9-.21 1.78-.31.87-1.79 1.67-2.48 1.74-.64.06-1.46.09-2.35-.19-.54-.17-1.23-.4-2.13-.77-3.75-1.52-6.2-5.18-6.39-5.43-.18-.25-1.52-1.99-1.52-3.8 0-1.8.96-2.69 1.3-3.06.34-.36.74-.46.99-.46h.71c.23 0 .54-.1.85.63.31.74 1.05 2.55 1.14 2.73.09.18.15.39.03.63-.12.25-.18.4-.36.61-.18.21-.38.46-.54.62-.18.18-.36.38-.15.73.2.34.91 1.49 1.95 2.42 1.35 1.21 2.49 1.58 2.84 1.76.35.18.56.16.77-.09.21-.24.89-1.03 1.12-1.38.23-.35.47-.3.8-.18.33.11 2.08.97 2.44 1.15.36.18.6.27.69.42.09.15.09.87-.2 1.72-.3.86-1.71 1.64-2.38 1.72-.67.08-1.53.11-2.47-.19-.58-.18-1.31-.43-2.27-.82-4.01-1.64-6.62-5.63-6.82-5.91-.2-.28-1.66-2.19-1.66-4.18s1.06-2.97 1.44-3.38c.38-.42.84-.52 1.11-.52h.48Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </a>
      <a aria-label="Phone" className="hsa-footer-contact-link" href="tel:8613510816743">
        <span className="material-symbols-outlined">call</span>
      </a>
      <button
        aria-label="Sales QR"
        className="hsa-footer-contact-link hsa-footer-contact-trigger"
        data-hsa-open-sales-modal=""
        type="button"
      >
        <span className="material-symbols-outlined">support_agent</span>
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="hsa-footer">
      <div className="hsa-footer-inner">
        <div>
          <div className="hsa-footer-brand">Huizong Intelligent Automation</div>
          <p className="hsa-footer-copy">
            Integrated warehouse automation, robotics, software orchestration, and project delivery for
            global B2B intralogistics operations.
          </p>
          <FooterContactLinks />
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
        <FooterSignup />
      </div>
      <div className="hsa-footer-bottom">
        <span>Copyright 2026 Huizong Intelligent Automation</span>
        <span>Local deployment build for browser preview</span>
      </div>
    </footer>
  );
}

export function PublicPageChrome({ children, page }) {
  return (
    <div className="content-shell">
      <StructuredData page={page} />
      <Header currentSection={page.section} />
      {children}
      <Footer />
    </div>
  );
}

export function StructuredLegacyPage({ legacyContentHtml, page }) {
  return (
    <PublicPageChrome page={page}>
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: legacyContentHtml }}
        suppressHydrationWarning
      />
    </PublicPageChrome>
  );
}

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

  return (
    <CmsPageShell currentSection="faq">
      <main className="shell-main">
        <section className="hero-panel is-detail">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">FAQ</span>
              <h1>Answers for procurement, engineering, and rollout planning.</h1>
              <p>A Sanity-backed FAQ surface ready for buyer questions, technical support, and sales enablement.</p>
            </div>
          </div>
        </section>
        <section className="section-panel">
          <div className="section-heading">
            <h2>Frequently asked questions</h2>
            <p>FAQ entries published in Sanity will render here in structured form.</p>
          </div>
          <div className="faq-list">
            {faqs.length ? (
              faqs.map((faq) => (
                <article className="faq-item" key={faq._id}>
                  <h3>{faq.question}</h3>
                  <div className="mdx-prose">
                    <SanityPortableText value={faq.answer} />
                  </div>
                </article>
              ))
            ) : (
              <article className="faq-item">
                <h3>No FAQ entries published yet</h3>
                <p>Create documents of type <code>faq</code> in Sanity to populate this page.</p>
              </article>
            )}
          </div>
        </section>
      </main>
    </CmsPageShell>
  );
}

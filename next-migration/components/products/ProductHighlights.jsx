const HIGHLIGHTS = [
  {
    metric: "2500kg",
    title: "Heavy Load Handling",
    copy: "Move pallets up to 2500kg with stable autonomous operation across defined warehouse routes.",
    icon: "forklift",
  },
  {
    metric: "10m",
    title: "High Rack Automation",
    copy: "Support high-density storage environments with lifting capability up to 10m and planned rack handoffs.",
    icon: "height",
  },
  {
    metric: "24/7",
    title: "Continuous Warehouse Operation",
    copy: "Reduce manual forklift dependency and improve workflow consistency through mission-based transport.",
    icon: "schedule",
  },
];

export default function ProductHighlights() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 max-w-3xl">
          <span className="hsa-ui-kicker">Automation Value</span>
          <h2 className="hsa-ui-title forklift-section-title forklift-highlights-title">Why Choose Forklift Stacker AGV?</h2>
          <p className="hsa-ui-body mt-6">
            Built for the repetitive, high-load movements that make warehouse automation worth engineering carefully.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <article
              className={`forklift-highlight-card group border p-8 md:p-10 ${index === 1 ? "bg-primary text-white" : "bg-surface text-primary"}`}
              key={item.title}
            >
              <div className="flex items-start justify-between gap-6">
                <span className={`material-symbols-outlined flex h-12 w-12 items-center justify-center ${index === 1 ? "bg-secondary text-white" : "bg-primary/8 text-primary"}`} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={`text-5xl font-black tracking-[-0.08em] ${index === 1 ? "text-white" : "text-primary"}`}>
                  {item.metric}
                </span>
              </div>
              <h3 className={`mt-12 text-2xl font-black tracking-tight ${index === 1 ? "text-white" : "text-primary"}`}>
                {item.title}
              </h3>
              <p className={`mt-4 max-w-md text-sm leading-[1.85] ${index === 1 ? "text-on-primary-container" : "text-on-surface-variant"}`}>
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

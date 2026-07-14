import Link from "next/link";

const DEFAULT_METRICS = [
  ["2500kg", "Payload"],
  ["10m", "Lift Height"],
  ["24/7", "Autonomous Operation"],
];

export default function ForkliftHero({ page }) {
  const title = page?.data?.heroTitle || "Autonomous Forklift AGV";
  const subtitle =
    page?.data?.heroSubtitle || "High-Density Warehouse Automation Solution";
  const summary =
    page?.data?.heroSummary ||
    "Automate pallet storage, retrieval and internal transportation with a high-performance autonomous forklift system designed for 24/7 warehouse operations.";

  return (
    <section className="forklift-hero overflow-hidden bg-primary text-white lg:min-h-0">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch lg:gap-10 lg:py-[57px] xl:gap-14">
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.34em] text-white/72">
              Forklift Stacker AGV / Warehouse Automation
            </span>
          </div>
          <h1 className="forklift-hero-title w-full max-w-[13ch] text-[3.25rem] font-black leading-[0.95] tracking-[-0.06em] md:text-[3.75rem] xl:text-[4rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-xl font-bold leading-tight text-white md:text-2xl">
            {subtitle}
          </p>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.45] text-white/70 md:text-base">
            {summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link className="hsa-ui-btn-primary" href="/contact?intent=quote">
              Request Automation Assessment
            </Link>
            <a
              download
              className="hsa-ui-btn-secondary border-white/28 bg-white/5 text-white hover:bg-white/12"
              href="/downloads/product-catalog.pdf"
            >
              Download Specification
            </a>
          </div>
          <div className="mt-5 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-3">
            {DEFAULT_METRICS.map(([value, label]) => (
              <div className="bg-primary/78 px-3 py-2.5 backdrop-blur-sm" key={label}>
                <div className="text-2xl font-black tracking-tight text-white md:text-[1.75rem]">
                  {value}
                </div>
                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.13em] text-secondary">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.08] p-1.5 shadow-[0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm md:min-h-[500px] lg:h-full lg:min-h-[580px]">
          <img
            alt="Forklift Stacker AGV moving a pallet inside a high-rack warehouse"
            className="h-full min-h-[368px] w-full rounded-[22px] object-cover object-[86%_center] md:min-h-[488px] lg:min-h-0"
            fetchPriority="high"
            src="/downloads/agv-forklift-hero-wide.png"
          />
          <div className="pointer-events-none absolute inset-1.5 rounded-[22px] bg-[linear-gradient(180deg,rgba(0,23,54,0.02)_42%,rgba(0,23,54,0.78)_100%)]" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="border border-white/18 bg-primary/68 px-4 py-3 backdrop-blur-md sm:max-w-[16rem]">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                Application
              </div>
              <div className="mt-1 text-sm font-bold leading-relaxed text-white">
                High-Rack Pallet Storage
              </div>
            </div>
            <div className="border border-white/18 bg-primary/68 px-4 py-3 backdrop-blur-md sm:text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                Capability
              </div>
              <div className="mt-1 text-sm font-bold leading-relaxed text-white">
                2500kg Payload | 10m Lift Height
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

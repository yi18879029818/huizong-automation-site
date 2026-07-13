import Link from "next/link";

const DEFAULT_METRICS = [
  ["2500kg", "Payload Capability"],
  ["10m", "High-Rack Storage"],
  ["24/7", "Autonomous Operation"],
];

export default function ForkliftHero({ page }) {
  const title =
    page?.data?.heroTitle ||
    "Autonomous Forklift AGV for High-Density Warehouse Automation";
  const summary =
    page?.data?.heroSummary ||
    "Automate pallet storage, retrieval and internal transportation with a high-performance autonomous forklift system designed for 24/7 warehouse operations.";

  return (
    <section className="forklift-hero overflow-hidden bg-primary text-white">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-10 md:px-12 md:py-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-10 lg:py-12 xl:gap-14 xl:py-14">
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.34em] text-white/72">
              Forklift Stacker AGV / Warehouse Automation
            </span>
          </div>
          <h1 className="forklift-hero-title w-full text-5xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl xl:text-[5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-[1.65] text-white/78 md:text-xl">
            {summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="hsa-ui-btn-primary" href="/contact?intent=quote">
              Request Automation Assessment
            </Link>
            <Link
              className="hsa-ui-btn-secondary border-white/28 bg-white/5 text-white hover:bg-white/12"
              href="#technical-specifications"
            >
              View Technical Specifications
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-3">
            {DEFAULT_METRICS.map(([value, label]) => (
              <div className="bg-primary/78 px-3 py-4 backdrop-blur-sm" key={label}>
                <div className="text-3xl font-black tracking-tight text-white md:text-3xl">
                  {value}
                </div>
                <div className="mt-2 text-[10px] font-black uppercase tracking-[0.13em] text-secondary">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden border border-white/18 bg-white/10 p-2 shadow-[0_26px_80px_rgba(0,0,0,0.24)] md:min-h-[440px] lg:min-h-[500px]">
          <img
            alt="Forklift Stacker AGV moving a pallet inside a high-rack warehouse"
            className="h-full min-h-[304px] w-full object-cover object-[68%_center] md:min-h-[424px] lg:min-h-[484px]"
            fetchPriority="high"
            src="/downloads/agv-forklift-hero-wide.png"
          />
          <div className="pointer-events-none absolute inset-2 bg-[linear-gradient(180deg,rgba(0,23,54,0.02)_52%,rgba(0,23,54,0.72)_100%)]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div className="max-w-[16rem] border-l-2 border-secondary bg-primary/78 px-4 py-3 backdrop-blur-md">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                Operating Context
              </div>
              <div className="mt-2 text-sm font-bold leading-relaxed text-white">
                High-rack putaway, pallet retrieval and controlled internal transport.
              </div>
            </div>
            <span className="hidden border border-white/30 bg-primary/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:block">
              Warehouse Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECIFICATIONS = [
  ["Payload", "Up to 2500kg", "Confirm with pallet and fork configuration.", "weight"],
  ["Lift Height", "Up to 10m", "Rack and load geometry require validation.", "vertical_align_top"],
  ["Navigation", "Laser SLAM / optional methods", "Navigation choice follows the site environment and control plan.", "explore"],
  ["Battery", "Lithium battery", "Automatic charging support can be evaluated against the operating rhythm.", "battery_charging_full"],
  ["Safety", "Scanners and obstacle detection", "Safety layout, zones and response rules are site-specific.", "health_and_safety"],
  ["Integration", "WMS / WCS / Conveyor / ASRS", "Interface scope is confirmed during the technical evaluation.", "lan"],
];

export default function SpecificationCards() {
  return (
    <section className="bg-surface-container-low py-24 md:py-28" id="technical-specifications">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="hsa-ui-kicker">Technical Specifications</span>
            <h2 className="hsa-ui-title forklift-section-title">A qualification-ready view of the platform.</h2>
          </div>
          <p className="hsa-ui-body max-w-xl">
            Product-level reference points for early planning. Final values and interfaces are confirmed against the layout, pallet profile, rack conditions and safety review.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SPECIFICATIONS.map(([label, value, note, icon], index) => (
            <article className="forklift-spec-card border border-outline-variant/18 bg-white p-7 md:p-8" key={label}>
              <div className="flex items-start justify-between gap-5">
                <span className="text-[10px] font-black tracking-[0.2em] text-outline">0{index + 1}</span>
                <span className="material-symbols-outlined text-secondary" aria-hidden="true">{icon}</span>
              </div>
              <div className="mt-10 text-[11px] font-black uppercase tracking-[0.16em] text-primary">{label}</div>
              <div className="mt-3 text-2xl font-black leading-tight tracking-tight text-primary">{value}</div>
              <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

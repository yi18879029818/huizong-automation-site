const SYSTEM_LAYERS = [
  ["ERP", "Orders and master data"],
  ["WMS", "Inventory, locations and tasks"],
  ["WCS / RCS", "Equipment orchestration and fleet control"],
  ["Robot Fleet", "Mission dispatch and traffic management"],
  ["Forklift AGV", "Autonomous pallet movement"],
  ["ASRS / Conveyor / Production Line", "Physical handoffs and destinations"],
];

export default function IntegrationArchitecture() {
  return (
    <section className="bg-white py-24 md:py-28" id="warehouse-integration">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div>
            <span className="hsa-ui-kicker">Warehouse Integration</span>
            <h2 className="hsa-ui-title forklift-section-title forklift-section-title--compact">Connected Warehouse Automation System</h2>
            <p className="hsa-ui-body mt-6">
              Coolyne provides integrated automation solutions beyond individual robots. The integration boundary is defined around task release, execution status, equipment handoff and safety ownership.
            </p>
          </div>
          <div className="overflow-hidden border border-outline-variant/20 bg-surface-container-low">
            <img
              alt="Autonomous forklift moving a pallet at a warehouse conveyor handoff"
              className="h-72 w-full object-cover md:h-[28rem]"
              loading="lazy"
              src="/assets/images/autonomous-forklifts-detail-2.png"
            />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          {SYSTEM_LAYERS.map(([label, copy], index) => (
            <div className="relative flex items-center gap-5" key={label}>
              {index < SYSTEM_LAYERS.length - 1 ? <span className="absolute left-6 top-14 h-8 w-px bg-secondary/45" aria-hidden="true" /> : null}
              <span className={`relative z-10 flex h-12 min-w-12 items-center justify-center border-2 text-[10px] font-black tracking-[0.12em] ${index === 4 ? "border-secondary bg-secondary text-white" : "border-primary bg-white text-primary"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mb-3 flex-1 border-b border-outline-variant/18 py-5 pl-1">
                <div className="text-lg font-black tracking-tight text-primary md:text-xl">{label}</div>
                <div className="mt-1 text-sm text-on-surface-variant">{copy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

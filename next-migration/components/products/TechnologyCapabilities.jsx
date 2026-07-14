const CAPABILITIES = [
  ["01", "Navigation System", "Laser SLAM, QR or vision-based navigation methods can be evaluated for the site." , "navigation"],
  ["02", "Safety System", "360 degree obstacle detection and emergency protection support controlled movement." , "shield"],
  ["03", "Fleet Management", "Multi-robot scheduling, traffic control and mission visibility across the operating area." , "hub"],
  ["04", "Battery Management", "Lithium battery architecture with automatic charging support for planned availability." , "battery_charging_full"],
  ["05", "Warehouse Integration", "WMS, WCS and RCS connectivity define the task and status exchange boundary." , "account_tree"],
  ["06", "Data Monitoring", "Real-time operation visibility helps teams review task status, exceptions and uptime." , "monitoring"],
];

export default function TechnologyCapabilities() {
  return (
    <section className="bg-white py-24 md:py-28" id="technology">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 max-w-none">
          <span className="hsa-ui-kicker">Technology Capability</span>
          <h2 className="hsa-ui-title forklift-section-title forklift-section-title--compact forklift-section-title--single-line">Intelligent Technology Behind Autonomous Forklift</h2>
          <p className="hsa-ui-body mt-6 max-w-3xl">
            The vehicle is one layer in a controlled automation system. These capabilities define how it moves, stays safe and shares status with the warehouse.
          </p>
        </div>
        <div className="grid gap-px border border-outline-variant/20 bg-outline-variant/20 sm:grid-cols-2 xl:grid-cols-3">
          {CAPABILITIES.map(([number, title, copy, icon]) => (
            <article className="group bg-white p-7 transition-colors hover:bg-surface md:p-9" key={title}>
              <div className="flex items-start justify-between gap-6">
                <span className="text-[10px] font-black tracking-[0.22em] text-secondary">{number}</span>
                <span className="material-symbols-outlined text-primary/70 transition-colors group-hover:text-secondary" aria-hidden="true">{icon}</span>
              </div>
              <h3 className="mt-12 text-2xl font-black tracking-tight text-primary">{title}</h3>
              <p className="mt-4 text-sm leading-[1.85] text-on-surface-variant">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

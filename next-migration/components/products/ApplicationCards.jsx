const APPLICATIONS = [
  {
    title: "High Rack Warehouse",
    copy: "Automated pallet storage and retrieval for dense warehouse utilization.",
    image: "/assets/images/asrs-guide-storage-aisle.webp",
    alt: "High-rack warehouse storage aisle with pallet locations",
  },
  {
    title: "Manufacturing Logistics",
    copy: "Reliable material movement between warehouse and production areas.",
    image: "/assets/images/autonomous-forklifts-detail-1.png",
    alt: "Autonomous forklift transferring a pallet near a production conveyor",
  },
  {
    title: "ASRS Integration",
    copy: "Connect autonomous forklift operations with automated storage systems.",
    image: "/assets/images/autonomous-forklifts-detail-3.png",
    alt: "Autonomous forklifts moving pallets beside a conveyor and storage racks",
  },
];

export default function ApplicationCards() {
  return (
    <section className="bg-surface-container-low py-24 md:py-28" id="applications">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="hsa-ui-kicker">Application Scenarios</span>
            <h2 className="hsa-ui-title forklift-section-title">Designed For Modern Warehouse Operations</h2>
          </div>
          <p className="hsa-ui-body max-w-xl">
            Start with the physical movement, the rack interface and the system handoffs that need to stay predictable across every shift.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {APPLICATIONS.map((item) => (
            <article className="group overflow-hidden border border-outline-variant/20 bg-white" key={item.title}>
              <div className="relative aspect-[1.2/1] overflow-hidden">
                <img
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  src={item.image}
                />
                <span className="absolute left-5 top-5 bg-primary px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  0{APPLICATIONS.indexOf(item) + 1} / Use Case
                </span>
              </div>
              <div className="border-t-2 border-secondary p-7 md:p-8">
                <h3 className="text-2xl font-black tracking-tight text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-[1.85] text-on-surface-variant">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

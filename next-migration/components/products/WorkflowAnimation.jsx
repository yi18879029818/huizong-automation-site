const WORKFLOW = [
  ["01", "Warehouse System Sends Task", "Order, inventory or replenishment demand becomes a pallet task."],
  ["02", "AGV Receives Mission", "The control layer assigns the mission, destination and operating rules."],
  ["03", "Autonomous Navigation", "The AGV plans a route through the defined warehouse map."],
  ["04", "Pallet Detection", "Sensors validate pallet position, clearance and pickup conditions."],
  ["05", "Fork Lifting", "The vehicle aligns, lifts and confirms the load before movement."],
  ["06", "Storage / Delivery", "The pallet is placed at rack, buffer, ASRS or outbound staging."],
];

export default function WorkflowAnimation() {
  return (
    <section className="forklift-workflow-section bg-primary py-24 text-white md:py-28" id="how-it-works">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-14 max-w-none">
          <span className="hsa-ui-kicker hsa-ui-kicker--light">How It Works</span>
          <h2 className="forklift-section-title forklift-section-title--compact forklift-section-title--single-line mt-4 text-4xl font-black tracking-tight md:text-6xl">How Forklift Stacker AGV Works</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-primary-container">
            A visible task chain helps warehouse, software and engineering teams align ownership before a technical evaluation.
          </p>
        </div>
        <div className="forklift-workflow-board relative border border-white/15 bg-[#061b3b] p-4 md:p-7">
          <div className="forklift-workflow-route" aria-hidden="true" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {WORKFLOW.map(([step, title, copy], index) => (
              <article className="forklift-workflow-step relative" key={step}>
                <div className="forklift-workflow-node" style={{ "--step-delay": `${index * 180}ms` }} aria-hidden="true" />
                <div className="text-[10px] font-black tracking-[0.22em] text-secondary">{step}</div>
                <h3 className="mt-8 text-lg font-black leading-tight tracking-tight text-white">{title}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-on-primary-container">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/12 pt-5 text-[10px] font-black uppercase tracking-[0.18em] text-white/58">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-secondary" /> Task assigned</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#6de0dc]" /> Route active</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white/60" /> Handoff confirmed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

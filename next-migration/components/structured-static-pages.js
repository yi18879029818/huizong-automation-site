import { PublicPageChrome } from "@/components/public-shell";
import Script from "next/script";

import AboutMilestonesTimeline from "@/components/AboutMilestonesTimeline";
import CountUpValue from "@/components/CountUpValue";
import { InlineIcon } from "@/components/inline-icon";
import WarehouseFlowSimulation from "@/components/WarehouseFlowSimulation";

function LiteYouTubeEmbed({ title, videoId }) {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  const posterUrl = "/downloads/home-video-poster-optimized.jpg";

  return (
    <div
      className="group relative h-full w-full overflow-hidden bg-secondary"
      data-lite-youtube={videoId}
      data-embed-url={embedUrl}
    >
      <button
        type="button"
        className="absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden border-0 bg-transparent p-0 text-left"
        aria-label={`Play ${title}`}
      >
        <img
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          src={posterUrl}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/18 to-secondary/12" />
        <span className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-white/92 text-secondary shadow-[0_20px_44px_rgba(0,23,54,0.26)] transition-transform duration-300 group-hover:scale-105">
          <svg
            aria-hidden="true"
            className="ml-1 h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 6.5v11l9-5.5-9-5.5Z" />
          </svg>
        </span>
      </button>
      <noscript>
        <a
          className="absolute inset-0 block h-full w-full"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          rel="noreferrer"
          target="_blank"
          aria-label={`Open ${title} on YouTube`}
        >
          <img
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={posterUrl}
          />
        </a>
      </noscript>
    </div>
  );
}

const HOME_INDUSTRIES = [
  {
    icon: "local_shipping",
    title: "Express & Parcel Logistics",
    summary:
      "High-speed sortation, real-time tracking, peak-ready automation for courier networks.",
    bullets: [
      "Parcel sortation (3,500+ pph)",
      "Cross-docking automation",
      "Last-mile delivery hubs",
    ],
  },
  {
    icon: "directions_car",
    title: "Automotive & Tier Suppliers",
    summary:
      "JIT delivery, sequencing, traceability for IATF 16949 compliance.",
    bullets: [
      "Powertrain assembly lines",
      "Stamping & body shops",
      "EV battery production",
    ],
  },
  {
    icon: "memory",
    title: "Electronics Manufacturing",
    summary:
      "ESD-safe handling, clean room compatibility, high-mix production support.",
    bullets: [
      "PCB assembly (SMT lines)",
      "Consumer electronics",
      "Semiconductor packaging",
    ],
  },
  {
    icon: "medical_services",
    title: "Pharmaceutical & Medical",
    summary:
      "GMP compliance, temperature control, lot tracking, validation support.",
    bullets: [
      "Pharmaceutical packaging",
      "Medical device assembly",
      "Cold chain logistics",
    ],
  },
  {
    icon: "shopping_bag",
    title: "E-commerce & 3PL",
    summary:
      "High-velocity fulfillment, omnichannel inventory, seasonal scalability.",
    bullets: [
      "Multi-channel distribution",
      "Contract logistics",
      "Returns processing",
    ],
  },
  {
    icon: "restaurant",
    title: "Food & Beverage",
    summary:
      "Hygienic design, washdown equipment, batch tracking, expiry management.",
    bullets: [
      "Food processing",
      "Beverage distribution",
      "Cold storage warehouses",
    ],
  },
  {
    icon: "construction",
    title: "Industrial Manufacturing",
    summary:
      "Heavy load handling, work-in-process flow, finished goods logistics.",
    bullets: [
      "Industrial equipment",
      "HVAC manufacturing",
      "Building materials",
    ],
  },
  {
    icon: "toys",
    title: "Consumer Goods",
    summary:
      "High-SKU environments, promotional flexibility, retail compliance.",
    bullets: ["Personal care products", "Home goods", "Sporting goods"],
  },
];

const HOME_PARTNER_BRANDS = [
  { name: "DENSO", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/DENSO.webp") },
  { name: "TP-Link", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/tplink.webp") },
  { name: "BYD", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/濮ｆ柧绨规潻?webp") },
  {
    name: "Han's Laser",
    src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/婢堆勬濠碘偓閸?webp"),
  },
  {
    name: "Fenghua Advanced",
    src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/妞嬪骸宕曟妯碱潠.webp"),
  },
  { name: "Hytera", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/濞寸柉鍏樻潏?webp") },
  { name: "HGTECH", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/閸楀骸浼愮粔鎴炲Η.webp") },
  { name: "CR", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/閸楀孩榧?webp") },
  {
    name: "Longood Intelligent",
    src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/閺堟顫栭弲楦垮厴.webp"),
  },
  { name: "Inovance", src: encodeURI("/downloads/閸氬牅缍旈崫浣哄/閼诲崬鈻夐懙?webp") },
];

const HOME_PARTNER_BRANDS_SAFE = [
  {
    name: "DENSO",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/DENSO.webp",
  },
  {
    name: "TP-Link",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/tplink.webp",
  },
  {
    name: "BYD",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E6%AF%94%E4%BA%9A%E8%BF%AA.webp",
  },
  {
    name: "Han's Laser",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E5%A4%A7%E6%97%8F%E6%BF%80%E5%85%89.webp",
  },
  {
    name: "Fenghua Advanced",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E9%A3%8E%E5%8D%8E%E9%AB%98%E7%A7%91.webp",
  },
  {
    name: "Hytera",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E6%B5%B7%E8%83%BD%E8%BE%BE.webp",
  },
  {
    name: "HGTECH",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E5%8D%8E%E5%B7%A5%E7%A7%91%E6%8A%80.webp",
  },
  {
    name: "CR",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E5%8D%8E%E6%B6%A6.webp",
  },
  {
    name: "Longood Intelligent",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E6%9C%97%E7%A7%91%E6%99%BA%E8%83%BD.webp",
  },
  {
    name: "Inovance",
    src: "/downloads/%E5%90%88%E4%BD%9C%E5%93%81%E7%89%8C/%E8%8B%B1%E5%A8%81%E8%85%BE.webp",
  },
];

const HOME_TRUST_METRICS = [
  {
    value: "42+",
    label: "Deployment Countries",
    copy: "Programs aligned for multi-region industrial rollouts and support coordination.",
    image: "/downloads/certificates/credit-honor-01-home.jpg",
  },
  {
    value: "24/7",
    label: "Operations Coverage",
    copy: "Software orchestration and service continuity designed for round-the-clock execution.",
    image: "/downloads/certificates/compliance-certification-01-home.jpg",
  },
  {
    value: "99.9%",
    label: "Process Accuracy",
    copy: "Automation logic built around traceability, repeatability, and low-error material flow.",
    image: "/downloads/certificates/compliance-certification-02-home.jpg",
  },
];

const HOME_TRUST_PROOFS = [
  {
    eyebrow: "Formal Audit",
    title: "Quality Certification",
    copy: "Formal quality management and process control records supporting project delivery discipline.",
    image: "/downloads/certificates/quality-certification-01-home.jpg",
  },
  {
    eyebrow: "Patent Records",
    title: "Patent Portfolio",
    copy: "Technical invention and utility model filings connected to automation equipment and system methods.",
    image: "/downloads/certificates/patent-02-home.jpg",
  },
];

const HOME_TRUST_SHOWCASE = [
  {
    id: "deployment-countries",
    kind: "metric",
    stage: "edge-metric",
    tab: "Global Rollout",
    ...HOME_TRUST_METRICS[0],
  },
  {
    id: "operations-coverage",
    kind: "metric",
    stage: "feature-metric",
    tab: "Always-On Coverage",
    ...HOME_TRUST_METRICS[1],
  },
  {
    id: "quality-certification",
    kind: "proof",
    stage: "hero-proof",
    tab: "Quality System",
    ...HOME_TRUST_PROOFS[0],
  },
  {
    id: "process-accuracy",
    kind: "metric",
    stage: "wide-metric",
    tab: "Process Control",
    ...HOME_TRUST_METRICS[2],
  },
  {
    id: "patent-portfolio",
    kind: "proof",
    stage: "edge-proof",
    tab: "Patent Records",
    ...HOME_TRUST_PROOFS[1],
  },
];

function HomeBody() {
  return (
    <>
      <Script
        src="/assets/home-hero-robot.js"
        strategy="afterInteractive"
        type="module"
      />
      {" "}
      <div className="page-content">
        {" "}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
          {" "}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {" "}
              <img
                alt="Futuristic automated warehouse"
                className="w-full h-full object-cover opacity-40"
                fetchPriority="high"
                height="846"
                loading="eager"
                src="/downloads/home-insights-asrs-home.jpg"
                width="1504"
              />{" "}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />{" "}
          </div>{" "}
          <div className="relative z-10 container mx-auto hsa-home-hero-container">
            {" "}
            <div className="hsa-home-hero-shell">
              {" "}
              <div className="hsa-home-hero-copy">
                <span className="hsa-ui-kicker hsa-ui-kicker--light">
                  Industrial Intelligence
                </span>
                <h1 className="hsa-ui-hero-title text-white max-w-[7.4ch]">
                  Warehouse
                  <br />
                  Automation
                  <br />
                  <span className="text-white/30">Systems</span>
                </h1>
                <p className="hsa-ui-hero-copy">
                  coolyne designs complete warehouse automation programs with
                  AGV fleets, storage systems, conveyors, and software
                  orchestration for live industrial operations.
                </p>
                <div className="hsa-ui-actions">
                  <a
                    className="hsa-ui-btn-primary"
                    href="/contact"
                  >
                    Speak With An Expert
                  </a>
                  <a
                    className="hsa-ui-btn-light"
                    href="/solutions"
                  >
                    Explore Solutions
                  </a>
                </div>
              </div>{" "}
              <div className="hsa-home-hero-visual" data-home-robot="">
                {" "}
                <div className="hsa-home-robot-panel">
                  {" "}
                  <div className="hsa-home-robot-meta">
                    {" "}
                    <span className="hsa-home-robot-kicker">
                      Composite Mobile Robot
                    </span>{" "}
                    <span className="hsa-home-robot-chip">360 View</span>{" "}
                  </div>{" "}
                  <div
                    className="hsa-home-robot-stage"
                    aria-label="Interactive 3D robot model area"
                  >
                    <img
                      alt="Composite mobile robot preview"
                      className="hsa-home-robot-poster"
                      decoding="async"
                      fetchPriority="high"
                      height="1207"
                      loading="eager"
                      src="/assets/images/cmr-hero.webp"
                      width="735"
                    />
                    {" "}
                    <model-viewer
                      alt="Interactive composite mobile robot 3D model"
                      auto-rotate=""
                      camera-controls=""
                      class="hsa-home-model-viewer"
                      disable-tap=""
                      environment-image="neutral"
                      exposure="1.22"
                      interaction-prompt="none"
                      rotation-per-second="18deg"
                      shadow-intensity="0.22"
                      shadow-softness="0.85"
                      src="/%E6%A8%A1%E5%9E%8B2/%E5%A4%8D%E5%90%88%E6%9C%BA%E5%99%A8%E4%BA%BA8.glb"
                      touch-action="pan-y"
                    />{" "}
                  </div>{" "}
                  <div className="hsa-home-robot-status">
                    Loading 3D model...
                  </div>{" "}
                  <div className="hsa-home-robot-hint">
                    {" "}
                    <span>Drag to rotate</span>{" "}
                    <span>Auto orbit enabled</span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-white">
          {" "}
          <div>
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {" "}
              {[
                [
                  "inventory_2",
                  "ASRS",
                  "Automated Storage and Retrieval Systems designed for maximum density and ultra-fast accessibility.",
                ],
                [
                  "conveyor_belt",
                  "Material Handling",
                  "High-precision conveyor and transport mechanisms ensuring fluid transit throughout the facility.",
                ],
                [
                  "precision_manufacturing",
                  "Robotic Picking",
                  "Robotic and voice-directed picking solutions that eliminate human error and accelerate fulfillment.",
                ],
              ].map(([icon, title, copy]) => (
                <div
                  className="hsa-ui-card hsa-ui-card--interactive hsa-ui-card--soft p-8 group"
                  key={title}
                >
                  {" "}
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface group-hover:bg-primary transition-colors">
                    {" "}
                    <InlineIcon
                      className="h-8 w-8 text-secondary transition-colors group-hover:text-white"
                      name={icon}
                    />{" "}
                  </div>{" "}
                  <h3 className="mb-5 text-[1.7rem] font-black leading-[1.04] tracking-tight text-secondary">
                    {" "}
                    {title}{" "}
                  </h3>{" "}
                  <p className="text-sm font-medium leading-[1.7] text-on-surface-variant">
                    {copy}
                  </p>{" "}
                </div>
              ))}{" "}
              <a
                className="hsa-ui-card hsa-ui-card--interactive hsa-ui-card--soft block p-8 group"
                href="/solutions/software"
              >
                {" "}
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface group-hover:bg-primary transition-colors">
                  {" "}
                  <InlineIcon
                    className="h-8 w-8 text-secondary transition-colors group-hover:text-white"
                    name="settings_input_component"
                  />{" "}
                </div>{" "}
                <h3 className="mb-5 text-[1.7rem] font-black leading-[1.04] tracking-tight text-secondary">
                  {" "}
                  Control Systems{" "}
                </h3>{" "}
                <p className="text-sm font-medium leading-[1.7] text-on-surface-variant">
                  {" "}
                  Integrated software layers providing real-time oversight and
                  adaptive logic for all hardware nodes.{" "}
                </p>{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface overflow-hidden">
          {" "}
          <div>
            {" "}
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              {" "}
              <div className="w-full lg:w-1/2 relative">
                {" "}
                <div className="aspect-[4/5] bg-secondary overflow-hidden shadow-2xl">
                  {" "}
                  <img
                    alt="Modern logistics robot"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    src="/assets/images/home-kinetic-vertical-home.jpg"
                  />{" "}
                </div>{" "}
                <div className="absolute -bottom-10 -right-6 lg:-right-10 glass-effect p-8 shadow-2xl max-w-xs border border-outline-variant">
                  {" "}
                  <div className="flex items-center gap-4 mb-4">
                    {" "}
                    <InlineIcon className="h-9 w-9 text-primary" name="monitoring" />{" "}
                    <span className="font-black text-sm tracking-widest text-secondary">
                      {" "}
                      Live Analytics{" "}
                    </span>{" "}
                  </div>{" "}
                  <p className="text-[13px] text-on-surface-variant leading-relaxed font-medium">
                    {" "}
                    Real-time throughput monitoring with 99.9% data accuracy
                    across all integrated robot fleets.{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="w-full lg:w-1/2">
                {" "}
                <span className="text-primary font-bold tracking-[0.3em] text-[11px] mb-6 block">
                  {" "}
                  The Unified Architecture{" "}
                </span>{" "}
                <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-none ">
                  {" "}
                  Smart Logistics: Kinetic Ecosystem{" "}
                </h2>{" "}
                <p className="text-lg text-on-surface-variant mb-12 leading-relaxed font-medium">
                  {" "}
                  We don't just supply hardware; we engineer a kinetic
                  ecosystem. By merging modular robot fleets with our
                  proprietary AI-driven integration software, we unlock dormant
                  capacity in your existing footprint.{" "}
                </p>{" "}
                <div className="space-y-12">
                  {" "}
                  {[
                    [
                      "01",
                      "Space Utilization",
                      "Reduce warehouse footprint by up to 60% through high-density vertical storage integration.",
                    ],
                    [
                      "02",
                      "Accuracy & Speed",
                      "Eliminate manual bottlenecks with sub-millimeter precision in picking and material handling.",
                    ],
                  ].map(([num, title, copy]) => (
                    <div className="flex gap-10 group" key={num}>
                      {" "}
                      <div className="flex-shrink-0 w-20 h-20 border border-outline-variant flex items-center justify-center font-black text-3xl text-outline-variant group-hover:text-primary group-hover:border-primary transition-all duration-500">
                        {" "}
                        {num}{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <h4 className="font-black text-xl mb-4 tracking-tight">
                          {title}
                        </h4>{" "}
                        <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                          {" "}
                          {copy}{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="pt-32 pb-14 px-8 max-w-screen-2xl mx-auto bg-white">
          {" "}
          <div>
            {" "}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              {" "}
              <div className="max-w-xl">
                {" "}
                <span className="text-primary font-bold tracking-[0.3em] text-[11px] mb-4 block">
                  {" "}
                  Our Portfolio{" "}
                </span>{" "}
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                  {" "}
                  Delivered Precision{" "}
                </h2>{" "}
                <p className="text-on-surface-variant mt-8 font-medium">
                  {" "}
                  Global deployments across multiple high-demand industries
                  requiring 24/7 operational reliability.{" "}
                </p>{" "}
              </div>{" "}
              <button className="text-secondary font-black tracking-widest text-[12px] flex items-center gap-4 group hover:text-primary transition-colors">
                {" "}
                View All Case Studies{" "}
                <InlineIcon
                  className="h-5 w-5 text-primary transition-transform group-hover:translate-x-2"
                  name="arrow_forward"
                />{" "}
              </button>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {" "}
              {[
                {
                  alt: "ASRS System",
                  title: "ASRS Global Logistics Hub",
                  label: "Logistics Sector",
                  image: "/assets/images/home-card-1-home.jpg",
                  href: null,
                  imagePosition: "center center",
                },
                {
                  alt: "AGV Project",
                  title: "Smart Warehousing AGV",
                  label: "Manufacturing",
                  image: "/assets/images/home-card-2-home.jpg",
                  href: "/case-studies/material-handling",
                  imagePosition: "42% center",
                },
                {
                  alt: "Workshop Automation",
                  title: "Precision Intralogistics",
                  label: "Engineering",
                  image: "/assets/images/home-card-3-home.jpg",
                  href: "/solutions/material-handling",
                  imagePosition: "72% center",
                },
                {
                  alt: "Electronics Automation",
                  title: "High-Tech Assembly Robotics",
                  label: "Technology",
                  image: "/assets/images/home-card-4-home.jpg",
                  href: "/solutions/picking",
                  imagePosition: "center center",
                },
              ].map(({ alt, title, label, image, href, imagePosition }) =>
                href ? (
                  <a
                    className="group block cursor-pointer bg-white"
                    href={href}
                    key={title}
                  >
                    {" "}
                    <div className="aspect-square bg-surface overflow-hidden">
                      {" "}
                      <img
                        alt={alt}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-all duration-700"
                        loading="lazy"
                        style={{ objectPosition: imagePosition }}
                        src={image}
                      />{" "}
                    </div>{" "}
                    <div className="px-5 pt-6 pb-5 md:px-6">
                      <h4 className="mb-3 font-black text-lg leading-tight group-hover:text-primary transition-colors">
                        {" "}
                        {title}{" "}
                      </h4>{" "}
                      <p className="block text-[11px] text-primary tracking-[0.16em] font-black">
                        {label}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div
                    className="group cursor-pointer bg-white"
                    key={title}
                  >
                    {" "}
                    <div className="aspect-square bg-surface overflow-hidden">
                      {" "}
                      <img
                        alt={alt}
                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-all duration-700"
                        loading="lazy"
                        style={{ objectPosition: imagePosition }}
                        src={image}
                      />{" "}
                    </div>{" "}
                    <div className="px-5 pt-6 pb-5 md:px-6">
                      <h4 className="mb-3 font-black text-lg leading-tight group-hover:text-primary transition-colors">
                        {" "}
                        {title}{" "}
                      </h4>{" "}
                      <p className="block text-[11px] text-primary tracking-[0.16em] font-black">
                        {label}
                      </p>
                    </div>
                  </div>
                ),
              )}{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section
          className="pt-14 pb-28 px-8 max-w-screen-2xl mx-auto bg-white"
          style={{ marginTop: "20px" }}
        >
          {" "}
          <div className="mx-auto max-w-[1680px]">
            {" "}
            <div className="mb-16 text-center max-w-5xl mx-auto">
              {" "}
              <span className="hsa-ui-kicker justify-center">Live Automation</span>{" "}
              <h2 className="hsa-ui-title max-w-4xl mx-auto">
                {" "}
                Tailored Warehouse Automation In Motion{" "}
              </h2>{" "}
              <p className="hsa-ui-body max-w-3xl mx-auto">
                {" "}
                See how our AGV, ASRS, and material flow systems operate inside
                a real warehouse environment with synchronized transport, dense
                storage access, and continuous low-touch execution.{" "}
              </p>{" "}
            </div>{" "}
            <div className="overflow-hidden shadow-[0_28px_70px_rgba(0,23,54,0.08)]">
              {" "}
              <div className="aspect-video bg-transparent p-0">
                {" "}
                <LiteYouTubeEmbed
                  title="Warehouse automation solutions video"
                  videoId="0wC9z_BRhcs"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="pt-8 pb-24 px-8 max-w-screen-2xl mx-auto bg-white">
          {" "}
          <div className="mx-auto max-w-[1680px]">
            {" "}
            <div className="mb-16 text-center max-w-4xl mx-auto">
              {" "}
              <span className="hsa-ui-kicker justify-center">Industries We Serve</span>{" "}
              <h2 className="hsa-ui-title max-w-4xl mx-auto">
                {" "}
                Built for Complex Industrial Operations{" "}
              </h2>{" "}
              <p className="hsa-ui-body max-w-3xl mx-auto">
                {" "}
                Deep domain expertise across industries with demanding material
                handling requirements. Solutions designed around your
                operational constraints.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {" "}
              {HOME_INDUSTRIES.map((item) => (
                <div
                  className="hsa-ui-card hsa-ui-card--soft p-8"
                  key={item.title}
                >
                  {" "}
                  <InlineIcon className="mb-6 h-8 w-8 text-primary" name={item.icon} />
                  <h3 className="mb-4 text-[1.2rem] font-black leading-[1.15] tracking-tight text-secondary">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-[1rem] leading-[1.72] text-on-surface-variant">
                    {item.summary}
                  </p>
                  <ul className="space-y-2 text-[15px] leading-relaxed text-on-surface-variant">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>- {bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <WarehouseFlowSimulation />
        <section className="relative overflow-hidden border-y border-outline-variant bg-secondary">
          {" "}
          <div className="absolute inset-0">
            {" "}
            <img
              alt="Automated warehouse background"
              className="h-full w-full object-cover grayscale"
              src="/downloads/home-insights-asrs-home.jpg"
            />{" "}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,42,69,0.82),rgba(48,64,87,0.78))]" />{" "}
          </div>{" "}
          <div className="relative z-10 mx-auto max-w-screen-2xl px-8 py-32">
            {" "}
            <div className="mb-24 text-center max-w-3xl mx-auto">
              {" "}
              <span className="hsa-ui-kicker hsa-ui-kicker--light justify-center">
                {" "}
                Our Methodology{" "}
              </span>{" "}
              <h2 className="hsa-ui-title hsa-ui-title--light max-w-3xl mx-auto mb-8">
                {" "}
                The Path to Automation{" "}
              </h2>{" "}
              <div className="w-32 h-1 bg-primary mx-auto" />{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {" "}
              {[
                [
                  "01",
                  "Audit",
                  "In-depth audit of physical infrastructure and bottlenecks.",
                ],
                [
                  "02",
                  "Design",
                  "Custom engineering of hardware and software layers.",
                ],
                [
                  "03",
                  "Analysis",
                  "Detailed financial projection and ROI forecasting.",
                ],
                [
                  "04",
                  "Build",
                  "Precision manufacturing and software configuration phase.",
                ],
                [
                  "05",
                  "Deploy",
                  "Expert deployment with minimal operational disruption.",
                ],
                [
                  "06",
                  "Support",
                  "Staff certification and 24/7 global system monitoring.",
                ],
              ].map(([num, title, copy]) => (
                <div
                  className="hsa-ui-card hsa-ui-card--dark hsa-ui-card--interactive p-8 md:p-9 group"
                  key={num}
                >
                  {" "}
                  <span className="text-white font-black text-5xl block mb-7 group-hover:text-primary transition-colors">
                    {" "}
                    {num}{" "}
                  </span>{" "}
                  <h4 className="font-black mb-5 text-[13px] tracking-[0.16em] text-white">
                    {title}
                  </h4>{" "}
                  <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                    {" "}
                    {copy}{" "}
                  </p>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="relative pt-20 pb-[80px] px-8 max-w-screen-2xl mx-auto overflow-hidden bg-white">
          {" "}
          <div className="mx-auto max-w-[1680px]">
            {" "}
            <div className="mx-auto mb-8 max-w-5xl text-center">
              {" "}
              <span className="hsa-ui-kicker justify-center">Delivery Confidence</span>{" "}
              <h2 className="mx-auto max-w-4xl font-headline text-[54.6px] font-black leading-[0.94] tracking-[-0.05em] text-secondary">
                Proof points buyers look for before they request a quote.
              </h2>{" "}
              <p className="mx-auto mt-6 max-w-3xl text-[1.02rem] leading-[1.8] text-on-surface-variant">
                We pair delivery metrics, documentation, and implementation
                discipline so operations teams can evaluate coolyne as a
                long-cycle automation partner, not just an equipment vendor.
              </p>
            </div>{" "}
              <div className="relative overflow-hidden">
              <div className="hsa-trust-marquee">
                <div className="hsa-trust-marquee-track">
                  {[0, 1].map((groupIndex) => (
                    <div
                      aria-hidden={groupIndex === 1}
                      className="hsa-trust-marquee-group"
                      key={groupIndex}
                    >
                      {HOME_TRUST_SHOWCASE.map((item) => (
                        <div
                          className={`group relative shrink-0 h-[536px] w-[360px] overflow-hidden rounded-[30px] border border-outline-variant/14 shadow-[0_28px_60px_rgba(0,23,54,0.08)] transition-transform duration-500 ${
                            item.stage === "hero-proof"
                              ? "bg-[linear-gradient(180deg,#8fc0de_0%,#c9d5df_55%,#eceff3_100%)]"
                              : item.stage === "feature-proof" || item.stage === "edge-proof"
                                ? "bg-white"
                                : item.stage === "wide-metric"
                                  ? "bg-[linear-gradient(180deg,#f4f8fc_0%,#edf3f8_100%)]"
                                  : "bg-[linear-gradient(180deg,#f7fafc_0%,#eef3f8_100%)]"
                          }`}
                          key={`${groupIndex}-${item.id}`}
                        >
                          <div className="flex h-full flex-col">
                            <div
                              className={`relative flex h-[304px] shrink-0 items-center justify-center overflow-hidden ${
                                item.stage === "hero-proof"
                                  ? "px-7 pt-7"
                                  : "px-7 pt-7"
                              }`}
                            >
                              <img
                                alt={item.title || item.label}
                                className="relative z-10 h-[224px] w-[224px] object-contain"
                                loading="lazy"
                                src={item.image}
                              />
                            </div>
                            <div
                              className={`mt-auto flex-1 border-t border-outline-variant/10 bg-white/92 ${
                                item.stage === "hero-proof" ? "p-7 md:p-8" : "p-6 md:p-7"
                              }`}
                            >
                              {item.kind === "metric" ? (
                                <>
                                  <CountUpValue
                                    as="div"
                                    className={`font-black leading-none tracking-[-0.05em] ${
                                      item.stage === "wide-metric"
                                        ? "text-[4rem] text-secondary"
                                        : "text-[3.8rem] text-secondary"
                                    }`}
                                    value={item.value}
                                  />
                                  <p className="mt-6 max-w-[28ch] text-sm leading-[1.76] text-on-surface-variant">
                                    {item.copy}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <h3
                                    className={`font-black leading-[1.04] tracking-[-0.04em] text-secondary ${
                                      item.stage === "hero-proof" ? "max-w-[12ch] text-[2rem]" : "max-w-[12ch] text-[1.72rem]"
                                    }`}
                                  >
                                    {item.title}
                                  </h3>
                                  <p className="mt-4 max-w-[26ch] text-sm leading-[1.74] text-on-surface-variant">
                                    {item.copy}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="pt-0 pb-32 px-8 max-w-screen-2xl mx-auto bg-white">
          {" "}
          <div>
            {" "}
            <div className="bg-secondary flex flex-col lg:flex-row shadow-[40px_40px_0px_0px_rgba(254,107,0,0.1)]">
              {" "}
              <div className="lg:w-2/5 p-12 md:p-20 text-white relative overflow-hidden">
                {" "}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 -mr-32 -mt-32 rounded-full" />{" "}
                <h2 className="hsa-ui-title hsa-ui-title--light mb-10">
                  {" "}
                  Consult with an expert{" "}
                </h2>{" "}
                <div className="flex items-center gap-6 mb-16">
                  {" "}
                  <div className="w-24 h-24 border-2 border-primary p-1">
                    {" "}
                      <img
                        alt="Hunter, Automation Specialist"
                        className="w-full h-full object-cover grayscale"
                        loading="lazy"
                        src="/downloads/ground-handling-forklift-agv-scene-home.webp"
                      />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="font-black text-2xl leading-none tracking-tighter">
                      Hunter
                    </p>{" "}
                    <p className="text-primary text-[11px] font-black tracking-[0.16em] mt-3">
                      {" "}
                      Principal Engineer{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <ul className="space-y-8 text-sm font-medium">
                  {" "}
                  {[
                    "Comprehensive Feasibility Study",
                    "Scale and Timeline Mapping",
                    "Free ROI & Efficiency Analysis",
                  ].map((item) => (
                    <li className="flex items-center gap-5 group" key={item}>
                      {" "}
                      <InlineIcon
                        className="h-6 w-6 text-primary"
                        name="arrow_right_alt"
                      />{" "}
                      <span className="group-hover:translate-x-2 transition-transform tracking-[0.16em] text-[11px]">
                        {" "}
                        {item}{" "}
                      </span>{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
              </div>{" "}
              <div className="lg:w-3/5 bg-white p-12 md:p-20">
                {" "}
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
                  data-form-label="Homepage Consultation Form"
                  data-form-type="consultation"
                  data-hsa-form=""
                  data-success-redirect="/thanks/"
                  data-success-message="Thanks, your consultation request has been emailed to our team."
                >
                  {" "}
                  {[
                    ["name", "fullName", "Name", "Full Name", "text", false],
                    ["email", "email", "Email", "Work Email", "email", true],
                    ["phone", "phone", "Phone", "Phone Number", "tel", false],
                    [
                      "org",
                      "company",
                      "Organization",
                      "Organization",
                      "text",
                      false,
                    ],
                  ].map(([id, name, placeholder, label, type, required]) => (
                    <div className="relative group" key={id}>
                      {" "}
                      <input
                        className="peer w-full border-0 border-b-2 border-outline-variant px-0 py-4 text-[16px] font-bold text-secondary placeholder-transparent transition-all focus:border-primary focus:ring-0"
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        type={type}
                      />{" "}
                      <label
                        className="absolute left-0 -top-5 text-[12px] font-black tracking-[0.14em] text-primary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-outline peer-focus:-top-5 peer-focus:text-[12px] peer-focus:text-primary"
                        htmlFor={id}
                      >
                        {" "}
                        {label}{" "}
                      </label>{" "}
                    </div>
                  ))}{" "}
                  <div className="md:col-span-2 relative group">
                    {" "}
                    <textarea
                      className="peer min-h-[120px] w-full resize-none border-0 border-b-2 border-outline-variant px-0 py-4 text-[16px] font-bold text-secondary placeholder-transparent transition-all focus:border-primary focus:ring-0"
                      id="message"
                      name="message"
                      placeholder="Message"
                      required
                    />{" "}
                    <label
                      className="absolute left-0 -top-5 text-[12px] font-black tracking-[0.14em] text-primary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-outline peer-focus:-top-5 peer-focus:text-[12px] peer-focus:text-primary"
                      htmlFor="message"
                    >
                      {" "}
                      Project Requirements{" "}
                    </label>{" "}
                  </div>{" "}
                  <div className="md:col-span-2">
                    {" "}
                    <button
                      className="w-full bg-secondary py-6 text-[14px] font-black uppercase tracking-[0.22em] text-white shadow-xl transition-all hover:bg-primary"
                      type="submit"
                    >
                      {" "}
                      Submit Request{" "}
                    </button>{" "}
                  </div>{" "}
                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="pb-22 px-8 max-w-screen-2xl mx-auto bg-white">
          {" "}
          <div className="mx-auto max-w-[1680px]">
            {" "}
            <div className="mb-12 text-center max-w-4xl mx-auto">
              {" "}
              {" "}
              <span className="hsa-ui-kicker justify-center">Partner Brands</span>{" "}
              <h2 className="hsa-ui-title max-w-4xl mx-auto">
                {" "}
                Trusted Across Manufacturing and Smart Logistics{" "}
              </h2>{" "}
              <p className="hsa-ui-body max-w-3xl mx-auto">
                {" "}
                We collaborate with industrial leaders across electronics,
                mobility, infrastructure, communications, and advanced
                manufacturing to engineer automation that performs reliably at
                scale.{" "}
              </p>{" "}
            </div>{" "}
            <div className="hsa-brand-marquee">
              {" "}
              <div
                className="hsa-brand-marquee-track"
                data-hsa-brand-marquee-track=""
              >
                {" "}
                {[0, 1].map((loop) => (
                  <div
                    aria-hidden={loop === 1 ? "true" : undefined}
                    className="hsa-brand-marquee-group"
                    key={`brand-loop-${loop}`}
                  >
                    {" "}
                    {HOME_PARTNER_BRANDS_SAFE.map((brand) => (
                      <div
                        className="group flex min-h-[152px] min-w-[260px] flex-shrink-0 items-center justify-center bg-white px-2 py-2 shadow-[0_24px_56px_rgba(0,23,54,0.12)]"
                        key={`${brand.name}-${loop}`}
                      >
                        {" "}
                        <img
                          alt={brand.name}
                          className="max-h-[120px] w-auto max-w-[94%] object-contain transition-transform duration-300 group-hover:scale-[1.12]"
                          src={brand.src}
                        />{" "}
                      </div>
                    ))}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>
          </div>{" "}
        </section>{" "}
      </div>{" "}
    </>
  );
}
function AboutBody() {
  const milestones = [
    {
      year: "2004",
      label: "Company foundation",
      title: "Founded in Shenzhen, China.",
      detail:
        "Huizong established its engineering base in Shenzhen and set the operating foundation for long-cycle automation delivery.",
    },
    {
      year: "2005",
      label: "First robotics product",
      title: "Introduced its first robotic arm product.",
      detail:
        "The team moved beyond equipment manufacturing into applied robotics products shaped by real industrial use cases.",
    },
    {
      year: "2013",
      label: "Warehouse automation",
      title:
        "Began delivering warehouse automation and intralogistics solutions for manufacturers.",
      detail:
        "Huizong expanded into integrated material-flow programs spanning automation hardware, layout logic, and execution planning.",
    },
    {
      year: "2016",
      label: "National high-tech recognition",
      title: "Earned China's National High Tech Enterprise certification.",
      detail:
        "The certification reflected stronger R&D capability and a more mature technical position in industrial automation.",
    },
    {
      year: "2020",
      label: "Pandemic-response production",
      title:
        "Launched an automated mask production system that earned widespread recognition and was featured by CCTV.",
      detail:
        "During COVID-19, Huizong converted engineering capability into a high-urgency production system with visible public impact.",
    },
    {
      year: "2022",
      label: "Specialized enterprise",
      title: "Recognized as a Specialized and Advanced Enterprise.",
      detail:
        "This milestone marked a stronger delivery reputation in focused, technically demanding automation programs.",
    },
    {
      year: "2026",
      label: "Global delivery scale",
      title:
        "Delivered AGV integration services for more than 100 manufacturers across 20 countries.",
      detail:
        "The same engineering model had scaled across broader warehouse automation and internal logistics deployments worldwide.",
    },
  ];
  const softwareCopyrights = [
    "2014SR151519",
    "2015SR102648",
    "2015SR223827",
    "2015SR226255",
    "2017SR593068",
    "2017SR603490",
    "2017SR610094",
    "2018SR505735",
    "2018SR507028",
    "2018SR509257",
    "2018SR505719",
    "2018SR926948",
    "2019SR0499375",
    "2019SR0499596",
    "2019SR0169832",
    "2019SR0505068",
    "2019SR0285119",
    "2020SR0145071",
    "2020SR0292154",
    "2021SR0547459",
    "2021SR0547460",
    "2021SR0551353",
    "2021SR0556482",
    "2021SR0551530",
    "2021SR0551531",
    "2021SR0455525",
    "2025SR0600763",
    "2025SR0600778",
    "2025SR0601545",
    "2025SR1000425",
  ];
  const patentNumbers = [
    "ZL 2014 2 0461476.0",
    "ZL 2014 2 0483776.9",
    "ZL 2018 2 1357671.3",
    "ZL 2018 2 1399169.9",
    "ZL 2019 2 2314506.0",
    "ZL 2020 2 2544190.7",
    "ZL 2021 2 1417005.6",
    "ZL 2021 2 1383298.0",
    "ZL 2021 2 1382925.9",
    "ZL 2021 2 1382903.2",
    "ZL 2021 2 1417003.7",
    "ZL 2021 2 1421260.8",
    "ZL 2023 2 1768725.6",
    "ZL 2023 2 1869043.4",
    "ZL 2023 2 1909733.8",
    "ZL 2023 2 1923869.4",
    "ZL 2024 2 0852738.X",
    "ZL 2024 2 1146082.6",
    "ZL 2024 2 0938530.X",
    "ZL 2021 1 1556445.4",
  ];
  const trustCards = [
    ["local_shipping", "80+", "Markets"],
    ["workspace_premium", "100+", "Patents"],
    ["construction", "500+", "Company Staff"],
  ];
  const contactCards = [
    [
      "phone_in_talk",
      "Inquiry Hotline",
      "+86 13510816743",
      "tel:8613510816743",
      "Mon-Fri 09:00-17:00",
    ],
    [
      "chat",
      "WhatsApp",
      "+86 13510816743",
      "https://wa.me/8613510816743?text=Hello%20there!",
      "24-hour monitored business line",
    ],
    [
      "mail",
      "Email",
      "sales@robotlyne.com",
      "mailto:sales@robotlyne.com",
      "Typical response within 12 hours",
    ],
    [
      "location_on",
      "Address",
      "Yongtai East Road 3-13, Building 5, Bao'an District, Shenzhen, Guangdong 518103, China",
      "https://www.google.com/maps/place/%E4%B8%AD%E5%9B%BD%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82%E5%AE%9D%E5%AE%89%E5%8C%BA%E6%B0%B8%E6%B3%B0%E4%B8%9C%E8%B7%AF3-13%E5%8F%B75+3+%E9%82%AE%E6%94%BF%E7%BC%96%E7%A0%81:+518103/@22.6709809,113.8313066,17z/data=!4m5!3m4!1s0x340394c1247175a1:0x43cbc8fb8771e037!8m2!3d22.67058!4d113.83121?entry=ttu",
      "Shenzhen operations and engineering base",
    ],
  ];
  const strengths = [
    {
      title: "Embodied intelligence R&D",
      copy:
        "Engineering teams combine robot control, motion planning, and site-specific adaptation to fit actual production constraints.",
    },
    {
      title: "Multi-brand fleet compatibility",
      copy:
        "Huizong connects AGVs, composite robots, and surrounding devices into one coordinated intralogistics workflow.",
    },
    {
      title: "Simulation before deployment",
      copy:
        "Intralogistics simulation and 3D digital-twin modeling reduce commissioning risk and sharpen layout decisions early.",
    },
    {
      title: "Lifecycle delivery support",
      copy:
        "Customized development, integration, rollout, and after-sales response stay within one operating team.",
    },
  ];
  return (
    <div className="page-content bg-white">
      <main className="overflow-hidden bg-white">
        <section className="relative isolate overflow-hidden bg-primary text-white lg:min-h-[54rem] xl:min-h-[58rem]">
          <div className="absolute inset-0">
            <img
              alt="Huizong intelligent mobile robotics deployment"
              className="h-full w-full object-cover object-center"
              src="/downloads/about/robotlyne/about-photo-hero.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,23,54,0.84)_8%,rgba(0,23,54,0.52)_42%,rgba(0,23,54,0.86)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(254,107,0,0.24),transparent_18%),radial-gradient(circle_at_18%_82%,rgba(0,0,0,0.28),transparent_34%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-80 pt-16 md:px-12 md:pb-72 md:pt-20 lg:px-16 lg:pb-[28rem] lg:pt-20 xl:pb-[31rem] xl:pt-20">
            <div className="grid gap-10 lg:-translate-y-[10px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start xl:gap-14">
              <div className="order-2 lg:order-1">
                  <div className="relative mx-auto max-w-[27rem] lg:mx-0 lg:max-w-[29rem] xl:max-w-[31rem]">
                    <div className="overflow-hidden rounded-[2.5rem] border border-white/14 bg-white/8 shadow-[0_36px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                    <img
                      alt="Industrial robotics and AGV systems"
                      className="aspect-[5/4.55] w-full object-cover object-center"
                      src="/downloads/about/robotlyne/hero-industrial.webp"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 max-w-[48rem] lg:order-2 lg:justify-self-end lg:pr-3">
                <span className="inline-flex items-center gap-3 pl-px text-[11px] font-black uppercase leading-none tracking-[0.3em] text-secondary-fixed-dim">
                  <span className="h-px w-10 bg-secondary-fixed-dim/80" />
                  About Huizong
                </span>
                <h1 className="mt-4 max-w-[14.5ch] font-headline text-4xl font-black leading-[0.92] tracking-tight text-white md:max-w-[13.5ch] md:text-[3.85rem] lg:max-w-[15.5ch] lg:text-[3.25rem] xl:text-[3.55rem]">
                  Intelligent mobile robotics for real industrial flow.
                </h1>
                <p className="mt-4 max-w-[46rem] text-[0.98rem] leading-7 text-primary-fixed-dim md:text-base">
                  Huizong Intelligent Equipment Co., Ltd. delivers AGVs,
                  composite robots, unmanned vehicles, and warehouse automation
                  systems for industrial customers that need reliability in the
                  real world, not just on paper.
                </p>
                <p className="mt-3 hidden max-w-[46rem] text-[0.98rem] leading-7 text-primary-fixed-dim md:block md:text-base">
                  With embodied-intelligence R&amp;D, customized development,
                  after-sales service, multi-brand robot scheduling,
                  intralogistics simulation, workflow orchestration, and 3D
                  digital-twin deployment, the company builds full delivery
                  systems instead of isolated hardware.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center rounded-[0.9rem] bg-[linear-gradient(135deg,#ff8d3a,#fe6b00)] px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-[0_18px_36px_rgba(254,107,0,0.22)] transition-all hover:-translate-y-[1px] hover:shadow-[0_22px_42px_rgba(254,107,0,0.28)]"
                    href="#about-contact"
                  >
                    Talk To Our Experts
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-[0.9rem] border border-white/24 bg-white/10 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/16"
                    href="#about-trust"
                  >
                    View Proof Assets
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-[145%] -translate-x-1/2 translate-y-[62%] rounded-[100%] bg-white md:h-24 lg:h-28" />
        </section>

        <section className="px-6 pb-24 pt-20 md:px-12 md:pt-24 lg:px-16 lg:pb-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.92fr)] lg:items-center">
              <div className="max-w-3xl">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary">
                  Global company profile
                </span>
                <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end">
                  <span
                    className="block bg-cover bg-center bg-clip-text font-headline text-[5.5rem] font-black leading-none text-transparent md:text-[7rem] lg:text-[9rem]"
                    style={{
                      backgroundImage:
                        "url('/downloads/about/robotlyne/about-photo-2.webp')",
                    }}
                  >
                    80+
                  </span>
                  <div className="max-w-xl pb-2">
                    <div className="text-[11px] font-black uppercase tracking-[0.24em] text-secondary">
                      Markets reached
                    </div>
                    <h2 className="mt-3 font-headline text-3xl font-black tracking-tight text-primary md:text-5xl">
                      One delivery model shaped for industrial reality.
                    </h2>
                  </div>
                </div>
                <p className="mt-7 max-w-[42rem] text-base leading-8 text-on-surface-variant">
                  Founded in Shenzhen in 2004, Huizong has grown from robotics
                  equipment manufacturing into a broader automation delivery
                  partner serving warehouse and factory projects across more
                  than 80 markets.
                </p>
                <p className="mt-5 max-w-[42rem] text-base leading-8 text-on-surface-variant">
                  The company combines hardware, scheduling software,
                  simulation, and customized engineering so customers can move
                  from planning to deployment without fragmenting ownership
                  across multiple vendors.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {trustCards.map(([icon, value, label]) => (
                    <article
                      className="rounded-[1.5rem] border border-outline-variant/20 bg-[#fbf8f4] px-5 py-6"
                      key={`${label}-overview`}
                    >
                      <InlineIcon className="h-6 w-6 text-secondary" name={icon} />
                      <CountUpValue
                        as="div"
                        className="mt-4 font-headline text-3xl font-black tracking-tight text-primary"
                        value={value}
                      />
                      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                        {label}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-8 h-[80%] w-[72%] rounded-[3rem] bg-[#fff0e4] md:-left-8" />
                <div className="relative overflow-hidden rounded-[2.75rem_1.4rem_7rem_1.4rem] bg-white p-4 shadow-[0_28px_90px_rgba(17,40,94,0.12)]">
                  <img
                    alt="Huizong Shenzhen operations base"
                    className="aspect-[4/5] w-full rounded-[2.3rem_1rem_6rem_1rem] object-cover object-center"
                    src="/downloads/about/about-building-banner.webp"
                  />
                </div>
                <article className="absolute bottom-6 left-0 max-w-[18rem] rounded-[1.6rem] bg-white p-6 shadow-[0_22px_60px_rgba(17,40,94,0.16)] md:-left-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                    Shenzhen base
                  </div>
                  <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                    Engineering, customization, and project response stay close
                    to one operations hub with global B2B delivery experience.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f8f6f2] px-6 py-24 md:px-12 lg:px-16 lg:py-28">
          <div className="absolute top-0 left-1/2 h-28 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-white" />
          <div className="relative mx-auto max-w-[1380px]">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-start">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary">
                  Our strengths
                </span>
                <h2 className="mt-4 max-w-[13ch] font-headline text-3xl font-black tracking-tight text-primary md:text-5xl">
                  Hardware, software, and delivery discipline in one team.
                </h2>
                <div className="mt-10 grid gap-4 sm:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
                  <img
                    alt="Huizong company building"
                    className="aspect-[1.02/1] w-full rounded-[1.8rem] object-cover object-center shadow-[0_18px_44px_rgba(17,40,94,0.12)] sm:row-span-2 sm:h-full"
                    loading="lazy"
                    src="/downloads/about/robotlyne/about-photo-1.webp"
                  />
                  <img
                    alt="Huizong office lobby"
                    className="aspect-[1/1] w-full rounded-[1.6rem] object-cover object-center shadow-[0_18px_44px_rgba(17,40,94,0.12)]"
                    loading="lazy"
                    src="/downloads/about/robotlyne/about-photo-2.webp"
                  />
                  <img
                    alt="Huizong engineering operations"
                    className="aspect-[1/0.88] w-full rounded-[1.6rem] object-cover object-center shadow-[0_18px_44px_rgba(17,40,94,0.12)]"
                    loading="lazy"
                    src="/downloads/about/robotlyne/about-photo-3.webp"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-2">
                {strengths.map((item, index) => (
                  <article
                    className="rounded-[1.75rem] bg-white px-7 py-7 shadow-[0_20px_52px_rgba(17,40,94,0.08)]"
                    key={item.title}
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-tight text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                          {item.copy}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0">
            <img
              alt="Huizong milestones background"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              src="/downloads/about/robotlyne/hero-industrial.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,15,38,0.78),rgba(0,18,45,0.93))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(254,107,0,0.18),transparent_28%)]" />
          </div>
          <div className="relative mx-auto max-w-[1380px] px-6 py-24 md:px-12 lg:px-16 lg:py-28">
            <div className="max-w-5xl">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary-fixed-dim">
                Milestones
              </span>
              <h2 className="mt-4 max-w-[19ch] font-headline text-3xl font-black tracking-tight md:text-5xl xl:max-w-[21ch]">
                Development history from Shenzhen foundation to global delivery.
              </h2>
            </div>

            <AboutMilestonesTimeline milestones={milestones} />
          </div>
        </section>

        <section className="px-6 py-24 md:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
              <div className="max-w-2xl">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary">
                  Customization services
                </span>
                <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-primary md:text-5xl">
                  Customized development built around site conditions.
                </h2>
                <p className="mt-6 text-base leading-8 text-on-surface-variant">
                  Huizong adapts hardware platforms, control logic, and process
                  orchestration for customers that need more than an off-the-
                  shelf robot. That work spans planning, simulation, integration,
                  and deployment support.
                </p>
                <p className="mt-5 text-base leading-8 text-on-surface-variant">
                  Patent records, proprietary software, and long-cycle delivery
                  experience help the team turn custom requirements into systems
                  that are easier to commission and easier to run.
                </p>
                <a
                  className="mt-9 inline-flex items-center justify-center rounded-[0.9rem] bg-[linear-gradient(135deg,#ff8d3a,#fe6b00)] px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_18px_36px_rgba(254,107,0,0.16)] transition-all hover:-translate-y-[1px] hover:shadow-[0_22px_42px_rgba(254,107,0,0.24)]"
                  href="#about-contact"
                >
                  Start A Project Conversation
                </a>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#faf5ef] px-7 py-10 md:px-12 md:py-12">
                <div className="absolute right-0 top-0 h-full w-[55%] bg-[radial-gradient(circle_at_top,rgba(254,107,0,0.15),transparent_54%)]" />
                <div className="relative">
                  <div className="text-right">
                    <CountUpValue
                      as="div"
                      className="font-headline text-[5rem] font-black leading-none tracking-tight text-primary md:text-[7.5rem]"
                      value="100+"
                    />
                    <div className="mt-2 text-[11px] font-black uppercase tracking-[0.28em] text-secondary">
                      Patents
                    </div>
                  </div>
                  <p className="mt-8 max-w-2xl text-sm leading-7 text-on-surface-variant">
                    Backed by 30 software copyrights and a growing patent
                    portfolio, Huizong turns operational knowledge into
                    repeatable technical systems.
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-2" id="about-trust">
                    <article className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_20px_52px_rgba(17,40,94,0.08)]">
                      <div className="flex h-[18.5rem] items-center justify-center bg-[#f8f6f2] p-4">
                        <img
                          alt="Software copyrights collage"
                          className="h-full w-full object-contain object-center"
                          loading="lazy"
                          src="/downloads/about/robotlyne/software-copyrights.webp"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                          Software copyrights
                        </div>
                        <div className="mt-3 text-lg font-black tracking-tight text-primary">
                          30 proprietary registrations
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {softwareCopyrights.slice(0, 8).map((number) => (
                            <span
                              className="rounded-full border border-outline-variant/20 bg-[#fffaf5] px-3 py-2 text-[10px] font-bold tracking-[0.08em] text-on-surface-variant"
                              key={number}
                            >
                              {number}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                    <article className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_20px_52px_rgba(17,40,94,0.08)]">
                      <div className="flex h-[18.5rem] items-center justify-center bg-[#f8f6f2] p-4">
                        <img
                          alt="Product patents collage"
                          className="h-full w-full object-contain object-center"
                          loading="lazy"
                          src="/downloads/about/robotlyne/product-patents.webp"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                          Patent records
                        </div>
                        <div className="mt-3 text-lg font-black tracking-tight text-primary">
                          20+ disclosed patent numbers
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {patentNumbers.slice(0, 6).map((number) => (
                            <span
                              className="rounded-full border border-outline-variant/20 bg-[#fffaf5] px-3 py-2 text-[10px] font-bold tracking-[0.08em] text-on-surface-variant"
                              key={number}
                            >
                              {number}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-24 lg:py-28">
          <div className="absolute inset-0">
            <img
              alt="Huizong business partners background"
              className="h-full w-full object-cover object-center opacity-[0.22]"
              loading="lazy"
              src="/downloads/about/robotlyne/hero-industrial.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,23,54,0.88),rgba(0,23,54,0.94))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(254,107,0,0.10),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.04),transparent_22%)]" />
          </div>
          <div className="relative mx-auto max-w-[1380px] px-6 md:px-12 lg:px-16">
            <div className="max-w-2xl">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary-fixed-dim">
                Business partners
              </span>
              <h2 className="mt-4 font-headline text-3xl font-black tracking-tight text-white md:text-5xl">
                Trusted by operators building serious industrial capacity.
              </h2>
            </div>
          </div>
          <div className="relative mt-12 w-full overflow-hidden rounded-[2.1rem] border-y border-white/10 bg-[rgba(6,29,66,0.36)] py-6 shadow-[0_20px_52px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[rgba(6,29,66,0.92)] md:w-12" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[rgba(6,29,66,0.92)] md:w-12" />
            <div className="about-brand-marquee">
              <div className="about-brand-marquee-track">
                {[0, 1].map((loop) => (
                  <div
                    aria-hidden={loop === 1}
                    className="about-brand-marquee-group"
                    key={`about-brand-loop-${loop}`}
                  >
                    {HOME_PARTNER_BRANDS_SAFE.map((brand) => (
                      <div
                        className="flex min-h-[142px] min-w-[252px] items-center justify-center rounded-[1.7rem] border border-outline-variant/16 bg-white px-3 py-4 shadow-[0_16px_40px_rgba(17,40,94,0.08)]"
                        key={`${brand.name}-${loop}`}
                      >
                        <img
                          alt={brand.name}
                          className="h-[104px] w-[196px] max-w-full object-contain"
                          loading="lazy"
                          src={brand.src}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-white px-6 py-24 md:px-12 lg:px-16 lg:py-28"
          id="about-contact"
        >
          <div className="absolute top-0 left-1/2 h-28 w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-white" />
          <div className="relative mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
            <div className="space-y-8">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary">
                  Contact Huizong
                </span>
                <h2 className="mt-4 max-w-[12ch] font-headline text-3xl font-black tracking-tight text-primary md:text-5xl">
                  Start the next automation conversation.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-on-surface-variant">
                  Share your throughput goals, facility constraints, or target
                  deployment schedule and we will route the brief to the right
                  engineering and delivery team.
                </p>
              </div>

              <div className="grid gap-4">
                {contactCards.map(([icon, title, value, href, copy]) => {
                  const isExternal = href.startsWith("http");
                  return (
                    <a
                      className="group flex items-start gap-4 rounded-[1.6rem] border border-outline-variant/18 bg-[#fbf8f4] p-5 transition-colors hover:border-secondary hover:bg-[#fff6ee]"
                      href={href}
                      key={title}
                      rel={isExternal ? "noreferrer" : undefined}
                      target={isExternal ? "_blank" : undefined}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container/12 text-secondary">
                        <InlineIcon className="h-6 w-6" name={icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
                          {title}
                        </span>
                        <span className="mt-2 block text-base font-black leading-6 text-primary">
                          {value}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-on-surface-variant">
                          {copy}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="rounded-[1.8rem] border border-outline-variant/18 bg-[#fbf8f4] p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                      WeChat support
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-7 text-on-surface-variant">
                      Connect with the sales and project coordination team
                      directly through WeChat support.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="inline-flex min-w-[11.5rem] items-center justify-center gap-2 rounded-[0.9rem] border border-outline-variant/24 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] text-primary transition-colors hover:border-secondary hover:bg-[#fff7ef]"
                      data-hsa-open-sales-modal=""
                      type="button"
                    >
                      <InlineIcon className="h-5 w-5 text-secondary" name="chat" />
                      WeChat QR
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-outline-variant/18 bg-white p-8 text-on-surface shadow-[0_20px_54px_rgba(17,40,94,0.08)] md:p-10">
              <div className="max-w-2xl">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary">
                  Send a project brief
                </div>
                <h3 className="mt-4 font-headline text-3xl font-black tracking-tight text-primary">
                  Message Us
                </h3>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                  Share your throughput goals, target output, or integration
                  constraints and our team will reply with the right next step.
                </p>
              </div>

              <form
                className="mt-8 space-y-6"
                data-form-label="About Page Message Us"
                data-form-type="consultation"
                data-hsa-form=""
                data-success-message="Thanks, your message has been emailed to our team."
                data-success-redirect="/thanks/"
                noValidate
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-outline">
                      Full Name
                    </span>
                    <input
                      className="w-full rounded-[1rem] border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-secondary"
                      name="fullName"
                      placeholder="Your name"
                      type="text"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-outline">
                      Company
                    </span>
                    <input
                      className="w-full rounded-[1rem] border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-secondary"
                      name="company"
                      placeholder="Company name"
                      type="text"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-outline">
                      Email
                    </span>
                    <input
                      className="w-full rounded-[1rem] border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-secondary"
                      name="email"
                      placeholder="name@company.com"
                      required
                      type="email"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-outline">
                      Phone / WhatsApp
                    </span>
                    <input
                      className="w-full rounded-[1rem] border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-secondary"
                      name="phone"
                      placeholder="+86 135 1081 6743"
                      type="tel"
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-outline">
                    Message
                  </span>
                  <textarea
                    className="min-h-[180px] w-full resize-y rounded-[1rem] border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface outline-none transition-colors focus:border-secondary"
                    name="message"
                    placeholder="Tell us about your automation project, throughput goals, and facility constraints."
                    required
                  />
                </label>

                <label className="flex items-start gap-3 text-sm leading-6 text-on-surface-variant">
                  <input
                    className="mt-1 h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary"
                    name="marketingConsent"
                    type="checkbox"
                    value="Yes"
                  />
                  <span>
                    I agree to receive follow-up communication related to my
                    automation inquiry.
                  </span>
                </label>

                <button
                  className="inline-flex items-center justify-center rounded-[0.9rem] bg-[#a64900] px-8 py-4 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_16px_30px_rgba(166,73,0,0.18)] transition-all hover:-translate-y-[1px] hover:bg-[#8f3f00] hover:shadow-[0_20px_38px_rgba(166,73,0,0.24)]"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactBody() {
  return (
    <>
      {" "}
      <div className="page-content">
        {" "}
        <main>
          {" "}
          <section className="relative min-h-[480px] flex items-center overflow-hidden">
            {" "}
            <div className="absolute inset-0 z-0">
              {" "}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />{" "}
              <img
                alt="High-precision robotic arm"
                className="w-full h-full object-cover"
                src="/downloads/jianxuan.png"
              />{" "}
            </div>{" "}
            <div className="relative z-20 max-w-7xl mx-auto px-8 py-20 w-full">
              {" "}
              <div className="max-w-3xl">
                {" "}
                <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-black tracking-[0.25em] mb-6">
                  {" "}
                  Consult an Expert{" "}
                </span>{" "}
                <h1 className="font-headline text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8 ">
                  {" "}
                  Architect Your <br /> Efficiency{" "}
                </h1>{" "}
                <p className="text-[#d7e5f8] text-xl md:text-2xl font-light leading-relaxed max-w-xl border-l-2 border-secondary pl-6 drop-shadow-[0_10px_24px_rgba(0,15,40,0.28)]">
                  {" "}
                  Connect with our engineering specialists to assess project
                  feasibility and optimize your automation roadmap.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="max-w-[1440px] mx-auto px-8 py-24">
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {" "}
              <div className="lg:col-span-5 space-y-12">
                {" "}
                <div>
                  {" "}
                  <h2 className="font-headline text-4xl font-black text-primary mb-4 tracking-tight">
                    {" "}
                    Direct Access{" "}
                  </h2>{" "}
                  <div className="h-1.5 w-16 bg-secondary" />{" "}
                </div>{" "}
                <div className="grid grid-cols-1 gap-4">
                  {" "}
                  {[
                    [
                      "phone_in_talk",
                      "bg-primary group-hover:bg-secondary",
                      "Inquiry Hotline",
                      "+86 13510816743",
                      "Global Support 闁?Mon-Fri 09:00-17:00",
                    ],
                    [
                      "chat",
                      "bg-secondary",
                      "Instant Messaging",
                      "+86 13510816743",
                      "WhatsApp Business 闁?24H Monitoring",
                    ],
                    [
                      "mail",
                      "bg-primary-container",
                      "Email Correspondence",
                        "sales@robotlyne.com",
                      "Estimated Response: < 12 Hours",
                    ],
                    [
                      "location_on",
                      "bg-tertiary",
                      "Global Headquarters",
                      "Kinetic Precision Industrial Park",
                      "Bao'an District 闁?Shenzhen 闁?GD China",
                    ],
                  ].map(([icon, bg, title, value, caption]) => (
                    <div
                      className="group flex items-center gap-6 p-8 bg-surface-container-low border border-outline-variant/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                      key={title}
                    >
                      {" "}
                      <div
                        className={`w-14 h-14 ${bg} flex items-center justify-center shrink-0`}
                      >
                        {" "}
                        <InlineIcon className="h-6 w-6 text-white" name={icon} />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <h3 className="text-[10px] font-black text-outline tracking-[0.2em] mb-1">
                          {title}
                        </h3>{" "}
                        <p
                          className={`font-black text-primary tracking-tight ${title === "Global Headquarters" ? "text-lg leading-tight " : title === "Email Correspondence" ? "text-2xl lowercase" : "text-2xl"}`}
                        >
                          {" "}
                          {value}{" "}
                        </p>{" "}
                        <p className="text-[11px] text-outline-variant font-bold mt-1 ">
                          {caption}
                        </p>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <div className="lg:col-span-7">
                {" "}
                <div className="bg-white p-10 md:p-14 border border-outline-variant/40 shadow-2xl shadow-primary/5">
                  {" "}
                  <div className="mb-12">
                    {" "}
                    <h2 className="font-headline text-3xl font-black text-primary mb-3 tracking-tight">
                      {" "}
                      Project Briefing{" "}
                    </h2>{" "}
                    <p className="text-on-surface-variant font-medium max-w-lg">
                      {" "}
                      Submit your project parameters for a professional ROI
                      assessment and preliminary engineering scope.{" "}
                    </p>{" "}
                  </div>{" "}
                  <form
                    className="space-y-8"
                    data-form-label="Contact Page Project Briefing"
                    data-form-type="consultation"
                    data-hsa-form=""
                    data-success-redirect="/thanks/"
                    data-success-message="Thanks, your project briefing has been emailed to our team."
                  >
                    {" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {" "}
                      {[
                        ["Full Name", "fullName", "ENTER NAME", "text", false],
                        [
                          "Email Address",
                          "email",
                          "WORK@COMPANY.COM",
                          "email",
                          true,
                        ],
                      ].map(([label, name, placeholder, type, required]) => (
                        <div className="space-y-2" key={name}>
                          {" "}
                          <label className="text-[10px] font-black tracking-[0.15em] text-outline">
                            {" "}
                            {label}{" "}
                          </label>{" "}
                          <input
                            className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal"
                            name={name}
                            placeholder={placeholder}
                            required={required}
                            type={type}
                          />{" "}
                        </div>
                      ))}{" "}
                    </div>{" "}
                    <div className="space-y-2">
                      {" "}
                      <label className="text-[10px] font-black tracking-[0.15em] text-outline">
                        {" "}
                        Phone Contact{" "}
                      </label>{" "}
                      <input
                        className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal"
                        name="phone"
                        placeholder="+1 (000) 000-0000"
                        type="tel"
                      />{" "}
                    </div>{" "}
                    <div className="space-y-2">
                      {" "}
                      <label className="text-[10px] font-black tracking-[0.15em] text-outline">
                        {" "}
                        Scope Details{" "}
                      </label>{" "}
                      <textarea
                        className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal resize-none"
                        name="message"
                        placeholder="DESCRIBE YOUR AUTOMATION NEEDS..."
                        required
                        rows="4"
                      />{" "}
                    </div>{" "}
                    <div className="flex items-start gap-4 pt-4">
                      {" "}
                      <div className="flex items-center h-5">
                        {" "}
                        <input
                          className="w-5 h-5 text-secondary border-outline-variant rounded-none focus:ring-secondary"
                          name="marketingConsent"
                          type="checkbox"
                          value="Yes"
                        />{" "}
                      </div>{" "}
                      <div className="text-[11px] font-bold text-on-surface-variant leading-tight">
                        {" "}
                        <label className="tracking-wide">
                          {" "}
                          I agree to receive Kinetic Precision project insights
                          and updates. Preferences can be managed at any
                          time.{" "}
                        </label>{" "}
                      </div>{" "}
                    </div>{" "}
                    <button
                      className="w-full md:w-auto bg-secondary text-white px-12 py-5 rounded-none font-black text-xs tracking-[0.2em] hover:bg-primary transition-all duration-300 shadow-xl shadow-secondary/10"
                      type="submit"
                    >
                      {" "}
                      Initiate Consultation{" "}
                    </button>{" "}
                  </form>{" "}
                </div>{" "}
                <div className="mt-8 overflow-hidden h-48 relative border border-outline-variant/20">
                  {" "}
                  <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply" />{" "}
                  <img
                    alt="Industrial map style"
                    className="w-full h-full object-cover grayscale brightness-50"
                    src="/downloads/about/about-building-banner.webp"
                  />{" "}
                  <div className="absolute bottom-4 left-4 z-20">
                    {" "}
                    <div className="bg-primary px-4 py-2 flex items-center gap-2">
                      {" "}
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />{" "}
                      <span className="text-[10px] font-black text-white tracking-widest">
                        {" "}
                        Global Logistics Hub{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          {false && <section className="bg-primary py-24 relative overflow-hidden">
            {" "}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[45deg] translate-x-1/2" />{" "}
            <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
              {" "}
              <div className="max-w-xl">
                {" "}
                <h2 className="font-headline text-4xl font-black text-white mb-4 tracking-tight">
                  {" "}
                  Ready to Architect?{" "}
                </h2>{" "}
                <p className="text-primary-fixed-dim text-lg font-medium opacity-80">
                  {" "}
                  Download the 2024 Automation Readiness Framework or schedule a
                  live system demonstration.{" "}
                </p>{" "}
              </div>{" "}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {" "}
                <a
                  className="bg-white text-primary px-10 py-5 rounded-none font-black text-xs tracking-[0.2em] hover:bg-surface-container-low transition-colors text-center"
                  download
                  href="/downloads/product-catalog.pdf"
                >
                  {" "}
                  Download PDF{" "}
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </section>}{" "}
        </main>{" "}
      </div>{" "}
    </>
  );
}
export function StructuredStaticPage({ page }) {
  let body = null;
  if (page.kind === "home-page") {
    body = <HomeBody />;
  } else if (page.kind === "about-page") {
    body = <AboutBody />;
  } else if (page.kind === "contact-page") {
    body = <ContactBody />;
  }
  if (!body) {
    return null;
  }
  return <PublicPageChrome page={page}>{body}</PublicPageChrome>;
}


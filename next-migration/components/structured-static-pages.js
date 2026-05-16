import { PublicPageChrome } from "@/components/public-shell";
import Script from "next/script";

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
  { name: "DENSO", src: encodeURI("/downloads/鍚堜綔鍝佺墝/DENSO.webp") },
  { name: "TP-Link", src: encodeURI("/downloads/鍚堜綔鍝佺墝/tplink.webp") },
  { name: "BYD", src: encodeURI("/downloads/鍚堜綔鍝佺墝/姣斾簹杩?webp") },
  {
    name: "Han's Laser",
    src: encodeURI("/downloads/鍚堜綔鍝佺墝/澶ф棌婵€鍏?webp"),
  },
  {
    name: "Fenghua Advanced",
    src: encodeURI("/downloads/鍚堜綔鍝佺墝/椋庡崕楂樼.webp"),
  },
  { name: "Hytera", src: encodeURI("/downloads/鍚堜綔鍝佺墝/娴疯兘杈?webp") },
  { name: "HGTECH", src: encodeURI("/downloads/鍚堜綔鍝佺墝/鍗庡伐绉戞妧.webp") },
  { name: "CR", src: encodeURI("/downloads/鍚堜綔鍝佺墝/鍗庢鼎.webp") },
  {
    name: "Longood Intelligent",
    src: encodeURI("/downloads/鍚堜綔鍝佺墝/鏈楃鏅鸿兘.webp"),
  },
  { name: "Inovance", src: encodeURI("/downloads/鍚堜綔鍝佺墝/鑻卞▉鑵?webp") },
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
  const certificateShowcase = [
    {
      src: "/downloads/certificates/patent-01.png",
      alt: "Utility model patent certificate for a wave edge cleaning device",
      title: "Utility Model Patent"
    },
    {
      src: "/downloads/certificates/patent-02.png",
      alt: "Utility model patent certificate for a special transfer mechanism",
      title: "Utility Model Patent"
    },
    {
      src: "/downloads/certificates/credit-honor-01.png",
      alt: "Bidding and tendering enterprise credit rating certificate in English",
      title: "AAA Credit Rating"
    },
    {
      src: "/downloads/certificates/credit-honor-02.png",
      alt: "AAA enterprise credit rating certificate",
      title: "AAA Enterprise Credit"
    },
    {
      src: "/downloads/certificates/credit-honor-03.png",
      alt: "AAA contract honoring and trust keeping certificate",
      title: "AAA Contract Trust"
    },
    {
      src: "/downloads/certificates/quality-certification-01-home.jpg",
      alt: "ISO 9001 quality management system certification",
      title: "ISO 9001 Certification"
    },
    {
      src: "/downloads/certificates/compliance-certification-01.png",
      alt: "Certificate of machinery directive attestation for board separator machine",
      title: "Machinery Directive"
    },
    {
      src: "/downloads/certificates/compliance-certification-02.png",
      alt: "Certificate of machinery directive attestation for forming cut foot machine",
      title: "Machinery Directive"
    }
  ];

  return (
    <>
      {" "}
      <div className="page-content">
        {" "}
        <main>
          {" "}
          <section className="relative h-[80vh] flex items-center overflow-hidden bg-primary">
            {" "}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {" "}
              <img
                alt="coolyne operations building exterior"
                className="h-full w-full scale-[1.03] object-cover object-center opacity-28 mix-blend-screen"
                src="/downloads/about/about-building-banner.webp"
              />{" "}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(111,191,255,0.25),transparent_60%)] animate-pulse-glow" />{" "}
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(254,107,0,0.15),transparent_50%)]" />{" "}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,150,255,0.1),transparent_70%)] animate-float" />{" "}
            </div>{" "}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/88 to-primary/32 z-10" />{" "}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/20 z-10" />{" "}
            <div className="relative z-20 px-12 md:px-24 w-full max-w-[1440px] mx-auto">
              {" "}
              <span className="block mb-6 text-[10px] font-black tracking-[0.4em] text-[#d7e5f8] drop-shadow-[0_2px_10px_rgba(0,23,54,0.28)] animate-fade-in">
                {" "}
                coolyne Warehouse Automation{" "}
              </span>{" "}
              <h1 className="text-white text-5xl md:text-8xl font-black leading-tight max-w-4xl tracking-tighter font-headline animate-fade-in-up delay-100">
                {" "}
                Engineering <br /> the{" "}
                <span className="text-secondary-container text-gradient">Future</span>{" "}
              </h1>{" "}
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#d7e5f8] drop-shadow-[0_2px_12px_rgba(0,23,54,0.28)] md:text-xl animate-fade-in-up delay-200">
                {" "}
                coolyne engineers AGV, AMR, and software-driven warehouse
                systems that keep storage, transport, and fulfillment flows
                synchronized at industrial scale.{" "}
              </p>{" "}
              <div className="mt-16 flex gap-12">
                {" "}
                <div className="flex flex-col animate-fade-in-up delay-300">
                  {" "}
                  <CountUpValue
                    as="span"
                    className="font-headline text-4xl font-black text-white"
                    value="500+"
                  />{" "}
                  <span className="mt-2 text-[10px] font-bold tracking-[0.3em] text-[#d7e5f8]">
                    {" "}
                    Engineers{" "}
                  </span>{" "}
                </div>{" "}
                <div className="h-16 w-px bg-white/18" />{" "}
                <div className="flex flex-col animate-fade-in-up delay-400">
                  {" "}
                  <CountUpValue
                    as="span"
                    className="font-headline text-4xl font-black text-white"
                    value="70+"
                  />{" "}
                  <span className="mt-2 text-[10px] font-bold tracking-[0.3em] text-[#d7e5f8]">
                    {" "}
                    Core Patents{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="py-32 px-12 bg-surface">
            {" "}
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              {" "}
              <div className="lg:col-span-5">
                {" "}
                <div className="w-12 h-1 bg-secondary mb-8" />{" "}
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter font-headline mb-10 leading-none">
                  {" "}
                  Specialized Intelligence, <br /> Global Delivery.{" "}
                </h2>{" "}
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                  {" "}
                  coolyne stands at the intersection of warehouse engineering and
                  digital orchestration. Our focus remains on the design,
                  customization, and global deployment of intelligent storage,
                  transport, and fulfillment systems.{" "}
                </p>{" "}
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  {" "}
                  From intricate intralogistics simulation to the final hardware
                  rollout, our lifecycle services ensure that your facility
                  operates at the peak of technical capability.{" "}
                </p>{" "}
              </div>{" "}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {" "}
                {[
                  [
                    "precision_manufacturing",
                    "text-secondary",
                    "AGV Excellence",
                    "Automated Guided Vehicles designed for high-payload stability and sub-millimeter precision.",
                  ],
                  [
                    "hub",
                    "text-primary",
                    "Composite Robotics",
                    "Integrating arm manipulation with mobile bases for complex pick-and-place tasks.",
                  ],
                  [
                    "airport_shuttle",
                    "text-primary",
                    "Unmanned Vehicles",
                    "Heavy-duty transport solutions for both indoor and controlled outdoor industrial environments.",
                  ],
                  [
                    "biotech",
                    "text-primary",
                    "R&D Customization",
                    "Bespoke engineering solutions tailored to unique operational constraints and workflows.",
                  ],
                ].map(([icon, color, title, copy]) => (
                  <div
                    className="bg-surface-container-low p-10 border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 group rounded-xl hover-lift"
                    key={title}
                  >
                    {" "}
                    <InlineIcon
                      className={`about-feature-icon mb-6 block h-10 w-10 ${color} transition-transform duration-300 group-hover:scale-110`}
                      name={icon}
                    />{" "}
                    <h3 className="text-xl font-black text-primary mb-3 font-headline tracking-tight">
                      {" "}
                      {title}{" "}
                    </h3>{" "}
                    <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                      {copy}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="bg-primary text-white overflow-hidden border-y border-outline-variant/20 relative">
            {" "}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(254,107,0,0.1),transparent_60%)]" />
              <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(111,191,255,0.1),transparent_60%)]" />
            </div>
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 relative z-10">
              {" "}
              {[
                ["Global Presence", "80+", "Active Markets"],
                ["Intellectual Asset", "70+", "Core Patents Held"],
                ["Human Capital", "500+", "Specialized Engineers"],
              ].map(([kicker, value, label], index) => (
                <div
                  className={`p-20 flex flex-col items-center justify-center hover:bg-white/5 transition-all duration-300 cursor-pointer group ${index < 2 ? "border-b md:border-b-0 md:border-r border-outline-variant/10" : ""}`}
                  key={label}
                >
                  {" "}
                  <span className="text-xs tracking-[0.5em] text-secondary-fixed-dim font-black mb-6 group-hover:text-secondary transition-colors duration-300">
                    {" "}
                    {kicker}{" "}
                  </span>{" "}
                  <CountUpValue
                    as="span"
                    className="text-7xl font-black font-headline tracking-tighter group-hover:scale-110 transition-transform duration-300"
                    value={value}
                  />{" "}
                  <span className="mt-6 text-[10px] tracking-[0.2em] text-on-primary-container font-bold group-hover:text-white transition-colors duration-300">
                    {" "}
                    {label}{" "}
                  </span>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </section>{" "}
          <section className="py-32 bg-surface-container-lowest overflow-hidden">
            {" "}
            <div className="max-w-[1440px] mx-auto px-12">
              {" "}
              <div className="mb-24 text-center max-w-3xl mx-auto">
                {" "}
                <span className="text-secondary tracking-[0.4em] text-[10px] font-black">
                  {" "}
                  Industrial Timeline{" "}
                </span>{" "}
                <h2 className="text-4xl md:text-5xl font-black text-primary mt-4 mb-6 tracking-tight font-headline">
                  {" "}
                  Evolution of Excellence{" "}
                </h2>{" "}
                <div className="w-16 h-1 bg-secondary mx-auto" />{" "}
              </div>{" "}
              <div className="relative flex flex-col gap-0">
                {" "}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px timeline-path -translate-x-1/2 z-0" />{" "}
                {[
                  [
                    "2004",
                    "Founded in Shenzhen",
                    "Strategic establishment for AGV research in the Asian industrial corridor.",
                    true,
                  ],
                  [
                    "2012",
                    "Global Expansion",
                    "Standardizing international services across European and North American sectors.",
                    false,
                  ],
                  [
                    "2018",
                    "Digital Twin Launch",
                    "Shift to software-first engineering with Cloud Orchestration platforms.",
                    true,
                  ],
                  [
                    "2024",
                    "Swarm Intelligence",
                    "Multi-brand scheduling and decentralized autonomous fleet management.",
                    false,
                  ],
                ].map(([year, title, copy, left]) => (
                  <div
                    className="relative flex flex-col md:flex-row items-center mb-24 last:mb-0 group"
                    key={year}
                  >
                    {" "}
                    {left ? (
                      <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {" "}
                        <h4 className="text-2xl font-black text-primary font-headline tracking-tight">
                          {title}
                        </h4>{" "}
                        <p className="text-on-surface-variant text-sm mt-3 max-w-sm md:ml-auto leading-relaxed">
                          {copy}
                        </p>{" "}
                      </div>
                    ) : (
                      <div className="md:w-1/2 order-1 hidden md:block" />
                    )}{" "}
                    <div
                      className={`z-10 w-12 h-12 rounded-none border-4 border-surface border-double flex items-center justify-center text-white font-black text-[10px] order-1 md:order-2 shadow-xl ring-8 ring-surface ${left ? "bg-primary" : "bg-secondary"}`}
                    >
                      {" "}
                      {year}{" "}
                    </div>{" "}
                    {left ? (
                      <div className="md:w-1/2 order-3" />
                    ) : (
                      <div className="md:w-1/2 md:pl-16 order-2 md:order-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {" "}
                        <h4 className="text-2xl font-black text-primary font-headline tracking-tight">
                          {title}
                        </h4>{" "}
                        <p className="text-on-surface-variant text-sm mt-3 max-w-sm leading-relaxed">
                          {copy}
                        </p>{" "}
                      </div>
                    )}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="relative overflow-hidden py-32 px-12 bg-surface">
            {" "}
            <div className="absolute inset-0 z-0">
              {" "}
              <img
                    alt="coolyne warehouse automation showroom"
                className="h-full w-full object-cover object-[68%_center] opacity-[0.42] saturate-[1.02] contrast-[1.02]"
                src="/downloads/about/about-certificates-bg.webp"
              />{" "}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,249,251,0.78),rgba(248,249,251,0.66))]" />{" "}
              <div className="absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-surface via-surface/82 to-transparent" />{" "}
              <div className="absolute inset-y-0 right-0 w-[48%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(248,249,251,0.06)_42%,rgba(248,249,251,0.16)_72%,rgba(248,249,251,0.28)_100%)]" />{" "}
            </div>{" "}
            <div className="relative z-10 max-w-[1440px] mx-auto">
              {" "}
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 border-b border-outline-variant/30 pb-12">
                {" "}
                <div className="max-w-xl">
                  {" "}
                  <span className="text-secondary tracking-[0.4em] text-[10px] font-black">
                    {" "}
                    Quality Verification{" "}
                  </span>{" "}
                  <h2 className="text-4xl font-black text-primary mt-4 font-headline tracking-tight">
                    {" "}
                    Certificates &amp; Global Honors{" "}
                  </h2>{" "}
                </div>{" "}
                <p className="text-on-surface-variant text-sm max-w-sm font-light">
                  {" "}
                  Adhering to the world's most rigorous industrial safety and
                  quality standards for mission-critical operations.{" "}
                </p>{" "}
              </div>{" "}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20 border border-outline-variant/20">
                {" "}
                {[
                  ["verified", "30+", "Software Copyrights"],
                  ["description", "20+", "Hardware Patents"],
                  ["gavel", "ISO 9001", "Quality Management"],
                  ["workspace_premium", "CE Standard", "Safety Certified"],
                ].map(([icon, value, label]) => (
                  <div
                    className="bg-surface p-12 flex flex-col items-center group hover:bg-surface-container-low transition-colors"
                    key={label}
                  >
                    {" "}
                    <InlineIcon
                      className="mb-8 h-12 w-12 text-primary/40 transition-colors group-hover:text-primary"
                      name={icon}
                    />{" "}
                    <div className="text-center">
                      {" "}
                      <span className="text-3xl font-black text-primary font-headline">
                        {value}
                      </span>{" "}
                      <p className="text-[9px] text-outline tracking-[0.3em] font-black mt-4">
                        {" "}
                        {label}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              <div className="mt-14 flex flex-col gap-6 border-t border-outline-variant/20 pt-10 md:flex-row md:items-end md:justify-between">
                {" "}
                <div className="max-w-3xl">
                  {" "}
                  <p className="text-on-surface-variant text-base leading-relaxed md:text-lg">
                    {" "}
                    Selected clear certificates are displayed below in a
                    horizontal gallery so visitors can quickly scan quality,
                    patent, and compliance proof without leaving the page.{" "}
                  </p>{" "}
                </div>{" "}
                <div className="inline-flex items-center gap-3 self-start rounded-full border border-primary/10 bg-white px-5 py-3 shadow-sm">
                  {" "}
                  <InlineIcon className="h-5 w-5 text-secondary" name="workspace_premium" />{" "}
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                    {" "}
                    8 featured certificates{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              <div className="mt-10 relative flex items-center gap-4">
                {" "}
                <button
                  aria-label="Previous certificates"
                  className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-secondary shadow-[0_18px_36px_rgba(0,23,54,0.14)] transition-all hover:-translate-x-0.5 hover:text-primary"
                  data-hsa-brand-carousel-prev=""
                  type="button"
                >
                  {" "}
                  <InlineIcon className="h-5 w-5" name="chevron_left" />{" "}
                </button>{" "}
                <div className="min-w-0 flex-1 overflow-hidden">
                  {" "}
                  <div
                    className="flex gap-6 overflow-x-auto scroll-smooth pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    data-hsa-brand-carousel-track=""
                  >
                    {" "}
                    {certificateShowcase.map((certificate) => (
                      <a
                        className="group flex h-[300px] min-w-[240px] flex-shrink-0 flex-col justify-between bg-white p-4 shadow-[0_24px_56px_rgba(0,23,54,0.12)] transition-transform duration-300 hover:-translate-y-1"
                        href={certificate.src}
                        key={certificate.src}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <div className="h-[236px] overflow-hidden bg-surface">
                          {" "}
                          <img
                            alt={certificate.alt}
                            className="h-full w-full object-contain object-top transition-transform duration-300 group-hover:scale-[1.02]"
                            src={certificate.src}
                          />{" "}
                        </div>{" "}
                        <div className="border-t border-outline-variant/20 pt-4">
                          {" "}
                          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                            {" "}
                            {certificate.title}{" "}
                          </p>{" "}
                        </div>{" "}
                      </a>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <button
                  aria-label="Next certificates"
                  className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-secondary shadow-[0_18px_36px_rgba(0,23,54,0.14)] transition-all hover:translate-x-0.5 hover:text-primary"
                  data-hsa-brand-carousel-next=""
                  type="button"
                >
                  {" "}
                  <InlineIcon className="h-5 w-5" name="chevron_right" />{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section className="py-32 px-12 bg-white">
            {" "}
            <div className="max-w-[1440px] mx-auto bg-primary p-16 md:p-24 relative overflow-hidden">
              {" "}
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                {" "}
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  {" "}
                  <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />{" "}
                </svg>{" "}
              </div>{" "}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                {" "}
                <div className="max-w-2xl">
                  {" "}
                  <h2 className="text-4xl md:text-5xl font-black text-white font-headline tracking-tighter mb-6">
                    {" "}
                    Ready to Engineer Your Future?{" "}
                  </h2>{" "}
                  <p className="text-on-primary-container text-lg opacity-80">
                    {" "}
                    Consult with our technical experts to audit your facility's
                    potential for autonomous integration.{" "}
                  </p>{" "}
                </div>{" "}
                <div className="flex shrink-0 gap-6">
                  {" "}
                  <button
                    className="bg-secondary text-on-secondary px-10 py-5 font-black text-xs tracking-[0.2em] hover:bg-secondary-container transition-colors"
                    data-hsa-open-expert-modal=""
                    type="button"
                  >
                    {" "}
                    Partner with us{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
        </main>{" "}
      </div>{" "}
    </>
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
                      "Global Support 閳?Mon-Fri 09:00-17:00",
                    ],
                    [
                      "chat",
                      "bg-secondary",
                      "Instant Messaging",
                      "+86 13510816743",
                      "WhatsApp Business 閳?24H Monitoring",
                    ],
                    [
                      "mail",
                      "bg-primary-container",
                      "Email Correspondence",
                        "sales@coolyne.com",
                      "Estimated Response: < 12 Hours",
                    ],
                    [
                      "location_on",
                      "bg-tertiary",
                      "Global Headquarters",
                      "Kinetic Precision Industrial Park",
                      "Bao'an District 閳?Shenzhen 閳?GD China",
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

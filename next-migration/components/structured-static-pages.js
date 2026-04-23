import { PublicPageChrome } from "@/components/public-shell";

function HomeBody() {
  return (
    <>
      <div className="page-content">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-secondary">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt="Futuristic automated warehouse"
              className="w-full h-full object-cover opacity-40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP9uCpNDOKcfEEQnuDHl714wUKvmp7_Q_CpgmOr7JKIRopxfts4NlWUzL6Dw4ZPlv_FulkqEYDgDrprw-57gxYMdvcSGBTe0uJmagVhPrvKWJ30pF4vtM-cWWLypmWdYuFfwocTsEjSaP0H6V_J7G5J7qHFOBAmGHOvXF0RgGbOH8l-ZK__KDQNa5dT2832PlcLeUdQG-gLnWo0UVpe8gZ7YSgmjjKS7VcF47WpSEma4AFe3H4Z3hUMyRrk4x6vUemEH2T-xvtcftw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
          </div>
          <div className="relative z-10 container mx-auto hsa-home-hero-container">
            <div className="hsa-home-hero-shell">
              <div className="hsa-home-hero-copy">
                <span className="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-[0.35em] text-[10px] mb-6">
                  <span className="w-12 h-px bg-primary" />
                  Industrial Intelligence
                </span>
                <h1 className="text-5xl md:text-[7rem] font-black text-white leading-[0.92] mb-9 tracking-tighter uppercase">
                  Warehouse <br />
                  Automation <br />
                  <span className="text-white/30">Systems</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-[1.6] mb-10 max-w-[38rem] font-light">
                  Engineering high-efficiency storage and material handling ecosystems with modular
                  integration for zero-error throughput.
                </p>
                <div className="flex flex-wrap gap-5">
                  <a
                    className="bg-primary text-white px-9 py-4 font-bold uppercase tracking-[0.18em] text-[11px] hover:bg-white hover:text-secondary transition-all shadow-2xl"
                    href="/contact"
                  >
                    Speak With An Expert
                  </a>
                  <a
                    className="bg-white/5 border border-white/20 text-white px-9 py-4 font-bold uppercase tracking-[0.18em] text-[11px] hover:bg-white/10 transition-colors backdrop-blur-md"
                    href="/solutions"
                  >
                    Explore Solutions
                  </a>
                </div>
              </div>
              <div className="hsa-home-hero-visual" data-home-robot="">
                <div className="hsa-home-robot-panel">
                  <div className="hsa-home-robot-meta">
                    <span className="hsa-home-robot-kicker">Composite Mobile Robot</span>
                    <span className="hsa-home-robot-chip">360 View</span>
                  </div>
                  <div className="hsa-home-robot-stage" aria-label="Interactive 3D robot model area">
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
                      src="%E6%A8%A1%E5%9E%8B2/%E5%A4%8D%E5%90%88%E6%9C%BA%E5%99%A8%E4%BA%BA8.glb"
                      touch-action="pan-y"
                    />
                  </div>
                  <div className="hsa-home-robot-status">Loading 3D model...</div>
                  <div className="hsa-home-robot-hint">
                    <span>Drag to rotate</span>
                    <span>Auto orbit enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-white">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                [
                  "inventory_2",
                  "ASRS",
                  "Automated Storage and Retrieval Systems designed for maximum density and ultra-fast accessibility."
                ],
                [
                  "conveyor_belt",
                  "Material Handling",
                  "High-precision conveyor and transport mechanisms ensuring fluid transit throughout the facility."
                ],
                [
                  "precision_manufacturing",
                  "Robotic Picking",
                  "Robotic and voice-directed picking solutions that eliminate human error and accelerate fulfillment."
                ]
              ].map(([icon, title, copy]) => (
                <div
                  className="p-8 border border-outline-variant hover:border-primary transition-all duration-500 group"
                  key={title}
                >
                  <div className="w-16 h-16 bg-surface flex items-center justify-center mb-10 group-hover:bg-primary transition-colors">
                    <span
                      className="material-symbols-outlined text-3xl text-secondary group-hover:text-white"
                      data-icon={icon}
                    >
                      {icon}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-8 uppercase tracking-tight kinetic-border">
                    {title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm font-medium">{copy}</p>
                </div>
              ))}
              <a
                className="block p-8 border border-outline-variant hover:border-primary transition-all duration-500 group"
                href="/solutions/software"
              >
                <div className="w-16 h-16 bg-surface flex items-center justify-center mb-10 group-hover:bg-primary transition-colors">
                  <span
                    className="material-symbols-outlined text-3xl text-secondary group-hover:text-white"
                    data-icon="settings_input_component"
                  >
                    settings_input_component
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight kinetic-border">
                  Control Systems
                </h3>
                <p className="text-on-surface-variant leading-relaxed text-sm font-medium">
                  Integrated software layers providing real-time oversight and adaptive logic for
                  all hardware nodes.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface overflow-hidden">
          <div>
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/5] bg-secondary overflow-hidden shadow-2xl">
                  <img
                    alt="Modern logistics robot"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCanS7Dl7es8s1Kjb4Y4DHqEC-nVWn10_UPbps0Tszmlhjt5iMbIjML1hoyf_Evv0FSxefDkWEbrb1qShcvHGXGfRi3pKZDo4woB9fXecVQDGG71T9UgZ-NuSzgUTrknKWAoyFWqSE13cjyJbuOKrs-G6YIkYJdXcM8f0m9cHU8Q1Mh6pLEm5wfsjZOwExohD4MmGMtX5YiLv-PmNhYrfv3lEOQsa6IiuAhLeYb55a3CyT6IcHrTukbDUZENw77-0qHE2b0vvXtxOtG"
                  />
                </div>
                <div className="absolute -bottom-10 -right-6 lg:-right-10 glass-effect p-8 shadow-2xl max-w-xs border border-outline-variant">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="material-symbols-outlined text-primary text-4xl" data-icon="monitoring">
                      monitoring
                    </span>
                    <span className="font-black text-sm uppercase tracking-widest text-secondary">
                      Live Analytics
                    </span>
                  </div>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed font-medium">
                    Real-time throughput monitoring with 99.9% data accuracy across all integrated
                    robot fleets.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[11px] mb-6 block">
                  The Unified Architecture
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-none uppercase">
                  Smart Logistics: Kinetic Ecosystem
                </h2>
                <p className="text-lg text-on-surface-variant mb-12 leading-relaxed font-medium">
                  We don't just supply hardware; we engineer a kinetic ecosystem. By merging modular
                  robot fleets with our proprietary AI-driven integration software, we unlock
                  dormant capacity in your existing footprint.
                </p>
                <div className="space-y-12">
                  {[
                    [
                      "01",
                      "Space Utilization",
                      "Reduce warehouse footprint by up to 60% through high-density vertical storage integration."
                    ],
                    [
                      "02",
                      "Accuracy & Speed",
                      "Eliminate manual bottlenecks with sub-millimeter precision in picking and material handling."
                    ]
                  ].map(([num, title, copy]) => (
                    <div className="flex gap-10 group" key={num}>
                      <div className="flex-shrink-0 w-20 h-20 border border-outline-variant flex items-center justify-center font-black text-3xl text-outline-variant group-hover:text-primary group-hover:border-primary transition-all duration-500">
                        {num}
                      </div>
                      <div>
                        <h4 className="font-black text-xl mb-4 uppercase tracking-tight">{title}</h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                          {copy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-white">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block">
                  Our Portfolio
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                  Delivered Precision
                </h2>
                <p className="text-on-surface-variant mt-8 font-medium">
                  Global deployments across multiple high-demand industries requiring 24/7
                  operational reliability.
                </p>
              </div>
              <button className="text-secondary font-black uppercase tracking-widest text-[12px] flex items-center gap-4 group hover:text-primary transition-colors">
                View All Case Studies
                <span
                  className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                [
                  "ASRS System",
                  "ASRS Global Logistics Hub",
                  "Logistics Sector",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCi_KixyBUqXop5a7s4G-CJnwQ5f_dM_3mIIwu3gwfL5ka4KFcLY4EwLcshMLz2qJbRulcAOHLfhf993hu485UzRTifosOQbRjgeyAtR_j0fBaB4iUd-X7iPCa-MJbLTEWyhVg3GO0rZhAmS5IGtIHMRfoH-r989I1yoviPDnUfK7uQX1Yk7gRQ6U35hk2iSctQ6QsrR2VC93-P3rc-C38FOg6MD6IxmmHuJDSEcWA2HbG5KKfPTvwXODt5sQ5VdKbbf0W8wrmVusvX"
                ],
                [
                  "AGV Project",
                  "Smart Home AGV Integration",
                  "Manufacturing",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxxJbiEPJb6TIYDEvBMYapGbwxmMC5NHZoNWxUjEg7ULypcDOlZCCOjekVzB-I2uLbHEBcBiXqoiHWobK8ttAF2aNkx2gmWGIN3cEHclVrCEQyx5MLiO564sf7GwWIGtpoXWAYOwKap-iELP_vYDhcpb1jt-RoPEhw3MsTmW_LdJzbc0jqC4oEYIo_6f7Y4vYAn0mw4FmFvOTkOOqbYyH3huY_URMd3MwY32wGTMyKtDD0LiHYnT7chWF3UGQKUeGn_BaJ0WgEpgJx"
                ],
                [
                  "Workshop Automation",
                  "Precision Intralogistics",
                  "Engineering",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuC8fH4frUHUdoroDaWwSQzVPZiqLbUpdHZgbmOKoT0vRKZBzcr8IkR6nGehitC4y3UxmAwCUnvneaTzzfd-yiy6-W3PwqsP5UCmQee_EFMq-DrESTo9HrtvSOPADdSX17v___OznO65dqqPWSRX4QZBP8DARg6Gs9gXpe610wcxUoaEssRFA9uBuD-asWhlUDjKw-VAA6CFIHzmMwcdjGw7YZfIJRlpmOLQQqgnzfUsAJwSOC872U0l5cwARCCjrYegr5CCEm-qhGla"
                ],
                [
                  "Electronics Automation",
                  "High-Tech Assembly Robotics",
                  "Technology",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0KjEuFmC4o2hAQE0S-473W_I_9c_HAKntBlHiRfPv-zWngJApu_8iheVXSC709qyUUwSuF3AHrtYMCGdMkhxFGoFIEIc66FAmnhnhY2AjwO7sbYBJuZTIvOwGFQrhpnMiGe3ptgfPr97aeBoTxuDAoiZ4qJoLhAdAY01Q3DeNvem01Gfq3AW6jZ3WZf9Q_dg892gafCshHptPQiJEg-_DisfoEwdDyJbSm-4k5VK7QMYA0ogTh0xOabjvA7aWgyGzHKid2pUhIXo-"
                ]
              ].map(([alt, title, label, image]) => (
                <div className="group cursor-pointer" key={title}>
                  <div className="aspect-square bg-surface overflow-hidden mb-8">
                    <img
                      alt={alt}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      src={image}
                    />
                  </div>
                  <h4 className="font-black text-lg mb-2 leading-tight uppercase group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                  <p className="text-[11px] text-primary tracking-[0.2em] uppercase font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface border-y border-outline-variant">
          <div>
            <div className="mb-24 text-center max-w-3xl mx-auto">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[11px] mb-6 block">
                Our Methodology
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8">
                The Path to Automation
              </h2>
              <div className="w-32 h-1 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                ["01", "Audit", "In-depth audit of physical infrastructure and bottlenecks."],
                ["02", "Design", "Custom engineering of hardware and software layers."],
                ["03", "Analysis", "Detailed financial projection and ROI forecasting."],
                ["04", "Build", "Precision manufacturing and software configuration phase."],
                ["05", "Deploy", "Expert deployment with minimal operational disruption."],
                ["06", "Support", "Staff certification and 24/7 global system monitoring."]
              ].map(([num, title, copy]) => (
                <div
                  className="bg-white p-10 border border-outline-variant hover:border-primary transition-all duration-300 group"
                  key={num}
                >
                  <span className="text-secondary/10 font-black text-5xl block mb-8 group-hover:text-primary transition-colors">
                    {num}
                  </span>
                  <h4 className="font-black mb-6 uppercase text-[13px] tracking-widest">{title}</h4>
                  <p className="text-[13px] text-on-surface-variant leading-relaxed font-medium">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-white">
          <div>
            <div className="bg-secondary flex flex-col lg:flex-row shadow-[40px_40px_0px_0px_rgba(254,107,0,0.1)]">
              <div className="lg:w-2/5 p-12 md:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 -mr-32 -mt-32 rounded-full" />
                <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-tight leading-none">
                  Consult with an expert
                </h2>
                <div className="flex items-center gap-6 mb-16">
                  <div className="w-24 h-24 border-2 border-primary p-1">
                    <img
                      alt="Hunter, Automation Specialist"
                      className="w-full h-full object-cover grayscale"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW-AvfoBEpg9-RlGT8v6MNdA_0KTSKm2ye72Vd-kZOE7rCtcRB036fJZX3YEF1hzwQklC-9qq_0A_MochQMyLs0LJuwM8yDfcZTvIN3DfzvI_q5yY-AAxkAkTJyBRDb8BcPwLBrPPC52sH2ueoQXVXMaY9mdfXAnn318pMAAQ9n-z--JRBhmZWuocwaDvWYtGI38H-QK_Ix1GZ2Yz3BTVPftAje4DcJIiVsSHKtyzWsDxkmFMj-xmmLKiqCvG07wqG4dKM__snk4RB"
                    />
                  </div>
                  <div>
                    <p className="font-black text-2xl leading-none uppercase tracking-tighter">Hunter</p>
                    <p className="text-primary text-[11px] font-black uppercase tracking-[0.2em] mt-3">
                      Principal Engineer
                    </p>
                  </div>
                </div>
                <ul className="space-y-8 text-sm font-medium">
                  {[
                    "Comprehensive Feasibility Study",
                    "Scale and Timeline Mapping",
                    "Free ROI & Efficiency Analysis"
                  ].map((item) => (
                    <li className="flex items-center gap-5 group" key={item}>
                      <span
                        className="material-symbols-outlined text-primary font-black text-2xl"
                        data-icon="arrow_right_alt"
                      >
                        arrow_right_alt
                      </span>
                      <span className="group-hover:translate-x-2 transition-transform uppercase tracking-widest text-[11px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-3/5 bg-white p-12 md:p-20 border-l border-outline-variant">
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
                  data-form-label="Homepage Consultation Form"
                  data-form-type="consultation"
                  data-hsa-form=""
                  data-success-message="Thanks, your consultation request has been emailed to our team."
                >
                  {[
                    ["name", "fullName", "Name", "Full Name", "text", true],
                    ["email", "email", "Email", "Work Email", "email", true],
                    ["phone", "phone", "Phone", "Phone Number", "tel", false],
                    ["org", "company", "Organization", "Organization", "text", true]
                  ].map(([id, name, placeholder, label, type, required]) => (
                    <div className="relative group" key={id}>
                      <input
                        className="peer w-full border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-all py-4 px-0 text-secondary font-bold placeholder-transparent"
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        type={type}
                      />
                      <label
                        className="absolute left-0 -top-4 text-primary text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-outline peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px]"
                        htmlFor={id}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                  <div className="md:col-span-2 relative group">
                    <textarea
                      className="peer w-full border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-all py-4 px-0 text-secondary font-bold placeholder-transparent min-h-[120px] resize-none"
                      id="message"
                      name="message"
                      placeholder="Message"
                      required
                    />
                    <label
                      className="absolute left-0 -top-4 text-primary text-[10px] font-black uppercase tracking-widest transition-all peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-outline peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-[10px]"
                      htmlFor="message"
                    >
                      Project Requirements
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full bg-secondary text-white py-6 font-black uppercase tracking-[0.3em] text-xs hover:bg-primary transition-all shadow-xl" type="submit">
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function AboutBody() {
  return (
    <>
      <div className="page-content">
        <main>
          <section className="relative h-[80vh] flex items-center overflow-hidden bg-primary">
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                alt="Autonomous Robot Facility"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQkcQC5lBiudNPbJv7KDKRXljuoGqQatKeY702eMwnqHObwOsO-lDB8iN4imG7xnqSKwSehUMpDCVy-M5myfzxIief_71bhkn3JDdqxgIsEd5ZdDRBYyk1KazcNCJ6rOdcYWluALoQ1MSR1SbpjHaUceO5TXLAL1pU_gHYKVQIDNGA8LkEB_jZsn-ap0hJnab1y7pcid2zmXZk_j5Sf0i7pjvno0mv0Sfloc3TUTfvbFr5TAfmKDwy_zzzIiEQ4hfFgXQa6KhSgQT2"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
            <div className="relative z-20 px-12 md:px-24 w-full max-w-[1440px] mx-auto">
              <span className="text-secondary-fixed-dim tracking-[0.4em] uppercase text-[10px] font-black block mb-6">
                Huizong Intelligent Equipment
              </span>
              <h1 className="text-white text-5xl md:text-8xl font-black leading-tight max-w-4xl tracking-tighter uppercase font-headline">
                Engineering <br />
                the <span className="text-secondary-container">Future</span>
              </h1>
              <p className="text-on-primary-container mt-8 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                Global high-tech pioneer specializing in AGVs and autonomous mobility. We orchestrate
                kinetic precision at industrial scale.
              </p>
              <div className="mt-16 flex gap-12">
                <div className="flex flex-col">
                  <span className="text-secondary-fixed-dim text-4xl font-black font-headline">500+</span>
                  <span className="text-outline-variant text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">
                    Engineers
                  </span>
                </div>
                <div className="w-px h-16 bg-outline-variant/30" />
                <div className="flex flex-col">
                  <span className="text-secondary-fixed-dim text-4xl font-black font-headline">100+</span>
                  <span className="text-outline-variant text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">
                    Core Patents
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="py-32 px-12 bg-surface">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5">
                <div className="w-12 h-1 bg-secondary mb-8" />
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase font-headline mb-10 leading-none">
                  Specialized Intelligence, <br />
                  Global Delivery.
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                  Huizong Intelligent Equipment Co., Ltd. stands at the intersection of mechanical
                  precision and digital foresight. As a high-tech enterprise, our focus remains on the
                  R&amp;D, customization, and global deployment of advanced mobility solutions.
                </p>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  From intricate intralogistics simulation to the final hardware rollout, our lifecycle
                  services ensure that your facility operates at the peak of technical capability.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  [
                    "precision_manufacturing",
                    "text-secondary",
                    "AGV Excellence",
                    "Automated Guided Vehicles designed for high-payload stability and sub-millimeter precision."
                  ],
                  [
                    "hub",
                    "text-primary",
                    "Composite Robotics",
                    "Integrating arm manipulation with mobile bases for complex pick-and-place tasks."
                  ],
                  [
                    "airport_shuttle",
                    "text-primary",
                    "Unmanned Vehicles",
                    "Heavy-duty transport solutions for both indoor and controlled outdoor industrial environments."
                  ],
                  [
                    "biotech",
                    "text-primary",
                    "R&D Customization",
                    "Bespoke engineering solutions tailored to unique operational constraints and workflows."
                  ]
                ].map(([icon, color, title, copy]) => (
                  <div
                    className="bg-surface-container-low p-10 border border-outline-variant/10 hover:border-primary/30 transition-colors group"
                    key={title}
                  >
                    <span
                      className={`material-symbols-outlined about-feature-icon ${color} text-4xl mb-6 block group-hover:scale-110 transition-transform`}
                      data-icon={icon}
                    >
                      {icon}
                    </span>
                    <h3 className="text-xl font-black text-primary mb-3 uppercase font-headline tracking-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-body">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-primary text-white overflow-hidden border-y border-outline-variant/20">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3">
              {[
                ["Global Presence", "80+", "Active Markets"],
                ["Intellectual Asset", "100+", "Core Patents Held"],
                ["Human Capital", "500+", "Specialized Engineers"]
              ].map(([kicker, value, label], index) => (
                <div
                  className={`p-20 flex flex-col items-center justify-center hover:bg-white/5 transition-colors ${
                    index < 2 ? "border-b md:border-b-0 md:border-r border-outline-variant/10" : ""
                  }`}
                  key={label}
                >
                  <span className="text-xs uppercase tracking-[0.5em] text-secondary-fixed-dim font-black mb-6">
                    {kicker}
                  </span>
                  <span className="text-7xl font-black font-headline tracking-tighter">{value}</span>
                  <span className="mt-6 text-[10px] uppercase tracking-[0.2em] text-on-primary-container font-bold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="py-32 bg-surface-container-lowest overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-12">
              <div className="mb-24 text-center max-w-3xl mx-auto">
                <span className="text-secondary uppercase tracking-[0.4em] text-[10px] font-black">
                  Industrial Timeline
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-primary mt-4 mb-6 uppercase tracking-tight font-headline">
                  Evolution of Excellence
                </h2>
                <div className="w-16 h-1 bg-secondary mx-auto" />
              </div>
              <div className="relative flex flex-col gap-0">
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px timeline-path -translate-x-1/2 z-0" />
                {[
                  ["2004", "Founded in Shenzhen", "Strategic establishment for AGV research in the Asian industrial corridor.", true],
                  ["2012", "Global Expansion", "Standardizing international services across European and North American sectors.", false],
                  ["2018", "Digital Twin Launch", "Shift to software-first engineering with Cloud Orchestration platforms.", true],
                  ["2024", "Swarm Intelligence", "Multi-brand scheduling and decentralized autonomous fleet management.", false]
                ].map(([year, title, copy, left]) => (
                  <div className="relative flex flex-col md:flex-row items-center mb-24 last:mb-0 group" key={year}>
                    {left ? (
                      <div className="md:w-1/2 md:pr-16 md:text-right order-2 md:order-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <h4 className="text-2xl font-black text-primary uppercase font-headline tracking-tight">{title}</h4>
                        <p className="text-on-surface-variant text-sm mt-3 max-w-sm md:ml-auto leading-relaxed">{copy}</p>
                      </div>
                    ) : (
                      <div className="md:w-1/2 order-1 hidden md:block" />
                    )}
                    <div
                      className={`z-10 w-12 h-12 rounded-none border-4 border-surface border-double flex items-center justify-center text-white font-black text-[10px] order-1 md:order-2 shadow-xl ring-8 ring-surface ${
                        left ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      {year}
                    </div>
                    {left ? (
                      <div className="md:w-1/2 order-3" />
                    ) : (
                      <div className="md:w-1/2 md:pl-16 order-2 md:order-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <h4 className="text-2xl font-black text-primary uppercase font-headline tracking-tight">{title}</h4>
                        <p className="text-on-surface-variant text-sm mt-3 max-w-sm leading-relaxed">{copy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-12 bg-surface">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 border-b border-outline-variant/30 pb-12">
                <div className="max-w-xl">
                  <span className="text-secondary uppercase tracking-[0.4em] text-[10px] font-black">
                    Quality Verification
                  </span>
                  <h2 className="text-4xl font-black text-primary mt-4 uppercase font-headline tracking-tight">
                    Certificates &amp; Global Honors
                  </h2>
                </div>
                <p className="text-on-surface-variant text-sm max-w-sm font-light">
                  Adhering to the world's most rigorous industrial safety and quality standards for
                  mission-critical operations.
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/20 border border-outline-variant/20">
                {[
                  ["verified", "30+", "Software Copyrights"],
                  ["description", "20+", "Hardware Patents"],
                  ["gavel", "ISO 9001", "Quality Management"],
                  ["workspace_premium", "CE Standard", "Safety Certified"]
                ].map(([icon, value, label]) => (
                  <div
                    className="bg-surface p-12 flex flex-col items-center group hover:bg-surface-container-low transition-colors"
                    key={label}
                  >
                    <span
                      className="material-symbols-outlined text-primary/40 group-hover:text-primary text-5xl mb-8 transition-colors"
                      data-icon={icon}
                    >
                      {icon}
                    </span>
                    <div className="text-center">
                      <span className="text-3xl font-black text-primary font-headline">{value}</span>
                      <p className="text-[9px] text-outline uppercase tracking-[0.3em] font-black mt-4">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-12 bg-surface-container-highest">
            <div className="max-w-[1440px] mx-auto bg-primary p-16 md:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase font-headline tracking-tighter mb-6">
                    Ready to Engineer Your Future?
                  </h2>
                  <p className="text-on-primary-container text-lg opacity-80">
                    Consult with our technical experts to audit your facility's potential for
                    autonomous integration.
                  </p>
                </div>
                <div className="flex shrink-0 gap-6">
                  <button className="bg-secondary text-on-secondary px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary-container transition-colors">
                    Partner with us
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function ContactBody() {
  return (
    <>
      <div className="page-content">
        <main>
          <section className="relative min-h-[480px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
              <img
                alt="High-precision robotic arm"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0OT4dnky0dDWblInndi6WzjKxeBcMDWAiWzs8lGMty3vmbr1QObBJyOGC7J2yTZiwvWC_9JxhOPi5ucJ3ySL3IJNzHsp3xj_9LfLtmermpUFiYKwqDd51OWEVwSxu4wWnU-htM8tsE57255tJxG016l1W4ngbbShsmsF9_Vve9dEzVn3-nVeFeSC13lkcdfl-8HJLWTohIGxYgy-IK9QvmwPdVgh9f82x-e9jUKwaP1SNI0eeFMLLUNqNe2A3Z8FxG-VSE_ycM3Wg"
              />
            </div>
            <div className="relative z-20 max-w-7xl mx-auto px-8 py-20 w-full">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-black tracking-[0.25em] uppercase mb-6">
                  Consult an Expert
                </span>
                <h1 className="font-headline text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8 uppercase">
                  Architect Your
                  <br />
                  Efficiency
                </h1>
                <p className="text-primary-fixed-dim text-xl md:text-2xl font-light leading-relaxed max-w-xl border-l-2 border-secondary pl-6">
                  Connect with our engineering specialists to assess project feasibility and optimize
                  your automation roadmap.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <h2 className="font-headline text-4xl font-black text-primary mb-4 uppercase tracking-tight">
                    Direct Access
                  </h2>
                  <div className="h-1.5 w-16 bg-secondary" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    ["phone_in_talk", "bg-primary group-hover:bg-secondary", "Inquiry Hotline", "+86 13510816743", "Global Support 鈥?Mon-Fri 09:00-17:00"],
                    ["chat", "bg-secondary", "Instant Messaging", "+86 13510816743", "WhatsApp Business 鈥?24H Monitoring"],
                    ["mail", "bg-primary-container", "Email Correspondence", "sales@robotlyne.com", "Estimated Response: < 12 Hours"],
                    ["location_on", "bg-tertiary", "Global Headquarters", "Kinetic Precision Industrial Park", "Bao'an District 鈥?Shenzhen 鈥?GD China"]
                  ].map(([icon, bg, title, value, caption]) => (
                    <div
                      className="group flex items-center gap-6 p-8 bg-surface-container-low border border-outline-variant/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                      key={title}
                    >
                      <div className={`w-14 h-14 ${bg} flex items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-white">{icon}</span>
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black text-outline uppercase tracking-[0.2em] mb-1">{title}</h3>
                        <p
                          className={`font-black text-primary tracking-tight ${
                            title === "Global Headquarters" ? "text-lg leading-tight uppercase" : title === "Email Correspondence" ? "text-2xl lowercase" : "text-2xl"
                          }`}
                        >
                          {value}
                        </p>
                        <p className="text-[11px] text-outline-variant font-bold mt-1 uppercase">{caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white p-10 md:p-14 border border-outline-variant/40 shadow-2xl shadow-primary/5">
                  <div className="mb-12">
                    <h2 className="font-headline text-3xl font-black text-primary mb-3 uppercase tracking-tight">
                      Project Briefing
                    </h2>
                    <p className="text-on-surface-variant font-medium max-w-lg">
                      Submit your project parameters for a professional ROI assessment and preliminary
                      engineering scope.
                    </p>
                  </div>
                  <form
                    className="space-y-8"
                    data-form-label="Contact Page Project Briefing"
                    data-form-type="consultation"
                    data-hsa-form=""
                    data-success-message="Thanks, your project briefing has been emailed to our team."
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        ["Full Name", "fullName", "ENTER NAME", "text", true],
                        ["Email Address", "email", "WORK@COMPANY.COM", "email", true]
                      ].map(([label, name, placeholder, type, required]) => (
                        <div className="space-y-2" key={name}>
                          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-outline">
                            {label}
                          </label>
                          <input
                            className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal"
                            name={name}
                            placeholder={placeholder}
                            required={required}
                            type={type}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-outline">
                        Phone Contact
                      </label>
                      <input
                        className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal"
                        name="phone"
                        placeholder="+1 (000) 000-0000"
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-outline">
                        Scope Details
                      </label>
                      <textarea
                        className="w-full bg-surface-container-lowest border-2 border-outline-variant/40 focus:border-secondary focus:ring-0 transition-all py-3 px-4 font-bold placeholder:text-outline-variant/40 placeholder:font-normal resize-none"
                        name="message"
                        placeholder="DESCRIBE YOUR AUTOMATION NEEDS..."
                        required
                        rows="4"
                      />
                    </div>
                    <div className="flex items-start gap-4 pt-4">
                      <div className="flex items-center h-5">
                        <input
                          className="w-5 h-5 text-secondary border-outline-variant rounded-none focus:ring-secondary"
                          name="marketingConsent"
                          type="checkbox"
                          value="Yes"
                        />
                      </div>
                      <div className="text-[11px] font-bold text-on-surface-variant leading-tight">
                        <label className="uppercase tracking-wide">
                          I agree to receive Kinetic Precision project insights and updates.
                          Preferences can be managed at any time.
                        </label>
                      </div>
                    </div>
                    <button className="w-full md:w-auto bg-secondary text-white px-12 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 shadow-xl shadow-secondary/10" type="submit">
                      Initiate Consultation
                    </button>
                  </form>
                </div>

                <div className="mt-8 overflow-hidden h-48 relative border border-outline-variant/20">
                  <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply" />
                  <img
                    alt="Industrial map style"
                    className="w-full h-full object-cover grayscale brightness-50"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqtTvze-CwyYe4xWrwU39JD2sGwLDNIltFZhdBEM_FgCMzb82kUdFbJUROVzgHQeJFxDSf-9HaJ79asHbeTntg3HdWlZUGXIk__9kdxLBxgyFZ3V-kg2Jrkqi45G2hDQZyBAfMmfaRZ_DUYOq8-qiB4Du4ZGBW2AlcgeF0LLVcN42Hz569B33K3WJomkWRAJ7PxPgd_AVgf9szOCX4Gpq9obs_Kh3dO8n-YdBZlR3F7F6wQoKmoDYFM7fOt4qbHy42hlLaK3u2GHJ"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-primary px-4 py-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        Global Logistics Hub
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[45deg] translate-x-1/2" />
            <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
              <div className="max-w-xl">
                <h2 className="font-headline text-4xl font-black text-white mb-4 uppercase tracking-tight">
                  Ready to Architect?
                </h2>
                <p className="text-primary-fixed-dim text-lg font-medium opacity-80">
                  Download the 2024 Automation Readiness Framework or schedule a live system
                  demonstration.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-white text-primary px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-container-low transition-colors text-center">
                  Download PDF
                </button>
                <button className="border border-white/30 text-white px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors text-center">
                  System Demo
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
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

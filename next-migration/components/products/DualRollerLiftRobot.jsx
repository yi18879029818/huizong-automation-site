import Link from "next/link";
import { Localized } from "@/components/localized";
import { meta, image, features, configuration, reference } from "@/lib/dual-roller-lift-robot.mjs";

export default function DualRollerLiftRobot() {
  return <Localized><main className="dual-roller-lift-robot-page">
    <section className="bg-surface-container-low">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 md:px-12 lg:grid-cols-2 lg:py-24">
        <div className="min-w-0">
          <Link href="/products" className="mb-10 inline-block text-sm font-bold text-primary">Back to products</Link>
          <p className="mb-5 text-xs font-bold tracking-widest text-secondary">{meta.kicker}</p>
          <h1 className="mb-7 break-words font-headline text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-6xl">{meta.title}</h1>
          <p className="mb-9 text-lg leading-relaxed text-on-surface-variant">{meta.heroSummary}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="bg-secondary px-7 py-4 text-sm font-bold text-white">Discuss your application</Link>
            <a href="#technical-data" className="border border-primary/20 px-7 py-4 text-sm font-bold text-primary">View configuration</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-[#bcbcbc]">
          <img src={image} alt="Dual roller lift robot with robotic arm and mobile base" width="1920" height="1080" fetchPriority="high" className="h-auto w-full object-contain" />
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-12">
      <h2 className="mb-10 font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">Transport, align and handle parts</h2>
      <div className="grid gap-6 md:grid-cols-3">{features.map((feature, index) => <article key={feature.title} className="rounded-2xl border border-outline-variant/20 bg-white p-7">
        <span className="mb-6 block text-sm font-bold text-secondary">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mb-4 text-xl font-bold text-primary">{feature.title}</h3>
        <p className="leading-relaxed text-on-surface-variant">{feature.description}</p>
      </article>)}</div>
    </section>
    <section id="technical-data" className="bg-surface-container-low py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 className="mb-5 font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">Technical configuration</h2>
        <p className="mb-10 max-w-3xl leading-relaxed text-on-surface-variant">Mobile-base values below are a reference configuration. Final specifications depend on the selected chassis, transfer mechanism and operating conditions.</p>
        <div className="grid items-start gap-8 lg:grid-cols-2">{[["Roller and lift configuration", configuration], ["Mobile-base reference configuration", reference]].map(([title, rows]) => <div key={title} className="min-w-0 overflow-hidden rounded-2xl border border-outline-variant/20 bg-white">
          <h3 className="border-b border-outline-variant/20 p-6 text-xl font-bold text-primary">{title}</h3>
          <table className="w-full table-fixed text-left text-sm"><tbody>{rows.map(([label, value]) => <tr key={label} className="border-b border-outline-variant/15 last:border-0">
            <th scope="row" className="w-1/2 break-words px-5 py-5 align-top font-semibold text-primary">{label}</th>
            <td className="break-words px-5 py-5 align-top leading-relaxed text-on-surface-variant">{value}</td>
          </tr>)}</tbody></table>
        </div>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-12">
      <div className="rounded-2xl bg-primary px-7 py-12 text-white md:p-14">
        <h2 className="mb-5 max-w-3xl font-headline text-3xl font-extrabold tracking-tight md:text-4xl">Define the workstation interface</h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-white/80">Send the carrier size, loaded weight, transfer heights and required cycle time. These determine the roller arrangement, lift travel, arm reach and station controls.</p>
        <Link href="/contact" className="inline-block bg-secondary px-7 py-4 text-sm font-bold text-white">Discuss your application</Link>
      </div>
    </section>
  </main></Localized>;
}

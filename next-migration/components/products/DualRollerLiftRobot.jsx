import Link from "next/link";
import { Localized } from "@/components/localized";
import { meta, image, configuration, reference } from "@/lib/dual-roller-lift-robot.mjs";
import styles from "./DualRollerLiftRobot.module.css";

const workflow = [
  { title: "Receive the tray", image: "tray-transfer", copy: "The robot aligns with the loading station. The rollers receive the loaded tray, and the lift raises it to the arm's pickup position." },
  { title: "Load and mark", image: "marking-station", copy: "After visual alignment, the arm places the nameplates in the fixture. The marking stage moves in, marks the plates and moves back out." },
  { title: "Collect the nameplates", image: "collection", copy: "The arm retrieves the marked nameplates. The robot moves to the collection position and releases them into a separate collection box." }
];

export default function DualRollerLiftRobot() {
  return <Localized><main className={`${styles.page} dual-roller-lift-robot-page`}>
    <section className={styles.hero} aria-labelledby="dual-roller-title">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <Link href="/products" className={styles.back}><span aria-hidden="true">←</span> Back to products</Link>
          <p className={styles.eyebrow}>Nameplate laser marking</p>
          <h1 id="dual-roller-title">{meta.title}</h1>
          <p className={styles.heroLead}>{meta.heroSummary}</p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryLink}>Discuss your application <span aria-hidden="true">↗</span></Link>
            <a href="#working-cycle" className={styles.textLink}>Watch the workflow <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className={styles.machine}><img src={image} alt="Dual roller lift robot with robotic arm and mobile base" width="2400" height="1350" fetchPriority="high" /></div>
      </div>
    </section>
    <section id="working-cycle" className={styles.workflow} aria-labelledby="working-cycle-title">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>The working cycle</p><h2 id="working-cycle-title">From loaded trays to marked nameplates.</h2></div>
        <p>The mobile robot brings the parts to the marking machine, loads the fixture and collects the finished nameplates. See the complete sequence in the workshop demonstration.</p>
      </div>
      <div className={styles.videoFrame}>
        <video controls playsInline muted preload="none" poster="/products/dual-roller-workflow/poster.webp" aria-label="Nameplate laser marking workflow demonstration">
          <source src="/videos/dual-roller-laser-marking-workflow.mp4" type="video/mp4" />
          <a href="/videos/dual-roller-laser-marking-workflow.mp4">Download the workflow video</a>
        </video>
      </div>
      <div className={styles.story}>{workflow.map((step, index) => <figure key={step.image} data-workflow-still className={styles.step}>
        <img src={`/products/dual-roller-workflow/${step.image}.webp`} width="960" height="540" alt={step.title} loading="lazy" />
        <figcaption><div className={styles.stepTitle}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3></div><p>{step.copy}</p></figcaption>
      </figure>)}</div>
    </section>
    <section id="technical-data" className={styles.technical} aria-labelledby="technical-data-title">
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>Configuration</p><h2 id="technical-data-title">Technical data</h2></div>
        <p>Roller and lift specifications are matched to the workstation. The mobile-base values shown are a reference configuration; final values depend on the selected hardware and operating conditions.</p>
      </div>
      <table className={styles.table}>
        <caption className={styles.srOnly}>Technical configuration of the dual roller lift robot</caption>
        <thead><tr><th scope="col" className={styles.groupColumn}>System</th><th scope="col">Parameter</th><th scope="col">Configuration</th></tr></thead>
        {[["Roller and lift", configuration], ["Mobile-base reference", reference]].map(([group, rows]) => <tbody key={group}>{rows.map(([label, value], index) => <tr key={label}>
          {index === 0 ? <th scope="rowgroup" rowSpan={rows.length} className={styles.groupColumn}>{group}</th> : null}
          <th scope="row">{label}</th><td>{value}</td>
        </tr>)}</tbody>)}
      </table>
      <div className={styles.enquiry}>
        <div><h3>Tell us about your workstation.</h3><p>Share the tray dimensions, loaded weight, transfer heights and required cycle time.</p></div>
        <Link href="/contact" className={styles.textLink}>Discuss your application <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </main></Localized>;
}

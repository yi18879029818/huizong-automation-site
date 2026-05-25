import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config.mjs";
import { isSanityConfigured, SANITY_STUDIO_ENABLED } from "../../../lib/sanity/env.mjs";

function StudioSetupNotice() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        fontFamily: "Inter, sans-serif",
        background: "#f6f8fb",
        color: "#102a56"
      }}
    >
      <section
        style={{
          width: "min(720px, 100%)",
          border: "1px solid rgba(16, 42, 86, 0.12)",
          borderRadius: "16px",
          background: "#ffffff",
          padding: "28px"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem", lineHeight: 1.2 }}>Sanity Studio</h1>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> to enable the studio.
        </p>
      </section>
    </main>
  );
}

function StudioDisabledNotice() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        fontFamily: "Inter, sans-serif",
        background: "#f6f8fb",
        color: "#102a56"
      }}
    >
      <section
        style={{
          width: "min(720px, 100%)",
          border: "1px solid rgba(16, 42, 86, 0.12)",
          borderRadius: "16px",
          background: "#ffffff",
          padding: "28px"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem", lineHeight: 1.2 }}>Sanity Studio</h1>
        <p style={{ margin: "12px 0 0", lineHeight: 1.6 }}>
          Studio is disabled in this build. Set <code>SANITY_STUDIO_ENABLED=true</code> in a
          dedicated CMS environment when you want to run the embedded studio.
        </p>
      </section>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured()) {
    return <StudioSetupNotice />;
  }

  if (!SANITY_STUDIO_ENABLED) {
    return <StudioDisabledNotice />;
  }

  return <NextStudio config={config} />;
}

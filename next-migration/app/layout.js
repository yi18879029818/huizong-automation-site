import "@/app/globals.css";
import "@/app/structured-content.css";
import Script from "next/script";
import { COMPANY, SITE_URL } from "@/lib/site-config";
import { SITE_ROUTES } from "@/lib/site-shell-config";

export const metadata = {
  title: "Huizong Intelligent Automation",
  description: "Low-risk Next.js migration shell for the existing Huizong static marketing site.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: COMPANY.name,
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
          rel="stylesheet"
        />
        <Script id="site-routes" strategy="beforeInteractive">
          {`window.__SITE_ROUTES__ = ${JSON.stringify(SITE_ROUTES)};`}
        </Script>
        <Script
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="afterInteractive"
          type="module"
        />
        <Script src="/assets/site-shell.js" strategy="afterInteractive" />
        <Script src="/assets/home-hero-robot.js" strategy="afterInteractive" type="module" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import "@/app/globals.css";
import "@/app/structured-content.css";
import Script from "next/script";
import { COMPANY, SITE_URL } from "@/lib/site-config";
import { SITE_ROUTES } from "@/lib/site-shell-config";
import ChatWidget from "@/components/ChatWidget";

const GTM_ID = "GTM-NND97MZW";

export const metadata = {
  title: {
    default: COMPANY.name,
    template: `%s | ${COMPANY.name}`
  },
  description: COMPANY.description,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/assets/images/coolyne-logo.png", type: "image/png" }
    ],
    apple: [{ url: "/assets/images/coolyne-logo.png", type: "image/png" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    siteName: COMPANY.name,
    type: "website"
  },
  other: {
    "llms-json": "/llms.json",
    "llms-index": "/llms.txt",
    "llms-full": "/llms-full.txt"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script id="site-routes" strategy="beforeInteractive">
          {`window.__SITE_ROUTES__ = ${JSON.stringify(SITE_ROUTES)};`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <Script src="/assets/site-shell.min.js" strategy="afterInteractive" />
        <Script src="/assets/site-motion.js?v=20260511-1" strategy="afterInteractive" />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            width="0"
          />
        </noscript>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

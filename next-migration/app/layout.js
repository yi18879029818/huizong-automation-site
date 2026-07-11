import "@/app/globals.css";
import "@/app/structured-content.css";
import { cache } from "react";
import Script from "next/script";
import { COMPANY, SITE_URL } from "@/lib/site-config";
import { SITE_ROUTES } from "@/lib/site-shell-config";
import ChatWidget from "@/components/ChatWidget";
import { getSiteSettings } from "@/lib/sanity/page-data.mjs";

const GTM_ID = "GTM-NND97MZW";
const getCachedSiteSettings = cache(getSiteSettings);

export const viewport = {
  width: "device-width",
  initialScale: 1
};

function buildRobotsMetadata() {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  };
}

export async function generateMetadata() {
  const settings = await getCachedSiteSettings();
  const siteTitle = settings?.title || COMPANY.name;
  const siteDescription = settings?.description || COMPANY.description;
  const defaultImage = settings?.defaultOgImage?.src || "/assets/images/coolyne-logo.png";
  const keywords = settings?.seo?.keywords?.length ? settings.seo.keywords : undefined;

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [{ url: "/assets/images/coolyne-logo.png", type: "image/png" }],
      apple: [{ url: "/assets/images/coolyne-logo.png", type: "image/png" }]
    },
    robots: buildRobotsMetadata(),
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: siteTitle,
      type: "website",
      images: [
        {
          url: defaultImage,
          alt: siteTitle
        }
      ]
    },
    twitter: {
      card: settings?.seo?.twitterCard || "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [defaultImage]
    }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <head>
        <meta content="notranslate" name="google" />
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
        <Script src="/assets/site-shell.min.js?v=20260608-blog-stability-2" strategy="afterInteractive" />
        <Script src="/assets/site-motion.js?v=20260608-blog-stability-2" strategy="afterInteractive" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
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

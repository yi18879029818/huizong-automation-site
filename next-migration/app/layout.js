import "@/app/globals.css";
import "@/app/structured-content.css";
import { COMPANY, SITE_URL } from "@/lib/site-config";

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
      <body>{children}</body>
    </html>
  );
}

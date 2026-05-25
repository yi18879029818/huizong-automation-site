import { preloadModule } from "react-dom";

const bridgeScript = "https://core.sanity-cdn.com/bridge.js";

export const metadata = {
  title: "Sanity Studio | coolyne",
  description: "Content management studio for coolyne.",
  robots: {
    index: false,
    follow: false
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function StudioLayout({ children }) {
  preloadModule(bridgeScript, { as: "script" });

  return (
    <>
      <script src={bridgeScript} async type="module" />
      {children}
    </>
  );
}

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
  return children;
}

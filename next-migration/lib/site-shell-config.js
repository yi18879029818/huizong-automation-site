export const SITE_ROUTES = {
  home: "/",
  products: "/products",
  "products-agv-forklift": "/products/agv-forklift",
  "products-lifting-agv": "/products/lifting-agv",
  "products-storage-agv": "/products/storage-agv",
  "products-agv-roller": "/products/agv-roller",
  "products-composite-mobile-robot": "/products/composite-mobile-robot",
  solutions: "/solutions",
  "solutions-asrs": "/solutions/asrs",
  "solutions-material-handling": "/solutions/material-handling",
  "solutions-picking": "/solutions/picking",
  "solutions-software": "/solutions/software",
  "case-studies": "/case-studies",
  "case-studies-asrs": "/case-studies/asrs",
  "case-studies-material-handling": "/case-studies/material-handling",
  "case-studies-picking": "/case-studies/picking",
  "case-studies-project-warehouse-upgrade": "/case-studies/projects/automated-warehouse-upgrade",
  about: "/about",
  contact: "/contact"
};

export const TAILWIND_THEME_SCRIPT = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-secondary) / <alpha-value>)",
          "on-secondary": "rgb(var(--color-on-secondary) / <alpha-value>)",
          background: "rgb(var(--color-background) / <alpha-value>)",
          "on-background": "rgb(var(--color-on-background) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
          "surface-variant": "rgb(var(--color-surface-variant) / <alpha-value>)",
          "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
          outline: "rgb(var(--color-outline) / <alpha-value>)",
          "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
          "inverse-surface": "rgb(var(--color-inverse-surface) / <alpha-value>)",
          "inverse-on-surface": "rgb(var(--color-inverse-on-surface) / <alpha-value>)",
          "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
          "on-primary-container": "rgb(var(--color-on-primary-container) / <alpha-value>)",
          "secondary-container": "rgb(var(--color-secondary-container) / <alpha-value>)",
          "on-secondary-container": "rgb(var(--color-on-secondary-container) / <alpha-value>)",
          "primary-fixed": "rgb(var(--color-primary-fixed) / <alpha-value>)",
          "primary-fixed-dim": "rgb(var(--color-primary-fixed-dim) / <alpha-value>)",
          "secondary-fixed": "rgb(var(--color-secondary-fixed) / <alpha-value>)",
          "secondary-fixed-dim": "rgb(var(--color-secondary-fixed-dim) / <alpha-value>)",
          "surface-container": "rgb(var(--color-surface-container) / <alpha-value>)",
          "surface-container-low": "rgb(var(--color-surface-container-low) / <alpha-value>)",
          "surface-container-lowest": "rgb(var(--color-surface-container-lowest) / <alpha-value>)",
          "surface-container-high": "rgb(var(--color-surface-container-high) / <alpha-value>)",
          "surface-container-highest": "rgb(var(--color-surface-container-highest) / <alpha-value>)",
          "surface-dim": "rgb(var(--color-surface-dim) / <alpha-value>)",
          "surface-bright": "rgb(var(--color-surface-bright) / <alpha-value>)",
          "surface-tint": "rgb(var(--color-surface-tint) / <alpha-value>)",
          tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
          "on-tertiary": "rgb(var(--color-on-tertiary) / <alpha-value>)",
          "tertiary-container": "rgb(var(--color-tertiary-container) / <alpha-value>)",
          "on-tertiary-container": "rgb(var(--color-on-tertiary-container) / <alpha-value>)",
          "tertiary-fixed": "rgb(var(--color-tertiary-fixed) / <alpha-value>)",
          "tertiary-fixed-dim": "rgb(var(--color-tertiary-fixed-dim) / <alpha-value>)",
          "on-tertiary-fixed": "rgb(var(--color-on-tertiary-fixed) / <alpha-value>)",
          "on-tertiary-fixed-variant": "rgb(var(--color-on-tertiary-fixed-variant) / <alpha-value>)",
          "on-primary-fixed": "rgb(var(--color-on-primary-fixed) / <alpha-value>)",
          "on-primary-fixed-variant": "rgb(var(--color-on-primary-fixed-variant) / <alpha-value>)",
          "on-secondary-fixed": "rgb(var(--color-on-secondary-fixed) / <alpha-value>)",
          "on-secondary-fixed-variant": "rgb(var(--color-on-secondary-fixed-variant) / <alpha-value>)",
          error: "rgb(var(--color-error) / <alpha-value>)",
          "on-error": "rgb(var(--color-on-error) / <alpha-value>)",
          "error-container": "rgb(var(--color-error-container) / <alpha-value>)",
          "on-error-container": "rgb(var(--color-on-error-container) / <alpha-value>)"
        },
        borderRadius: {
          DEFAULT: "0.125rem",
          lg: "0.25rem",
          xl: "0.5rem",
          full: "9999px"
        },
        fontFamily: {
          headline: ["Manrope", "sans-serif"],
          body: ["Inter", "sans-serif"],
          label: ["Inter", "sans-serif"]
        }
      }
    }
  };
`;

"use client";

import { useEffect } from "react";

export function BodyPageAttributes({ pageKey, theme }) {
  useEffect(() => {
    const body = document.body;
    if (!body) {
      return undefined;
    }

    const previousPageKey = body.getAttribute("data-page-key");
    const previousTheme = body.getAttribute("data-hsa-theme");

    if (pageKey) {
      body.setAttribute("data-page-key", pageKey);
    } else {
      body.removeAttribute("data-page-key");
    }

    if (theme) {
      body.setAttribute("data-hsa-theme", theme);
    } else {
      body.removeAttribute("data-hsa-theme");
    }

    return () => {
      if (previousPageKey) {
        body.setAttribute("data-page-key", previousPageKey);
      } else {
        body.removeAttribute("data-page-key");
      }

      if (previousTheme) {
        body.setAttribute("data-hsa-theme", previousTheme);
      } else {
        body.removeAttribute("data-hsa-theme");
      }
    };
  }, [pageKey, theme]);

  return null;
}

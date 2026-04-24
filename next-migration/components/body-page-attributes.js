"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function toPageKey(pathname) {
  if (!pathname || pathname === "/") {
    return "home";
  }

  return pathname.replace(/^\/+/, "").replace(/\/+/g, "-");
}

export function BodyPageAttributes({ pageKey, theme }) {
  const pathname = usePathname();
  const resolvedPageKey = toPageKey(pathname) || pageKey || "home";

  useLayoutEffect(() => {
    const body = document.body;
    const shell = document.getElementById("hsa-content-shell");
    if (!body) {
      return undefined;
    }

    const previousPageKey = body.getAttribute("data-page-key");
    const previousTheme = body.getAttribute("data-hsa-theme");
    const previousShellPageKey = shell?.getAttribute("data-page-key");
    const previousShellTheme = shell?.getAttribute("data-hsa-theme");

    if (resolvedPageKey) {
      body.setAttribute("data-page-key", resolvedPageKey);
      shell?.setAttribute("data-page-key", resolvedPageKey);
    } else {
      body.removeAttribute("data-page-key");
      shell?.removeAttribute("data-page-key");
    }

    if (theme) {
      body.setAttribute("data-hsa-theme", theme);
      shell?.setAttribute("data-hsa-theme", theme);
    } else {
      body.removeAttribute("data-hsa-theme");
      shell?.removeAttribute("data-hsa-theme");
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

      if (shell) {
        if (previousShellPageKey) {
          shell.setAttribute("data-page-key", previousShellPageKey);
        } else {
          shell.removeAttribute("data-page-key");
        }

        if (previousShellTheme) {
          shell.setAttribute("data-hsa-theme", previousShellTheme);
        } else {
          shell.removeAttribute("data-hsa-theme");
        }
      }
    };
  }, [resolvedPageKey, theme]);

  return null;
}

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const root = document.documentElement;

  root.classList.add(prefersReducedMotion ? "motion-reduced" : "motion-enhanced");

  let revealObserver = null;
  let countupObserver = null;
  let refreshScheduled = false;

  function activateLiteYoutubeEmbeds() {
    document.querySelectorAll("[data-lite-youtube]").forEach((embed) => {
      const trigger = embed.querySelector("button");
      const url = embed.getAttribute("data-embed-url");
      const title =
        trigger?.getAttribute("aria-label")?.replace(/^Play\s+/, "") || "Video";

      if (!trigger || !url || trigger.dataset.bound === "true") {
        return;
      }

      trigger.dataset.bound = "true";
      trigger.addEventListener(
        "click",
        () => {
          if (embed.dataset.loaded === "true") {
            return;
          }

          const iframe = document.createElement("iframe");
          iframe.className = "h-full w-full border-0";
          iframe.src = url;
          iframe.title = title;
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.referrerPolicy = "strict-origin-when-cross-origin";
          iframe.loading = "eager";

          embed.dataset.loaded = "true";
          embed.innerHTML = "";
          embed.appendChild(iframe);
        },
        { once: true }
      );
    });
  }

  function uniqueNodes(nodes) {
    return Array.from(new Set(nodes.filter(Boolean)));
  }

  function queryAll(selectors) {
    return uniqueNodes(
      selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)))
    );
  }

  function isButtonLikeAnchor(element) {
    const className =
      typeof element.className === "string" ? element.className : "";

    return (
      /bg-|hero-button|secondary-button|link-chip|shell-cta|hsa-ui-btn-primary|hsa-ui-btn-secondary|hsa-ui-btn-light/.test(className) ||
      (className.includes("px-") && className.includes("py-"))
    );
  }

  function markButtons() {
    const targets = queryAll([
      "button[class]",
      "a[href][class]",
      ".hero-button",
      ".secondary-button",
      ".link-chip",
      ".shell-cta",
      ".hsa-ui-btn-primary",
      ".hsa-ui-btn-secondary",
      ".hsa-ui-btn-light",
    ]);

    targets.forEach((element) => {
      if (element.closest(".hsa-chat-message")) {
        return;
      }

      if (element.hasAttribute("data-motion-static")) {
        return;
      }

      if (
        element.tagName === "BUTTON" ||
        (element.tagName === "A" && isButtonLikeAnchor(element))
      ) {
        element.setAttribute("data-motion-button", "");
      }
    });
  }

  activateLiteYoutubeEmbeds();

  function markCards() {
    const targets = queryAll([
      ".card-panel",
      ".metric-panel",
      ".faq-item",
      ".structured-form",
      ".kinetic-card",
      ".hsa-ui-card",
      ".hsa-ui-card--interactive",
      ".page-content a.group[href]",
      '.page-content div[class*="border"][class*="bg-white"]',
      '.page-content div[class*="border"][class*="bg-surface-container-low"]',
      '.page-content div[class*="border"][class*="bg-surface-container-lowest"]',
      '.page-content div[class*="border"][class*="bg-primary"]',
    ]);

    targets.forEach((element) => {
      if (element.closest(".hsa-chat-widget")) {
        return;
      }

      if (
        element.classList.contains("shell-header") ||
        element.classList.contains("shell-main") ||
        element.classList.contains("shell-footer")
      ) {
        return;
      }

      element.setAttribute("data-motion-card", "");
    });
  }

  function observeRevealTargets() {
    const targets = uniqueNodes([
      ...queryAll([
        "main section",
        ".page-content > section",
        ".shell-main > section",
        ".shell-main > div > section",
      ]),
      ...Array.from(document.querySelectorAll("[data-motion-card]")),
    ]);

    targets.forEach((element, index) => {
      if (element.closest(".hsa-chat-widget")) {
        return;
      }

      if (!element.hasAttribute("data-motion-reveal")) {
        element.setAttribute("data-motion-reveal", "");
      }

      if (!element.style.getPropertyValue("--motion-delay")) {
        const delayStep = element.hasAttribute("data-motion-card") ? 40 : 70;
        const delayCap = element.hasAttribute("data-motion-card") ? 200 : 210;
        element.style.setProperty(
          "--motion-delay",
          `${Math.min((index % 6) * delayStep, delayCap)}ms`
        );
      }

      if (prefersReducedMotion) {
        element.classList.add("is-motion-visible");
        return;
      }

      if (!element.dataset.motionRevealObserved && revealObserver) {
        element.dataset.motionRevealObserved = "true";
        revealObserver.observe(element);
      }
    });
  }

  function extractCountText(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function isCountupCandidate(element) {
    const text = extractCountText(element);

    if (!text || !/\d/.test(text)) {
      return false;
    }

    if (
      element.closest("button, form, label, h1, h2, h3, h4, h5, h6, .hsa-chat-widget")
    ) {
      return false;
    }

    if (element.childElementCount > 0) {
      return false;
    }

    if (text.length > 18) {
      return false;
    }

    if (/^(19|20)\d{2}$/.test(text) || /^0\d$/.test(text)) {
      return false;
    }

    return /-?\d+(?:,\d{3})*(?:\.\d+)?/.test(text);
  }

  function parseMetricTokens(source) {
    const regex = /-?\d+(?:,\d{3})*(?:\.\d+)?/g;
    const tokens = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(source))) {
      const raw = match[0];

      tokens.push({
        type: "text",
        value: source.slice(lastIndex, match.index),
      });
      tokens.push({
        type: "number",
        value: Number(raw.replace(/,/g, "")),
        decimals: (raw.split(".")[1] || "").length,
        grouped: raw.includes(","),
      });

      lastIndex = match.index + raw.length;
    }

    tokens.push({
      type: "text",
      value: source.slice(lastIndex),
    });

    return tokens;
  }

  function formatMetricNumber(value, decimals, grouped) {
    const safeValue = Math.abs(value) < 0.0001 ? 0 : value;

    return safeValue.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouped,
    });
  }

  function buildMetricText(tokens, progress) {
    return tokens
      .map((token) => {
        if (token.type === "text") {
          return token.value;
        }

        return formatMetricNumber(token.value * progress, token.decimals, token.grouped);
      })
      .join("");
  }

  function runCountup(element) {
    if (element.dataset.countupAnimated === "true") {
      return;
    }

    const source = element.dataset.countupSource || extractCountText(element);
    const tokens = parseMetricTokens(source);
    const hasNumber = tokens.some((token) => token.type === "number");

    if (!hasNumber) {
      return;
    }

    element.dataset.countupAnimated = "true";

    const duration = 1000;
    const start = performance.now();

    element.textContent = buildMetricText(tokens, 0);

    function tick(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      element.textContent = buildMetricText(tokens, eased);

      if (elapsed < 1) {
        window.requestAnimationFrame(tick);
        return;
      }

      element.textContent = source;
    }

    window.requestAnimationFrame(tick);
  }

  function observeCountups() {
    const targets = Array.from(document.querySelectorAll("[data-countup]"));

    targets.forEach((element) => {
      if (element.dataset.countupReady === "true") {
        return;
      }

      element.dataset.countupReady = "true";
      element.dataset.countupSource = extractCountText(element);

      if (prefersReducedMotion) {
        return;
      }

      if (countupObserver) {
        countupObserver.observe(element);
      }
    });
  }

  function refreshMotionEnhancements() {
    markButtons();
    markCards();
    observeRevealTargets();
    observeCountups();
  }

  function scheduleRefresh() {
    if (refreshScheduled) {
      return;
    }

    refreshScheduled = true;

    window.requestAnimationFrame(() => {
      refreshScheduled = false;
      refreshMotionEnhancements();
    });
  }

  if (!prefersReducedMotion) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-motion-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    countupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          runCountup(entry.target);
          countupObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.42,
      }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshMotionEnhancements, {
      once: true,
    });
  } else {
    refreshMotionEnhancements();
  }

  window.addEventListener("pageshow", scheduleRefresh);
})();

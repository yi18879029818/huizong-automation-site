const AGENT_PROFILES = [
  {
    id: "openai",
    family: "openai",
    strategy: "markdown",
    patterns: [/GPTBot/i, /ChatGPT-User/i, /OAI-SearchBot/i]
  },
  {
    id: "anthropic",
    family: "anthropic",
    strategy: "markdown",
    patterns: [/ClaudeBot/i, /Claude-Web/i, /anthropic-ai/i]
  },
  {
    id: "perplexity",
    family: "perplexity",
    strategy: "markdown",
    patterns: [/PerplexityBot/i, /Perplexity-User/i]
  },
  {
    id: "google-extended",
    family: "google",
    strategy: "html-with-index",
    patterns: [/Google-Extended/i, /GoogleOther/i]
  },
  {
    id: "common-crawler",
    family: "crawler",
    strategy: "markdown",
    patterns: [
      /CCBot/i,
      /Bytespider/i,
      /Meta-ExternalAgent/i,
      /Meta-ExternalFetcher/i,
      /Diffbot/i,
      /YouBot/i,
      /cohere-ai/i,
      /Amazonbot/i
    ]
  }
];

const EXCLUDED_PREFIXES = ["/api", "/_next", "/assets", "/favicon", "/images"];
const EXCLUDED_EXACT_PATHS = ["/robots.txt", "/sitemap.xml", "/llms.txt"];
const STATIC_FILE_PATTERN = /\.[a-z0-9]+$/i;

function normalizePathname(pathname = "/") {
  if (!pathname || pathname === "") {
    return "/";
  }

  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

function isHtmlLikeRoute(pathname) {
  if (!STATIC_FILE_PATTERN.test(pathname)) {
    return true;
  }

  return pathname.endsWith(".html");
}

export function isStructuredPathname(pathname = "/") {
  const normalized = normalizePathname(pathname);

  if (EXCLUDED_EXACT_PATHS.includes(normalized)) {
    return false;
  }

  if (EXCLUDED_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return false;
  }

  if (!isHtmlLikeRoute(normalized)) {
    return false;
  }

  return (
    normalized === "/" ||
    normalized === "/about" ||
    normalized === "/about.html" ||
    normalized === "/contact" ||
    normalized === "/contact.html" ||
    normalized === "/products" ||
    normalized === "/products/index.html" ||
    normalized.startsWith("/products/") ||
    normalized === "/solutions" ||
    normalized === "/solutions/index.html" ||
    normalized.startsWith("/solutions/") ||
    normalized === "/case-studies" ||
    normalized === "/case-studies/index.html" ||
    normalized.startsWith("/case-studies/")
  );
}

export function isAiUserAgent(userAgent = "") {
  return AGENT_PROFILES.some((profile) =>
    profile.patterns.some((pattern) => pattern.test(userAgent))
  );
}

export function getAgentProfile(userAgent = "") {
  const matched = AGENT_PROFILES.find((profile) =>
    profile.patterns.some((pattern) => pattern.test(userAgent))
  );

  return (
    matched || {
      id: "human",
      family: "human",
      strategy: "html",
      patterns: []
    }
  );
}

export function shouldServeMarkdownView({ pathname = "/", searchParams, userAgent = "", method }) {
  if ((method || "GET").toUpperCase() !== "GET") {
    return false;
  }

  if (!isStructuredPathname(pathname)) {
    return false;
  }

  if (searchParams?.get("view") === "markdown") {
    return true;
  }

  return getAgentProfile(userAgent).strategy === "markdown";
}

export function getAgentResponsePolicy({ pathname = "/", searchParams, userAgent = "", method }) {
  if ((method || "GET").toUpperCase() !== "GET" || !isStructuredPathname(pathname)) {
    return {
      profile: getAgentProfile(userAgent),
      response: "html"
    };
  }

  if (searchParams?.get("view") === "markdown") {
    return {
      profile: getAgentProfile(userAgent),
      response: "markdown"
    };
  }

  const profile = getAgentProfile(userAgent);

  return {
    profile,
    response: profile.strategy === "markdown" ? "markdown" : "html"
  };
}

import { createSign } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SEO_KEYWORD_SOURCE } from "../lib/seo-keyword-source.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.SEO_SITE_URL || "https://www.coolyne.com").replace(/\/$/, "");
const outputPath = resolve(
  projectRoot,
  process.env.SEO_AUDIT_OUTPUT || "docs/seo-api-audit.json"
);

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function jsonBase64Url(value) {
  return base64Url(JSON.stringify(value));
}

function dateOffset(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function readJsonResponse(response) {
  const text = await response.text();
  let body;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { raw: text.slice(0, 1000) };
  }

  if (!response.ok) {
    const detail = body?.error?.message || body?.error || body?.raw || response.statusText;
    const error = new Error(`${response.status} ${detail}`);
    error.status = response.status;
    throw error;
  }

  return body;
}

async function runPageSpeed(url, strategy) {
  const endpoint = new URL("https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    endpoint.searchParams.append("category", category);
  }

  if (process.env.PAGESPEED_API_KEY) {
    endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  const data = await readJsonResponse(await fetch(endpoint));
  const categories = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};

  return {
    url,
    strategy,
    analyzedAt: data.analysisUTCTimestamp || null,
    scores: Object.fromEntries(
      ["performance", "accessibility", "best-practices", "seo"].map((name) => [
        name,
        typeof categories[name]?.score === "number" ? Math.round(categories[name].score * 100) : null
      ])
    ),
    metrics: {
      lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
      inp: audits["interaction-to-next-paint"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      fcp: audits["first-contentful-paint"]?.numericValue ?? null
    }
  };
}

function expandEnvironment(value) {
  return value.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => process.env[name] || "");
}

async function loadCredentialConfig() {
  const source =
    process.env.GSC_EXTERNAL_ACCOUNT_JSON ||
    process.env.GSC_EXTERNAL_ACCOUNT_FILE ||
    process.env.GSC_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!source) {
    return null;
  }

  const raw = source.trim().startsWith("{")
    ? source
    : await readFile(resolve(process.cwd(), expandEnvironment(source)), "utf8");
  return JSON.parse(raw);
}

async function readExternalSubjectToken(config) {
  const source = config.credential_source || {};
  let raw;

  if (source.file) {
    raw = await readFile(resolve(process.cwd(), expandEnvironment(source.file)), "utf8");
  } else if (source.url) {
    const headers = Object.fromEntries(
      Object.entries(source.headers || {}).map(([key, value]) => [key, expandEnvironment(value)])
    );
    const response = await fetch(expandEnvironment(source.url), { headers });
    raw = await response.text();
    if (!response.ok) {
      throw new Error(`External identity subject token request failed: ${response.status} ${raw.slice(0, 500)}`);
    }
  } else {
    throw new Error("External account credential_source must define file or url.");
  }

  const format = source.format || { type: "text" };
  if (format.type === "json") {
    const parsed = JSON.parse(raw);
    raw = format.subject_token_field_name ? parsed?.[format.subject_token_field_name] : parsed;
  }

  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("External account subject token is empty.");
  }

  return raw.trim();
}

async function exchangeExternalAccount(config) {
  const subjectToken = await readExternalSubjectToken(config);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    audience: config.audience,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
    subject_token_type: config.subject_token_type,
    subject_token: subjectToken
  });
  const stsToken = await readJsonResponse(
    await fetch(config.token_url || "https://sts.googleapis.com/v1/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body
    })
  );

  if (!config.service_account_impersonation_url) {
    return stsToken.access_token;
  }

  const impersonation = await readJsonResponse(
    await fetch(expandEnvironment(config.service_account_impersonation_url), {
      method: "POST",
      headers: {
        authorization: `Bearer ${stsToken.access_token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        scope: ["https://www.googleapis.com/auth/webmasters.readonly"],
        lifetime: "3600s"
      })
    })
  );

  return impersonation.accessToken;
}

async function getSearchConsoleAccessToken() {
  if (process.env.GSC_ACCESS_TOKEN) {
    return process.env.GSC_ACCESS_TOKEN;
  }

  const credentialConfig = await loadCredentialConfig();
  if (credentialConfig?.type === "external_account") {
    return exchangeExternalAccount(credentialConfig);
  }

  const serviceAccount = credentialConfig;
  if (!serviceAccount?.client_email || !serviceAccount?.private_key) {
    throw new Error(
      "GSC credentials are missing. Set GSC_ACCESS_TOKEN, an external account file, or a service account JSON file."
    );
  }

  const header = jsonBase64Url({ alg: "RS256", typ: "JWT" });
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = jsonBase64Url({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600
  });
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const assertion = `${unsignedToken}.${base64Url(signer.sign(serviceAccount.private_key))}`;
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion
  });

  const response = await readJsonResponse(
    await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body
    })
  );

  return response.access_token;
}

async function querySearchConsole() {
  const property = process.env.GSC_PROPERTY || `${siteUrl}/`;
  const accessToken = await getSearchConsoleAccessToken();
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const startDate = process.env.GSC_START_DATE || dateOffset(-28);
  const endDate = process.env.GSC_END_DATE || dateOffset(-1);
  const body = {
    startDate,
    endDate,
    dimensions: ["page", "query"],
    rowLimit: 25000,
    dataState: "all"
  };

  const data = await readJsonResponse(
    await fetch(endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
  );
  const targetRoutes = new Set(SEO_KEYWORD_SOURCE.map((entry) => entry.route));
  const rows = Array.isArray(data.rows) ? data.rows : [];

  return {
    property,
    startDate,
    endDate,
    rowCount: rows.length,
    matchedRows: rows.filter((row) => {
      const page = row.keys?.[0] || "";
      return [...targetRoutes].some((route) => page === `${siteUrl}${route}` || page === `${siteUrl}${route}/`);
    }),
    rows
  };
}

async function run() {
  const strategies = (process.env.PAGESPEED_STRATEGIES || "mobile")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value === "mobile" || value === "desktop");
  const pageLimit = Math.max(1, Number(process.env.PAGESPEED_LIMIT || SEO_KEYWORD_SOURCE.length));
  const pages = SEO_KEYWORD_SOURCE.slice(0, pageLimit);
  const report = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    keywordSource: {
      file: "2026-07-10-coolyne-seo-geo-page-mapping(1)(1).xlsx",
      sheet: "Page Mapping",
      pageCount: SEO_KEYWORD_SOURCE.length,
      entries: SEO_KEYWORD_SOURCE
    },
    pageSpeed: {
      status: "not_configured",
      apiKeyConfigured: Boolean(process.env.PAGESPEED_API_KEY),
      strategies,
      results: [],
      errors: []
    },
    searchConsole: {
      status: "not_configured",
      property: process.env.GSC_PROPERTY || `${siteUrl}/`,
      rows: [],
      matchedRows: [],
      errors: []
    }
  };

  for (const strategy of strategies) {
    for (const entry of pages) {
      try {
        report.pageSpeed.results.push(await runPageSpeed(`${siteUrl}${entry.route}`, strategy));
        report.pageSpeed.status = "connected";
      } catch (error) {
        report.pageSpeed.status = "error";
        report.pageSpeed.errors.push({
          url: `${siteUrl}${entry.route}`,
          strategy,
          message: error.message,
          status: error.status || null
        });
        if (error.status === 429) {
          break;
        }
      }
    }
  }

  try {
    const searchConsole = await querySearchConsole();
    report.searchConsole = {
      ...report.searchConsole,
      ...searchConsole,
      status: "connected",
      errors: []
    };
  } catch (error) {
    report.searchConsole.status = error.message.startsWith("GSC credentials are missing")
      ? "not_configured"
      : "error";
    report.searchConsole.errors = [{ message: error.message, status: error.status || null }];
  }

  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`SEO API audit written to ${outputPath}`);
  console.log(`PageSpeed: ${report.pageSpeed.status}; Search Console: ${report.searchConsole.status}`);

  if (
    process.env.SEO_AUDIT_STRICT === "1" &&
    (report.pageSpeed.status !== "connected" || report.searchConsole.status !== "connected")
  ) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function resolveAutomationEnv() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env) {
      return env;
    }
  } catch (_error) {
    // Fall back to process.env during plain Next.js local dev.
  }

  return process.env || {};
}

function joinUrl(baseUrl, path) {
  return `${String(baseUrl).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

function decodeBasicAuthUsername(header) {
  if (!header || !header.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = header.slice(6).trim();
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return decoded.slice(0, separatorIndex).trim() || null;
  } catch (_error) {
    return null;
  }
}

function buildTraceContext(request, requestedAction) {
  const actor =
    decodeBasicAuthUsername(request?.headers?.get("authorization")) || "internal-basic-auth";

  return {
    traceId: crypto.randomUUID(),
    actor,
    sourceClient: "huizong-automation-site",
    requestedAction: requestedAction || null,
  };
}

function automationProxyConfig(env) {
  const baseUrl = env.HUIZONG_API_BASE_URL || env.NEXT_PUBLIC_HUIZONG_API_BASE_URL || "";
  const internalToken = env.HUIZONG_INTERNAL_API_TOKEN || "";

  return {
    baseUrl,
    internalToken,
  };
}

export function automationProxyConfigSnapshot(env) {
  const { baseUrl, internalToken } = automationProxyConfig(env);

  return {
    baseUrlConfigured: Boolean(baseUrl),
    internalTokenConfigured: Boolean(internalToken),
    baseUrlOrigin: baseUrl ? new URL(baseUrl).origin : null,
  };
}

export async function proxyAutomationRequest(
  path,
  { method = "GET", body, timeoutMs = 15000, request, requestedAction } = {}
) {
  const env = await resolveAutomationEnv();
  const { baseUrl, internalToken } = automationProxyConfig(env);
  const trace = buildTraceContext(request, requestedAction);

  if (!baseUrl || !internalToken) {
    const response = Response.json(
      {
        ok: false,
        error: "AUTOMATION_PROXY_NOT_CONFIGURED",
        trace,
        details: automationProxyConfigSnapshot(env),
      },
      { status: 503 }
    );
    response.headers.set("x-automation-trace-id", trace.traceId);
    return response;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(joinUrl(baseUrl, path), {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-token": internalToken,
        "x-automation-trace-id": trace.traceId,
        "x-automation-actor": trace.actor,
        "x-automation-source-client": trace.sourceClient,
        ...(trace.requestedAction
          ? {
              "x-automation-requested-action": trace.requestedAction,
            }
          : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : { ok: response.ok, raw: await response.text() };

    const responsePayload =
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? {
            ...payload,
            trace:
              payload.trace && typeof payload.trace === "object"
                ? payload.trace
                : trace,
          }
        : {
            ok: response.ok,
            result: payload,
            trace,
          };

    const proxyResponse = Response.json(responsePayload, {
      status: response.status,
    });
    proxyResponse.headers.set(
      "x-automation-trace-id",
      response.headers.get("x-automation-trace-id") || trace.traceId
    );
    return proxyResponse;
  } catch (error) {
    const isAbortError = error instanceof Error && error.name === "AbortError";

    const response = Response.json(
      {
        ok: false,
        error: isAbortError ? "AUTOMATION_PROXY_TIMEOUT" : "AUTOMATION_PROXY_UPSTREAM_UNREACHABLE",
        trace,
        details: {
          ...automationProxyConfigSnapshot(env),
          path,
          method,
          timeoutMs,
          message:
            error instanceof Error ? error.message : "Unknown upstream automation proxy error.",
        },
      },
      { status: isAbortError ? 504 : 502 }
    );
    response.headers.set("x-automation-trace-id", trace.traceId);
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

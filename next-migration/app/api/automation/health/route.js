import {
  automationProxyConfigSnapshot,
  proxyAutomationRequest,
  resolveAutomationEnv,
} from "@/lib/automation-api";

export async function GET(request) {
  const env = await resolveAutomationEnv();
  const config = automationProxyConfigSnapshot(env);

  if (!config.baseUrlConfigured || !config.internalTokenConfigured) {
    return Response.json(
      {
        ok: false,
        configured: false,
        site_proxy: config,
        upstream_bridge: null,
      },
      { status: 503 }
    );
  }

  const upstreamResponse = await proxyAutomationRequest("/api/internal/automation/status", {
    method: "GET",
    timeoutMs: 10000,
    request,
    requestedAction: "health_check",
  });

  const payload = await upstreamResponse.json();

  return Response.json(
    {
      ok: upstreamResponse.ok,
      configured: true,
      site_proxy: config,
      upstream_bridge: payload,
    },
    { status: upstreamResponse.status }
  );
}

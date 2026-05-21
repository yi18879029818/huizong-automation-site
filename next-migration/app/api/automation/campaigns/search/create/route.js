import { getCloudflareContext } from "@opennextjs/cloudflare";
import { recordAutomationAudit } from "@/lib/automation-audit-store";
import { proxyAutomationRequest } from "@/lib/automation-api";

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true });
  const body = await request.json();
  const response = await proxyAutomationRequest("/api/internal/automation/campaigns/search/create", {
    method: "POST",
    body,
    request,
    requestedAction: "create_search_ad",
  });

  let responsePayload = null;
  try {
    responsePayload = await response.clone().json();
  } catch (_error) {
    responsePayload = null;
  }

  try {
    await recordAutomationAudit(env?.FORM_DB, {
      traceId:
        response.headers.get("x-automation-trace-id") ||
        responsePayload?.trace?.traceId ||
        null,
      actor: responsePayload?.trace?.actor || null,
      sourceClient: responsePayload?.trace?.sourceClient || "huizong-automation-site",
      requestedAction:
        responsePayload?.trace?.requestedAction || "create_search_ad",
      requestMethod: "POST",
      requestPath: "/api/automation/campaigns/search/create",
      requestPayload: body,
      responsePayload,
      success: response.ok,
      upstreamStatus: response.status,
    });
  } catch (_error) {
    // Do not block the upstream automation trigger if audit persistence fails.
  }

  return response;
}

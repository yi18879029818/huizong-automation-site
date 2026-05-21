import { proxyAutomationRequest } from "@/lib/automation-api";

export async function GET(request) {
  return proxyAutomationRequest("/api/internal/automation/summary", {
    request,
    requestedAction: "summary",
  });
}

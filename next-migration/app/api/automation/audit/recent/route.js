import { getCloudflareContext } from "@opennextjs/cloudflare";
import { listRecentAutomationAuditEntries } from "@/lib/automation-audit-store";

export async function GET(request) {
  const { env } = await getCloudflareContext({ async: true });
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") || 20);
  const items = await listRecentAutomationAuditEntries(env?.FORM_DB, limit);

  return Response.json({
    ok: true,
    items,
    count: items.length,
  });
}

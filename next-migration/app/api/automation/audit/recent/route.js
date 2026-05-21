import { getCloudflareContext } from "@opennextjs/cloudflare";
import { listRecentAutomationAuditEntries } from "@/lib/automation-audit-store";

export async function GET(request) {
  const { env } = await getCloudflareContext({ async: true });
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") || 20);

  try {
    const items = await listRecentAutomationAuditEntries(env?.FORM_DB, limit);

    return Response.json({
      ok: true,
      items,
      count: items.length,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: "AUTOMATION_AUDIT_READ_FAILED",
        details: {
          message:
            error instanceof Error
              ? error.message
              : "Unknown automation audit read error.",
        },
      },
      { status: 500 }
    );
  }
}

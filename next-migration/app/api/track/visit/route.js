import { getCloudflareContext } from "@opennextjs/cloudflare";
import { recordVisit } from "@/lib/visitor-store.mjs";

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.FORM_DB) {
    return Response.json({ ok: false, error: "Tracking storage is not configured." }, { status: 503 });
  }

  try {
    const visit = await recordVisit(env.FORM_DB, request, await request.json());
    return Response.json({ ok: true, visit });
  } catch (error) {
    console.error("Track visit failed", error);
    return Response.json({ ok: false, error: "Unable to record visit." }, { status: 400 });
  }
}

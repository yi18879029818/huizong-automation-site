import { getCloudflareContext } from "@opennextjs/cloudflare";
import { recordConversion } from "@/lib/visitor-store.mjs";

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.FORM_DB) {
    return Response.json({ ok: false, error: "Tracking storage is not configured." }, { status: 503 });
  }

  try {
    const recorded = await recordConversion(env.FORM_DB, await request.json());
    return Response.json({ ok: recorded, error: recorded ? undefined : "Missing visitor or session identifier." }, { status: recorded ? 200 : 400 });
  } catch (error) {
    console.error("Track conversion failed", error);
    return Response.json({ ok: false, error: "Unable to record conversion." }, { status: 400 });
  }
}

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { completePageview } from "@/lib/visitor-store.mjs";

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true });

  if (!env.FORM_DB) {
    return Response.json({ ok: false, error: "Tracking storage is not configured." }, { status: 503 });
  }

  try {
    const recorded = await completePageview(env.FORM_DB, await request.json());
    return Response.json({ ok: recorded, error: recorded ? undefined : "Missing pageview or session identifier." }, { status: recorded ? 200 : 400 });
  } catch (error) {
    console.error("Track pageview completion failed", error);
    return Response.json({ ok: false, error: "Unable to finalize pageview." }, { status: 400 });
  }
}

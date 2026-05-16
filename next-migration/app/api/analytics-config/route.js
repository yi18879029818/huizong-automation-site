import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

function trimValue(value, limit = 64) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });
  const measurementId = trimValue(env.GA4_MEASUREMENT_ID);

  return Response.json(
    {
      ok: true,
      enabled: Boolean(measurementId),
      measurementId
    },
    {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    }
  );
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8"
    }
  });
}

function trimValue(value, limit = 64) {
  return (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

export async function onRequestGet(context) {
  const measurementId = trimValue(context.env.GA4_MEASUREMENT_ID);

  return json({
    ok: true,
    enabled: Boolean(measurementId),
    measurementId
  });
}

import { json } from "../../_lib/admin-auth.js";
import { recordConversion } from "../../_lib/visitor-store.js";

async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.indexOf("application/json") !== -1) {
    return request.json();
  }

  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

export async function onRequestPost(context) {
  if (!context.env.FORM_DB) {
    return json({ ok: false, error: "FORM_DB binding is not configured." }, 500);
  }

  try {
    const payload = await parseBody(context.request);
    await recordConversion(context.env.FORM_DB, payload || {});
    return json({ ok: true });
  } catch (error) {
    console.error("Track conversion failed", error);
    return json(
      {
        ok: false,
        error: "Unable to record conversion.",
        details: error && error.message ? error.message : String(error)
      },
      500
    );
  }
}

import { adminCorsHeaders, createAdminOptionsResponse, requireAdminAuth, json } from "../../_lib/admin-auth.js";
import { getSubmissionStats } from "../../_lib/form-store.js";

export function onRequestOptions() {
  return createAdminOptionsResponse();
}

export async function onRequestGet(context) {
  const auth = requireAdminAuth(context.request, context.env);

  if (!auth.ok) {
    return auth.response;
  }

  if (!context.env.FORM_DB) {
    return json(
      {
        ok: false,
        error: "FORM_DB binding is not configured."
      },
      500,
      adminCorsHeaders()
    );
  }

  try {
    const stats = await getSubmissionStats(context.env.FORM_DB);
    return json({ ok: true, stats }, 200, adminCorsHeaders());
  } catch (error) {
    console.error("Admin stats query failed", error);
    return json(
      {
        ok: false,
        error: "Unable to load stats.",
        details: error && error.message ? error.message : String(error)
      },
      500,
      adminCorsHeaders()
    );
  }
}

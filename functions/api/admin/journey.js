import { adminCorsHeaders, createAdminOptionsResponse, requireAdminAuth, json } from "../../_lib/admin-auth.js";
import { getJourneyDetail } from "../../_lib/visitor-store.js";

export function onRequestOptions() {
  return createAdminOptionsResponse();
}

export async function onRequestGet(context) {
  const auth = requireAdminAuth(context.request, context.env);
  const url = new URL(context.request.url);
  const sessionId = url.searchParams.get("id");

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
    const detail = await getJourneyDetail(context.env.FORM_DB, sessionId);

    if (!detail) {
      return json(
        {
          ok: false,
          error: "Visitor journey was not found."
        },
        404,
        adminCorsHeaders()
      );
    }

    return json({ ok: true, detail }, 200, adminCorsHeaders());
  } catch (error) {
    console.error("Admin journey detail query failed", error);
    return json(
      {
        ok: false,
        error: "Unable to load visitor journey detail.",
        details: error && error.message ? error.message : String(error)
      },
      500,
      adminCorsHeaders()
    );
  }
}

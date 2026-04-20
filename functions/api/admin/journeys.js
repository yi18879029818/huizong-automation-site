import { adminCorsHeaders, createAdminOptionsResponse, requireAdminAuth, json } from "../../_lib/admin-auth.js";
import { getJourneySummary } from "../../_lib/visitor-store.js";

export function onRequestOptions() {
  return createAdminOptionsResponse();
}

export async function onRequestGet(context) {
  const auth = requireAdminAuth(context.request, context.env);
  const url = new URL(context.request.url);

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
    const data = await getJourneySummary(context.env.FORM_DB, {
      search: url.searchParams.get("search"),
      startDate: url.searchParams.get("startDate"),
      endDate: url.searchParams.get("endDate")
    });

    return json({ ok: true, data }, 200, adminCorsHeaders());
  } catch (error) {
    console.error("Admin journeys query failed", error);
    return json(
      {
        ok: false,
        error: "Unable to load visitor journeys.",
        details: error && error.message ? error.message : String(error)
      },
      500,
      adminCorsHeaders()
    );
  }
}

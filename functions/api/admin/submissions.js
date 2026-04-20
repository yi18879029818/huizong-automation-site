import { adminCorsHeaders, createAdminOptionsResponse, requireAdminAuth, json } from "../../_lib/admin-auth.js";
import { getRecentSubmissions } from "../../_lib/form-store.js";

export function onRequestOptions() {
  return createAdminOptionsResponse();
}

export async function onRequestGet(context) {
  const auth = requireAdminAuth(context.request, context.env);
  const url = new URL(context.request.url);
  const limit = url.searchParams.get("limit");

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
    const submissions = await getRecentSubmissions(context.env.FORM_DB, limit);
    return json({ ok: true, submissions }, 200, adminCorsHeaders());
  } catch (error) {
    console.error("Admin submissions query failed", error);
    return json(
      {
        ok: false,
        error: "Unable to load submissions.",
        details: error && error.message ? error.message : String(error)
      },
      500,
      adminCorsHeaders()
    );
  }
}

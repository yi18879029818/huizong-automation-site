export const dynamic = "force-static";

const VERIFICATION_CONTENT = "google-site-verification: google40a155700db0be9e.html";

export async function GET() {
  return new Response(VERIFICATION_CONTENT, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=3600"
    }
  });
}

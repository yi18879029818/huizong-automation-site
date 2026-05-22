import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleContactSubmission } from "@/lib/contact-service";

export async function POST(request) {
  let env = process.env || {};

  try {
    const context = await getCloudflareContext({ async: true });
    if (context?.env) {
      env = context.env;
    }
  } catch {
    // Fall back to process.env during plain Next.js local dev.
  }

  return handleContactSubmission(request, env);
}

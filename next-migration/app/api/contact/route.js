import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleContactSubmission } from "@/lib/contact-service";

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true });
  return handleContactSubmission(request, env);
}

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleOpenAIImageGeneration } from "@/lib/openai-image-service";

export async function POST(request) {
  let env = process.env;

  try {
    const context = await getCloudflareContext({ async: true });
    if (context && context.env) {
      env = context.env;
    }
  } catch {
    // Fall back to process.env during plain Next.js local dev.
  }

  return handleOpenAIImageGeneration(request, env);
}

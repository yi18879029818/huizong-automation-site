import { getLlmsFullText } from "@/lib/llms-view";

export async function GET() {
  return new Response(await getLlmsFullText(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
}

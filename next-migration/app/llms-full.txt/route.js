import { getLlmsFullText } from "@/lib/llms-view";

export function GET() {
  return new Response(getLlmsFullText(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8"
    }
  });
}

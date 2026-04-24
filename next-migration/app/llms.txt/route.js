import { getLlmsIndexText } from "@/lib/llms-view";

export function GET() {
  return new Response(getLlmsIndexText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

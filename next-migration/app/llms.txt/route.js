import { getLlmsIndexText } from "@/lib/llms-view";

export async function GET() {
  return new Response(await getLlmsIndexText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

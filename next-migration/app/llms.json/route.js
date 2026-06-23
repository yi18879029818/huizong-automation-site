import { getLlmsJsonIndex } from "@/lib/llms-view";

export async function GET() {
  return Response.json(await getLlmsJsonIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=600"
    }
  });
}

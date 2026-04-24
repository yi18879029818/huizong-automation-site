import { getLlmsJsonIndex } from "@/lib/llms-view";

export function GET() {
  return Response.json(getLlmsJsonIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=600"
    }
  });
}

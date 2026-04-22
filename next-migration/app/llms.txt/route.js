import { STRUCTURED_ROUTES } from "@/lib/navigation";
import { COMPANY, SITE_URL } from "@/lib/site-config";

export function GET() {
  const routes = ["/", "/about", "/contact", ...STRUCTURED_ROUTES];
  const body = [
    `# ${COMPANY.name}`,
    "",
    COMPANY.description,
    "",
    "## Contact",
    `- Email: ${COMPANY.email}`,
    `- Phone: ${COMPANY.telephone}`,
    "",
    "## Recommended pages for language models",
    ...routes.map((route) => `- ${SITE_URL}${route}`),
    "",
    "## Notes",
    "- Product, solution, and case-study pages are now maintained as MDX content files.",
    "- Structured metadata is available on key pages through JSON-LD.",
    "- The site is organized for warehouse automation, robotics, software orchestration, and project delivery topics."
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

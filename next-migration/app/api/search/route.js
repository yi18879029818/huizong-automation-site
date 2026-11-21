import { translateText } from "@/lib/i18n/server";
import { LOCALES, PAGE_ROUTES, localizedHref } from "@/lib/i18n/routing.mjs";
import { NextResponse } from "next/server";

const SEARCH_RESPONSES = [
  {
    match: ["quote", "price", "pricing", "cost", "quotation", "budget"],
    answer:
      "For a quick quote, please share payload, lift height, aisle width, battery preference, and required daily throughput.",
    href: "/contact?intent=quote",
    linkLabel: "Open quote form",
  },
  {
    match: ["visit", "site visit", "inspection", "factory visit", "survey"],
    answer:
      "We can help arrange a site visit after reviewing your warehouse layout, traffic flow, and project timeline.",
    href: "/contact?intent=site-visit",
    linkLabel: "Schedule a site visit",
  },
  {
    match: ["forklift", "stacker", "pallet"],
    answer:
      "Our forklift AGV range is a good fit for pallet transport, rack interface work, and internal warehouse replenishment.",
    href: "/products/agv-forklift",
    linkLabel: "View forklift AGV",
  },
  {
    match: ["roller", "conveyor", "bin", "tote"],
    answer:
      "The AGV Roller platform is typically the best starting point for conveyor handoff, tote transfer, and workstation supply.",
    href: "/products/agv-roller",
    linkLabel: "View AGV Roller",
  },
  {
    match: ["lifting", "under-pallet", "top lift"],
    answer:
      "Our Lifting AGV is designed for flexible internal material movement where shared aisles and under-pallet handling matter.",
    href: "/products/lifting-agv",
    linkLabel: "View Lifting AGV",
  },
  {
    match: ["storage", "asrs", "dense", "buffer"],
    answer:
      "For dense storage and retrieval planning, we usually recommend reviewing the Storage AGV and ASRS solution pages together.",
    href: "/solutions/asrs",
    linkLabel: "View ASRS solution",
  },
  {
    match: ["robot", "amr", "composite", "manipulator", "arm"],
    answer:
      "The Composite Mobile Robot is a strong option when you need mobile manipulation, line-side service, or mixed-SKU handling.",
    href: "/products/composite-mobile-robot",
    linkLabel: "View Composite Mobile Robot",
  },
  {
    match: ["support", "error", "issue", "alarm", "integration", "problem"],
    answer:
      "Please include your AGV/AMR issue symptoms, payload, warehouse layout, software stack, and any integration constraints so our engineering team can review quickly.",
    href: "/contact",
    linkLabel: "Contact support",
  },
];

const LOCALE_KEYWORDS = {
  fr: [["devis", "prix", "coût"], ["visite", "inspection"], ["chariot", "gerbeur", "palette"], ["rouleaux", "convoyeur", "bac"], ["levage", "sous-palette"], ["stockage", "entrepôt"], ["robot", "manipulateur", "bras"], ["assistance", "erreur", "problème"]],
  de: [["angebot", "preis", "kosten"], ["besuch", "besichtigung"], ["stapler", "palette"], ["rollen", "förderer", "behälter"], ["hubplattform", "unterfahr"], ["lager", "puffer"], ["roboter", "manipulator", "arm"], ["support", "fehler", "störung"]],
  es: [["presupuesto", "precio", "costo", "coste"], ["visita", "inspección"], ["carretilla", "apilador", "palet"], ["rodillo", "transportador", "contenedor"], ["elevación", "plataforma elevadora"], ["almacenamiento", "almacén"], ["robot", "manipulador", "brazo"], ["soporte", "error", "problema"]]
};

function localizedResponse(value, locale) {
  return NextResponse.json({
    ...value,
    answer: translateText(value.answer, locale),
    ...(value.linkLabel ? { linkLabel: translateText(value.linkLabel, locale) } : {}),
    ...(value.href ? { href: localizedHref(value.href, locale, PAGE_ROUTES) } : {})
  }, { status: 200 });
}

export async function POST(request) {
  let locale = "en";
  try {
    const body = await request.json();
    locale = LOCALES.includes(body?.locale) ? body.locale : "en";
    const query = typeof body?.query === "string" ? body.query.trim() : "";

    if (!query) {
      return localizedResponse(
        {
          answer:
            "Please share your automation target, payload, and workflow goal so we can point you to the right AGV or solution.",
        },
        locale
      );
    }

    const normalized = query.toLowerCase();
    const matchedResponse = SEARCH_RESPONSES.find((item, index) =>
      [...item.match, ...(LOCALE_KEYWORDS[locale]?.[index] || [])].some((keyword) => normalized.includes(keyword))
    );

    if (matchedResponse) {
      return localizedResponse(matchedResponse, locale);
    }

    return localizedResponse(
      {
        answer:
          "Thanks. Based on your request, the best next step is to share your payload, operating environment, and target throughput so our engineering team can recommend the right solution.",
        href: "/contact",
        linkLabel: "Share project details",
      },
      locale
    );
  } catch (_error) {
    return localizedResponse(
      {
        answer:
          "Thanks. Our engineering team will review your request and contact you soon.",
      },
      locale
    );
  }
}

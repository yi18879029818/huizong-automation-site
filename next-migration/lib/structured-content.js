import HomePage, {
  capabilities as homeCapabilities,
  cards as homeCards,
  faqs as homeFaqs,
  meta as homeMeta
} from "@/content/pages/home.mdx";
import AboutPage, {
  faqs as aboutFaqs,
  features as aboutFeatures,
  integrations as aboutIntegrations,
  meta as aboutMeta,
  scenarios as aboutScenarios
} from "@/content/pages/about.mdx";
import ContactPage, {
  faqs as contactFaqs,
  features as contactFeatures,
  integrations as contactIntegrations,
  meta as contactMeta
} from "@/content/pages/contact.mdx";
import ProductOverview, {
  capabilities as productCapabilities,
  faqs as productFaqs,
  meta as productOverviewMeta
} from "@/content/products/index.mdx";
import ProductAgvForklift, {
  features as agvForkliftFeatures,
  integrations as agvForkliftIntegrations,
  meta as agvForkliftMeta,
  scenarios as agvForkliftScenarios
} from "@/content/products/agv-forklift.mdx";
import ProductAgvRoller, {
  features as agvRollerFeatures,
  integrations as agvRollerIntegrations,
  meta as agvRollerMeta,
  scenarios as agvRollerScenarios
} from "@/content/products/agv-roller.mdx";
import ProductCompositeMobileRobot, {
  features as compositeRobotFeatures,
  integrations as compositeRobotIntegrations,
  meta as compositeRobotMeta,
  scenarios as compositeRobotScenarios
} from "@/content/products/composite-mobile-robot.mdx";
import ProductLiftingAgv, {
  features as liftingAgvFeatures,
  integrations as liftingAgvIntegrations,
  meta as liftingAgvMeta,
  scenarios as liftingAgvScenarios
} from "@/content/products/lifting-agv.mdx";
import ProductStorageAgv, {
  features as storageAgvFeatures,
  integrations as storageAgvIntegrations,
  meta as storageAgvMeta,
  scenarios as storageAgvScenarios
} from "@/content/products/storage-agv.mdx";
import SolutionOverview, {
  capabilities as solutionCapabilities,
  faqs as solutionFaqs,
  meta as solutionOverviewMeta
} from "@/content/solutions/index.mdx";
import SolutionAsrs, {
  features as asrsFeatures,
  integrations as asrsIntegrations,
  meta as asrsMeta,
  scenarios as asrsScenarios
} from "@/content/solutions/asrs.mdx";
import SolutionMaterialHandling, {
  features as materialHandlingFeatures,
  integrations as materialHandlingIntegrations,
  meta as materialHandlingMeta,
  scenarios as materialHandlingScenarios
} from "@/content/solutions/material-handling.mdx";
import SolutionPicking, {
  features as pickingFeatures,
  integrations as pickingIntegrations,
  meta as pickingMeta,
  scenarios as pickingScenarios
} from "@/content/solutions/picking.mdx";
import SolutionSoftware, {
  features as softwareFeatures,
  integrations as softwareIntegrations,
  meta as softwareMeta,
  scenarios as softwareScenarios
} from "@/content/solutions/software.mdx";
import CaseOverview, {
  faqs as caseOverviewFaqs,
  meta as caseOverviewMeta
} from "@/content/case-studies/index.mdx";
import CaseAsrs, {
  meta as caseAsrsMeta,
  projects as caseAsrsProjects
} from "@/content/case-studies/asrs.mdx";
import CaseMaterialHandling, {
  meta as caseMaterialHandlingMeta,
  projects as caseMaterialHandlingProjects
} from "@/content/case-studies/material-handling.mdx";
import CasePicking, {
  meta as casePickingMeta,
  projects as casePickingProjects
} from "@/content/case-studies/picking.mdx";
import CaseProjectWarehouseUpgrade, {
  bottlenecks as caseProjectBottlenecks,
  commissioning as caseProjectCommissioning,
  meta as caseProjectWarehouseUpgradeMeta,
  solutionStack as caseProjectSolutionStack
} from "@/content/case-studies/projects/automated-warehouse-upgrade.mdx";
import { NAV_SECTIONS, STRUCTURED_ROUTES } from "@/lib/navigation";

const COMPANY_SUFFIX = "Huizong Intelligent Automation";

const PRODUCT_MODULES = [
  {
    slug: "agv-forklift",
    Content: ProductAgvForklift,
    meta: agvForkliftMeta,
    features: agvForkliftFeatures,
    scenarios: agvForkliftScenarios,
    integrations: agvForkliftIntegrations
  },
  {
    slug: "lifting-agv",
    Content: ProductLiftingAgv,
    meta: liftingAgvMeta,
    features: liftingAgvFeatures,
    scenarios: liftingAgvScenarios,
    integrations: liftingAgvIntegrations
  },
  {
    slug: "storage-agv",
    Content: ProductStorageAgv,
    meta: storageAgvMeta,
    features: storageAgvFeatures,
    scenarios: storageAgvScenarios,
    integrations: storageAgvIntegrations
  },
  {
    slug: "agv-roller",
    Content: ProductAgvRoller,
    meta: agvRollerMeta,
    features: agvRollerFeatures,
    scenarios: agvRollerScenarios,
    integrations: agvRollerIntegrations
  },
  {
    slug: "composite-mobile-robot",
    Content: ProductCompositeMobileRobot,
    meta: compositeRobotMeta,
    features: compositeRobotFeatures,
    scenarios: compositeRobotScenarios,
    integrations: compositeRobotIntegrations
  }
];

const SOLUTION_MODULES = [
  {
    slug: "asrs",
    Content: SolutionAsrs,
    meta: asrsMeta,
    features: asrsFeatures,
    scenarios: asrsScenarios,
    integrations: asrsIntegrations
  },
  {
    slug: "material-handling",
    Content: SolutionMaterialHandling,
    meta: materialHandlingMeta,
    features: materialHandlingFeatures,
    scenarios: materialHandlingScenarios,
    integrations: materialHandlingIntegrations
  },
  {
    slug: "picking",
    Content: SolutionPicking,
    meta: pickingMeta,
    features: pickingFeatures,
    scenarios: pickingScenarios,
    integrations: pickingIntegrations
  },
  {
    slug: "software",
    Content: SolutionSoftware,
    meta: softwareMeta,
    features: softwareFeatures,
    scenarios: softwareScenarios,
    integrations: softwareIntegrations
  }
];

const CASE_CATEGORY_MODULES = [
  {
    slug: "asrs",
    Content: CaseAsrs,
    meta: caseAsrsMeta,
    projects: caseAsrsProjects
  },
  {
    slug: "material-handling",
    Content: CaseMaterialHandling,
    meta: caseMaterialHandlingMeta,
    projects: caseMaterialHandlingProjects
  },
  {
    slug: "picking",
    Content: CasePicking,
    meta: casePickingMeta,
    projects: casePickingProjects
  }
];

const CASE_PROJECT_MODULES = [
  {
    slug: "automated-warehouse-upgrade",
    Content: CaseProjectWarehouseUpgrade,
    meta: caseProjectWarehouseUpgradeMeta,
    bottlenecks: caseProjectBottlenecks,
    solutionStack: caseProjectSolutionStack,
    commissioning: caseProjectCommissioning
  }
];

function removeHtmlSuffix(segment) {
  return segment.endsWith(".html") ? segment.slice(0, -5) : segment;
}

function createCardFromMeta(slugPath, meta) {
  return {
    slug: slugPath,
    title: meta.title,
    label: meta.label,
    summary: meta.summary,
    metrics: meta.metrics || []
  };
}

function createDetailData(entry) {
  return {
    ...entry.meta,
    Content: entry.Content,
    features: entry.features,
    scenarios: entry.scenarios,
    integrations: entry.integrations,
    projects: entry.projects,
    bottlenecks: entry.bottlenecks,
    solutionStack: entry.solutionStack,
    commissioning: entry.commissioning,
    faqs: entry.faqs,
    cards: entry.cards,
    capabilities: entry.capabilities,
    contactForm: entry.contactForm
  };
}

function withCompanyTitle(title) {
  if (title.includes(COMPANY_SUFFIX)) {
    return title;
  }

  return `${title} | ${COMPANY_SUFFIX}`;
}

function createBreadcrumbs(items) {
  return items.map((item) => ({
    href: item.href,
    label: item.label
  }));
}

function navSection(section) {
  return NAV_SECTIONS.find((item) => item.key === section);
}

function buildStaticPage({
  kind,
  section,
  sectionLabel,
  href,
  title,
  subnav = [],
  breadcrumbs,
  data
}) {
  return {
    kind,
    section,
    sectionLabel,
    currentHref: href,
    title,
    subnav,
    breadcrumbs,
    data
  };
}

export function normalizeStructuredSegments(slug = []) {
  const cleaned = slug.map(removeHtmlSuffix);

  if (cleaned.at(-1) === "index") {
    return cleaned.slice(0, -1);
  }

  return cleaned;
}

export function getNavigationSections() {
  return NAV_SECTIONS;
}

export function getAllStructuredRoutes() {
  return STRUCTURED_ROUTES;
}

export function getStructuredPage(slug = []) {
  const normalized = normalizeStructuredSegments(slug);
  const [section, subsection, third] = normalized;

  if (!section) {
    return buildStaticPage({
      kind: "home-page",
      section: "home",
      sectionLabel: "Home",
      href: "/",
      title: withCompanyTitle(homeMeta.title),
      subnav: [],
      breadcrumbs: createBreadcrumbs([{ href: "/", label: "Home" }]),
      data: {
        ...homeMeta,
        Content: HomePage,
        cards: homeCards,
        capabilities: homeCapabilities,
        faqs: homeFaqs
      }
    });
  }

  if (section === "about") {
    return buildStaticPage({
      kind: "about-page",
      section,
      sectionLabel: "About",
      href: "/about",
      title: withCompanyTitle(aboutMeta.title),
      subnav: [],
      breadcrumbs: createBreadcrumbs([
        { href: "/", label: "Home" },
        { href: "/about", label: "About" }
      ]),
      data: {
        ...aboutMeta,
        Content: AboutPage,
        features: aboutFeatures,
        scenarios: aboutScenarios,
        integrations: aboutIntegrations,
        faqs: aboutFaqs
      }
    });
  }

  if (section === "contact") {
    return buildStaticPage({
      kind: "contact-page",
      section,
      sectionLabel: "Contact",
      href: "/contact",
      title: withCompanyTitle(contactMeta.title),
      subnav: [],
      breadcrumbs: createBreadcrumbs([
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" }
      ]),
      data: {
        ...contactMeta,
        Content: ContactPage,
        features: contactFeatures,
        integrations: contactIntegrations,
        faqs: contactFaqs,
        contactForm: contactMeta.contactForm
      }
    });
  }

  if (section === "products") {
    const navigation = navSection(section);

    if (!subsection) {
      return buildStaticPage({
        kind: "product-overview",
        section,
        sectionLabel: navigation?.label || "Products",
        href: "/products",
        title: withCompanyTitle("Products"),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" }
        ]),
        data: {
          ...productOverviewMeta,
          Content: ProductOverview,
          cards: PRODUCT_MODULES.map((entry) => createCardFromMeta(entry.slug, entry.meta)),
          capabilities: productCapabilities,
          faqs: productFaqs
        }
      });
    }

    const entry = PRODUCT_MODULES.find((product) => product.slug === subsection);

    if (entry) {
      return buildStaticPage({
        kind: "product-detail",
        section,
        sectionLabel: navigation?.label || "Products",
        href: `/products/${entry.slug}`,
        title: withCompanyTitle(entry.meta.title),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { href: `/products/${entry.slug}`, label: entry.meta.title }
        ]),
        data: createDetailData(entry)
      });
    }
  }

  if (section === "solutions") {
    const navigation = navSection(section);

    if (!subsection) {
      return buildStaticPage({
        kind: "solution-overview",
        section,
        sectionLabel: navigation?.label || "Solutions",
        href: "/solutions",
        title: withCompanyTitle("Solutions"),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/solutions", label: "Solutions" }
        ]),
        data: {
          ...solutionOverviewMeta,
          Content: SolutionOverview,
          cards: SOLUTION_MODULES.map((entry) => createCardFromMeta(entry.slug, entry.meta)),
          capabilities: solutionCapabilities,
          faqs: solutionFaqs
        }
      });
    }

    const entry = SOLUTION_MODULES.find((solution) => solution.slug === subsection);

    if (entry) {
      return buildStaticPage({
        kind: "solution-detail",
        section,
        sectionLabel: navigation?.label || "Solutions",
        href: `/solutions/${entry.slug}`,
        title: withCompanyTitle(entry.meta.title),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/solutions", label: "Solutions" },
          { href: `/solutions/${entry.slug}`, label: entry.meta.title }
        ]),
        data: createDetailData(entry)
      });
    }
  }

  if (section === "case-studies") {
    const navigation = navSection(section);

    if (!subsection) {
      return buildStaticPage({
        kind: "case-overview",
        section,
        sectionLabel: navigation?.label || "Case Studies",
        href: "/case-studies",
        title: withCompanyTitle("Case Studies"),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Case Studies" }
        ]),
        data: {
          ...caseOverviewMeta,
          Content: CaseOverview,
          cards: [
            ...CASE_CATEGORY_MODULES.map((entry) => createCardFromMeta(entry.slug, entry.meta)),
            ...CASE_PROJECT_MODULES.map((entry) =>
              createCardFromMeta(`projects/${entry.slug}`, entry.meta)
            )
          ],
          faqs: caseOverviewFaqs
        }
      });
    }

    if (subsection === "projects" && third) {
      const entry = CASE_PROJECT_MODULES.find((project) => project.slug === third);

      if (entry) {
        return buildStaticPage({
          kind: "case-project-detail",
          section,
          sectionLabel: navigation?.label || "Case Studies",
          href: `/case-studies/projects/${entry.slug}`,
          title: withCompanyTitle(entry.meta.title),
          subnav: navigation?.items || [],
          breadcrumbs: createBreadcrumbs([
            { href: "/", label: "Home" },
            { href: "/case-studies", label: "Case Studies" },
            {
              href: `/case-studies/projects/${entry.slug}`,
              label: entry.meta.title
            }
          ]),
          data: createDetailData(entry)
        });
      }
    }

    const entry = CASE_CATEGORY_MODULES.find((category) => category.slug === subsection);

    if (entry) {
      return buildStaticPage({
        kind: "case-category",
        section,
        sectionLabel: navigation?.label || "Case Studies",
        href: `/case-studies/${entry.slug}`,
        title: withCompanyTitle(entry.meta.title),
        subnav: navigation?.items || [],
        breadcrumbs: createBreadcrumbs([
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Case Studies" },
          { href: `/case-studies/${entry.slug}`, label: entry.meta.title }
        ]),
        data: createDetailData(entry)
      });
    }
  }

  return null;
}

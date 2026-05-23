import { aboutPage } from "./aboutPage.mjs";
import { caseStudy } from "./caseStudy.mjs";
import { contactPage } from "./contactPage.mjs";
import { faq } from "./faq.mjs";
import { homePage } from "./homePage.mjs";
import { imageWithAlt } from "./image.mjs";
import { siteSettings } from "./siteSettings.mjs";
import { portableText } from "./portableText.mjs";
import { post } from "./post.mjs";
import { seo } from "./seo.mjs";
import { certificateItem } from "./objects/certificateItem.mjs";
import { contactMethod } from "./objects/contactMethod.mjs";
import { faqItem } from "./objects/faqItem.mjs";
import { featureCard } from "./objects/featureCard.mjs";
import { heroBlock } from "./objects/heroBlock.mjs";
import { linkItem } from "./objects/linkItem.mjs";
import { logoItem } from "./objects/logoItem.mjs";
import { metricItem } from "./objects/metricItem.mjs";
import { navCardItem } from "./objects/navCardItem.mjs";
import { timelineItem } from "./objects/timelineItem.mjs";
import { trustShowcaseItem } from "./objects/trustShowcaseItem.mjs";

export const schemaTypes = [
  imageWithAlt,
  portableText,
  seo,
  linkItem,
  metricItem,
  faqItem,
  featureCard,
  logoItem,
  heroBlock,
  timelineItem,
  certificateItem,
  trustShowcaseItem,
  contactMethod,
  navCardItem,
  post,
  caseStudy,
  faq,
  siteSettings,
  homePage,
  aboutPage,
  contactPage
];

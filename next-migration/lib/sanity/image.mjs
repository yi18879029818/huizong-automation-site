import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client.mjs";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) {
    return null;
  }

  return builder.image(source).auto("format").fit("max");
}

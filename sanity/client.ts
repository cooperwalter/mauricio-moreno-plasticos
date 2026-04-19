import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-18";

function createSanityClient(): SanityClient | null {
  if (!projectId || !dataset) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
}

export const client = createSanityClient();

const builder = client ? imageUrlBuilder(client) : null;

export function urlForImage(source: SanityImageSource): string | null {
  if (!builder) return null;
  return builder.image(source).auto("format").fit("max").url();
}

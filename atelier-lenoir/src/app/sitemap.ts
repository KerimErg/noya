import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/mentions-legales"].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
}

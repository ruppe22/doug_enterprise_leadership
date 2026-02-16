import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/keystatic", "/api/keystatic"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

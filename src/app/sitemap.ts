import type { MetadataRoute } from "next";

import { reader } from "@/lib/keystatic-reader";
import { site } from "@/lib/site";
import { TOPICS, topicHref } from "@/lib/topics";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url.replace(/\/$/, "");
  const now = new Date();

  const [articleSlugs, workSlugs] = await Promise.all([
    reader.collections.articles.list(),
    reader.collections.work.list(),
  ]);

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/work`, lastModified: now },
    { url: `${baseUrl}/thought-leadership`, lastModified: now },
    ...TOPICS.map((t) => ({
      url: `${baseUrl}${topicHref(t.id)}`,
      lastModified: now,
    })),
    ...articleSlugs.map((slug) => ({
      url: `${baseUrl}/thought-leadership/${slug}`,
      lastModified: now,
    })),
    ...workSlugs.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: now,
    })),
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/contact`, lastModified: now },
  ];
}

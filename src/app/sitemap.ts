import type { MetadataRoute } from "next";
import { LOG } from "@/content/log";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/log`, lastModified: new Date(LOG[0].date), changeFrequency: "monthly", priority: 0.6 },
    ...LOG.map((entry) => ({
      url: `${SITE_URL}/log/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}

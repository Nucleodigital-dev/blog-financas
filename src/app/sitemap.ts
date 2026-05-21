import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getSitemapArticles } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getSitemapArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/politica-editorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: `${siteUrl}/blog/${encodeURIComponent(article.slug!)}`,
      lastModified: article.created_at ? new Date(article.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...articleRoutes];
}

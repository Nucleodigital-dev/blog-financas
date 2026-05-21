import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getSitemapArticles } from "@/lib/content";

export const dynamic = "force-dynamic";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    changeFrequency: "daily",
    priority: 1,
    alternates: {
      languages: {
        "pt-BR": absoluteUrl("/"),
        "en-US": absoluteUrl("/?lang=en"),
      },
    },
  },
  {
    url: absoluteUrl("/sobre"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: absoluteUrl("/politica-editorial"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: absoluteUrl("/politica-de-cookies"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: absoluteUrl("/aviso-legal"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getSitemapArticles();

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug)
    .map((article) => {
      const slug = encodeURIComponent(article.slug!);
      const canonicalPath = `/blog/${slug}`;

      return {
        url: absoluteUrl(canonicalPath),
        lastModified: article.created_at ? new Date(article.created_at) : undefined,
        alternates: {
          languages: {
            "pt-BR": absoluteUrl(canonicalPath),
            "en-US": absoluteUrl(`${canonicalPath}?lang=en`),
          },
        },
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...articleRoutes];
}

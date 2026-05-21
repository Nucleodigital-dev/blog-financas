import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("politica-de-cookies");
  return {
    title: page?.seoTitle || "Política de cookies",
    description: page?.seoDescription || undefined,
    alternates: { canonical: "/politica-de-cookies" },
  };
}

export default async function PoliticaDeCookiesPage() {
  const page = await getSitePage("politica-de-cookies");
  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Política de cookies"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label!, href: page.cta.href } : undefined}
    />
  );
}

import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("aviso-legal");
  return {
    title: page?.seoTitle || "Aviso legal",
    description: page?.seoDescription || undefined,
    alternates: { canonical: "/aviso-legal" },
  };
}

export default async function AvisoLegalPage() {
  const page = await getSitePage("aviso-legal");
  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Aviso legal"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label!, href: page.cta.href } : undefined}
    />
  );
}

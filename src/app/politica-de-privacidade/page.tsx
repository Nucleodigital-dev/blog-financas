import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";
export const metadata: Metadata = { title: "Política de privacidade", alternates: { canonical: "/politica-de-privacidade" } };
export default async function Page() { const p = await getSitePage("politica-de-privacidade"); return <InstitutionalPage eyebrow={p?.eyebrow || ""} title={p?.title || "Política de privacidade"} description={p?.description || ""} sections={p?.sections || []} cta={p?.cta?.href ? { label:p.cta.label, href:p.cta.href } : undefined} />; }

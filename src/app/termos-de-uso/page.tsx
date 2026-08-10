import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";
export const metadata: Metadata = { title: "Termos de uso", alternates: { canonical: "/termos-de-uso" } };
export default async function Page() { const p = await getSitePage("termos-de-uso"); return <InstitutionalPage eyebrow={p?.eyebrow || ""} title={p?.title || "Termos de uso"} description={p?.description || ""} sections={p?.sections || []} cta={p?.cta?.href ? { label:p.cta.label, href:p.cta.href } : undefined} />; }

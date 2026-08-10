import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";
export const metadata: Metadata = { title: "Contato", alternates: { canonical: "/contato" } };
export default async function Page() { const p = await getSitePage("contato"); return <InstitutionalPage eyebrow={p?.eyebrow || ""} title={p?.title || "Contato"} description={p?.description || ""} sections={p?.sections || []} cta={p?.cta?.href ? { label:p.cta.label, href:p.cta.href } : undefined} />; }

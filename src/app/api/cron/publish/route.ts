import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { markArticlePublished } from "@/lib/editorial-sheet";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const { data: due, error } = await supabase.from("articles").select("id,slug,published_at").eq("status", "scheduled").lte("published_at", now).order("published_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const results = [];
  for (const article of due || []) {
    const publishedAt = article.published_at || now;
    const { error: updateError } = await supabase.from("articles").update({ status: "published", published_at: publishedAt, updated_at: now }).eq("id", article.id).eq("status", "scheduled");
    if (updateError) { results.push({ id: article.id, published: false, error: updateError.message }); continue; }
    try {
      const sheet = await markArticlePublished({ id: article.id, slug: article.slug, published_at: publishedAt });
      results.push({ id: article.id, published: true, sheet });
    } catch (sheetError) {
      console.error("Editorial spreadsheet update failed", sheetError);
      results.push({ id: article.id, published: true, sheet: { updated: false } });
    }
  }
  return NextResponse.json({ processed: results.length, results });
}

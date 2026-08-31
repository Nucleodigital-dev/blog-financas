import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getContentExcerpt } from "@/lib/content-utils";
import { getAllArticles, getCategories, getSitePage } from "@/lib/content";
import { formatArticleTitle } from "@/lib/text";
import { formatEditorialDate } from "@/lib/date";
import { FavoriteCategoryButton, ReadingMemory } from "@/components/ReadingMemory";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("home");

  return {
    title: page?.seoTitle || page?.title,
    description: page?.seoDescription || page?.description || undefined,
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; category?: string }>;
}) {
  const params = await searchParams;
  const lang = params.lang === "en" ? "en" : "pt";
  const categorySlug = params.category;
  const isEn = lang === "en";
  const [allArticles, categories, page] = await Promise.all([
    getAllArticles(),
    getCategories(),
    getSitePage("home"),
  ]);

  const mainCategorySlugs = [
    "financas-pessoais",
    "investimentos",
    "renda-extra",
    "planejamento-financeiro",
  ];
  const sidebarCategories = categories
    .filter((cat) => mainCategorySlugs.includes(cat.slug))
    .sort((a, b) => mainCategorySlugs.indexOf(a.slug) - mainCategorySlugs.indexOf(b.slug));

  let displayedArticles = allArticles;
  let categoryName = "";

  if (categorySlug) {
    const category = categories.find((cat) => cat.slug === categorySlug);
    if (category) {
      displayedArticles = allArticles.filter((article) => article.category_id === category.id);
      categoryName = isEn && category.name_en ? category.name_en : category.name_pt || "";
    }
  }

  const latestArticle = allArticles[0]
    ? {
        slug: allArticles[0].slug,
        title: formatArticleTitle(isEn && allArticles[0].title_en ? allArticles[0].title_en : allArticles[0].title_pt, lang),
        href: `/blog/${allArticles[0].slug}?lang=${lang}`,
        image: allArticles[0].cover_image,
        createdAt: allArticles[0].created_at,
      }
    : null;

  return (
    <>
      <div className="hero" style={{ marginBottom: categorySlug ? 48 : 64 }}>
        {categorySlug ? (
          <h1>{categoryName}</h1>
        ) : (
          <>
            <h1>{isEn ? page?.titleEn || page?.title : page?.title}</h1>
            <p>
              {isEn
                ? page?.descriptionEn || page?.description
                : page?.description}
            </p>
          </>
        )}
      </div>

      {!categorySlug && <ReadingMemory latestArticle={latestArticle} />}

      <div className="layout-with-sidebar">
        <div>
          {categorySlug && <h2 style={{ marginBottom: 32, fontSize: "2rem", fontFamily: "var(--font-heading)" }}>Últimos artigos</h2>}
          <div className="article-grid">
            {displayedArticles.map((article) => {
              const title = formatArticleTitle(isEn && article.title_en ? article.title_en : article.title_pt, lang);
              const content = isEn && article.content_en ? article.content_en : article.content_pt;
              const excerpt = getContentExcerpt(content);

              return (
                <Link
                  href={`/blog/${article.slug}?lang=${lang}`}
                  key={article.id}
                  className="article-card"
                  style={{ padding: 0, overflow: "hidden" }}
                >
                  {article.cover_image && (
                    <div style={{ width: "100%", height: 240, position: "relative" }}>
                      <Image src={article.cover_image} alt={article.cover_alt || title} fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: 32 }}>
                    {article.cat_name_pt && (
                      <span className="cat-badge">
                        {isEn && article.cat_name_en ? article.cat_name_en : article.cat_name_pt}
                      </span>
                    )}
                    <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{title}</h2>
                    <p style={{ marginBottom: 24 }}>{excerpt}</p>
                    <div className="article-meta">
                      <span>
                        {formatEditorialDate(article.published_at || article.created_at, isEn ? "en-US" : "pt-BR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
            {displayedArticles.length === 0 && (
              <div style={{ padding: "64px 0", color: "var(--text-muted)" }}>
                <p>{isEn ? "No articles published yet." : "Nenhum artigo publicado ainda."}</p>
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar">
          <h3>{isEn ? "Categories" : "Categorias Populares"}</h3>
          <div>
            {sidebarCategories.map((cat) => {
              const count = allArticles.filter((article) => article.category_id === cat.id).length;
              return (
                <div key={cat.id} className="category-preference-row">
                  <Link href={`/?category=${cat.slug}&lang=${lang}`} className="category-pill">
                    <span>{isEn && cat.name_en ? cat.name_en : cat.name_pt}</span>
                    <span
                      style={{
                        background: "var(--primary-light)",
                        color: "var(--primary)",
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      {count}
                    </span>
                  </Link>
                  <FavoriteCategoryButton slug={cat.slug} label={cat.name_pt || cat.slug} />
                </div>
              );
            })}
            {categories.length === 0 && <p style={{ color: "var(--text-muted)" }}>Nenhuma categoria.</p>}
          </div>
        </aside>
      </div>
    </>
  );
}


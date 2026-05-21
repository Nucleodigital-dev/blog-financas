const preservedAcronyms = new Set([
  "CDI",
  "CDB",
  "CPF",
  "CNPJ",
  "CVM",
  "DARF",
  "FAQ",
  "FGC",
  "FGTS",
  "FII",
  "IBGE",
  "INSS",
  "IOF",
  "IPCA",
  "IR",
  "IRPF",
  "LCA",
  "LCI",
  "PIB",
  "PGBL",
  "ROI",
  "SEO",
  "SELIC",
  "VGBL",
]);

function capitalizeFirstLetter(value: string, locale: string) {
  return value.replace(/\p{L}/u, (letter) => letter.toLocaleUpperCase(locale));
}

export function formatArticleTitle(title: string | null | undefined, lang: "pt" | "en" = "pt") {
  if (!title) return "";
  const normalized = title.replace(/\s+/g, " ").trim();

  if (lang === "en") return normalized;

  const locale = "pt-BR";
  const sentenceCase = capitalizeFirstLetter(normalized.toLocaleLowerCase(locale), locale).replace(
    /([.!?:]\s+)(\p{L})/gu,
    (_, punctuation: string, letter: string) => `${punctuation}${letter.toLocaleUpperCase(locale)}`
  );

  return sentenceCase
    .split(" ")
    .map((word) => {
      const cleanWord = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
      const acronym = [...preservedAcronyms].find(
        (item) => item.toLocaleLowerCase(locale) === cleanWord.toLocaleLowerCase(locale)
      );
      return acronym ? word.replace(cleanWord, acronym) : word;
    })
    .join(" ");
}

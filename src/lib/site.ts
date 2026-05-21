export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://granaemordem.nucleodigitalofc.com"
).replace(/\/$/, "");

export const siteName = "Grana em Ordem";

export const siteDescription =
  "Artigos educativos sobre finanças pessoais, investimentos, renda extra e independência financeira.";

export const organizationName = "Grana em Ordem";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

import { createSign } from "node:crypto";

const SPREADSHEET_ID = process.env.EDITORIAL_SPREADSHEET_ID || "17LodGRdR9VZS16O3rzTBJlRddA3aMUg9y94_mP5oP3E";
const SHEET_NAME = "Matriz Editorial";

function base64url(value: string) {
  return Buffer.from(value).toString("base64url");
}

async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("Google Sheets service account is not configured");
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(privateKey, "base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) throw new Error("Could not authenticate with Google Sheets");
  return result.access_token as string;
}

export async function markArticlePublished(article: { id: string; slug: string; published_at: string }) {
  const token = await getGoogleAccessToken();
  const range = encodeURIComponent(`'${SHEET_NAME}'!A2:U1000`);
  const read = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await read.json();
  if (!read.ok) throw new Error("Could not read editorial spreadsheet");
  const rows: string[][] = data.values || [];
  const index = rows.findIndex((row) => row[19] === article.id || row[12] === article.slug);
  if (index < 0) return { updated: false };
  const rowNumber = index + 2;
  const siteUrl = (process.env.SITE_URL || "https://granaemordem.nucleodigitalofc.com").replace(/\/$/, "");
  const publishedAt = new Date(article.published_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const update = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ valueInputOption: "USER_ENTERED", data: [
      { range: `'${SHEET_NAME}'!J${rowNumber}`, values: [[`${siteUrl}/blog/${article.slug}`]] },
      { range: `'${SHEET_NAME}'!L${rowNumber}`, values: [["Publicado"]] },
      { range: `'${SHEET_NAME}'!R${rowNumber}`, values: [[publishedAt]] },
      { range: `'${SHEET_NAME}'!T${rowNumber}`, values: [[article.id]] },
    ] }),
  });
  if (!update.ok) throw new Error("Could not update editorial spreadsheet");
  return { updated: true, rowNumber };
}

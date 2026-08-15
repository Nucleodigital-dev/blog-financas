import { marked } from "marked";

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);?/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&colon;/gi, ":");
}

function isSafeUrl(value: string, attribute: string) {
  const url = decodeHtmlEntities(value).trim();
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) return true;

  try {
    const protocol = new URL(url).protocol;
    return protocol === "http:" || protocol === "https:" || (attribute === "href" && protocol === "mailto:");
  } catch {
    return false;
  }
}

/** Renders CMS Markdown without accepting raw HTML or unsafe URL schemes. */
export function renderSafeMarkdown(value: string | null | undefined) {
  const renderer = new marked.Renderer();
  renderer.html = () => "";
  const html = marked.parse(value || "", {
    renderer,
  }) as string;

  return html.replace(/\s(href|src)=("([^"]*)"|'([^']*)')/gi, (match, attribute, _quoted, doubleQuoted, singleQuoted) => {
    const url = doubleQuoted ?? singleQuoted ?? "";
    return isSafeUrl(url, attribute) ? ` ${attribute}="${url.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"` : "";
  });
}

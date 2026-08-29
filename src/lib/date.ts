const EDITORIAL_TIME_ZONE = "America/Sao_Paulo";

export function formatEditorialDate(
  value: string | null | undefined,
  locale: "pt-BR" | "en-US",
  options: Intl.DateTimeFormatOptions = {}
) {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale, {
    timeZone: EDITORIAL_TIME_ZONE,
    ...options,
  }).format(new Date(value));
}

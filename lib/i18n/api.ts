import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

export type ApiLocale = "en" | "ar";

const messages: Record<ApiLocale, typeof enMessages> = {
  en: enMessages,
  ar: arMessages,
};

export function getRequestLocale(request: Request): ApiLocale {
  const xLanguage = request.headers.get("X-Language")?.trim().toLowerCase();
  if (xLanguage === "ar" || xLanguage === "en") {
    return xLanguage;
  }

  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    const primary = acceptLanguage.split(",")[0]?.trim().toLowerCase();
    if (primary?.startsWith("ar")) return "ar";
    if (primary?.startsWith("en")) return "en";
  }

  return "en";
}

function resolveMessage(
  source: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, source);

  return typeof value === "string" ? value : undefined;
}

export function getMessage(locale: ApiLocale, key: string): string {
  return (
    resolveMessage(messages[locale] as Record<string, unknown>, key) ??
    resolveMessage(messages.en as Record<string, unknown>, key) ??
    key
  );
}

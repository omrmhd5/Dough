"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ClientDetail } from "@/components/dough/clients-data";
import { useAppLocale } from "@/components/providers/locale-provider";

function pick(
  en: string | undefined,
  ar: string | undefined,
  locale: "en" | "ar",
) {
  if (locale === "ar") return ar ?? en ?? "";
  return en ?? "";
}

export function useLocalizedClient(client: ClientDetail) {
  const { locale } = useAppLocale();
  const t = useTranslations("workCaseStudy");

  return useMemo(
    () => ({
      sector: pick(client.sector, client.sectorAr, locale),
      services: pick(client.services, client.servicesAr, locale),
      subtitle: pick(client.subtitle, client.subtitleAr, locale) || undefined,
      overview: pick(client.overview, client.overviewAr, locale) || undefined,
      challenge:
        pick(client.challenge, client.challengeAr, locale) || undefined,
      approach: pick(client.approach, client.approachAr, locale) || undefined,
      outcome: pick(client.outcome, client.outcomeAr, locale) || undefined,
      challengeLabel:
        pick(client.challengeLabel, client.challengeLabelAr, locale) ||
        t("challengeDefault"),
      approachLabel:
        pick(client.approachLabel, client.approachLabelAr, locale) ||
        t("approachDefault"),
      experienceLabel:
        pick(client.experienceLabel, client.experienceLabelAr, locale) ||
        t("experienceDefault"),
      galleryLabel:
        pick(client.galleryLabel, client.galleryLabelAr, locale) ||
        t("galleryDefault"),
      experience:
        client.experience?.map((item) => ({
          title: pick(item.title, item.titleAr, locale),
          items: pick(item.items, item.itemsAr, locale) || undefined,
        })) ?? [],
      scope:
        locale === "ar"
          ? (client.scopeAr ?? client.scope ?? [])
          : (client.scope ?? []),
    }),
    [client, locale, t],
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Blob } from "./blob";
import { ButtonLink, Emphasis, RunningHeader } from "./primitives";

/** Coming-soon page in the profile's section-opener style. */
export function UncleDough() {
  const t = useTranslations("uncleDough");

  return (
    <section className="flex min-h-[100svh] flex-col bg-cream pt-[var(--nav-h)] text-navy">
      <div className="wrap flex flex-1 flex-col justify-between gap-16 py-[clamp(40px,5vw,96px)]">
        <RunningHeader start="dough" end={t("eyebrow")} tone="light" />

        <div className="flex flex-col gap-10">
          <h1 className="t-display t-xl animate-rise">
            <Emphasis text={t("title")} />
          </h1>
          <div
            className="animate-rise flex max-w-[44ch] flex-col gap-4"
            style={{ animationDelay: "120ms" }}>
            <p className="t-lead">{t("stayTuned")}</p>
            <p className="t-body">{t("description")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-navy/20 pt-8">
          <ButtonLink href="/" tone="navy">
            {t("backHome")}
          </ButtonLink>
          <Blob
            variant={3}
            aria-hidden
            className="hidden size-[clamp(80px,9vw,160px)] shrink-0 bg-water sm:block"
          />
        </div>
      </div>
    </section>
  );
}

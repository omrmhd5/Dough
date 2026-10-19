"use client";

import { useTranslations } from "next-intl";
import { ButtonLink, Emphasis, TextLink } from "./primitives";

/** Profile cover: cream, monochrome photo on the end half, lots of air. */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col-reverse overflow-hidden bg-cream pt-[var(--nav-h)] lg:block">
      <div className="lg:absolute lg:inset-y-0 lg:end-0 lg:w-1/2">
        <div className="flex w-full items-center justify-center overflow-hidden lg:h-full lg:min-h-[min(calc(100svh-var(--nav-h)),1080px)]">
          <img
            src="/profile/v3/n2-0.webp"
            alt={t("imageAlt")}
            width={800}
            height={451}
            fetchPriority="high"
            className="animate-fade h-[min(42svh,360px)] w-full object-cover grayscale contrast-[1.05] lg:h-full lg:max-h-[calc(100svh-var(--nav-h))]"
            style={{ objectPosition: "24% 30%" }}
          />
        </div>
      </div>

      <div className="wrap relative">
        <div className="flex flex-col justify-between gap-10 py-10 sm:gap-16 sm:py-16 lg:min-h-[min(calc(100svh-var(--nav-h)),1080px)] lg:w-1/2 lg:py-[clamp(64px,6vw,110px)] lg:pe-[clamp(32px,4vw,80px)]">
          <div className="t-label flex flex-col gap-2 text-navy">
            <span>{t("eyebrowStart")}</span>
            <span className="text-water">{t("eyebrowEnd")}</span>
          </div>

          <div className="flex flex-col gap-10">
            <h1 className="t-display t-lg animate-rise max-w-[12ch] text-navy">
              <Emphasis text={t("title")} />
            </h1>
            <p
              className="t-lead animate-rise text-navy"
              style={{ animationDelay: "120ms" }}>
              {t("tagline")}
            </p>
            <div
              className="animate-rise flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5"
              style={{ animationDelay: "220ms" }}>
              <ButtonLink
                href="/contact?tab=project"
                className="w-full sm:w-fit">
                {t("ctaPrimary")}
              </ButtonLink>
              <TextLink href="/work" className="text-[15px] text-navy">
                {t("ctaSecondary")}
              </TextLink>
            </div>
          </div>

          <div className="hidden h-px bg-navy/20 lg:block" />
        </div>
      </div>
    </section>
  );
}

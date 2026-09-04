"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Blob } from "./blob";
import { Reveal } from "./reveal";

export function UncleDough() {
  const t = useTranslations("uncleDough");

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-navy text-cream">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 opacity-30"
        aria-hidden="true">
        <Blob variant={1} className="size-64 bg-blob/40 text-navy" />
      </div>
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 opacity-20"
        aria-hidden="true">
        <Blob variant={3} className="size-48 bg-blob/30 text-navy" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center lowercase">
        <Reveal direction="up" duration={900}>
          <span className="font-display text-[12px] leading-[14px] font-extrabold uppercase text-water">
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal direction="up" duration={900} delay={100}>
          <h1 className="mt-6 font-display font-extrabold text-[32px] leading-[36px] sm:text-[40px] sm:leading-[40px] md:text-[93px] md:leading-[93px] text-cream text-balance">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal direction="up" duration={900} delay={200}>
          <p className="mt-8 font-display text-[25px] leading-[28px] md:text-[33px] md:leading-[37px] font-medium text-cream/90">
            {t("stayTuned")}
          </p>
        </Reveal>

        <Reveal direction="up" duration={900} delay={300}>
          <p className="mx-auto mt-5 max-w-md font-display font-normal text-[16px] leading-[19px] text-cream/55">
            {t("description")}
          </p>
        </Reveal>

        <Reveal direction="up" duration={900} delay={400}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-blob" />
              <span className="size-2 animate-pulse rounded-full bg-blob [animation-delay:300ms]" />
              <span className="size-2 animate-pulse rounded-full bg-blob [animation-delay:600ms]" />
            </div>

            <Link
              href="/"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-6 py-3 font-display text-[12px] leading-[14px] font-bold uppercase text-cream transition-colors duration-300 overflow-hidden hover:text-navy hover:border-blob/40 z-0">
              <span className="absolute inset-0 bg-blob -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1 relative z-10" />
              <span className="relative z-10">{t("backHome")}</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

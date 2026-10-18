"use client";

import { useTranslations } from "next-intl";
import { Emphasis, Photo, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

/** Profile pages 03–04: the statement, then the studio. */
export function WhoWeAre() {
  const t = useTranslations("whoWeAre");

  return (
    <section id="about" className="section-y bg-cream text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <Reveal>
          <p className="t-statement mt-[clamp(56px,8vw,150px)] max-w-[24ch] sm:max-w-[30ch]">
            <Emphasis text={t("statement")} />
          </p>
        </Reveal>

        <div className="mt-[clamp(64px,8vw,150px)] grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-[clamp(48px,6vw,120px)]">
          <Reveal>
            <Photo
              src="/profile/v3/n6-0.webp"
              alt={t("studioAlt")}
              width={720}
              height={534}
              className="aspect-[1150/852]"
            />
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <Reveal className="flex flex-col gap-4 border-t border-navy/20 pt-7">
              <span className="t-label text-water">{t("studioLabel")}</span>
              <p className="t-lead max-w-[22ch]">{t("studioBody")}</p>
            </Reveal>
            <Reveal className="border-t border-navy/20 pt-7" delay={100}>
              <p className="t-body max-w-[46ch] font-normal">{t("body")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

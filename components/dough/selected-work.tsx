"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import { CASES } from "./case-media";
import { Arrow, Emphasis, RunningHeader, TextLink } from "./primitives";
import { Reveal } from "./reveal";

/** Profile page 10: the case-study index, with a live preview frame. */
export function SelectedWork() {
  const t = useTranslations("selectedWork");
  const tc = useTranslations("workCaseStudy");
  const { locale } = useAppLocale();
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="section-y bg-cream text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <div className="mt-[clamp(56px,8vw,150px)] flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="t-display t-xl leading-[0.94]">
              <Emphasis text={t("title")} />
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[36ch] flex-col gap-6" delay={100}>
            <p className="t-body">{t("intro")}</p>
            <TextLink href="/work" className="text-[15px]">
              {t("viewAll")}
            </TextLink>
          </Reveal>
        </div>

        <div className="mt-[clamp(56px,7vw,120px)] grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-[clamp(48px,5vw,96px)]">
          <ol className="border-t border-navy/20">
            {CASES.map(({ client, media, number }, i) => {
              const name = locale === "ar" ? client.ar : client.en;
              const sector = locale === "ar" ? client.sectorAr ?? client.sector : client.sector;
              return (
                <li key={client.slug} className="border-b border-navy/20">
                  <Link
                    href={`/work/${client.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-x-5 py-4 sm:grid-cols-[clamp(56px,6vw,110px)_minmax(0,1fr)_auto] sm:py-6 lg:grid-cols-[clamp(56px,6vw,110px)_minmax(0,1fr)_auto]">
                    <span className="t-label t-num hidden text-water sm:block">
                      {tc("caseLabel", { n: String(number).padStart(2, "0") })}
                    </span>
                    <span className="relative block aspect-square overflow-hidden bg-grey sm:hidden">
                      <img
                        src={media.cover.src}
                        alt=""
                        loading="lazy"
                        className="photo"
                        style={media.cover.position ? { objectPosition: media.cover.position } : undefined}
                      />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span
                        className={cn(
                          "truncate text-[clamp(26px,3.2vw,60px)] font-light leading-[1.05] tracking-[-0.02em] group-hover:font-bold group-focus-visible:font-bold",
                          active === i && "lg:font-bold",
                        )}>
                        {name}
                      </span>
                      <span className="t-small truncate text-water">{sector}</span>
                    </span>
                    <Arrow className="size-5 text-navy/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy rtl:group-hover:-translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+40px)]">
              <div className="photo-shadow relative aspect-[4/5] overflow-hidden bg-grey">
                {CASES.map(({ client, media }, i) => (
                  <img
                    key={client.slug}
                    src={media.cover.src}
                    alt={i === active ? (locale === "ar" ? media.cover.altAr ?? media.cover.alt : media.cover.alt) : ""}
                    aria-hidden={i !== active}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={cn(
                      "photo absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                    )}
                    style={{
                      objectPosition: media.cover.position,
                      background: media.cover.bg,
                    }}
                  />
                ))}
              </div>
              <p className="t-small mt-4 text-water">
                {locale === "ar"
                  ? CASES[active].client.subtitleAr ?? CASES[active].client.subtitle
                  : CASES[active].client.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

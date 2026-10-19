"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import { CASES } from "./case-media";
import { Arrow, Emphasis, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

/** Work page: every case study as a staggered two-column editorial grid. */
export function WorkIndex() {
  const t = useTranslations("workPage");
  const { locale } = useAppLocale();
  const ar = locale === "ar";

  return (
    <section className="section-y bg-cream text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <div className="mt-[clamp(48px,7vw,130px)] flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h1 className="t-display t-xl animate-rise leading-[0.94]">
            <Emphasis text={t("title")} />
          </h1>
          <p
            className="t-body animate-rise max-w-[36ch]"
            style={{ animationDelay: "120ms" }}>
            {t("intro")}
          </p>
        </div>

        <ol className="mt-[clamp(64px,8vw,150px)] grid gap-x-[clamp(24px,4vw,80px)] gap-y-[clamp(64px,7vw,130px)] pb-[calc(var(--section-y)+clamp(0px,9vw,180px))] md:grid-cols-2 md:pb-[calc(var(--section-y)+clamp(80px,9vw,180px))] md:[&>li:nth-child(even)]:translate-y-[clamp(80px,9vw,180px)]">
          {CASES.map(({ client, media, number }, i) => {
            const name = ar ? client.ar : client.en;
            const subtitle = ar
              ? (client.subtitleAr ?? client.subtitle)
              : client.subtitle;
            const sector = ar
              ? (client.sectorAr ?? client.sector)
              : client.sector;
            const nativeCover = media.coverPreserveAspect === true;
            return (
              <Reveal as="li" key={client.slug} delay={(i % 2) * 100}>
                <Link
                  href={`/work/${client.slug}`}
                  className="group block min-w-0">
                  <div
                    className={cn(
                      "photo-shadow relative max-h-[var(--media-max)] overflow-hidden",
                      nativeCover
                        ? "mx-auto bg-cream"
                        : "aspect-[4/3] w-full bg-grey",
                    )}
                    style={
                      nativeCover
                        ? {
                            aspectRatio: `${media.cover.w}/${media.cover.h}`,
                            width: `min(100%, calc(var(--media-max) * ${media.cover.w} / ${media.cover.h}))`,
                            background: media.cover.bg,
                          }
                        : { background: media.cover.bg }
                    }>
                    <img
                      src={media.cover.src}
                      alt={
                        ar
                          ? (media.cover.altAr ?? media.cover.alt)
                          : media.cover.alt
                      }
                      width={media.cover.w}
                      height={media.cover.h}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      style={{
                        objectPosition: media.cover.position ?? "center",
                        background: media.cover.bg,
                      }}
                    />
                  </div>
                  <div className="mt-7 flex items-center justify-between gap-6 border-t border-navy/20 pt-6">
                    <div className="flex min-w-0 flex-col gap-3">
                      <span className="t-label t-num text-water">
                        {t("caseLabel", { n: String(number).padStart(2, "0") })}{" "}
                        · {sector}
                      </span>
                      <h2 className="text-[length:var(--case-title)] font-bold leading-none tracking-[-0.02em]">
                        {name}
                      </h2>
                      {subtitle && (
                        <p className="t-lead max-w-[30ch] lowercase">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    <span className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-navy/25 transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-cream">
                      <Arrow />
                      <span className="sr-only">{t("viewCase")}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

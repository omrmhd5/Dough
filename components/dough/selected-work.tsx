"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import { CASES, type CaseMedia } from "./case-media";
import { Arrow, Emphasis, RunningHeader, TextLink } from "./primitives";
import { Reveal } from "./reveal";

function homePreviewCover(media: CaseMedia) {
  return media.coverHome ?? media.cover;
}

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
              const sector =
                locale === "ar"
                  ? (client.sectorAr ?? client.sector)
                  : client.sector;
              const preview = homePreviewCover(media);
              return (
                <li key={client.slug} className="border-b border-navy/20">
                  <Link
                    href={`/work/${client.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid min-w-0 grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-x-4 py-4 sm:grid-cols-[clamp(56px,6vw,110px)_minmax(0,1fr)_auto] sm:gap-x-5 sm:py-6">
                    <span className="t-label t-num hidden text-water sm:block">
                      {tc("caseLabel", { n: String(number).padStart(2, "0") })}
                    </span>
                    <span
                      className={cn(
                        "relative block overflow-hidden sm:hidden",
                        client.slug === "farooja"
                          ? "bg-cream"
                          : "aspect-square bg-grey",
                      )}
                      style={
                        client.slug === "farooja"
                          ? { aspectRatio: `${preview.w}/${preview.h}` }
                          : undefined
                      }>
                      <img
                        src={preview.src}
                        alt=""
                        loading="lazy"
                        width={preview.w}
                        height={preview.h}
                        className={
                          client.slug === "farooja"
                            ? "size-full object-contain"
                            : "photo"
                        }
                        style={
                          preview.position
                            ? { objectPosition: preview.position }
                            : undefined
                        }
                      />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span
                        className={cn(
                          "truncate text-[length:var(--name-title)] font-light leading-[1.05] tracking-[-0.02em] group-hover:font-bold group-focus-visible:font-bold",
                          active === i && "lg:font-bold",
                        )}>
                        {name}
                      </span>
                      <span className="t-small truncate text-water">
                        {sector}
                      </span>
                    </span>
                    <Arrow className="size-5 text-navy/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy rtl:group-hover:-translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+40px)]">
              <div
                className={cn(
                  "relative max-h-[var(--media-max)]",
                  CASES[active].client.slug === "farooja"
                    ? "w-full overflow-hidden photo-shadow bg-cream"
                    : cn(
                        "aspect-[4/5]",
                        CASES[active].media.coverCompare
                          ? "overflow-visible"
                          : "overflow-hidden photo-shadow bg-grey",
                      ),
                )}
                style={
                  CASES[active].client.slug === "farooja"
                    ? {
                        aspectRatio: `${homePreviewCover(CASES[active].media).w}/${homePreviewCover(CASES[active].media).h}`,
                      }
                    : undefined
                }>
                {CASES.map(({ client, media }, i) => {
                  const preview = homePreviewCover(media);
                  const compare = media.coverCompare;
                  const fade = cn(
                    "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === active
                      ? "scale-100 opacity-100"
                      : "scale-[1.03] opacity-0",
                  );

                  // Cases with a before/after pair (Akleh) show both side by side.
                  if (compare) {
                    // Two equal columns across the whole preview space, bottoms on one
                    // line. The old logo is naturally smaller, the new wordmark bigger.
                    // No background, shadow or overlay; multiply drops the old logo's
                    // white so it sits straight on the page.
                    const sides = [
                      { key: "before", image: compare.before, blend: true },
                      { key: "after", image: compare.after, blend: false },
                    ] as const;
                    return (
                      <div
                        key={client.slug}
                        aria-hidden={i !== active}
                        className={cn(fade, "flex items-center")}
                        style={{
                          insetInlineStart: "-2.5vw",
                          insetInlineEnd: "calc(var(--gutter) * -0.9)",
                        }}>
                        <div className="grid w-full grid-cols-2 items-end gap-[clamp(16px,2vw,32px)]">
                          {sides.map(({ key, image, blend }) => (
                            <figure
                              key={key}
                              className="flex min-w-0 flex-col gap-3">
                              <figcaption className="t-label text-water">
                                {tc(key)}
                              </figcaption>
                              <img
                                src={image.src}
                                alt={
                                  i === active
                                    ? locale === "ar"
                                      ? (image.altAr ?? image.alt)
                                      : image.alt
                                    : ""
                                }
                                width={image.w}
                                height={image.h}
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                                className={cn(
                                  "block h-auto w-full",
                                  blend && "mix-blend-multiply",
                                )}
                              />
                            </figure>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const faroojaPreview = client.slug === "farooja";
                  return (
                    <img
                      key={client.slug}
                      src={preview.src}
                      alt={
                        i === active
                          ? locale === "ar"
                            ? (preview.altAr ?? preview.alt)
                            : preview.alt
                          : ""
                      }
                      width={preview.w}
                      height={preview.h}
                      aria-hidden={i !== active}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className={cn(
                        fade,
                        faroojaPreview
                          ? "size-full object-contain bg-cream"
                          : "photo",
                      )}
                      style={{
                        objectPosition: preview.position,
                        background: faroojaPreview
                          ? (preview.bg ?? "var(--cream)")
                          : preview.bg,
                      }}
                    />
                  );
                })}
              </div>
              <p className="t-small mt-4 text-water">
                {locale === "ar"
                  ? (CASES[active].client.subtitleAr ??
                    CASES[active].client.subtitle)
                  : CASES[active].client.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

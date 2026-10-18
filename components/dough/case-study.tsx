"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import {
  CASES,
  type CaseEntry,
  type Gallery,
  type MediaImage,
  type Stat,
  type Tone,
} from "./case-media";
import { FilmTile } from "./capabilities";
import { Arrow, Emphasis, OutArrow, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-navy",
  grey: "bg-grey text-navy",
  sparkle: "bg-sparkle text-navy",
  navy: "bg-navy text-cream",
};

const isDark = (tone: Tone) => tone === "navy";

function useL() {
  const { locale } = useAppLocale();
  return <T,>(en: T, ar: T | undefined) => (locale === "ar" && ar ? ar : en);
}

/* ── Building blocks ──────────────────────────────────────────────────── */

function Figure({
  image,
  className,
  frameClassName,
  aspect,
  dark,
  shadow = true,
  eager = false,
}: {
  image: MediaImage;
  className?: string;
  frameClassName?: string;
  aspect?: string;
  dark?: boolean;
  shadow?: boolean;
  eager?: boolean;
}) {
  const L = useL();
  const caption = L(image.caption, image.captionAr);
  return (
    <figure className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden bg-grey",
          shadow && "photo-shadow",
          frameClassName,
        )}
        style={{
          aspectRatio: aspect ?? `${image.w}/${image.h}`,
          background: image.bg,
        }}>
        <img
          src={image.src}
          alt={L(image.alt, image.altAr)}
          width={image.w}
          height={image.h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 size-full",
            image.fit === "contain" ? "object-contain p-[8%]" : "object-cover",
          )}
          style={{ objectPosition: image.position }}
        />
      </div>
      {caption && (
        <figcaption
          className={cn("t-small mt-4", dark ? "text-sparkle" : "text-water")}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function StatRow({ stats, dark }: { stats: Stat[]; dark?: boolean }) {
  const L = useL();
  return (
    <dl
      className={cn(
        "grid gap-10 border-t pt-8 sm:grid-cols-3",
        dark ? "border-sparkle/30" : "border-navy/20",
      )}>
      {stats.map((stat) => (
        <div key={stat.value + stat.label} className="flex flex-col gap-2">
          <dt className="sr-only">{L(stat.label, stat.labelAr)}</dt>
          <dd className="t-num text-[clamp(52px,6.5vw,128px)] font-light leading-none tracking-[-0.04em]">
            {stat.value}
          </dd>
          <dd
            aria-hidden="true"
            className={cn("t-small", dark ? "text-sparkle" : "text-water")}>
            {L(stat.label, stat.labelAr)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function GalleryHeader({ gallery, caseLabel }: { gallery: Gallery; caseLabel: string }) {
  const L = useL();
  const dark = isDark(gallery.tone);
  const heading = L(gallery.heading, gallery.headingAr);
  const body = L(gallery.body, gallery.bodyAr);
  return (
    <>
      <RunningHeader
        start={caseLabel}
        end={L(gallery.label, gallery.labelAr)}
        tone={dark ? "dark" : "light"}
      />
      {(heading || body) && (
        <Reveal className="mt-[clamp(40px,5vw,96px)] grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-[clamp(48px,6vw,120px)]">
          {heading ? (
            <h2 className="t-display t-sm max-w-[16ch]">
              <Emphasis text={heading} />
            </h2>
          ) : (
            <span />
          )}
          {body && (
            <p className={cn("t-body max-w-[46ch]", dark && "text-sparkle")}>{body}</p>
          )}
        </Reveal>
      )}
    </>
  );
}

const colsClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

function GalleryBody({ gallery }: { gallery: Gallery }) {
  const t = useTranslations("workCaseStudy");
  const L = useL();
  const dark = isDark(gallery.tone);
  const { images } = gallery;

  switch (gallery.kind) {
    case "grid":
      return (
        <>
          <div className={cn("grid gap-[clamp(12px,1.6vw,32px)]", colsClass[gallery.cols ?? 3])}>
            {images.map((image, i) => (
              <Reveal key={image.src + i} delay={(i % (gallery.cols ?? 3)) * 70}>
                <Figure image={image} aspect={gallery.aspect} dark={dark} />
              </Reveal>
            ))}
          </div>
          {gallery.palette && (
            <div className="mt-[clamp(40px,5vw,80px)] border-t border-navy/20 pt-7">
              <span className="t-label font-semibold">{t("palette")}</span>
              <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {gallery.palette.map((swatch) => (
                  <li key={swatch.hex} className="flex items-center gap-4">
                    <span
                      className="size-12 shrink-0 rounded-full sm:size-14"
                      style={{ background: swatch.hex }}
                    />
                    <span className="flex flex-col">
                      <span className="t-small font-medium">{L(swatch.name, swatch.nameAr)}</span>
                      <span className="t-num text-[13px] text-water" dir="ltr">
                        {swatch.hex}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      );

    case "feature": {
      const [lead, ...rest] = images;
      if (!rest.length) {
        return (
          <Reveal>
            <Figure
              image={lead}
              dark={dark}
              className="mx-auto w-full max-w-[min(100%,980px)]"
              frameClassName="max-h-[85svh]"
            />
          </Reveal>
        );
      }
      return (
        <div className="grid gap-[clamp(16px,2vw,40px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Reveal>
            <Figure image={lead} dark={dark} />
          </Reveal>
          <div className="grid gap-[clamp(16px,2vw,40px)]">
            {rest.map((image, i) => (
              <Reveal key={image.src} delay={(i + 1) * 90}>
                <Figure
                  image={image}
                  dark={dark}
                  aspect={rest.length > 1 ? "4/3" : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      );
    }

    case "beforeAfter": {
      const [before, after] = images;
      return (
        <div className="grid gap-[clamp(16px,2vw,40px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-end">
          <Reveal className="flex flex-col gap-4">
            <span className="t-label text-water">{t("before")}</span>
            <Figure image={before} aspect="500/347" shadow={false} />
          </Reveal>
          <Reveal className="flex flex-col gap-4" delay={100}>
            <span className="t-label text-water">{t("after")}</span>
            <Figure image={{ ...after, caption: undefined, captionAr: undefined }} aspect="1080/750" />
          </Reveal>
        </div>
      );
    }

    case "phones": {
      const [before, print1, print2, phone1, phone2] = images;
      const phone = (image: MediaImage) => (
        <div className="w-[clamp(140px,13vw,240px)] rounded-[clamp(26px,2.4vw,40px)] bg-[#151515] p-[clamp(6px,0.5vw,9px)] shadow-[0_40px_70px_-24px_rgba(18,41,64,0.45)]">
          <div className="aspect-[9/19] overflow-hidden rounded-[clamp(20px,1.9vw,31px)] bg-[#F0EBE5]">
            <img
              src={image.src}
              alt={L(image.alt, image.altAr)}
              loading="lazy"
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      );
      return (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-[clamp(24px,3vw,56px)]">
          <Reveal>
            <Figure image={before} aspect="440/311" shadow={false} />
          </Reveal>
          <Reveal delay={90} className="flex flex-col">
            <div className="grid grid-cols-2">
              {[print1, print2].map((image) => (
                <div
                  key={image.src}
                  className="photo-shadow relative aspect-[3/4] overflow-hidden">
                  <img
                    src={image.src}
                    alt={L(image.alt, image.altAr)}
                    loading="lazy"
                    className="photo"
                  />
                </div>
              ))}
            </div>
            <p className="t-small mt-4 text-water">{L(print1.caption, print1.captionAr)}</p>
          </Reveal>
          <Reveal delay={180} className="flex flex-col">
            <div className="flex justify-start gap-[clamp(12px,1.5vw,28px)]">
              {phone(phone1)}
              {phone(phone2)}
            </div>
            <p className="t-small mt-4 text-water">{L(phone1.caption, phone1.captionAr)}</p>
          </Reveal>
        </div>
      );
    }

    case "screens":
      return (
        <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-4">
          <div className="mx-auto flex w-max gap-[clamp(14px,1.5vw,28px)]">
            {images.map((image, i) => (
              <Reveal key={image.src} delay={i * 80} className="flex flex-col items-center">
                <div className="h-[clamp(28px,3vw,56px)] w-[clamp(8px,0.75vw,14px)] bg-[#9A9A9A]" />
                <div className="w-[clamp(180px,17vw,330px)] rounded-lg bg-[#0B0B0B] p-[clamp(6px,0.6vw,12px)] shadow-[0_40px_60px_-24px_rgba(0,0,0,0.6)]">
                  <img
                    src={image.src}
                    alt={L(image.alt, image.altAr)}
                    loading="lazy"
                    className="block aspect-[608/1080] w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "video":
      if (!gallery.video) return null;
      return (
        <Reveal className="mx-auto w-full max-w-[min(100%,560px)]">
          <FilmTile
            src={gallery.video.src}
            poster={gallery.video.poster}
            alt={L(gallery.heading ?? "", gallery.headingAr)}
            playLabel={t("play")}
            pauseLabel={t("pause")}
            className="photo-shadow aspect-[616/1000]"
          />
        </Reveal>
      );
  }
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function CaseStudy({ entry }: { entry: CaseEntry }) {
  const t = useTranslations("workCaseStudy");
  const L = useL();
  const { client, media, number } = entry;
  const caseLabel = t("caseLabel", { n: String(number).padStart(2, "0") });
  const name = L(client.en, client.ar);
  const subtitle = L(client.subtitle, client.subtitleAr);
  const overview = L(client.overview, client.overviewAr);
  const challenge = L(client.challenge, client.challengeAr);
  const approach = L(client.approach, client.approachAr);
  const outcome = L(client.outcome, client.outcomeAr);
  const scope = L(client.scope ?? [], client.scopeAr);
  const experience =
    client.experience?.map((item) => ({
      title: L(item.title, item.titleAr),
      items: L(item.items, item.itemsAr),
    })) ?? [];
  const next = CASES[number % CASES.length];

  const meta = [
    { label: t("client"), value: name },
    { label: t("industry"), value: L(client.sector, client.sectorAr) },
    client.year ? { label: t("year"), value: client.year } : null,
    { label: t("servicesLabel"), value: L(client.services, client.servicesAr) },
  ].filter(Boolean) as { label: string; value: string }[];

  const coverAlt = L(media.cover.alt, media.cover.altAr);

  return (
    <article>
      {/* Opener */}
      {media.opener === "split" ? (
        <section className="relative overflow-hidden bg-cream pt-[var(--nav-h)] text-navy">
          <div className="lg:absolute lg:inset-y-0 lg:end-0 lg:w-[52%]">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:h-full"
              style={{ background: media.cover.bg ?? "var(--grey)" }}>
              <img
                src={media.cover.src}
                alt={coverAlt}
                width={media.cover.w}
                height={media.cover.h}
                fetchPriority="high"
                className="animate-fade absolute inset-0 size-full object-cover"
                style={{ objectPosition: media.cover.position }}
              />
            </div>
          </div>
          <div className="wrap relative">
            <div className="flex flex-col justify-between gap-14 py-12 sm:py-16 lg:min-h-[min(calc(100svh-var(--nav-h)),1100px)] lg:w-[48%] lg:py-[clamp(56px,5vw,100px)] lg:pe-[clamp(32px,4vw,80px)]">
              <RunningHeader start={caseLabel} end={name} />
              <div className="flex flex-col gap-8">
                <h1 className="animate-rise text-[clamp(56px,7vw,132px)] font-bold leading-[0.95] tracking-[-0.03em]">
                  {name}
                </h1>
                {subtitle && (
                  <p
                    className="t-lead animate-rise max-w-[24ch] text-[clamp(24px,2.5vw,48px)] lowercase leading-[1.2]"
                    style={{ animationDelay: "120ms" }}>
                    {subtitle}
                  </p>
                )}
              </div>
              <div
                className="animate-rise flex flex-col gap-8"
                style={{ animationDelay: "200ms" }}>
                {overview && <p className="t-body max-w-[48ch] font-normal">{overview}</p>}
                <Link
                  href="/work"
                  className="t-label -my-3 inline-flex w-fit items-center gap-2 py-3 text-water transition-colors hover:text-navy">
                  <Arrow className="-scale-x-100 rtl:scale-x-100" />
                  {t("backToProjects")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-navy pt-[var(--nav-h)] text-cream">
          <div className="relative h-[clamp(320px,62svh,1000px)] overflow-hidden bg-navy-deep">
            <img
              src={media.cover.src}
              alt={coverAlt}
              width={media.cover.w}
              height={media.cover.h}
              fetchPriority="high"
              className="animate-fade absolute inset-0 size-full object-cover"
              style={{ objectPosition: media.cover.position }}
            />
          </div>
          <div className="wrap grid gap-10 py-[clamp(40px,5vw,80px)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-[clamp(48px,5vw,96px)]">
            <div className="flex flex-col gap-3">
              <span className="t-label text-sparkle">{caseLabel}</span>
              <h1 className="animate-rise text-[clamp(52px,5.5vw,104px)] font-bold leading-none tracking-[-0.02em]">
                {name}
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              {subtitle && (
                <p className="t-lead animate-rise max-w-[30ch] text-[clamp(24px,2.2vw,42px)] lowercase">
                  {subtitle}
                </p>
              )}
              {overview && <p className="t-body max-w-[52ch] text-sparkle">{overview}</p>}
              <Link
                href="/work"
                className="t-label -my-3 inline-flex w-fit items-center gap-2 py-3 text-sparkle transition-colors hover:text-cream">
                <Arrow className="-scale-x-100 rtl:scale-x-100" />
                {t("backToProjects")}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Meta */}
      <section className="bg-cream text-navy">
        <div className="wrap py-[clamp(48px,5vw,96px)]">
          <dl className="grid gap-x-10 gap-y-8 border-y border-navy/20 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.6fr_2fr]">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <dt className="t-label text-water">{item.label}</dt>
                <dd className="t-small font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
          {media.link && (
            <a
              href={media.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-baseline gap-2 py-2 text-[18px] font-semibold underline underline-offset-[0.35em]">
              {t("visitSite")}: {media.link.label}
              <OutArrow />
            </a>
          )}
        </div>
      </section>

      {/* Challenge & approach */}
      {(challenge || approach) && (
        <section className="bg-cream pb-[var(--section-y)] text-navy">
          <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-[clamp(48px,6vw,120px)]">
            {challenge && (
              <Reveal className="flex flex-col gap-6 border-t border-navy/20 pt-8">
                <h2 className="t-label font-semibold">
                  {L(client.challengeLabel, client.challengeLabelAr) ?? t("challengeDefault")}
                </h2>
                <p className="t-body max-w-[52ch]">{challenge}</p>
              </Reveal>
            )}
            {approach && (
              <Reveal className="flex flex-col gap-6 border-t border-navy/20 pt-8" delay={100}>
                <h2 className="t-label font-semibold">
                  {L(client.approachLabel, client.approachLabelAr) ?? t("approachDefault")}
                </h2>
                <p className="t-body max-w-[52ch]">{approach}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Headline figures */}
      {media.stats && (
        <section className="bg-cream pb-[var(--section-y)] text-navy">
          <div className="wrap">
            <Reveal>
              <StatRow stats={media.stats} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Galleries */}
      {media.galleries.map((gallery, i) => (
        <section
          key={gallery.label + i}
          className={cn("section-y", toneClass[gallery.tone])}>
          <div className="wrap">
            <GalleryHeader gallery={gallery} caseLabel={caseLabel} />
            <div className="mt-[clamp(40px,5vw,96px)]">
              <GalleryBody gallery={gallery} />
            </div>
            {gallery.stats && (
              <div className="mt-16">
                <StatRow stats={gallery.stats} dark={isDark(gallery.tone)} />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* What we did */}
      {experience.length > 0 && (
        <section className="section-y bg-navy text-cream">
          <div className="wrap">
            <RunningHeader
              start={caseLabel}
              end={L(client.experienceLabel, client.experienceLabelAr) ?? t("experienceDefault")}
              tone="dark"
            />
            <ol className="mt-[clamp(48px,6vw,110px)] grid gap-x-[clamp(32px,4vw,80px)] gap-y-12 md:grid-cols-2">
              {experience.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(i % 2) * 90}
                  className="flex flex-col gap-4 border-t border-sparkle/35 pt-7">
                  <span className="t-label t-num font-semibold text-sparkle/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(18px,1.5vw,28px)] font-bold uppercase leading-tight tracking-[0.04em]">
                    {item.title}
                  </h3>
                  {item.items && <p className="t-small text-sparkle">{item.items}</p>}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Scope & outcome */}
      {(scope.length > 0 || outcome) && (
        <section className="section-y bg-cream text-navy">
          <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[clamp(48px,6vw,120px)]">
            {scope.length > 0 && (
              <Reveal className="flex flex-col gap-6 border-t border-navy/20 pt-8">
                <h2 className="t-label font-semibold">{t("scopeOfWork")}</h2>
                <ul className="columns-1 gap-8 sm:columns-2">
                  {scope.map((item) => (
                    <li key={item} className="t-small break-inside-avoid border-b border-navy/10 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {outcome && (
              <Reveal className="flex flex-col gap-6 border-t border-navy/20 pt-8" delay={100}>
                <h2 className="t-label font-semibold">{t("outcome")}</h2>
                <p className="t-lead max-w-[40ch]">{outcome}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Next case */}
      <section className="bg-sparkle text-navy">
        <Link
          href={`/work/${next.client.slug}`}
          className="wrap group grid items-center gap-8 py-[clamp(56px,7vw,130px)] sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex flex-col gap-4">
            <span className="t-label">{t("nextCase")}</span>
            <span className="flex items-center gap-5 text-[clamp(44px,6vw,112px)] font-light leading-none tracking-[-0.03em] transition-[font-weight] group-hover:font-bold">
              {L(next.client.en, next.client.ar)}
              <Arrow className="size-[0.5em] transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
            </span>
          </div>
          <div className="photo-shadow relative hidden aspect-[4/5] w-[clamp(160px,16vw,300px)] overflow-hidden bg-grey sm:block">
            <img
              src={next.media.cover.src}
              alt=""
              loading="lazy"
              className="photo transition-transform duration-700 group-hover:scale-[1.05]"
              style={{ objectPosition: next.media.cover.position, background: next.media.cover.bg }}
            />
          </div>
        </Link>
      </section>
    </article>
  );
}

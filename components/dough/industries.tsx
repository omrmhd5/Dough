"use client";

import { useTranslations } from "next-intl";
import { CLIENT_WALL } from "./case-media";
import { Emphasis, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

type Group = { name: string; items: { area: string; clients: string }[] };

/** Profile page 06: where we work. */
export function Industries() {
  const t = useTranslations("industries");
  const groups = t.raw("groups") as Group[];

  return (
    <section className="section-y bg-cream text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <Reveal>
          <h2 className="t-display t-md mt-[clamp(56px,8vw,150px)]">
            <Emphasis text={t("title")} />
          </h2>
        </Reveal>

        <div className="mt-[clamp(56px,7vw,130px)] grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-[clamp(32px,3.75vw,72px)]">
          {groups.map((group, i) => (
            <Reveal
              key={group.name}
              delay={i * 80}
              className="flex flex-col gap-7 border-t-2 border-navy pt-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[clamp(28px,2.3vw,44px)] font-bold leading-none">
                  {group.name}
                </h3>
                <span className="t-label t-num text-water">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <dl className="flex flex-col gap-5">
                {group.items.map((item) => (
                  <div key={item.area} className="flex flex-col gap-1">
                    <dt className="t-small font-semibold">{item.area}</dt>
                    <dd className="t-small font-light">{item.clients}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Profile page 07: white logos on navy, even optical size. */
export function ClientWall() {
  const t = useTranslations("clients");

  return (
    <section className="section-y bg-navy text-cream">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} tone="dark" />

        <Reveal>
          <h2 className="t-display t-sm mt-[clamp(48px,6vw,110px)]">
            <Emphasis text={t("title")} />
          </h2>
        </Reveal>

        <ul
          aria-label={t("wallLabel")}
          className="mt-[clamp(48px,6vw,110px)] flex flex-wrap justify-center gap-y-10 lg:gap-y-16">
          {CLIENT_WALL.map((logo) => (
            <li
              key={logo.src}
              className="flex h-[clamp(56px,6vw,112px)] basis-1/3 items-center justify-center sm:basis-1/4 md:basis-1/5 lg:basis-[calc(100%/7)]">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="w-auto max-w-[80%] object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                style={{
                  maxHeight: `clamp(${Math.round(logo.h * 0.42)}px, ${(logo.h / 19.2).toFixed(2)}vw, ${logo.h}px)`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

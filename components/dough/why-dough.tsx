"use client";

import { useTranslations } from "next-intl";
import { Emphasis, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

type Reason = { title: string; body: string };

/** Profile page 05: three reasons on navy. */
export function WhyDough() {
  const t = useTranslations("whyDough");
  const reasons = t.raw("reasons") as Reason[];

  return (
    <section className="section-y bg-navy text-cream">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} tone="dark" />

        <Reveal>
          <h2 className="t-display t-md mt-[clamp(56px,8vw,150px)] max-w-[14ch]">
            <Emphasis text={t("title")} />
          </h2>
        </Reveal>

        <ol className="mt-[clamp(64px,8vw,150px)] grid gap-12 md:grid-cols-3 md:gap-[clamp(32px,5vw,96px)]">
          {reasons.map((reason, i) => (
            <Reveal
              as="li"
              key={reason.title}
              delay={i * 100}
              className="flex flex-col gap-5 border-t border-sparkle/35 pt-8">
              <span className="t-label t-num font-semibold text-sparkle/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(22px,1.9vw,36px)] font-semibold leading-tight">
                {reason.title}
              </h3>
              <p className="t-body max-w-[36ch] text-sparkle">{reason.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

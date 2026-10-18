"use client";

import { useTranslations } from "next-intl";
import { Emphasis, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

type Step = { title: string; body: string };

/** Profile page 09: five steps on sparkle. */
export function HowWeWork() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="section-y bg-sparkle text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} tone="sparkle" />

        <Reveal>
          <h2 className="t-display t-md mt-[clamp(56px,8vw,150px)]">
            <Emphasis text={t("title")} />
          </h2>
        </Reveal>

        <ol className="mt-[clamp(64px,8vw,150px)] grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-[clamp(24px,2.5vw,48px)]">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="flex flex-col gap-4 border-t border-navy pt-7">
              <span className="t-label t-num font-semibold text-navy/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(20px,1.65vw,32px)] font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="t-small max-w-[30ch]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

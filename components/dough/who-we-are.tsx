"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const STAT_VALUES = [
  { end: 30, suffix: "+" },
  { end: 150, suffix: "+" },
  { end: 8, suffix: "+" },
  {
    end: 1,
    suffix: "BN+",
    variant: "billion" as const,
    duration: 2800,
  },
];

export function WhoWeAre() {
  const t = useTranslations("whoWeAre");
  const paragraphs = t.raw("paragraphs") as string[];
  const stats = t.raw("stats") as { label: string }[];

  return (
    <section
      id="who"
      className="bg-cream py-28 md:py-40 overflow-hidden text-navy">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-end gap-6 mb-20 md:mb-28">
          <Reveal duration={800} delay={150}>
            <span className="font-display font-normal text-[12px] leading-[14px] uppercase text-water">
              {t("eyebrow")}
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal delay={100} duration={850}>
              <div className="relative">
                <span
                  className="absolute -top-6 sm:-top-8 md:-top-10 -left-2 sm:-left-4 md:-left-6 font-display text-[56px] sm:text-[72px] md:text-[96px] font-medium text-blob/65 leading-none select-none pointer-events-none"
                  aria-hidden>
                  “
                </span>
                <p className="font-display font-medium lowercase text-xl sm:text-2xl md:text-[38px] md:leading-[48px] text-navy leading-relaxed text-pretty relative z-10">
                  {paragraphs[0]}
                </p>
                <span
                  className="absolute -bottom-2 sm:-bottom-4 md:-bottom-6 -right-1 sm:-right-2 md:-right-4 font-display text-[56px] sm:text-[72px] md:text-[96px] font-medium text-blob/65 leading-none select-none pointer-events-none"
                  aria-hidden>
                  ”
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8 lg:mt-2">
            <Reveal delay={200} duration={850}>
              <div className="flex flex-col gap-3">
                <span className="font-display font-bold text-[12px] leading-[14px] uppercase text-water">
                  {t("creativePhilosophy")}
                </span>
                <p className="font-display font-normal text-[16px] leading-[24px] text-navy/80 lowercase">
                  {paragraphs[1]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} duration={850}>
              <div className="flex flex-col gap-3">
                <span className="font-display font-bold text-[12px] leading-[14px] uppercase text-water">
                  {t("workingPrinciple")}
                </span>
                <p className="font-display font-normal text-[16px] leading-[24px] text-navy/80 lowercase">
                  {paragraphs[2]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-navy/10 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, idx) => {
              const values = STAT_VALUES[idx];
              return (
                <Reveal key={stat.label} delay={400 + idx * 100} duration={850}>
                  <div className="flex flex-col items-start w-full relative">
                    <div className="relative w-full flex items-end min-h-[60px] md:min-h-[80px]">
                      <CountUp
                        end={values.end}
                        suffix={values.suffix}
                        variant={"variant" in values ? values.variant : "default"}
                        duration={"duration" in values ? values.duration : 2000}
                        className="font-medium text-[42px] md:text-[60px] text-navy leading-none relative z-10 select-none pb-3"
                      />
                      <div className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-navy/80 z-0" />
                    </div>

                    <p className="font-display font-semibold text-[12px] leading-[16px] uppercase text-navy/60 mt-4 text-left">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

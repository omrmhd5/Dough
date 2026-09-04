"use client";

import { useTranslations } from "next-intl";
import { Blob } from "./blob";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type WorkStep = {
  title: string;
  body: string;
};

export function HowWeWork() {
  const t = useTranslations("howWeWork");
  const steps = t.raw("steps") as WorkStep[];

  return (
    <section
      id="work"
      className="relative bg-navy pt-32 pb-48 text-cream md:pt-48 md:pb-64 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal duration={800}>
          <h2 className="font-display font-bold uppercase text-3xl md:text-[40px] md:leading-[44px] text-cream mb-16">
            {t("title")}
          </h2>
        </Reveal>

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-5 items-start">
          {steps.map((step, i) => {
            const staggerClass = i % 2 === 1 ? "lg:mt-20" : "lg:mt-0";

            return (
              <Reveal
                key={step.title}
                delay={i * 120}
                duration={850}
                className={`w-full ${staggerClass}`}>
                <div className="flex flex-col items-center text-center h-full">
                  <span className="font-display text-[12px] leading-[14px] font-bold text-water uppercase mb-4">
                    {t("stepLabel", {
                      step: String(i + 1).padStart(2, "0"),
                    })}
                  </span>

                  <Blob
                    variant={i}
                    className="size-36 sm:size-44 bg-blob text-navy shadow-[0_10px_30px_rgba(186,215,233,0.15)]">
                    <span
                      className={cn(
                        "max-w-[88%] text-balance font-display text-[14px] leading-[18px] font-extrabold uppercase sm:text-[15px] sm:leading-[19px]",
                        i === 1 && "translate-y-1",
                      )}>
                      {step.title}
                    </span>
                  </Blob>

                  <p className="mt-8 text-pretty font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-[24ch] lowercase">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

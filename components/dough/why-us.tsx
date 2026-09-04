"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

type WhyUsPoint = {
  title: string;
  content: string;
};

export function WhyUs() {
  const t = useTranslations("whyUs");
  const points = t.raw("points") as WhyUsPoint[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="why"
      className="bg-cream py-24 md:py-36 text-navy overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal duration={800}>
              <h2 className="font-display font-bold uppercase text-3xl md:text-[40px] md:leading-[44px] text-navy">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal duration={800} delay={150}>
              <p className="font-display font-normal text-[16px] leading-[22px] text-navy/70 max-w-sm lowercase">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex flex-col w-full border-t border-navy/10">
            {points.map((point, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={point.title} delay={idxDelay(i)} duration={800}>
                  <div className="border-b border-navy/10 py-5">
                    <button
                      onClick={() => toggleAccordion(i)}
                      className="flex w-full cursor-pointer items-center justify-between text-left group focus:outline-none"
                      aria-expanded={isOpen}>
                      <div className="flex items-start gap-3 min-w-0 flex-1 sm:items-center sm:gap-4 md:gap-6">
                        <span className="font-display font-medium tabular-nums text-[12px] leading-[14px] text-water/65 select-none shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 font-display font-bold uppercase text-base sm:text-[18px] md:text-[22px] leading-tight text-navy group-hover:text-water transition-colors duration-300 text-pretty">
                          {point.title}
                        </span>
                      </div>

                      <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-navy/15 text-navy group-hover:border-water group-hover:text-water transition-all duration-300 relative shrink-0">
                        <span className="absolute w-2.5 h-[1.5px] bg-current" />
                        <span
                          className={`absolute w-[1.5px] h-2.5 bg-current transition-transform duration-300 ${isOpen ? "rotate-90 scale-0" : ""}`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-4"
                          : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}>
                      <div className="overflow-hidden">
                        <p className="font-display font-normal text-[16px] leading-[22px] text-navy/80 pl-10 md:pl-12 max-w-xl pb-2 lowercase">
                          {point.content}
                        </p>
                      </div>
                    </div>
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

function idxDelay(i: number) {
  return 100 + i * 50;
}

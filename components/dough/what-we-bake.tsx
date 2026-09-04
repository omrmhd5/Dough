"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

type BakeService = {
  title: string;
  description: string;
  tags: string;
};

export function WhatWeBake() {
  const t = useTranslations("whatWeBake");
  const services = t.raw("services") as BakeService[];
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="bake"
      className="relative overflow-hidden bg-navy py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(196,217,235,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-bold uppercase text-cream md:text-[40px] md:leading-[44px]">
              {t("title")}
            </h2>
            <p className="max-w-md font-display text-[16px] leading-[22px] text-cream/55 text-pretty lowercase">
              {t("subtitleLine1")}
              <br />
              {t("subtitleLine2")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ul className="flex flex-col">
              {services.map((service, i) => {
                const isActive = active === i;

                return (
                  <li key={service.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className={`relative w-full cursor-pointer border-b border-cream/10 py-5 text-left transition-colors duration-300 focus:outline-none focus-visible:text-blob md:py-6 ${
                        isActive ? "text-blob" : "text-cream/45"
                      }`}>
                      <span
                        className={`absolute left-0 top-1/2 h-px -translate-y-1/2 bg-blob transition-all duration-500 ${
                          isActive ? "w-6 md:w-10" : "w-0"
                        }`}
                      />
                      <span className="flex min-w-0 flex-1 items-baseline gap-3 pl-0 sm:gap-4 md:gap-6 md:pl-14">
                        <span className="shrink-0 font-display text-[12px] font-medium uppercase tabular-nums leading-[14px] text-water/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`min-w-0 flex-1 font-display text-base font-bold uppercase tracking-[0.03em] leading-tight transition-transform duration-300 sm:text-[18px] md:text-[22px] ${
                            isActive ? "translate-x-1" : ""
                          }`}>
                          {service.title}
                        </span>
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden border-b border-cream/10 transition-all duration-500 lg:hidden ${
                        isActive
                          ? "max-h-64 opacity-100"
                          : "max-h-0 opacity-0 border-transparent"
                      }`}>
                      <div className="pb-6 pl-10 pt-1">
                        <p className="font-display text-[16px] leading-[24px] text-cream/75 text-pretty lowercase">
                          {service.description}
                        </p>
                        <p className="mt-3 font-display text-[12px] leading-[18px] text-water/75 lowercase">
                          {service.tags}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <div className="relative min-h-[320px]">
              <div
                key={current.title}
                className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="font-display text-[12px] font-medium uppercase text-water">
                  {String(active + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 max-w-xl font-display text-[32px] font-bold uppercase tracking-[0.03em] leading-[1.1] text-cream text-pretty">
                  {current.title}
                </h3>
                <p className="mt-8 max-w-lg font-display text-[18px] leading-[28px] text-cream/70 text-pretty lowercase">
                  {current.description}
                </p>
                <p className="mt-10 max-w-xl border-t border-cream/10 pt-6 font-display text-[12px] leading-[20px] text-water/80 lowercase">
                  {current.tags}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

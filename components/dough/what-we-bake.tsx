"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Emphasis, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

type Service = { title: string; description: string; tags: string };

/** Profile page 08: six disciplines as a ruled list that opens to show tags. */
export function WhatWeBake() {
  const t = useTranslations("services");
  const services = t.raw("items") as Service[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="section-y bg-cream text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <div className="mt-[clamp(56px,8vw,150px)] grid gap-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-[clamp(48px,6vw,120px)]">
          <Reveal className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--nav-h)+48px)] lg:self-start">
            <h2 className="t-display t-md">
              <Emphasis text={t("title")} />
            </h2>
            <p className="t-body max-w-[32ch]">{t("intro")}</p>
          </Reveal>

          <ol className="border-t border-navy/20">
            {services.map((service, i) => {
              const isOpen = open === i;
              const panelId = `service-panel-${i}`;
              return (
                <li key={service.title} className="border-b border-navy/20">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group grid w-full grid-cols-[clamp(40px,4.5vw,90px)_1fr_auto] items-baseline gap-x-4 py-[clamp(22px,2vw,32px)] text-start sm:grid-cols-[clamp(40px,4.5vw,90px)_minmax(0,1fr)_minmax(0,1fr)_auto]">
                    <span className="t-label t-num font-semibold text-water">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-[clamp(15px,1.35vw,28px)] font-bold uppercase leading-tight tracking-[0.03em]">
                      {service.title}
                    </span>
                    <span className="t-small col-start-2 row-start-2 mt-2 min-w-0 font-light sm:col-start-3 sm:row-start-1 sm:mt-0">
                      {service.description}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative col-start-3 row-start-1 size-4 self-center sm:col-start-4">
                      <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-navy" />
                      <span
                        className={cn(
                          "absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-navy transition-transform duration-300",
                          isOpen && "scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}>
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-1.5 pb-8 ps-[calc(clamp(40px,4.5vw,90px)+1rem)]">
                        {service.tags.split("•").map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-navy/25 px-3 py-1.5 text-[12px] leading-snug">
                            {tag.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const SERVICES = [
  {
    title: "Strategy & Branding",
    description:
      "Build brands with clarity, purpose, and competitive advantage.",
    tags: "Brand Strategy • Positioning • Naming • Visual Identity • Brand Guidelines • Tone of Voice",
  },
  {
    title: "Creative Direction & Content",
    description:
      "Create unforgettable stories that capture attention and inspire action.",
    tags: "Creative Direction • Campaign Concepts • Photography • Videography • Motion Graphics • CGI • AI Content • Copywriting",
  },
  {
    title: "Digital Marketing",
    description:
      "Accelerate growth through data-driven marketing and performance.",
    tags: "Social Media • Performance Marketing • Paid Media • Community Management • Influencer Marketing • SEO • Email Marketing • Analytics",
  },
  {
    title: "Web Design & Development",
    description:
      "Build seamless digital experiences that convert visitors into customers.",
    tags: "UI/UX Design • Website Design • Web Development • Landing Pages • E-commerce • CMS Development • Conversion Optimization",
  },
  {
    title: "Packaging & Physical Branding",
    description: "Elevate every physical touchpoint of your brand.",
    tags: "Packaging Design • Menu Design • POS Materials • Merchandise • Brand Collateral • Print Design",
  },
  {
    title: "Retail & Spatial Design",
    description: "Create immersive spaces that leave lasting impressions.",
    tags: "Booth Design • Kiosks • Store Branding • Signage • Partitions • Exhibition Design • Environmental Graphics",
  },
];

export function WhatWeBake() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section
      id="bake"
      className="relative overflow-hidden bg-navy py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(196,217,235,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream md:text-[40px] md:leading-[44px]">
              What we bake
            </h2>
            <p className="max-w-md font-display text-[16px] leading-[22px] text-cream/55 text-pretty">
              Six disciplines. One kitchen. Select a service to see what&apos;s
              inside.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Service index — typographic list, no boxes */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col">
              {SERVICES.map((service, i) => {
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
                      <span className="flex items-baseline gap-4 pl-0 md:gap-6 md:pl-14">
                        <span className="shrink-0 font-display text-[12px] font-medium tabular-nums leading-[14px] tracking-widest text-water/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[18px] font-bold leading-tight tracking-tight transition-transform duration-300 md:text-[22px] ${
                            isActive ? "translate-x-1" : ""
                          }`}>
                          {service.title}
                        </span>
                      </span>
                    </button>

                    {/* Mobile inline preview */}
                    <div
                      className={`overflow-hidden border-b border-cream/10 transition-all duration-500 lg:hidden ${
                        isActive
                          ? "max-h-64 opacity-100"
                          : "max-h-0 opacity-0 border-transparent"
                      }`}>
                      <div className="pb-6 pl-10 pt-1">
                        <p className="font-display text-[16px] leading-[24px] text-cream/75 text-pretty">
                          {service.description}
                        </p>
                        <p className="mt-3 font-display text-[12px] leading-[18px] text-water/75">
                          {service.tags}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop preview panel — open editorial space, not a card */}
          <div className="hidden lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <div className="relative min-h-[320px]">
              <span className="pointer-events-none absolute -left-4 top-0 font-display text-[120px] font-bold leading-none text-cream/[0.03] tabular-nums">
                {String(active + 1).padStart(2, "0")}
              </span>

              <div
                key={current.title}
                className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="font-display text-[12px] font-medium uppercase tracking-[0.2em] text-water">
                  Service {String(active + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 max-w-xl font-display text-[32px] font-bold leading-[1.1] tracking-tight text-cream text-pretty">
                  {current.title}
                </h3>
                <p className="mt-8 max-w-lg font-display text-[18px] leading-[28px] text-cream/70 text-pretty">
                  {current.description}
                </p>
                <p className="mt-10 max-w-xl border-t border-cream/10 pt-6 font-display text-[12px] leading-[20px] text-water/80">
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

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./reveal";
import { CLIENTS } from "./clients-data";

const FEATURED = ["Akleh", "LUX", "HNDL", "Taghmesa", "Tant"];

function clientSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function FeaturedWorks() {
  const clients = FEATURED.map((name) =>
    CLIENTS.find((c) => c.en === name),
  ).filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % clients.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  return (
    <section id="featured" className="bg-cream py-20 text-navy md:py-28 relative overflow-hidden">
      
      {/* Background Visual Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#122940_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <Reveal duration={800}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy">
              Featured Work
            </h2>
          </div>
        </Reveal>

        {/* Carousel Viewport Container */}
        <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full flex items-center justify-center overflow-visible">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-[-12px] sm:left-4 md:left-8 lg:left-12 z-30 size-11 sm:size-12 rounded-full border border-navy/15 bg-cream/90 text-navy hover:bg-navy hover:text-cream hover:border-navy flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-[-12px] sm:right-4 md:right-8 lg:right-12 z-30 size-11 sm:size-12 rounded-full border border-navy/15 bg-cream/90 text-navy hover:bg-navy hover:text-cream hover:border-navy flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>

          <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
            {clients.map((client, i) => {
              if (!client) return null;
              const slug = clientSlug(client.en);

              // Calculate active state:
              // offset of i relative to activeIndex (handles looping)
              let offset = i - activeIndex;
              const len = clients.length;
              if (offset < -len / 2) offset += len;
              if (offset > len / 2) offset -= len;

              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              // Setup motion / transform styling for 3 active elements
              let positionClass = "";
              if (isActive) {
                positionClass = "translate-x-0 scale-100 opacity-100 z-20 pointer-events-auto shadow-[0_20px_50px_rgba(18,41,64,0.18)]";
              } else if (isPrev) {
                positionClass = "-translate-x-[35%] sm:-translate-x-[45%] scale-90 opacity-45 z-10 cursor-pointer";
              } else if (isNext) {
                positionClass = "translate-x-[35%] sm:translate-x-[45%] scale-90 opacity-45 z-10 cursor-pointer";
              }

              return (
                <div
                  key={client.en}
                  onClick={() => {
                    if (isPrev) prevSlide();
                    if (isNext) nextSlide();
                  }}
                  className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${positionClass}`}
                >
                  <div
                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-navy ${!isActive ? 'pointer-events-none select-none' : ''}`}
                  >
                    <Image
                      src={client.images[0]}
                      alt={`${client.en} featured project`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
                      priority={isActive}
                    />

                    {/* Moody Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/15 pointer-events-none" />

                    {/* Content Pinned Cleanly to Bottom */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                      <div className="flex items-start">
                        {client.logo ? (
                          <div className="relative h-8 w-24 sm:h-9 sm:w-28">
                            <Image
                              src={client.logo}
                              alt={`${client.en} logo`}
                              fill
                              className="object-contain object-left filter brightness-0 invert"
                            />
                          </div>
                        ) : (
                          <span className="font-display text-sm font-extrabold uppercase tracking-widest text-cream">
                            {client.en}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-4 mt-auto">
                        <div>
                          <p className="font-display text-lg font-bold leading-snug text-cream sm:text-xl md:text-2xl">
                            {client.en}
                            <span className="text-cream/50"> — </span>
                            {client.subtitle}
                          </p>
                          <p className="mt-1.5 font-display text-[11px] leading-[13px] font-semibold uppercase tracking-widest text-cream/50">
                            {client.sector}
                          </p>
                        </div>

                        {isActive ? (
                          <Link
                            href={`/clients/${slug}`}
                            className="inline-flex items-center gap-1.5 font-display text-[11px] leading-[13px] font-bold uppercase tracking-widest text-cream/80 hover:text-blob transition-colors duration-300 w-fit pointer-events-auto"
                          >
                            View project
                            <ArrowUpRight className="size-3" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-display text-[11px] leading-[13px] font-bold uppercase tracking-widest text-cream/30">
                            View project
                            <ArrowUpRight className="size-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { CLIENTS, type ClientDetail } from "./clients-data";

export type { ClientDetail };
export { CLIENTS };

const MARQUEE_LOGOS = [
  { src: "/Logos/Barns.png", alt: "Barn's" },
  { src: "/Logos/Kufta.png", alt: "Kufta" },
  { src: "/Logos/Crepe2000.png", alt: "Crepe 2000" },
  { src: "/Logos/ElAnfoshy.png", alt: "El Anfoshy" },
  { src: "/Logos/ElDahan.png", alt: "El Dahan" },
  { src: "/Logos/Hamzawy.png", alt: "Hamzawy" },
  { src: "/Logos/LilKitchen.png", alt: "Lil Kitchen" },
  { src: "/Logos/MadghoutDajaj.png", alt: "Madghout Dajaj" },
  { src: "/Logos/MiniTownTeam.png", alt: "Mini Town Team" },
  { src: "/Logos/QasrElKababgi.png", alt: "Qasr El Kababgi" },
  { src: "/Logos/ShawermaElreem.png", alt: "Shawerma El Reem" },
  { src: "/Logos/Shrimp.png", alt: "Shrimp" },
  { src: "/Logos/Taghmesa.png", alt: "Taghmesa" },
  { src: "/Logos/Tant.png", alt: "Tant" },
  { src: "/Logos/Titos.png", alt: "Titos" },
  { src: "/Logos/TownTeam.png", alt: "Town Team" },
  { src: "/Logos/Akleh.png", alt: "Akleh" },
  { src: "/Logos/Bebek.png", alt: "Bebek" },
];

const LOGO_GROUPS = [
  MARQUEE_LOGOS.slice(0, 6),
  MARQUEE_LOGOS.slice(6, 12),
  MARQUEE_LOGOS.slice(12, 18),
];

export function ClientsPortfolio() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveGroup((prev) => (prev + 1) % LOGO_GROUPS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="portfolio" className="bg-cream py-20 text-navy md:py-28">
      {/* Title */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Clients
          </h2>
          <p className="mt-4 text-lg text-navy/70">They asked we shaped</p>
        </Reveal>
      </div>

      {/* Logo banner — 6 at a time, fade between groups */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mt-10 overflow-hidden border-y border-cream/10 py-8 bg-[#122940]">
        <div className="relative mx-auto max-w-7xl px-6 min-h-28 sm:min-h-16">
          {LOGO_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className={`absolute inset-x-6 inset-y-0 grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center transition-opacity duration-1000 ease-in-out ${
                activeGroup === groupIdx
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={activeGroup !== groupIdx}>
              {group.map((logo) => (
                <div
                  key={logo.src}
                  className="relative mx-auto h-14 w-full max-w-36 sm:h-16">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Clients Showcase Section */}
      <div id="clients-list" className="mx-auto mt-16 max-w-7xl px-6">
        <div className="flex flex-col gap-16">
          {CLIENTS.map((client, idx) => {
            const clientSlug = client.en
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={client.en} className="scroll-mt-28 group/client">
                <Reveal duration={700}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/40 border border-navy/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                      <div className="flex items-center gap-4 sm:gap-6">
                        {/* Logo Box */}
                        <div className="size-14 sm:size-16 shrink-0 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden border border-cream/10 bg-navy">
                          {client.logo ? (
                            <img
                              src={client.logo}
                              alt={`${client.en} logo`}
                              className="object-contain p-2 w-full h-full"
                            />
                          ) : (
                            <span className="font-display font-extrabold text-lg text-cream select-none uppercase">
                              {client.en.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        {/* Client Names and Info */}
                        <div className="flex-1 min-w-[150px]">
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                            {client.en}
                          </h3>
                          <p className="text-xs uppercase font-extrabold tracking-widest text-water mt-1 font-display">
                            {client.sector}
                          </p>
                        </div>
                      </div>

                      {/* Services Sentence */}
                      <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-xl">
                        We shaped their brand through{" "}
                        <span className="font-semibold text-navy">
                          {client.services}
                        </span>
                        .
                      </p>

                      {/* Button */}
                      <div>
                        <Link
                          href={`/clients/${clientSlug}`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy hover:bg-navy/90 text-cream font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm">
                          View Case Study
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Single Minimal Showcase Image */}
                    <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm border border-navy/5">
                      <Link
                        href={`/clients/${clientSlug}`}
                        className="block w-full h-full relative group">
                        <Image
                          src={client.images[0]}
                          alt={`${client.en} brand showcase preview`}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { CLIENTS, type ClientDetail } from "./clients-data";
import { ClientLogo } from "./client-logo";

export type { ClientDetail };
export { CLIENTS };

const MARQUEE_LOGOS = [
  { src: "/logos/Comfort.png", alt: "Comfort" },
  { src: "/logos/Kufta.png", alt: "Kufta" },
  { src: "/logos/CIF.png", alt: "CIF" },
  { src: "/logos/Farooja.png", alt: "Farooja" },
  { src: "/logos/Knorr.png", alt: "Knorr" },
  { src: "/logos/TownTeam.png", alt: "Town Team" },
  { src: "/logos/MiniTownTeam.png", alt: "Mini Town Team" },
  { src: "/logos/Crepe2000.png", alt: "Crepe 2000" },
  { src: "/logos/MadghoutDagag.png", alt: "Madghout Dagag" },
  { src: "/logos/LUX.png", alt: "LUX" },
  { src: "/logos/SayedHanafy.png", alt: "Sayed Hanafy" },
  { src: "/logos/Barns.png", alt: "Barn's" },
  { src: "/logos/Heinz.png", alt: "Heinz" },
  { src: "/logos/E11vn.png", alt: "E11vn" },
  { src: "/logos/HNDL.png", alt: "HNDL" },
  { src: "/logos/Akleh.png", alt: "Akleh" },
  { src: "/logos/Camay.png", alt: "Camay" },
  { src: "/logos/LilKitchen.png", alt: "Lil Kitchen" },
  { src: "/logos/ElDahan.png", alt: "El Dahan" },
  { src: "/logos/Unilever.png", alt: "Unilever" },
  { src: "/logos/Taghmisa.png", alt: "Taghmisa" },
  { src: "/logos/Bebek.png", alt: "Bebek" },
  { src: "/logos/Crinkle.png", alt: "Crinkle" },
  { src: "/logos/MealFactory.png", alt: "Meal Factory" },
  { src: "/logos/ShawermaElReem.png", alt: "Shawerma ElReem" },
  { src: "/logos/Ziko.png", alt: "Ziko" },
  { src: "/logos/Orca.png", alt: "Orca" },
  { src: "/logos/KasrElKababgy.png", alt: "Kasr ElKababgy" },
  { src: "/logos/Tant.png", alt: "Tant" },
  { src: "/logos/ElAnfoushy.png", alt: "ElAnfoushy" },
  { src: "/logos/Urbnlanes.png", alt: "Urbnlanes" },
  { src: "/logos/Embaba.png", alt: "Embaba" },
  { src: "/logos/OstaRosto.png", alt: "Osta Rosto" },
  { src: "/logos/NazimCoffee.png", alt: "Nazim Coffee" },
];

const LOGO_GROUPS = [
  MARQUEE_LOGOS.slice(0, 8),
  MARQUEE_LOGOS.slice(8, 16),
  MARQUEE_LOGOS.slice(16, 25),
  MARQUEE_LOGOS.slice(25, 34),
];

export function ClientsPortfolio() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const cycleStartRef = useRef(Date.now());
  const activeGroupRef = useRef(0);

  const totalDuration = 3500;
  const tickInterval = 50;

  useEffect(() => {
    activeGroupRef.current = activeGroup;
  }, [activeGroup]);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      const elapsed = Date.now() - cycleStartRef.current;
      const nextProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(nextProgress);

      if (elapsed >= totalDuration) {
        cycleStartRef.current = Date.now();
        const nextGroup = (activeGroupRef.current + 1) % LOGO_GROUPS.length;
        activeGroupRef.current = nextGroup;
        setActiveGroup(nextGroup);
        setProgress(0);
      }
    }, tickInterval);

    return () => clearInterval(id);
  }, [isPaused]);

  const goToGroup = (idx: number) => {
    cycleStartRef.current = Date.now();
    activeGroupRef.current = idx;
    setActiveGroup(idx);
    setProgress(0);
  };

  return (
    <section id="portfolio" className="relative z-10 py-20 md:py-28">
      {/* Title */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-cream">
            Work
          </h2>
          <p className="mt-4 font-display font-normal text-[16px] leading-[19px] text-cream/70">
            They asked we shaped
          </p>
        </Reveal>
      </div>

      {/* Logo banner — 8, 8, 9, 9 per slide */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mt-10 overflow-hidden border-y border-cream/10 py-10 bg-navy/50 sm:py-12">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-6">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeGroup * 100}%)` }}>
            {LOGO_GROUPS.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="flex min-w-full shrink-0 items-center justify-between gap-1 px-1 sm:gap-2">
                {group.map((logo) => (
                  <div
                    key={logo.src}
                    className="flex flex-1 items-center justify-center">
                    <ClientLogo src={logo.src} alt={logo.alt} size="banner" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Time bullets progress indicator */}
        <div className="flex justify-center gap-2 mt-10 sm:mt-12">
          {LOGO_GROUPS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToGroup(idx)}
              className={`relative h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all duration-300 ${
                activeGroup === idx ? "w-10" : "w-5"
              }`}
              aria-label={`Go to client slide group ${idx + 1}`}>
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all ease-linear"
                style={{
                  width: activeGroup === idx ? `${progress}%` : "0%",
                  transitionDuration: activeGroup === idx ? "100ms" : "0s",
                }}
              />
            </button>
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
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-cream/5 border border-cream/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-cream/20 transition-all duration-300">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                      <div className="flex items-center gap-4 sm:gap-6">
                        {/* Logo Box */}
                        <ClientLogo
                          src={client.logo}
                          alt={`${client.en} logo`}
                          fallback={client.en}
                          size="card"
                          boxed
                        />

                        {/* Client Names and Info */}
                        <div className="flex-1 min-w-[150px]">
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream leading-tight">
                            {client.en}
                          </h3>
                          <p className="font-display font-extrabold text-[12px] leading-[14px] uppercase tracking-widest text-water mt-1">
                            {client.sector}
                          </p>
                        </div>
                      </div>

                      {/* Services Sentence */}
                      <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-xl">
                        We shaped their brand through{" "}
                        <span className="font-bold text-cream">
                          {client.services}
                        </span>
                        .
                      </p>

                      {/* Button */}
                      <div>
                        <Link
                          href={`/work/${clientSlug}`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cream hover:bg-blob text-navy font-bold text-[12px] leading-[14px] uppercase tracking-widest transition-all duration-300 shadow-sm">
                          View Project
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Single Minimal Showcase Image */}
                    <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm border border-cream/10">
                      <Link
                        href={`/work/${clientSlug}`}
                        className="block w-full h-full relative group">
                        <Image
                          src={client.images[0]}
                          alt={`${client.en} brand showcase preview`}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-cream/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

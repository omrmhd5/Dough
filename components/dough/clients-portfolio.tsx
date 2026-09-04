"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import {
  CLIENTS,
  type ClientDetail,
  formatBrandName,
  TWO_LINE_TITLE_CLIENTS,
} from "./clients-data";
import { ClientLogo } from "./client-logo";
import { useLocalizedClient } from "@/lib/i18n/use-localized-client";

export type { ClientDetail };
export { CLIENTS };

const MARQUEE_LOGOS = [
  { src: "/logos/Comfort.png", alt: "COMFORT" },
  { src: "/logos/Kufta.png", alt: "KUFTA" },
  { src: "/logos/CIF.png", alt: "CIF" },
  { src: "/logos/Farooja.png", alt: "FAROOJA" },
  { src: "/logos/Knorr.png", alt: "KNORR" },
  { src: "/logos/TownTeam.png", alt: "TOWN TEAM" },
  { src: "/logos/MiniTownTeam.png", alt: "MINI TOWN TEAM" },
  { src: "/logos/Crepe2000.png", alt: "CREPE 2000" },
  { src: "/logos/MadghoutDagag.png", alt: "MADGHOUT DAGAG" },
  { src: "/logos/LUX.png", alt: "LUX" },
  { src: "/logos/SayedHanafy.png", alt: "SAYED HANAFY" },
  { src: "/logos/Barns.png", alt: "BARN'S" },
  { src: "/logos/Heinz.png", alt: "HEINZ" },
  { src: "/logos/E11vn.png", alt: "E11VN" },
  { src: "/logos/HNDL.png", alt: "HNDL" },
  { src: "/logos/Akleh.png", alt: "AKLEH" },
  { src: "/logos/Camay.png", alt: "CAMAY" },
  { src: "/logos/LilKitchen.png", alt: "LIL KITCHEN" },
  { src: "/logos/ElDahan.png", alt: "EL DAHAN" },
  { src: "/logos/Unilever.png", alt: "UNILEVER" },
  { src: "/logos/Taghmisa.png", alt: "TAGHMISA" },
  { src: "/logos/Bebek.png", alt: "BEBEK" },
  { src: "/logos/Crinkle.png", alt: "CRINKLE" },
  { src: "/logos/MealFactory.png", alt: "MEAL FACTORY" },
  { src: "/logos/ShawermaElReem.png", alt: "SHAWERMA ELREEM" },
  { src: "/logos/Ziko.png", alt: "ZIKO" },
  { src: "/logos/Orca.png", alt: "ORCA" },
  { src: "/logos/KasrElKababgy.png", alt: "KASR ELKABABGY" },
  { src: "/logos/Tant.png", alt: "TANT" },
  { src: "/logos/ElAnfoushy.png", alt: "ELANFOUSHY" },
  { src: "/logos/Urbnlanes.png", alt: "URBNLANES" },
  { src: "/logos/Embaba.png", alt: "EMBABA" },
  { src: "/logos/OstaRosto.png", alt: "OSTA ROSTO" },
  { src: "/logos/NazimCoffee.png", alt: "NAZIM COFFEE" },
];

const LOGO_GROUPS = [
  MARQUEE_LOGOS.slice(0, 7),
  MARQUEE_LOGOS.slice(7, 14),
  MARQUEE_LOGOS.slice(14, 21),
  MARQUEE_LOGOS.slice(21, 28),
  MARQUEE_LOGOS.slice(28, 34),
];

function ClientPortfolioCard({ client }: { client: ClientDetail }) {
  const t = useTranslations("clientsPortfolio");
  const copy = useLocalizedClient(client);
  const clientSlug = client.en.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="scroll-mt-28 group/client">
      <Reveal duration={700}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#102536] border border-cream/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-cream/20 transition-all duration-300">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              <ClientLogo
                src={client.logo}
                alt={t("logoAlt", {
                  brand: formatBrandName(client.en),
                })}
                fallback={formatBrandName(client.en)}
                size="card"
                boxed
              />

              <div className="flex-1 min-w-0">
                {TWO_LINE_TITLE_CLIENTS.has(client.en) ? (
                  <div className="font-display text-base leading-snug text-cream sm:text-lg md:text-xl max-w-xl">
                    <p>
                      <span className="font-bold uppercase">
                        {formatBrandName(client.en)}
                      </span>
                      <span className="font-bold text-cream/50"> —</span>
                    </p>
                    <p className="mt-1 font-medium">{copy.subtitle}</p>
                  </div>
                ) : (
                  <p className="font-display text-lg leading-snug text-cream sm:text-xl md:text-2xl max-w-xl">
                    <span className="font-bold uppercase">
                      {formatBrandName(client.en)}
                    </span>
                    <span className="font-bold text-cream/50"> — </span>
                    <span className="font-medium lowercase">{copy.subtitle}</span>
                  </p>
                )}
                <p className="font-display font-extrabold text-[12px] leading-[14px] uppercase text-water mt-3">
                  {copy.sector}
                </p>
              </div>
            </div>

            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-xl lowercase">
              {t("servicesSentence", { services: copy.services })}
            </p>

            <div>
              <Link
                href={`/work/${clientSlug}`}
                className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-full bg-cream hover:bg-blob text-navy font-bold text-[12px] leading-[14px] uppercase transition-all duration-300 shadow-sm">
                {t("viewProject")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm border border-cream/10">
            <Link
              href={`/work/${clientSlug}`}
              className="block w-full h-full relative cursor-pointer group">
              <Image
                src={client.images[0]}
                alt={t("showcaseAlt", {
                  brand: formatBrandName(client.en),
                })}
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
}

export function ClientsPortfolio() {
  const t = useTranslations("clientsPortfolio");
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const cycleStartRef = useRef(Date.now());
  const activeGroupRef = useRef(0);

  const totalDuration = 5000;
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
          <h2 className="font-display font-bold uppercase text-3xl md:text-[40px] md:leading-[44px] text-cream">
            {t("clientsTitle")}
          </h2>
          <p className="mt-4 font-display font-normal text-[16px] leading-[19px] text-cream/70 lowercase">
            {t("clientsSubtitle")}
          </p>
        </Reveal>
      </div>

      {/* Logo banner — 7, 7, 7, 7, 6 per slide */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mt-10 overflow-hidden py-10 bg-navy/50 sm:py-12">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden px-6">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeGroup * 100}%)` }}>
            {LOGO_GROUPS.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="flex min-w-full shrink-0 items-center justify-between gap-0.5 px-0.5 min-[480px]:gap-1 min-[480px]:px-1 sm:gap-2">
                {group.map((logo) => (
                  <div
                    key={logo.src}
                    className="flex flex-1 items-center justify-center">
                    <ClientLogo
                      src={logo.src}
                      alt={formatBrandName(logo.alt)}
                      size="banner"
                    />
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
              aria-label={t("slideGroup", { index: idx + 1 })}>
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
      <div id="clients-list" className="mx-auto mt-24 max-w-7xl px-6 md:mt-32">
        <Reveal duration={800}>
          <h2 className="font-display font-bold uppercase text-3xl md:text-[40px] md:leading-[44px] text-cream mb-12">
            {t("projectsTitle")}
          </h2>
        </Reveal>
        <div className="flex flex-col gap-16">
          {CLIENTS.map((client) => (
            <ClientPortfolioCard key={client.en} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}

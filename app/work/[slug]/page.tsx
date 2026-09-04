"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { SiteNav } from "@/components/dough/site-nav";
import { SiteFooter } from "@/components/dough/site-footer";
import {
  CLIENTS,
  formatBrandName,
  TWO_LINE_TITLE_CLIENTS,
  type ClientDetail,
} from "@/components/dough/clients-data";
import { ClientLogo } from "@/components/dough/client-logo";
import { useLocalizedClient } from "@/lib/i18n/use-localized-client";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const t = useTranslations("workCaseStudy");

  const client = CLIENTS.find(
    (c) => c.en.toLowerCase() === slug?.toLowerCase(),
  );

  if (!client) {
    return (
      <div className="min-h-screen bg-navy text-cream flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-bold font-display">{t("notFound")}</h1>
        <Link
          href="/work"
          className="cursor-pointer text-water hover:text-blob text-sm font-display font-bold">
          {t("backToProjects")}
        </Link>
      </div>
    );
  }

  return <CaseStudyContent client={client} />;
}

function CaseStudyContent({ client }: { client: ClientDetail }) {
  const copy = useLocalizedClient(client);
  const t = useTranslations("workCaseStudy");
  const brand = formatBrandName(client.en);

  return (
    <main className="bg-navy min-h-screen pt-20 text-cream relative overflow-x-hidden">
      <SiteNav />

      <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blob/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-water/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-16 flex flex-col gap-12 md:gap-16 z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Link
              href="/work"
              className="flex w-fit cursor-pointer items-center gap-2 pb-4 text-xs font-bold uppercase text-water hover:text-blob transition-colors duration-300 group font-display">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              {t("backToProjects")}
            </Link>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center md:gap-4 border-y border-cream/10 py-6">
              <span className="shrink-0 font-display text-xs uppercase font-extrabold text-water">
                {t("project")}
              </span>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4 md:max-w-3xl">
                <ClientLogo
                  src={client.logo}
                  alt={t("heroAlt", { brand })}
                  fallback={brand}
                  size="hero"
                  boxed
                />
                <div className="min-w-0 flex-1">
                  {copy.subtitle ? (
                    TWO_LINE_TITLE_CLIENTS.has(client.en) ? (
                      <div className="font-display text-xl leading-snug text-cream sm:text-2xl lg:text-3xl">
                        <p>
                          <span className="font-bold uppercase">{brand}</span>
                          <span className="font-bold text-cream/50"> —</span>
                        </p>
                        <p className="mt-1 text-[0.9em] font-medium text-cream/80">
                          {copy.subtitle}
                        </p>
                      </div>
                    ) : (
                      <h1 className="font-display text-2xl leading-snug text-cream sm:text-3xl lg:text-4xl">
                        <span className="font-bold uppercase">{brand}</span>
                        <span className="font-bold text-cream/50"> — </span>
                        <span className="text-[0.9em] font-medium lowercase text-cream/80">
                          {copy.subtitle}
                        </span>
                      </h1>
                    )
                  ) : (
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-cream leading-tight">
                      {brand}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2 text-[12px] leading-[14px] font-display">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] leading-[14px] uppercase font-semibold text-cream/40">
                {t("client")}
              </span>
              <span className="font-bold uppercase text-cream text-[12px] leading-[14px]">
                {brand}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] leading-[14px] uppercase font-semibold text-cream/40">
                {t("industry")}
              </span>
              <span className="font-bold uppercase text-cream text-[12px] leading-[14px]">
                {copy.sector}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] leading-[14px] uppercase font-semibold text-cream/40">
                {t("year")}
              </span>
              <span className="font-bold lowercase text-cream text-[12px] leading-[14px]">
                {client.year}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <span className="text-[12px] leading-[14px] uppercase font-semibold text-cream/40">
                {t("servicesLabel")}
              </span>
              <span className="font-bold lowercase text-cream text-[12px] leading-[14px]">
                {copy.services}
              </span>
            </div>
          </div>
        </div>

        {client.images[0] && (
          <div className="relative w-full h-[35vh] sm:h-[45vh] rounded-2xl overflow-hidden border border-cream/10 shadow-lg">
            <Image
              src={client.images[0]}
              alt={t("heroAlt", { brand })}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto flex flex-col gap-4 py-4">
          <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water text-center">
            {t("overview")}
          </span>
          <p className="font-display text-[18px] leading-[26px] md:text-[22px] md:leading-[32px] font-medium text-cream/85 text-center lowercase">
            {copy.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-t border-b border-cream/10 py-10 md:py-12">
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water">
              {copy.challengeLabel}
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 text-justify lowercase">
              {copy.challenge}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water">
              {copy.approachLabel}
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 text-justify lowercase">
              {copy.approach}
            </p>
          </div>
        </div>

        {client.showcaseLayout === "combined" ? (
          (client.images.length > 0 || copy.experience.length > 0) && (
            <div className="flex flex-col gap-8 border-b border-cream/10 pb-10 md:pb-12">
              <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water text-center">
                {copy.galleryLabel}
              </span>
              {client.images.length > 0 && (
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {client.images.map((imgUrl, idx) => (
                    <div
                      key={`${imgUrl}-${idx}`}
                      className="break-inside-avoid relative rounded-2xl overflow-hidden bg-cream/[0.02] border border-cream/10 shadow-sm">
                      <img
                        src={imgUrl}
                        alt={t("visualAlt", { brand, index: idx + 1 })}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
              {copy.experience.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {copy.experience.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                      <h3 className="font-display text-sm font-extrabold uppercase text-cream">
                        {item.title}
                      </h3>
                      {item.items && (
                        <p className="font-display text-[12px] leading-[14px] text-cream/60 lowercase">
                          {item.items}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        ) : (
          <>
            {copy.experience.length > 0 && (
              <div className="flex flex-col gap-8 border-b border-cream/10 pb-10 md:pb-12">
                <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water text-center">
                  {copy.experienceLabel}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {copy.experience.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                      <h3 className="font-display text-sm font-extrabold uppercase text-cream">
                        {item.title}
                      </h3>
                      {item.items && (
                        <p className="font-display text-[12px] leading-[14px] text-cream/60 lowercase">
                          {item.items}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {client.images.length > 0 && (
              <div className="flex flex-col gap-6">
                <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water text-center">
                  {copy.galleryLabel}
                </span>
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {client.images.map((imgUrl, idx) => (
                    <div
                      key={`${imgUrl}-${idx}`}
                      className="break-inside-avoid relative rounded-2xl overflow-hidden bg-cream/[0.02] border border-cream/10 shadow-sm">
                      <img
                        src={imgUrl}
                        alt={t("visualAlt", { brand, index: idx + 1 })}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-t border-cream/10 pt-12 pb-6">
          <div className="flex flex-col gap-4">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water">
              {t("scopeOfWork")}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] leading-[14px] font-medium text-cream/70">
              {copy.scope.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 font-display lowercase">
                  <span className="size-1.5 rounded-full bg-water shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-water">
              {t("outcome")}
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/75 text-justify lowercase">
              {copy.outcome}
            </p>
          </div>
        </div>

        <div className="flex justify-center border-t border-cream/10 pt-8 mt-4">
          <Link
            href="/work"
            className="px-6 py-3 rounded-full bg-cream text-navy hover:bg-blob hover:text-navy font-bold text-xs uppercase transition-all duration-300 cursor-pointer shadow-md text-center font-display">
            {t("backToProjects")}
          </Link>
        </div>
      </div>

      <SiteFooter hideCareers />
    </main>
  );
}

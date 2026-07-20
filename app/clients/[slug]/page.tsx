"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/dough/site-nav";
import { SiteFooter } from "@/components/dough/site-footer";
import { CLIENTS } from "@/components/dough/clients-data";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const client = CLIENTS.find(
    (c) => c.en.toLowerCase() === slug?.toLowerCase(),
  );

  if (!client) {
    return (
      <div className="min-h-screen bg-navy text-cream flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-bold font-display">Project Not Found</h1>
        <Link
          href="/clients"
          className="text-water hover:text-blob text-sm font-display font-bold">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-navy min-h-screen pt-20 text-cream relative overflow-x-hidden">
      <SiteNav />

      {/* Ambient background glow blurs */}
      <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blob/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-water/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-16 flex flex-col gap-12 md:gap-16 z-10">
        {/* Back Link Header */}
        <div className="flex items-center justify-between border-b border-cream/10 pb-4">
          <Link
            href="/clients"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-water hover:text-blob transition-colors duration-300 group font-display">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        {/* Header: Project Title & Custom Subtitle */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-cream/10 pb-6">
            <span className="font-display text-xs uppercase font-extrabold tracking-widest text-water">
              Project
            </span>
            <div className="flex-1 md:max-w-3xl flex items-start gap-4 sm:gap-6">
              <div className="size-16 sm:size-20 shrink-0 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden border border-cream/10 bg-navy/50">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={`${client.en} logo`}
                    className="object-contain p-2 w-full h-full filter brightness-0 invert"
                  />
                ) : (
                  <span className="font-display font-extrabold text-lg text-cream select-none uppercase">
                    {client.en.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream leading-tight">
                  {client.en}
                </h1>
                {client.subtitle && (
                  <p className="font-display text-lg sm:text-xl text-cream/60 mt-2 font-medium">
                    {client.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Metadata Table */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-2 text-[12px] leading-[14px] font-display">
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] leading-[14px] uppercase font-semibold tracking-widest text-cream/40">
                Client
              </span>
              <span className="font-bold text-cream text-[12px] leading-[14px]">{client.en}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] leading-[14px] uppercase font-semibold tracking-widest text-cream/40">
                Year
              </span>
              <span className="font-bold text-cream text-[12px] leading-[14px]">{client.year}</span>
            </div>
            <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
              <span className="text-[12px] leading-[14px] uppercase font-semibold tracking-widest text-cream/40">
                Services
              </span>
              <span className="font-bold text-cream text-[12px] leading-[14px] leading-relaxed">
                {client.services}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        {client.images[0] && (
          <div className="relative w-full h-[35vh] sm:h-[45vh] rounded-2xl overflow-hidden border border-cream/10 shadow-lg">
            <Image
              src={client.images[0]}
              alt={`${client.en} Hero Showcase`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Overview */}
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 py-4">
          <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water">
            Overview
          </span>
          <p className="font-display text-[25px] leading-[28px] md:text-[33px] md:leading-[37px] font-medium leading-relaxed text-cream/85 text-pretty">
            {client.overview}
          </p>
        </div>

        {/* Challenge & Approach Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-t border-b border-cream/10 py-10 md:py-12">
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water">
              {client.challengeLabel || "The Challenge"}
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 text-pretty">
              {client.challenge}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water">
              Our Approach
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/70 text-pretty">
              {client.approach}
            </p>
          </div>
        </div>

        {/* Visual deliverables list */}
        {client.images.length > 0 && (
          <div className="flex flex-col gap-6">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water text-center">
              Visual Deliverables
            </span>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {client.images.map((imgUrl, idx) => (
                <div
                  key={`${imgUrl}-${idx}`}
                  className="break-inside-avoid relative rounded-2xl overflow-hidden bg-cream/[0.02] border border-cream/10 shadow-sm">
                  <img
                    src={imgUrl}
                    alt={`${client.en} design board visual ${idx + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scope of Work & Outcome Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-t border-cream/10 pt-12 pb-6">
          <div className="flex flex-col gap-4">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water">
              Scope of Work
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] leading-[14px] font-medium text-cream/70">
              {client.scope?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 font-display">
                  <span className="size-1.5 rounded-full bg-water shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-water">
              The Outcome
            </span>
            <p className="font-display font-normal text-[16px] leading-[19px] text-cream/75 text-pretty">
              {client.outcome}
            </p>
          </div>
        </div>

        {/* Footer Back Button */}
        <div className="flex justify-center border-t border-cream/10 pt-8 mt-4">
          <Link
            href="/clients"
            className="px-6 py-3 rounded-full bg-cream text-navy hover:bg-blob hover:text-navy font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-md text-center font-display">
            Back to Projects
          </Link>
        </div>
      </div>

      <SiteFooter hideCareers />
    </main>
  );
}

"use client";

import Link from "next/link";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy pt-40 pb-40 text-cream md:pt-56 md:pb-56 min-h-[90dvh] flex items-center">
      <div className="relative mx-auto max-w-7xl px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-start lg:col-span-12 max-w-4xl lowercase">
            <Reveal delay={100} duration={850}>
              <h1 className="font-display tracking-tight text-[36px] leading-[40px] md:text-[76px] md:leading-[80px] text-cream">
                <span className="font-extrabold">we shape</span> <br />
                <span className="font-light italic text-blob tracking-wide">
                  raw
                </span>{" "}
                <span className="font-extrabold">concepts</span> <br />
                <span className="text-white font-extrabold">
                  into cultural moments
                </span>
              </h1>
            </Reveal>

            <Reveal delay={250} duration={850}>
              <div className="mt-8 max-w-3xl">
                <p className="text-cream/75 font-display font-medium text-lg leading-relaxed md:text-xl lg:text-[24px] lg:leading-[30px]">
                  where ideas take shapes — a creative agency shaping brands,
                  stories, and moments from scratch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400} duration={850}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="cursor-pointer rounded-full bg-cream px-8 py-4 text-sm font-bold uppercase tracking-widest text-navy border border-cream relative overflow-hidden group hover:text-cream z-0 transition-colors duration-300">
                  {/* Dark color ripple/fill element */}
                  <span className="absolute inset-0 bg-navy -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
                  <span className="relative z-10">let&apos;s bake</span>
                </Link>
                <a
                  href="#featured"
                  className="cursor-pointer rounded-full border border-cream/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream relative overflow-hidden group hover:text-navy hover:border-cream z-0 transition-all duration-300">
                  {/* Light color ripple/fill element */}
                  <span className="absolute inset-0 bg-cream -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
                  <span className="relative z-10">explore work</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

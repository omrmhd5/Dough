"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy pt-32 pb-40 text-cream md:pt-48 md:pb-56">
      
      {/* Premium Ambient Background Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blob/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-water/20 blur-[130px] pointer-events-none" />
      
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-start lg:col-span-7">
            <h1 className="font-display font-extrabold tracking-tight text-[40px] leading-[40px] md:text-[93px] md:leading-[93px] text-cream max-w-3xl">
              We shape raw concepts <br />
              <span className="text-blob">into cultural moments.</span>
            </h1>
            
            <p className="mt-8 text-cream/75 font-display font-medium text-lg leading-relaxed md:text-xl lg:text-[33px] lg:leading-[37px] max-w-3xl">
              Where Ideas Take Shapes — a creative agency shaping brands, stories, and moments from scratch.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-cream px-8 py-4 text-sm font-bold text-navy border border-cream relative overflow-hidden group hover:text-cream z-0 transition-colors duration-300">
                {/* Dark color ripple/fill element */}
                <span className="absolute inset-0 bg-navy -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
                <span className="relative z-10">Let&apos;s Bake</span>
              </Link>
              <a
                href="#featured"
                className="rounded-full border border-cream/30 px-8 py-4 text-sm font-bold text-cream relative overflow-hidden group hover:text-navy hover:border-cream z-0 transition-all duration-300">
                {/* Light color ripple/fill element */}
                <span className="absolute inset-0 bg-cream -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
                <span className="relative z-10">Explore Work</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Block with Editorial styling */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl bg-[#122940] border border-white/10 shadow-2xl">
              <img
                src="/dough-hero.jpg"
                alt="Hands kneading raw dough on a floured surface"
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 mix-blend-luminosity"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR Safe Check
    if (typeof window === "undefined") return;

    // Initial Page Load Timeline
    const tl = gsap.timeline();

    // Hide elements initially to avoid flash of unstyled content (FOUC)
    // 1. Initial State Set
    gsap.set(
      [".gsap-nav-logo", ".gsap-nav-link", ".gsap-nav-btn", ".gsap-subtitle"],
      {
        opacity: 0,
      },
    );

    gsap.set(
      [".gsap-nav-logo", ".gsap-nav-link", ".gsap-nav-btn", ".gsap-subtitle"],
      {
        filter: "blur(10px)",
      },
    );

    // Smooth blur reveal for nav components and tagline
    tl.to(
      [".gsap-nav-logo", ".gsap-nav-link", ".gsap-nav-btn", ".gsap-subtitle"],
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.05,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden bg-navy pt-28 pb-32 text-cream sm:pb-40">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        {/* <span className="mb-8 rounded-full border border-cream/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cream/70 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
          creative agency · est. 2026
        </span> */}

        <p className="mt-8 text-balance font-display text-xl font-medium text-cream/80 sm:text-2xl md:text-3xl gsap-subtitle">
          Where Ideas Take Shapes
        </p>

        {/* Normal rounded photo */}
        <div className="relative mt-12 w-full max-w-3xl overflow-hidden rounded-2xl bg-[#122940] shadow-2xl">
          <img
            src="/dough-hero.jpg"
            alt="Hands kneading raw dough on a floured surface"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

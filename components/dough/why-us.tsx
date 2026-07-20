"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

const POINTS = [
  {
    title: "Magic of Creativity & Innovation",
    content: "At Dough, we believe in the magic of creativity and the power of innovation."
  },
  {
    title: "Molding Ideas into Reality",
    content: "Just like dough that can be molded into any shape, we shape ideas into reality."
  },
  {
    title: "Versatile & Adaptable Team",
    content: "Our team is as versatile and adaptable as the dough itself — ready to rise to any challenge."
  },
  {
    title: "Mixing Strategy with Passion",
    content: "We mix creativity with strategy, knead it with passion, and bake it with precision."
  },
  {
    title: "Constant Evolution & Rising",
    content: "Just like the perfect dough, we're always evolving and rising to the occasion."
  },
  {
    title: "Playful Professionalism",
    content: "We have a pinch of fun and a dash of cleverness — because who says business can't be a little playful?"
  }
];

export function WhyUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="why"
      className="bg-cream py-24 md:py-36 text-navy overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading & Caption */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal duration={800}>
              <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy">
                Why Us
              </h2>
            </Reveal>
            <Reveal duration={800} delay={150}>
              <p className="font-display font-normal text-[16px] leading-[22px] text-navy/70 max-w-sm">
                How we bake, shape, and rise to make raw concepts stand out from the noise.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Sleek FAQ Accordion List (No rounding identity, pure editorial borders) */}
          <div className="lg:col-span-7 flex flex-col w-full border-t border-navy/10">
            {POINTS.map((point, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={point.title} delay={idxDelay(i)} duration={800}>
                  <div className="border-b border-navy/10 py-5">
                    <button
                      onClick={() => toggleAccordion(i)}
                      className="flex w-full items-center justify-between text-left group focus:outline-none"
                      aria-expanded={isOpen}>
                      
                      {/* Left: Number & Title */}
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="font-display font-medium text-[12px] leading-[14px] text-water/65 font-mono select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display font-bold text-[18px] md:text-[22px] leading-tight text-navy group-hover:text-water transition-colors duration-300">
                          {point.title}
                        </span>
                      </div>

                      {/* Right: Expand/Collapse indicator */}
                      <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-navy/15 text-navy group-hover:border-water group-hover:text-water transition-all duration-300 relative shrink-0">
                        <span className="absolute w-2.5 h-[1.5px] bg-current" />
                        <span className={`absolute w-[1.5px] h-2.5 bg-current transition-transform duration-300 ${isOpen ? "rotate-90 scale-0" : ""}`} />
                      </span>

                    </button>

                    {/* Expandable answer container using CSS Grid Transition */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                      }`}>
                      <div className="overflow-hidden">
                        <p className="font-display font-normal text-[16px] leading-[22px] text-navy/80 pl-10 md:pl-12 max-w-xl pb-2">
                          {point.content}
                        </p>
                      </div>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function idxDelay(i: number) {
  return 100 + i * 50;
}

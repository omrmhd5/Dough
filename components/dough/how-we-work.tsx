import { Blob } from "./blob";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "DISCOVERY",
    body: "We dig in deep — brand audits, market pulse, and real convos. We listen more than we talk (for now).",
  },
  {
    title: "STRATEGY",
    body: "We knead the insights into a tight, tasty plan. Positioning, voice, goals — it all starts here.",
  },
  {
    title: "CREATIVE DEVELOPMENT",
    body: "From zero to concept — this is where your brand gets its flavor. Visuals, copy, packaging, campaigns — all baked in.",
  },
  {
    title: "EXECUTION",
    body: "We bring the heat. Whether it's content, media, or a full-on launch — our team rolls it out, pixel by pixel, post by post.",
  },
  {
    title: "OPTIMIZATION",
    body: "We don't 'set and forget.' We test, tweak, and turn insights into sharper moves.",
  },
];

export function HowWeWork() {
  return (
    <section
      id="work"
      className="relative bg-navy pt-32 pb-48 text-cream md:pt-48 md:pb-64 overflow-hidden">
      {/* Background visual grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal duration={800}>
          <h2 className="font-display font-bold uppercase text-3xl md:text-[40px] md:leading-[44px] text-cream mb-16">
            How We Work
          </h2>
        </Reveal>

        {/* Timeline staggered list */}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-5 items-start">
          {STEPS.map((step, i) => {
            // Apply vertical stagger offset only on lg screen (desktop)
            const staggerClass = i % 2 === 1 ? "lg:mt-20" : "lg:mt-0";

            return (
              <Reveal
                key={step.title}
                delay={i * 120}
                duration={850}
                className={`w-full ${staggerClass}`}>
                <div className="flex flex-col items-center text-center h-full">
                  {/* Step Number */}
                  <span className="font-display text-[12px] leading-[14px] font-bold text-water uppercase mb-4">
                    [Step {String(i + 1).padStart(2, "0")}]
                  </span>

                  {/* Blob container */}
                  <Blob
                    variant={i}
                    className="size-36 sm:size-44 bg-blob text-navy shadow-[0_10px_30px_rgba(186,215,233,0.15)]">
                    <span
                      className={cn(
                        "max-w-[88%] text-balance font-display text-[14px] leading-[18px] font-extrabold uppercase sm:text-[15px] sm:leading-[19px]",
                        i === 1 && "translate-y-1",
                      )}>
                      {step.title}
                    </span>
                  </Blob>

                  {/* Body Paragraph */}
                  <p className="mt-8 text-pretty font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-[24ch] lowercase">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

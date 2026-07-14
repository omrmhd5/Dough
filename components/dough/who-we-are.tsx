import { Reveal } from "./reveal";

const PARAGRAPHS = [
  "We're Dough — a creative agency shaping brands, stories, and moments from scratch.",
  "From bold concepts to scroll-stopping content, we don't just follow culture — we bake it fresh.",
  "Agile, obsessive, and unafraid of the unconventional, we work with brands ready to leave a mark, not just make a sale.",
];

const STATS = [
  { value: "30+", label: "Brands Transformed" },
  { value: "150+", label: "Creative Projects Delivered" },
  { value: "1BN+", label: "Customer Impressions Generated" },
];

export function WhoWeAre() {
  return (
    <section
      id="who"
      className="bg-cream py-32 md:py-48 overflow-hidden text-navy">
      <div className="mx-auto max-w-7xl px-6">
        {/* Premium Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <Reveal duration={800}>
            <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy">
              Who we are
            </h2>
          </Reveal>
        </div>

        {/* Bento Grid (Mathematically Verified Gapless Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-flow-dense">
          {/* Card 1: Large Intro (span 2, row-span 1) */}
          <Reveal delay={100} duration={800} className="md:col-span-2">
            <div className="p-8 md:p-12 rounded-3xl bg-[#122940]/5 border border-navy/10 flex flex-col justify-center min-h-[220px]">
              <p className="font-display font-medium text-lg leading-relaxed md:text-[33px] md:leading-[37px] text-navy">
                {PARAGRAPHS[0]}
              </p>
            </div>
          </Reveal>

          {/* Card 2: Stats block (span 1, row-span 2) - Tall block */}
          <Reveal delay={200} duration={800} className="md:row-span-2">
            <div className="p-8 md:p-10 rounded-3xl bg-navy text-cream flex flex-col justify-between gap-10 border border-white/5 shadow-lg h-full">
              <div>
                <span className="font-display font-normal text-[12px] leading-[14px] uppercase tracking-wider text-blob/85 block mb-8">
                  Our Impact
                </span>
                <div className="flex flex-col gap-8">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="font-display font-extrabold text-[40px] leading-[44px] text-cream">
                        {stat.value}
                      </span>
                      <span
                        className="mt-2 block h-px w-full bg-cream/20"
                        aria-hidden="true"
                      />
                      <p className="font-display font-normal text-[12px] leading-[14px] uppercase tracking-wider text-cream/70 mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Second paragraph (span 1, row-span 1) */}
          <Reveal delay={300} duration={800} className="col-span-1">
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-navy/10 flex flex-col justify-between min-h-[200px] h-full">
              <span className="font-display font-normal text-[12px] leading-[14px] uppercase tracking-wider text-navy/40 block mb-6">
                Creative Philosophy
              </span>
              <p className="font-normal text-[16px] leading-[19px] text-navy/80">
                {PARAGRAPHS[1]}
              </p>
            </div>
          </Reveal>

          {/* Card 4: Third paragraph (span 1, row-span 1) */}
          <Reveal delay={400} duration={800} className="col-span-1">
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-navy/10 flex flex-col justify-between min-h-[200px] h-full">
              <span className="font-display font-normal text-[12px] leading-[14px] uppercase tracking-wider text-navy/40 block mb-6">
                Working Principle
              </span>
              <p className="font-normal text-[16px] leading-[19px] text-navy/80">
                {PARAGRAPHS[2]}
              </p>
            </div>
          </Reveal>

          {/* Card 5: Full visual block (span 3, row-span 1) */}
          <Reveal delay={500} duration={800} className="md:col-span-3">
            <div className="h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden bg-navy border border-navy/10 shadow-md">
              <img
                src="/dough-hero.webp"
                alt="Dough creative workspace"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-[0.8] opacity-90 mix-blend-luminosity"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

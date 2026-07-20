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
      className="bg-cream py-28 md:py-40 overflow-hidden text-navy">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Asymmetrical Header and Subheader */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
          <Reveal duration={800}>
            <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy">
              Who We Are
            </h2>
          </Reveal>
          <Reveal duration={800} delay={150}>
            <span className="font-display font-normal text-[12px] leading-[14px] uppercase tracking-[0.25em] text-water">
              A Creative Baking Lab
            </span>
          </Reveal>
        </div>

        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Main statement with large quotation visual hook (Span 7) */}
          <div className="lg:col-span-7">
            <Reveal delay={100} duration={850}>
              <div className="relative">
                {/* Large decorative quotation mark block */}
                <span className="absolute -top-10 -left-6 font-serif text-[120px] text-blob/25 leading-none select-none pointer-events-none">
                  “
                </span>
                <p className="font-display font-medium text-2xl md:text-[38px] md:leading-[48px] text-navy leading-relaxed text-pretty relative z-10">
                  {PARAGRAPHS[0]}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Sub-paragraphs (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:mt-2">
            <Reveal delay={200} duration={850}>
              <div className="flex flex-col gap-3">
                <span className="font-display font-bold text-[12px] leading-[14px] uppercase tracking-wider text-water">
                  Creative Philosophy
                </span>
                <p className="font-normal text-[16px] leading-[24px] text-navy/80">
                  {PARAGRAPHS[1]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} duration={850}>
              <div className="flex flex-col gap-3">
                <span className="font-display font-bold text-[12px] leading-[14px] uppercase tracking-wider text-water">
                  Working Principle
                </span>
                <p className="font-normal text-[16px] leading-[24px] text-navy/80">
                  {PARAGRAPHS[2]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Horizontal Line-Through Stats Grid (Underneath the texts) */}
        <div className="mt-12 md:mt-16 border-t border-navy/10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {STATS.map((stat, idx) => (
              <Reveal key={stat.label} delay={400 + idx * 100} duration={850}>
                <div className="flex flex-col items-start w-full relative">
                  
                  {/* Number container with horizontal line passing behind the bottom of numbers */}
                  <div className="relative w-full flex items-end min-h-[60px] md:min-h-[80px]">
                    <span className="font-display font-black text-[42px] md:text-[60px] text-navy tracking-tighter leading-none relative z-10 select-none pb-3 font-mono">
                      {stat.value}
                    </span>
                    {/* The line that cuts through the bottom part of the number */}
                    <div className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-navy/80 z-0" />
                  </div>
                  
                  {/* Caption underneath the line */}
                  <p className="font-display font-semibold text-[12px] leading-[16px] uppercase tracking-widest text-navy/60 mt-4 text-left">
                    {stat.label}
                  </p>
                  
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

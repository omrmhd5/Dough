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
      className="bg-cream py-20 text-navy md:py-28 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal direction="up" duration={900}>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Who we are?
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-navy/80 md:text-xl">
              {PARAGRAPHS.map((p) => (
                <p key={p} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-5xl px-6 md:mt-16">
        <Reveal direction="up" duration={900} delay={150}>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start text-left">
                <span className="font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                  {stat.value}
                </span>
                <span
                  className="mt-3 block h-px w-full bg-navy"
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

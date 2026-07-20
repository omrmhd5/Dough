const POINTS = [
  "At Dough, we believe in the magic of creativity and the power of innovation.",
  "Just like dough that can be molded into any shape, we shape ideas into reality.",
  "Our team is as versatile and adaptable as the dough itself — ready to rise to any challenge.",
  "We mix creativity with strategy, knead it with passion, and bake it with precision.",
  "Just like the perfect dough, we're always evolving and rising to the occasion.",
  "We have a pinch of fun and a dash of cleverness — because who says business can't be a little playful?",
];

export function WhyUs() {
  return (
    <section
      id="why"
      className="relative bg-cream py-32 md:py-48 text-navy overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy">
            Why Us
          </h2>
        </div>

        {/* Points Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <div key={point} className="h-full">
              <div className="h-full rounded-3xl border border-navy/10 bg-white p-8 md:p-10 shadow-sm flex flex-col justify-between min-h-[220px]">
                <span className="font-display font-extrabold text-5xl md:text-[93px] md:leading-[93px] text-water/20 select-none block mb-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-normal text-[16px] leading-[19px] text-navy/85">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

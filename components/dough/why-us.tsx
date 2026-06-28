import { WaveDivider } from './wave-divider'

const POINTS = [
  'At Dough, we believe in the magic of creativity and the power of innovation.',
  'Just like dough that can be molded into any shape, we shape ideas into reality.',
  'Our team is as versatile and adaptable as the dough itself ready to rise to anny challenge.',
  'We mix creativity with strategy, knead it with passion, and bake it with precision.',
  "And just like the perfect dough, we're always evolvinng and rising to the occasion.",
  "Plus, we have a pinch of fun and a dash of cleverness because who says business can't be a little playful?",
]

export function WhyUs() {
  return (
    <section id="why" className="relative bg-navy pt-24 pb-32 text-cream md:pt-32">
      {/* wave coming down from the cream section above */}
      <WaveDivider
        fill="var(--navy)"
        className="absolute inset-x-0 -top-px -translate-y-full"
      />

      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold lowercase tracking-tight sm:text-5xl">
          02. why us?
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <div
              key={point}
              className="rounded-3xl border border-cream/10 bg-cream/5 p-8 transition-colors hover:bg-cream/10"
            >
              <span className="font-display text-2xl font-bold text-blob">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 text-pretty leading-relaxed text-cream/80">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* wave transition into the cream "what we bake" section */}
      <WaveDivider fill="var(--cream)" className="absolute inset-x-0 bottom-0" />
    </section>
  )
}

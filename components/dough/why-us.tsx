
import { Reveal } from './reveal'

const POINTS = [
  'At Dough, we believe in the magic of creativity and the power of innovation.',
  'Just like dough that can be molded into any shape, we shape ideas into reality.',
  'Our team is as versatile and adaptable as the dough itself — ready to rise to any challenge.',
  'We mix creativity with strategy, knead it with passion, and bake it with precision.',
  "Just like the perfect dough, we're always evolving and rising to the occasion.",
  "We have a pinch of fun and a dash of cleverness — because who says business can't be a little playful?",
]

export function WhyUs() {
  return (
    <section id="why" className="relative bg-navy pt-24 pb-32 text-cream md:pt-32">


      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Why us?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, i) => (
            <Reveal key={point} delay={i * 100} duration={700} className="h-full">
              <div
                className="h-full rounded-3xl border border-cream/10 bg-cream/5 p-8"
              >
                <span className="font-display text-4xl font-bold text-blob">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-pretty leading-relaxed text-cream/80">
                  {point}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>


    </section>
  )
}

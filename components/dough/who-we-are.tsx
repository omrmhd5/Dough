import { Blob } from './blob'
import { Reveal } from './reveal'

const PARAGRAPHS = [
  "We're Dough — a creative agency shaping brands, stories, and moments from scratch.",
  "From bold concepts to scroll-stopping content, we don't just follow culture — we bake it fresh.",
  'Agile, obsessive, and unafraid of the unconventional, we work with brands ready to leave a mark, not just make a sale.',
]

export function WhoWeAre() {
  return (
    <section id="who" className="bg-cream py-20 text-navy md:py-28 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Reveal direction="left" duration={900}>
          <div className="relative">
            <Blob
              variant={0}
              float
              className="aspect-square w-full max-w-md bg-navy/90 text-cream"
            >
              <span className="font-display text-3xl font-semibold sm:text-4xl">
                From Scratch
              </span>
            </Blob>
            <Blob
              variant={4}
              className="absolute -bottom-6 -right-2 size-28 bg-blob text-navy sm:size-36"
            >
              <span className="px-4 text-sm font-semibold">
                Freshly Baked
              </span>
            </Blob>
          </div>
        </Reveal>

        <Reveal direction="right" duration={900} delay={150}>
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
    </section>
  )
}

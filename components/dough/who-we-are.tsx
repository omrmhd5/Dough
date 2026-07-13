import { Reveal } from './reveal'

const PARAGRAPHS = [
  "We're Dough — a creative agency shaping brands, stories, and moments from scratch.",
  "From bold concepts to scroll-stopping content, we don't just follow culture — we bake it fresh.",
  'Agile, obsessive, and unafraid of the unconventional, we work with brands ready to leave a mark, not just make a sale.',
]

export function WhoWeAre() {
  return (
    <section id="who" className="bg-cream py-20 text-navy md:py-28 overflow-hidden">
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
    </section>
  )
}


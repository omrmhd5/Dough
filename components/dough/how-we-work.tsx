import { Blob } from './blob'
import { Reveal } from './reveal'

const STEPS = [
  {
    title: 'Discovery',
    body: 'We dig in deep — brand audits, market pulse, and real convos. We listen more than we talk (for now).',
  },
  {
    title: 'Strategy',
    body: 'We knead the insights into a tight, tasty plan. Positioning, voice, goals — it all starts here.',
  },
  {
    title: 'Creative Development',
    body: 'From zero to concept — this is where your brand gets its flavor. Visuals, copy, packaging, campaigns — all baked in.',
  },
  {
    title: 'Execution',
    body: "We bring the heat. Whether it's content, media, or a full-on launch — our team rolls it out, pixel by pixel, post by post.",
  },
  {
    title: 'Optimization',
    body: "We don't 'set and forget.' We test, tweak, and turn insights into sharper moves.",
  },
]

export function HowWeWork() {
  return (
    <section id="work" className="relative bg-cream pt-24 pb-32 text-navy md:pt-32">

      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            How we work
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 120} duration={850} className="w-full">
              <div className="flex flex-col items-center text-center h-full">
                <Blob
                  variant={i}
                  className="size-48 bg-blob text-navy"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-xs font-semibold uppercase tracking-widest text-navy/50">
                      step {i + 1}
                    </span>
                    <span className="px-4 font-display text-lg font-bold leading-tight">
                      {step.title}
                    </span>
                  </span>
                </Blob>
                <p className="mt-6 text-pretty text-sm leading-relaxed text-navy/70">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  )
}

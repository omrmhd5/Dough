import { Reveal } from './reveal'

const SERVICES = [
  'Strategy & Branding',
  'Creative Direction & Production',
  'Social & Digital',
  'Packaging & Merch',
  'Brand Activations',
  'UGC Amplification',
]

export function WhatWeBake() {
  return (
    <section id="bake" className="bg-[#122940] bg-radial from-[#122940] via-[#0d1e30] to-[#071320] py-32 text-cream md:py-48 relative overflow-hidden">
      
      {/* Background Visual Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-cream mb-16 leading-none">
            What we bake
          </h2>
        </Reveal>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            // Bento spans logic:
            // i=0: col-span-2, i=1: col-span-1
            // i=2: col-span-1, i=3: col-span-2
            // i=4: col-span-2, i=5: col-span-1
            const spanClass = i === 0 || i === 3 || i === 4 
              ? 'md:col-span-2' 
              : 'md:col-span-1';

            return (
              <Reveal key={service} delay={i * 80} duration={600} className={`h-full ${spanClass}`}>
                <div className="group h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 min-h-[200px] md:min-h-[240px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-cream/40 uppercase">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl text-cream leading-tight mt-12 text-pretty">
                    {service}
                  </h3>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}


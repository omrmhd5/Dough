import { ArrowUpRight } from 'lucide-react'
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
    <section id="bake" className="bg-navy py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            What we bake
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service} delay={i * 80} duration={600} className="h-full bg-navy">
              <li className="h-full">
                <div
                  className="flex items-center justify-between gap-4 bg-[#122940] px-6 py-7 md:px-10 md:py-9 h-full"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-display text-sm font-semibold text-cream/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-xl font-semibold sm:text-2xl">
                      {service}
                    </span>
                  </span>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

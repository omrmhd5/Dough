import { ArrowUpRight } from 'lucide-react'

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
    <section id="bake" className="bg-cream py-20 text-navy md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold lowercase tracking-tight sm:text-5xl">
          03. what we bake
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-navy/15 bg-navy/15 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <li key={service}>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-4 bg-cream px-6 py-7 transition-colors hover:bg-navy hover:text-cream md:px-10 md:py-9"
              >
                <span className="flex items-center gap-4">
                  <span className="font-display text-sm font-semibold text-navy/40 group-hover:text-cream/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl font-semibold lowercase sm:text-2xl">
                    {service}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

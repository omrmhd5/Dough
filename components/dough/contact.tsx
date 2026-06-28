import { WaveDivider } from './wave-divider'
import { AtSign, Mail, MapPin } from 'lucide-react'

const DETAILS = [
  { icon: AtSign, label: 'socials', value: '@dough.eg', href: 'https://instagram.com' },
  { icon: Mail, label: 'mail', value: 'www.xdough.com', href: '#' },
  {
    icon: MapPin,
    label: 'address',
    value: '65 St. Abdelaziz Fahmy, Saint Fatima, Cairo, Egypt',
    href: '#',
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative bg-navy pt-24 pb-12 text-cream md:pt-32">
      <WaveDivider
        fill="var(--navy)"
        className="absolute inset-x-0 -top-px -translate-y-full"
      />

      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold lowercase tracking-tight sm:text-5xl">
          07. contact us
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {DETAILS.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group rounded-3xl border border-cream/10 bg-cream/5 p-8 transition-colors hover:bg-cream/10"
            >
              <Icon className="size-6 text-blob" />
              <p className="mt-6 text-sm uppercase tracking-widest text-cream/50">
                {label}
              </p>
              <p className="mt-2 text-pretty text-lg font-medium text-cream group-hover:text-blob">
                {value}
              </p>
            </a>
          ))}
        </div>

        {/* giant outline wordmark */}
        <p className="mt-20 select-none text-center font-display text-[26vw] font-bold leading-none tracking-tighter text-cream/10 lg:text-[18rem]">
          dough
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center text-sm text-cream/60 md:flex-row md:text-left">
          <p className="lowercase">
            raw ideas. real results. fully cooked by dough est. 2024
          </p>
          <p className="lowercase">
            you imagine it. we mold it.. the world sees it.
          </p>
        </div>
      </div>
    </section>
  )
}

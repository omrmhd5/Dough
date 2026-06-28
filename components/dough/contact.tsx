import { WaveDivider } from './wave-divider'
import { AtSign, Mail, MapPin } from 'lucide-react'
import { Logo } from './logo'

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
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Contact us
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

        {/* giant wordmark */}
        <div className="mt-20 flex justify-center select-none text-center opacity-10">
          <Logo className="text-[26vw] lg:text-[18rem]" textColor="text-cream" blobColor="bg-cream" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center text-sm text-cream/60 md:flex-row md:text-left">
          <div className="lowercase flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
            <span>raw ideas. real results. fully cooked by</span>
            <Logo className="text-xs" blobColor="bg-blob" />
            <span>est. 2026</span>
          </div>
          <p className="lowercase">
            you imagine it. we mold it.. the world sees it.
          </p>
        </div>
      </div>
    </section>
  )
}

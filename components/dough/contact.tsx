import { AtSign, Mail, MapPin } from 'lucide-react'
import { Reveal } from './reveal'

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

      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Contact us
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 120} duration={800} className="h-full">
              <a
                href={href}
                className="group rounded-3xl border border-cream/10 bg-cream/5 p-8 transition-colors hover:bg-cream/10 block h-full"
              >
                <Icon className="size-6 text-blob" />
                <p className="mt-6 text-sm uppercase tracking-widest text-cream/50">
                  {label}
                </p>
                <p className="mt-2 text-pretty text-lg font-medium text-cream group-hover:text-blob">
                  {value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

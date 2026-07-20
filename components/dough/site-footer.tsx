import { Logo } from './logo'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './contact'

interface SiteFooterProps {
  hideCareers?: boolean
}

export function SiteFooter({ hideCareers = false }: SiteFooterProps) {
  return (
    <footer className="bg-navy text-cream py-16 md:py-20 relative overflow-hidden">
      
      {/* Ambient background blurs */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blob/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-water/10 blur-[120px] pointer-events-none" />
      
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        
        {/* Actual Editorial Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-cream/10 items-stretch">
          
          {/* Left Column: Call to Action (Span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-display text-[11px] leading-[13px] uppercase font-bold tracking-[0.2em] text-water">
                Let's Make It Rise
              </span>
              <h2 className="font-display font-extrabold text-[24px] leading-[28px] md:text-[32px] md:leading-[36px] text-cream max-w-md">
                Got a raw idea?<br />
                Let's bake it together.
              </h2>
            </div>
            <Link
              href="/contact?tab=project"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream text-navy font-display font-bold text-[11px] leading-[13px] uppercase tracking-wider hover:bg-blob transition-all duration-300">
              <span>Start a Project</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Middle Column: Inquiries & Socials Grouped (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:border-l lg:border-cream/5 lg:pl-8 justify-start">
            <div className="flex flex-col gap-1.5">
              <span className="font-display font-semibold text-[11px] leading-[13px] uppercase tracking-widest text-water">
                Bake a Project
              </span>
              <a href="mailto:hello@dough.eg" className="font-display font-medium text-[15px] leading-[18px] text-cream hover:text-blob transition-colors duration-300">
                hello@dough.eg
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-display font-semibold text-[11px] leading-[13px] uppercase tracking-widest text-cream/40">
                Stay Fresh
              </span>
              <div className="flex items-center gap-2">
                <a href="https://www.instagram.com/dough.eg" target="_blank" rel="noopener noreferrer" className="size-8 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center text-cream hover:bg-blob hover:text-navy hover:border-blob hover:scale-105 transition-all duration-300">
                  <InstagramIcon className="size-3.5" />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=201111040222&text&type=phone_number&app_absent=0&utm_source=ig" target="_blank" rel="noopener noreferrer" className="size-8 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center text-cream hover:bg-blob hover:text-navy hover:border-blob hover:scale-105 transition-all duration-300">
                  <WhatsAppIcon className="size-3.5" />
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="size-8 rounded-lg bg-cream/5 border border-cream/10 flex items-center justify-center text-cream hover:bg-blob hover:text-navy hover:border-blob hover:scale-105 transition-all duration-300" title="Our Location">
                  <MapPin className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Careers Isolated (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 items-start lg:border-l lg:border-cream/5 lg:pl-8 justify-start w-full">
            <div className="flex flex-col gap-2 w-full">
              <span className="font-display font-semibold text-[11px] leading-[13px] uppercase tracking-widest text-water">
                Rise with Us
              </span>
              <p className="font-display font-normal text-[13px] leading-[18px] text-cream/60 max-w-xs">
                We're always seeking creative minds, designers, copywriters, and thinkers to grow our kitchen.
              </p>
            </div>

            <Link
              href="/contact?tab=job"
              className="group inline-flex items-center justify-between px-5 py-3 rounded-xl bg-cream/5 border border-cream/15 text-cream font-display font-bold text-[11px] leading-[13px] uppercase tracking-wider hover:bg-cream hover:text-navy transition-all duration-300 w-full text-center">
              <span>Join the Team</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-2 text-center text-[11px] leading-[13px] tracking-wider uppercase md:flex-row md:text-left font-semibold text-cream/50 font-display">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span>Raw Ideas. Real Results. Fully Cooked by</span>
            <Logo className="text-[9px] translate-y-[1px]" blobColor="bg-blob" />
            <span>Est. 2024</span>
          </div>
          <p className="font-medium text-cream/70 text-right normal-case tracking-normal">
            where ideas take shapes.
          </p>
        </div>
      </div>
    </footer>
  );
}

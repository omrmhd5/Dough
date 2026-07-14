import { Logo } from './logo'
import { JoinTeam } from './join-team'

interface SiteFooterProps {
  hideCareers?: boolean
}

export function SiteFooter({ hideCareers = false }: SiteFooterProps) {
  return (
    <footer className="bg-navy text-cream py-24 md:py-32 relative overflow-hidden">
      
      {/* Ambient background blurs */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blob/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-water/10 blur-[120px] pointer-events-none" />
      
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        
        {!hideCareers && <JoinTeam />}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-12 text-center text-xs tracking-wider uppercase md:flex-row md:text-left font-semibold text-cream/50">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span>Raw Ideas. Real Results. Fully Cooked by</span>
            <Logo className="text-[10px] translate-y-[1px]" blobColor="bg-blob" />
            <span>Est. 2023</span>
          </div>
          <p className="font-medium text-cream/70 text-right normal-case tracking-normal">
            You imagine it. We mold it. The world sees it.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Logo } from './logo'
import { JoinTeam } from './join-team'

interface SiteFooterProps {
  hideCareers?: boolean
}

export function SiteFooter({ hideCareers = false }: SiteFooterProps) {
  return (
    <footer className="bg-navy text-cream py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {!hideCareers && <JoinTeam />}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center text-sm text-cream/60 md:flex-row md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
            <span>Raw Ideas. Real Results. Fully Cooked by</span>
            <Logo className="text-xs translate-y-[2px]" blobColor="bg-blob" />
            <span>Est. 2026</span>
          </div>
          <p className="font-light">
            You imagine it. We mold it. The world sees it.
          </p>
        </div>
      </div>
    </footer>
  )
}

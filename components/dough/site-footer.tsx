import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* giant wordmark */}
        <div className="flex justify-center select-none text-center opacity-10">
          <Logo className="text-[26vw] lg:text-[18rem]" textColor="text-cream" blobColor="bg-cream" />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center text-sm text-cream/60 md:flex-row md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:justify-start">
            <span>Raw Ideas. Real Results. Fully Cooked by</span>
            <Logo className="text-xs" blobColor="bg-blob" />
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

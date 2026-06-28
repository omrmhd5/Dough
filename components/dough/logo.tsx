import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  textColor?: string
  blobColor?: string
}

export function Logo({ className, textColor = 'text-cream', blobColor = 'bg-blob' }: LogoProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center font-bold lowercase tracking-tight select-none",
        textColor,
        className
      )}
    >
      d
      <span
        style={{ borderRadius: '55% 45% 55% 45% / 45% 45% 55% 55%' }}
        className={cn(
          "mx-[0.03em] inline-block h-[0.68em] w-[0.95em] translate-y-[0.04em] transition-transform",
          blobColor
        )}
      />
      ugh
      <span className="align-super text-[0.45em] font-medium leading-none ml-[0.05em] translate-y-[-0.1em]">©</span>
    </span>
  )
}

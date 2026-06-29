import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  textColor?: string
  blobColor?: string
  gsapClass?: string
}

export function Logo({ className, textColor = 'text-cream', blobColor = 'bg-blob', gsapClass }: LogoProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center font-bold lowercase tracking-tight select-none",
        textColor,
        className
      )}
    >
      <span className={cn("inline-block", gsapClass && `${gsapClass}-d`)}>d</span>
      <span
        style={gsapClass ? undefined : { borderRadius: '55% 45% 55% 45% / 45% 45% 55% 55%' }}
        className={cn(
          "mx-[0.03em] inline-block h-[0.68em] w-[0.95em] translate-y-[0.04em] transition-transform",
          blobColor,
          gsapClass && `${gsapClass}-o`
        )}
      />
      <span className={cn("inline-block", gsapClass && `${gsapClass}-u`)}>u</span>
      <span className={cn("inline-block", gsapClass && `${gsapClass}-g`)}>g</span>
      <span className={cn("inline-block", gsapClass && `${gsapClass}-h`)}>h</span>
      <span className={cn("align-super text-[0.45em] font-medium leading-none ml-[0.05em] translate-y-[-0.1em] inline-block", gsapClass && `${gsapClass}-copy`)}>©</span>
    </span>
  )
}

import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  textColor?: string
  blobColor?: string
  gsapClass?: string
}

export function Logo({ className, textColor = 'text-cream', blobColor = 'bg-blob', gsapClass }: LogoProps) {
  // Determine if we need the dark logo or light logo
  const isDark = textColor.includes('navy') || textColor.includes('dark') || textColor.includes('black')
  const src = isDark ? "/logos/logo1 (2).png" : "/logos/logo2 (1).png"

  return (
    <span className={cn("inline-flex items-center select-none", className)}>
      <img
        src={src}
        alt="Dough Logo"
        style={{ height: '1em', width: 'auto', display: 'inline-block' }}
        className={gsapClass && `${gsapClass}-img`}
      />
    </span>
  )
}


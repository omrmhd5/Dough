type WaveDividerProps = {
  /** the fill color of the wave (the color of the NEXT section below) */
  fill: string
  /** flip the wave vertically */
  flip?: boolean
  className?: string
}

/**
 * Smooth SVG wave used to transition between solid navy / cream sections.
 * The wave is drawn in the `fill` color and sits at the bottom of a section,
 * visually bleeding into the section that follows.
 */
export function WaveDivider({ fill, flip = false, className }: WaveDividerProps) {
  return (
    <div
      className={className}
      style={{ transform: flip ? 'scaleY(-1)' : undefined, lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px] md:h-[130px]"
      >
        <path
          fill={fill}
          d="M0,64 C180,128 360,128 540,90 C720,52 900,-24 1080,12 C1260,48 1350,104 1440,96 L1440,140 L0,140 Z"
        />
      </svg>
    </div>
  )
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Exact paths from the user's SVG ────────────────────────────────────────
// Only the first 5 M…Z blobs from the fill="#bdd4e5" compound path.
// viewBox is the tight bounding box of each shape (with 10 px padding).
const BLOBS: { d: string; vb: string }[] = [
  {
    // Shape 0 — M 21.68,176  (irregular, heavy bottom)
    d: "M 21.68,176 c 3.47,-33.34 2.25,-65.12 0.45,-98.49 c -0.24,-39.22 34.26,-50.4 67.38,-50.2 c 66.51,2.63 142.25,42.78 140.52,118.16 c -0.4,40.04 -29.87,69.69 -68.73,74.96 c -24.94,4.69 -38.79,-16.11 -61.07,-13.11 c -25.7,5.93 -44.69,7.46 -67.26,-8.81 c -7.47,-5.65 -11.24,-13.15 -11.29,-22.51 Z",
    vb: "-15 -10 280 260",
  },
  {
    // Shape 1 — M 323.9,120  (tall, top-right heavy)
    d: "M 323.9,120 c 1.48,-38.93 34.57,-28.39 61.17,-33.31 c 48.88,-9.06 28.07,-65.48 75.75,-71.03 c 59.44,-6.58 112.52,31.9 116.83,93.03 c 1.68,24.93 -5.98,51.34 -32.74,58.47 c -21.48,5.06 -41.78,6.21 -60.22,19.88 c -18.42,13.78 -31.24,28.59 -55.32,32.65 c -62.41,9.13 -105.1,-40.07 -105.47,-99.69 Z",
    vb: "313 5 274 224",
  },

  {
    // Shape 2 — M 646.69,105  (wide & squashed)
    d: "M 646.69,105 c 0.73,-38.19 17.79,-70.36 58.95,-74.48 c 18.8,-0.66 37.15,-1.99 55.22,4.38 c 17.7,6.65 33.56,10.16 52.64,10.16 c 30.47,2.41 70.83,-7.28 88.59,25.32 c 11.75,19.72 12.93,43.27 4.04,64.35 c -21.08,51.48 -64.82,71.56 -118.48,71.73 c -56.45,-0.6 -126.56,-14.54 -139.06,-79.47 c -1.2,-7.28 -1.84,-14.61 -1.9,-21.99 Z",
    vb: "636 15 285 200",
  },
  {
    // Shape 3 — M 967.05,118  (wide, uneven)
    d: "M 967.05,118 c -1.31,-40.68 24.71,-72.98 67.09,-70.53 c 38.01,6.93 71.97,10.39 109.71,-0.99 c 26.83,-9.39 46.59,-15.08 75.45,-8.01 c 32.63,6.67 45.42,44.46 31.16,72.57 c -9.04,13.59 -16.8,24.91 -20.98,41.1 c -8.05,35.89 -14.48,59.62 -57.18,61.41 c -22.74,1.58 -41.5,-3.06 -63.51,-7.2 c -27.86,-4.06 -56.04,-4.94 -84.08,-7 c -38.78,-3.95 -55.7,-47.55 -57.66,-81.35 Z",
    vb: "957 25 315 200",
  },
  {
    // Shape 4 — M 1297.03,90  (large, irregular)
    d: "M 1297.03,90 c 0.85,-35.95 18.36,-54 54.1,-56.04 c 61.45,-7.41 118.71,-4.11 178.56,11.99 c 58.45,16.96 60.49,96.38 22.37,134.8 c -32.12,34.38 -49.76,20.46 -85.34,2.9 c -20.1,-7.92 -33.73,0.82 -51.31,9.05 c -27.06,12.09 -72.9,0.87 -88.19,-25.15 c -10.42,-22.41 -29.36,-52.83 -30.19,-77.55 Z",
    vb: "1287 15 315 210",
  },
];;

// Pre-build CSS mask strings at module load time (static data → no runtime cost)
const MASKS = BLOBS.map(({ d, vb }) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${vb}'><path d='${d}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
});

type BlobProps = {
  children?: ReactNode;
  /** which preset shape (0–4) to use */
  variant?: number;
  className?: string;
  /** kept for API compatibility */
  float?: boolean;
};

/**
 * Organic blob container.
 * Uses the exact SVG paths from the design file as a CSS mask so that
 * both the background colour and the children are clipped to the dough shape.
 */
export function Blob({
  children,
  variant = 0,
  className,
  float = false,
}: BlobProps) {
  const mask = MASKS[variant % MASKS.length];

  return (
    <div
      className={cn(
        "flex items-center justify-center text-center",
        float && "animate-blob",
        className,
      )}
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}>
      {children}
    </div>
  );
}

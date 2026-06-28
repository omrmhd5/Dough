import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// A small library of organic, asymmetrical blob border-radius shapes.
const BLOB_SHAPES = [
  '42% 58% 63% 37% / 41% 44% 56% 59%',
  '63% 37% 38% 62% / 49% 58% 42% 51%',
  '38% 62% 56% 44% / 60% 42% 58% 40%',
  '58% 42% 33% 67% / 54% 39% 61% 46%',
  '47% 53% 70% 30% / 55% 48% 52% 45%',
]

type BlobProps = {
  children?: ReactNode
  /** which preset shape (0-4) to use */
  variant?: number
  className?: string
  float?: boolean
}

/**
 * Organic blob container used instead of plain rectangles for grid items
 * and step labels.
 */
export function Blob({ children, variant = 0, className, float = false }: BlobProps) {
  const shape = BLOB_SHAPES[variant % BLOB_SHAPES.length]
  return (
    <div
      className={cn(
        'flex items-center justify-center text-center',
        float && 'animate-blob',
        className,
      )}
      style={{ borderRadius: shape }}
    >
      {children}
    </div>
  )
}

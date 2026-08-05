"use client";

import { cn } from "@/lib/utils";

interface BakingLoaderProps {
  className?: string;
  showLabel?: boolean;
}

export function BakingLoader({
  className,
  showLabel = true,
}: BakingLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:gap-4 bg-navy px-6",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading">
      <img
        src="/dough_blob_morph.svg"
        alt=""
        className="h-auto w-32 sm:w-40"
        aria-hidden="true"
      />

      {showLabel && (
        <p className="font-display text-[10px] font-bold uppercase text-cream/50 animate-pulse">
          Baking
        </p>
      )}
    </div>
  );
}

export const BAKING_LOADER_CYCLE_MS = 4000;

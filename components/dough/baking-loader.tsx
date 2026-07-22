"use client";

import { useEffect, useState } from "react";
import { Blob, BLOB_COUNT } from "./blob";
import { cn } from "@/lib/utils";

const HOLD_MS = 180;
const FADE_MS = 450;

interface BakingLoaderProps {
  className?: string;
  size?: string;
  showLabel?: boolean;
}

export function BakingLoader({
  className,
  size = "size-20 sm:size-28",
  showLabel = true,
}: BakingLoaderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % BLOB_COUNT);
    }, HOLD_MS + FADE_MS);

    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:gap-4 bg-navy px-6",
        className,
      )}>
      <div
        className={cn("relative", size, !reduceMotion && "animate-blob")}
        aria-hidden="true">
        {Array.from({ length: BLOB_COUNT }).map((_, index) => {
          const isActive = reduceMotion ? index === 0 : index === activeIndex;

          return (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-[opacity,filter] ease-in-out",
                isActive
                  ? "z-10 opacity-100 blur-0"
                  : "z-0 opacity-0 blur-[3px]",
              )}
              style={{
                transitionDuration: reduceMotion ? "0ms" : `${FADE_MS}ms`,
              }}>
              <Blob variant={index} className="size-full bg-blob" />
            </div>
          );
        })}
      </div>

      {showLabel && (
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50 animate-pulse">
          Baking
        </p>
      )}
    </div>
  );
}

export const BAKING_LOADER_CYCLE_MS = BLOB_COUNT * (HOLD_MS + FADE_MS);

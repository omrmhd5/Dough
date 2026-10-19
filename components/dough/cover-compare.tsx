"use client";

import { cn } from "@/lib/utils";
import type { MediaImage } from "./case-media";

function CompareImage({
  image,
  alt,
  eager,
  maxHeightClass,
}: {
  image: MediaImage;
  alt: string;
  eager?: boolean;
  maxHeightClass: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-end justify-center",
        maxHeightClass,
      )}>
      <img
        src={image.src}
        alt={alt}
        width={image.w}
        height={image.h}
        fetchPriority={eager ? "high" : undefined}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="block max-h-full w-full object-contain object-bottom"
        style={{
          objectPosition: image.position ?? "bottom",
          background: image.bg,
        }}
      />
    </div>
  );
}

export function CoverCompareFrame({
  before,
  after,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
  variant = "card",
  className,
  eager = false,
}: {
  before: MediaImage;
  after: MediaImage;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  variant?: "card" | "opener";
  className?: string;
  eager?: boolean;
}) {
  const tileMax =
    variant === "opener"
      ? "max-h-[min(26svh,240px)] sm:max-h-[min(32svh,300px)] lg:max-h-[min(38svh,360px)]"
      : "max-h-[min(22vw,200px)] sm:max-h-[min(28vw,240px)]";

  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 items-end gap-[clamp(10px,2vw,24px)] bg-cream",
        variant === "card"
          ? "aspect-[4/3] max-h-[var(--media-max)] px-[clamp(12px,3vw,28px)] pb-[clamp(12px,2.5vw,24px)] pt-[clamp(28px,4vw,40px)]"
          : "cover-native-opener px-[var(--gutter)] py-10 sm:py-12 lg:h-full lg:justify-center lg:px-[clamp(28px,4vw,56px)] lg:py-[clamp(48px,5vw,80px)]",
        className,
      )}>
      <div className="animate-fade flex min-w-0 flex-col gap-2 sm:gap-3">
        <span className="t-label text-water">{beforeLabel}</span>
        <CompareImage
          image={before}
          alt={beforeAlt}
          eager={eager}
          maxHeightClass={tileMax}
        />
      </div>
      <div
        className="animate-fade flex min-w-0 flex-col gap-2 sm:gap-3"
        style={{ animationDelay: "80ms" }}>
        <span className="t-label text-water">{afterLabel}</span>
        <CompareImage
          image={after}
          alt={afterAlt}
          eager={eager}
          maxHeightClass={tileMax}
        />
      </div>
    </div>
  );
}

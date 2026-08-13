"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const innerSizeMap = {
  banner:
    "h-8 w-9 min-[480px]:h-10 min-[480px]:w-12 sm:h-14 sm:w-[72px] md:h-16 md:w-[88px] lg:h-[4.5rem] lg:w-[104px]",
  card: "h-10 w-14 sm:h-11 sm:w-16",
  featured: "h-9 w-24 sm:h-10 sm:w-28",
  hero: "h-12 w-16 sm:h-14 sm:w-20",
} as const;

const boxSizeMap = {
  card: "size-14 sm:size-16",
  hero: "size-16 sm:size-20",
} as const;

type ClientLogoSize = keyof typeof innerSizeMap;

interface ClientLogoProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: ClientLogoSize;
  boxed?: boolean;
  className?: string;
}

export function ClientLogo({
  src,
  alt,
  fallback,
  size = "card",
  boxed = false,
  className,
}: ClientLogoProps) {
  const [hasError, setHasError] = useState(false);

  const logo =
    src && !hasError ? (
      <div className={cn("relative shrink-0", innerSizeMap[size])}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center mix-blend-screen"
          sizes="120px"
          onError={() => setHasError(true)}
        />
      </div>
    ) : (
      <span className="font-display text-xs font-extrabold uppercase text-cream sm:text-sm">
        {fallback?.slice(0, 2)}
      </span>
    );

  if (boxed && (size === "card" || size === "hero")) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-2xl border border-cream/10 bg-navy/50 shadow-sm",
          boxSizeMap[size],
          className,
        )}>
        {logo}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {logo}
    </div>
  );
}

import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a display line where *starred* words are the bold key word,
 * e.g. "we shape raw concepts into *cultural moments.*"
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Profile running header: section on the start side, page title on the end. */
export function RunningHeader({
  start,
  end,
  tone = "light",
  className,
}: {
  start: ReactNode;
  end?: ReactNode;
  tone?: "light" | "dark" | "sparkle";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "t-label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2",
        tone === "light" && "text-water",
        tone === "dark" && "text-sparkle",
        tone === "sparkle" && "text-navy",
        className,
      )}>
      <span className="min-w-0">{start}</span>
      {end ? <span className="min-w-0 text-end">{end}</span> : null}
    </div>
  );
}

/** Arrow that flips in RTL. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "inline-block size-[0.9em] shrink-0 rtl:-scale-x-100",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Diagonal "external" arrow used on the profile contact page. */
export function OutArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "inline-block size-[0.62em] shrink-0 rtl:-scale-x-100",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="square">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

type ButtonTone = "navy" | "cream" | "outline-light" | "outline-dark";

const buttonTones: Record<ButtonTone, string> = {
  navy: "bg-navy text-cream hover:bg-water",
  cream: "bg-cream text-navy hover:bg-sparkle",
  "outline-light":
    "border border-navy/30 text-navy hover:bg-navy hover:text-cream",
  "outline-dark":
    "border border-sparkle/40 text-cream hover:bg-cream hover:text-navy",
};

export const buttonClass = (tone: ButtonTone = "navy") =>
  cn(
    "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4",
    "text-[13px] font-semibold uppercase tracking-[0.14em] leading-none",
    "transition-colors duration-300",
    buttonTones[tone],
  );

export function ButtonLink({
  tone = "navy",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: ButtonTone }) {
  return (
    <Link {...props} className={cn(buttonClass(tone), className)}>
      <span>{children}</span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

/** Underlined text link with arrow. */
export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group -my-2 inline-flex items-center gap-2 py-3 font-semibold underline decoration-1 underline-offset-[0.4em] transition-colors hover:decoration-2",
        className,
      )}>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}

/** Square-cornered photo in a sized frame. */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  shadow = false,
  priority = false,
  position,
  fit = "cover",
  width,
  height,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  shadow?: boolean;
  priority?: boolean;
  position?: string;
  fit?: "cover" | "contain";
  width?: number;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-grey",
        shadow && "photo-shadow",
        className,
      )}
      style={style}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          imgClassName ?? "photo",
          fit === "contain" && "object-contain p-[6%] bg-transparent",
        )}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}

export function Caption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("t-small mt-4 text-water", className)}>{children}</p>;
}

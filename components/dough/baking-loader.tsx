import { cn } from "@/lib/utils";

/** Route-level loading state: the wordmark breathing on cream. */
export function BakingLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-cream",
        className,
      )}
      role="status"
      aria-live="polite">
      <img
        src="/Logo-Dark.png"
        alt=""
        aria-hidden="true"
        className="h-8 w-auto animate-pulse sm:h-10"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}

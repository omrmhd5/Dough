import type { ReactNode } from "react";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-navy text-cream">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-navy"
        aria-hidden
      />
      {children}
    </div>
  );
}

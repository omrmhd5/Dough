import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Blob } from "./blob";
import { Reveal } from "./reveal";

export function UncleDough() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-navy text-cream">
      <div
        className="pointer-events-none absolute -left-24 top-1/4 opacity-30"
        aria-hidden="true">
        <Blob variant={1} className="size-64 bg-blob/40 text-navy" />
      </div>
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 opacity-20"
        aria-hidden="true">
        <Blob variant={3} className="size-48 bg-blob/30 text-navy" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
        <Reveal direction="up" duration={900}>
          <span className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-water">
            Coming soon
          </span>
        </Reveal>

        <Reveal direction="up" duration={900} delay={100}>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            Uncle Dough
          </h1>
        </Reveal>

        <Reveal direction="up" duration={900} delay={200}>
          <p className="mt-8 font-display text-2xl font-semibold text-cream/90 sm:text-3xl">
            Stay tuned!
          </p>
        </Reveal>

        <Reveal direction="up" duration={900} delay={300}>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/55 sm:text-lg">
            Something fresh is rising from the oven. We&apos;re kneading up
            something special — check back soon.
          </p>
        </Reveal>

        <Reveal direction="up" duration={900} delay={400}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-blob" />
              <span className="size-2 animate-pulse rounded-full bg-blob [animation-delay:300ms]" />
              <span className="size-2 animate-pulse rounded-full bg-blob [animation-delay:600ms]" />
            </div>

            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-cream transition-all duration-300 hover:border-blob/40 hover:bg-cream/10">
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
          <span className="font-display text-[12px] leading-[14px] font-extrabold uppercase tracking-[0.3em] text-water">
            Coming soon
          </span>
        </Reveal>

        <Reveal direction="up" duration={900} delay={100}>
          <h1 className="mt-6 font-display font-extrabold text-[40px] leading-[40px] md:text-[93px] md:leading-[93px] tracking-tight text-cream">
            Uncle Dough
          </h1>
        </Reveal>

        <Reveal direction="up" duration={900} delay={200}>
          <p className="mt-8 font-display text-[25px] leading-[28px] md:text-[33px] md:leading-[37px] font-medium text-cream/90">
            Stay tuned!
          </p>
        </Reveal>

        <Reveal direction="up" duration={900} delay={300}>
          <p className="mx-auto mt-5 max-w-md font-display font-normal text-[16px] leading-[19px] text-cream/55">
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
              className="group relative inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-6 py-3 font-display text-[12px] leading-[14px] font-bold uppercase tracking-widest text-cream transition-colors duration-300 overflow-hidden hover:text-navy hover:border-blob/40 z-0">
              {/* Bubble overlay */}
              <span className="absolute inset-0 bg-blob -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1 relative z-10" />
              <span className="relative z-10">Back to home</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

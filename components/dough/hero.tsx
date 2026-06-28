import Image from 'next/image'
import { WaveDivider } from './wave-divider'
import { Blob } from './blob'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy pt-28 pb-32 text-cream sm:pb-40"
    >
      {/* faint floating blobs in the background */}
      <Blob
        variant={1}
        float
        className="absolute -left-16 top-32 size-64 bg-cream/5"
      />
      <Blob
        variant={3}
        float
        className="absolute -right-10 bottom-40 size-72 bg-blob/10"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <span className="mb-8 rounded-full border border-cream/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cream/70">
          creative agency · est. 2024
        </span>

        <h1 className="font-display text-[26vw] font-bold leading-[0.82] tracking-tighter sm:text-[20vw] lg:text-[16rem]">
          dough
        </h1>

        <p className="mt-6 text-balance font-display text-xl font-medium lowercase text-cream/80 sm:text-2xl md:text-3xl">
          where ideas take shapes
        </p>

        {/* central raw textured dough image */}
        <div className="relative mt-12 w-full max-w-2xl">
          <Blob variant={2} className="overflow-hidden bg-cream/5 shadow-2xl">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/dough-hero.png"
                alt="Hands kneading raw dough on a floured surface"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </Blob>
        </div>
      </div>

      {/* wave transition into the cream "who we are" section */}
      <WaveDivider
        fill="var(--cream)"
        className="absolute inset-x-0 bottom-0"
      />
    </section>
  )
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { CLIENTS } from "./clients-data";

const FEATURED = ["Akleh", "LUX", "HNDL"];

function clientSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function FeaturedWorks() {
  const clients = FEATURED.map((name) =>
    CLIENTS.find((c) => c.en === name),
  ).filter(Boolean);

  return (
    <section id="featured" className="bg-cream py-32 text-navy md:py-48 relative overflow-hidden">
      
      {/* Background Visual Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#122940_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-navy mb-16">
            Featured work
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {clients.map((client, i) => {
            if (!client) return null;
            const slug = clientSlug(client.en);

            // Determine layout spans:
            // i=0: col-span-8, height 460px
            // i=1: col-span-4, height 460px
            // i=2: col-span-12, height 360px
            let spanClass = "lg:col-span-4 min-h-[380px] sm:min-h-[420px]";
            if (i === 0) {
              spanClass = "lg:col-span-8 min-h-[380px] sm:min-h-[460px]";
            } else if (i === 2) {
              spanClass = "lg:col-span-12 min-h-[300px] sm:min-h-[380px]";
            }

            return (
              <Reveal
                key={client.en}
                delay={i * 100}
                duration={700}
                className={`h-full ${spanClass}`}>
                <Link
                  href={`/clients/${slug}`}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-navy shadow-[0_12px_40px_-10px_rgba(18,41,64,0.12)]">
                  
                  <Image
                    src={client.images[0]}
                    alt={`${client.en} featured project`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
                  />

                  {/* Moody Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20 pointer-events-none" />

                  {/* Content Pinned Cleanly to Bottom */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-start">
                      {client.logo ? (
                        <div className="relative h-8 w-24 sm:h-9 sm:w-28">
                          <Image
                            src={client.logo}
                            alt={`${client.en} logo`}
                            fill
                            className="object-contain object-left filter brightness-0 invert"
                          />
                        </div>
                      ) : (
                        <span className="font-display text-sm font-extrabold uppercase tracking-widest text-cream">
                          {client.en}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                      <div>
                        <p className="font-display text-lg font-bold leading-snug text-cream sm:text-xl">
                          {client.en}
                          <span className="text-cream/50"> — </span>
                          {client.subtitle}
                        </p>
                        <p className="mt-2 font-display text-[12px] leading-[14px] font-semibold uppercase tracking-widest text-cream/50">
                          {client.sector}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-display text-[12px] leading-[14px] font-bold uppercase tracking-widest text-cream/80">
                        View project
                        <ArrowUpRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

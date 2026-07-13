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
    <section id="featured" className="bg-cream py-16 text-navy md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Featured work
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {clients.map((client, i) => {
            if (!client) return null;
            const slug = clientSlug(client.en);

            return (
              <Reveal
                key={client.en}
                delay={i * 100}
                duration={700}
                className="h-full">
                <Link
                  href={`/clients/${slug}`}
                  className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-navy/10 bg-navy shadow-sm transition-shadow duration-300 hover:shadow-lg sm:min-h-[340px] lg:min-h-[360px]">
                  <Image
                    src={client.images[0]}
                    alt={`${client.en} featured project`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/20" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                    <div className="flex items-start">
                      {client.logo ? (
                        <div className="relative h-8 w-20 sm:h-9 sm:w-24">
                          <Image
                            src={client.logo}
                            alt={`${client.en} logo`}
                            fill
                            className="object-contain object-left"
                          />
                        </div>
                      ) : (
                        <span className="font-display text-base font-extrabold uppercase tracking-widest text-cream">
                          {client.en}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="font-display text-base font-bold leading-snug text-cream sm:text-lg">
                          {client.en}
                          <span className="text-cream/50"> — </span>
                          {client.subtitle}
                        </p>
                        <p className="mt-1.5 font-display text-[10px] uppercase tracking-widest text-cream/50">
                          {client.sector}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-cream/80 transition-colors duration-300 group-hover:text-cream">
                        View project
                        <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

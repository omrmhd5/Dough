import Image from 'next/image'

const CLIENTS = [
  { en: "Barn's", ar: "بارنز" },
  { en: "Kufta", ar: "كوفتا" },
  { en: "El Dahan", ar: "الدهان" },
  { en: "Town Team", ar: "تاون تيم" },
  { en: "Madghout Dajaj", ar: "مضغوط دجاج" },
  { en: "Tant", ar: "طنط" },
  { en: "Qasr El Kababgi", ar: "قصر الكبابجي" },
  { en: "Tito's", ar: "تيتوز" },
  { en: "Takhmeesa", ar: "تخميسة" },
  { en: "Shrimp", ar: "شريمب" },
  { en: "El Anfoshy", ar: "الأنفوشي" },
  { en: "Akleh", ar: "أكلة" },
  { en: "Bebek", ar: "بيبيك" },
  { en: "El Rahawy", ar: "الرهاوي" },
  { en: "Shawerma El Reem", ar: "شاورما الريم" },
]

type Tile = {
  src: string
  label: string
  category: string
  className: string
}

// High-density masonry-style grid using Tailwind column / row spans.
const TILES: Tile[] = [
  {
    src: '/work-photography.png',
    label: "Barn's Coffee & Bakery Series",
    category: 'Photography',
    className: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: '/work-cgi.png',
    label: 'Kufta Whiskey Salad Study',
    category: 'CGI',
    className: 'sm:col-span-2',
  },
  {
    src: '/work-packaging.png',
    label: 'Kufta Batates Chips Packaging',
    category: 'Packaging Design',
    className: '',
  },
  {
    src: '/work-activation.png',
    label: 'Kufta Portable Event Booth',
    category: 'Brand Activations',
    className: '',
  },
  {
    src: '/work-cgi.png',
    label: "Barn's & Kufta Feed Grids",
    category: 'Grids',
    className: 'sm:col-span-2',
  },
]

export function ClientsPortfolio() {
  return (
    <section id="portfolio" className="bg-cream py-20 text-navy md:py-28">
      {/* 05. clients — marquee ticker */}
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
        Clients
        </h2>
        <p className="mt-4 text-lg text-navy/70">They asked we shaped</p>
      </div>

      <div className="relative mt-10 flex overflow-hidden border-y border-navy/15 py-6">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <span
              key={`${client.en}-${i}`}
              className="mx-10 inline-flex items-center gap-3 font-display text-4xl font-bold lowercase text-navy/80 sm:text-6xl"
            >
              <span>{client.en}</span>
              <span className="font-arabic text-2xl font-medium text-navy/40">({client.ar})</span>
              <span className="mx-8 text-blob">✳</span>
            </span>
          ))}
        </div>
        {/* duplicate track for seamless loop */}
        <div
          className="flex shrink-0 animate-marquee items-center"
          aria-hidden="true"
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <span
              key={`dup-${client.en}-${i}`}
              className="mx-10 inline-flex items-center gap-3 font-display text-4xl font-bold lowercase text-navy/80 sm:text-6xl"
            >
              <span>{client.en}</span>
              <span className="font-arabic text-2xl font-medium text-navy/40">({client.ar})</span>
              <span className="mx-8 text-blob">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* 06. portfolio — masonry grid */}
      <div className="mx-auto mt-20 max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Portfolio
        </h2>

        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-4">
          {TILES.map((tile, i) => (
            <figure
              key={`${tile.label}-${i}`}
              className={`group relative overflow-hidden rounded-3xl bg-navy/5 ${tile.className}`}
            >
              <Image
                src={tile.src || '/placeholder.svg'}
                alt={tile.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/80 via-navy/10 to-transparent p-5">
                <span className="text-xs uppercase tracking-widest text-cream/70">
                  {tile.category}
                </span>
                <span className="font-display text-lg font-semibold lowercase text-cream">
                  {tile.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Reveal } from './reveal'

interface ClientDetail {
  en: string
  ar: string
  sector: string
  services: string
  logo?: string
  images: string[]
}

const CLIENTS: ClientDetail[] = [
  {
    en: "Barn's",
    ar: "بارنز",
    sector: "Coffee & Bakery (est. 1992)",
    services: "Brand Identity, Packaging Design, Menu Photography",
    logo: "/logos/Logo Barn's-.png",
    images: [
      "/photography1.png",
      "/photography2.png",
      "/photography3.png",
      "/photography4.png"
    ]
  },
  {
    en: "Kufta",
    ar: "كوفتا",
    sector: "Street Food & Diner",
    services: "Packaging Design, CGI Visualizations, Brand Activations",
    logo: "/logos/kufta.webp",
    images: [
      "/CGI.png",
      "/Packaging-design.png",
      "/portable-event-booth.png",
      "/grids image (2).png"
    ]
  },
  {
    en: "El Dahan",
    ar: "الدهان",
    sector: "Traditional Egyptian Grill",
    services: "Food Styling & Photography, Editorial Grids",
    logo: "/logos/eldahan.jpg",
    images: [
      "/photography1.png",
      "/CGI.png",
      "/photography3.png",
      "/Packaging-design.png"
    ]
  },
  {
    en: "Town Team",
    ar: "تاون تيم",
    sector: "Apparel & Retail",
    services: "Visual Merchandising Design, Store Campaign",
    logo: "/logos/townteam.png",
    images: [
      "/grids image (2).png",
      "/portable-event-booth.png",
      "/CGI.png",
      "/photography2.png"
    ]
  },
  {
    en: "Madghout Dajaj",
    ar: "مضغوط دجاج",
    sector: "F&B Rice & Grill",
    services: "Takeout Packaging Design, Typography",
    logo: "/logos/مضغووووط-01.png",
    images: [
      "/Packaging-design.png",
      "/grids image (2).png",
      "/photography4.png",
      "/CGI.png"
    ]
  },
  {
    en: "Tant",
    ar: "طنط",
    sector: "Traditional Eatery",
    services: "Typography & Graphic Elements",
    logo: "/logos/tant.webp",
    images: [
      "/photography2.png",
      "/Packaging-design.png",
      "/grids image (2).png",
      "/portable-event-booth.png"
    ]
  },
  {
    en: "Qasr El Kababgi",
    ar: "قصر الكبابجي",
    sector: "Premium Fine Dining",
    services: "VIP Menu Design, Campaign Photography",
    logo: "/logos/122432_935612.webp",
    images: [
      "/photography3.png",
      "/CGI.png",
      "/Packaging-design.png",
      "/photography1.png"
    ]
  },
  {
    en: "Tito's",
    ar: "تيتوز",
    sector: "Pasta & Fast Casual",
    services: "Branded Cup Design, Direct Photography",
    logo: "/logos/tito's.png",
    images: [
      "/grids image (2).png",
      "/Packaging-design.png",
      "/CGI.png",
      "/photography2.png"
    ]
  },
  {
    en: "Takhmeesa",
    ar: "تخميسة",
    sector: "F&B Snacks & Coffee",
    services: "Logo Refinements, Packaging Design",
    logo: "/logos/logo (1).png",
    images: [
      "/Packaging-design.png",
      "/grids image (2).png",
      "/photography3.png",
      "/CGI.png"
    ]
  },
  {
    en: "Shrimp",
    ar: "شريمب",
    sector: "Seafood Diner",
    services: "Digital Campaigns, Packaging",
    logo: "",
    images: [
      "/CGI.png",
      "/Packaging-design.png",
      "/portable-event-booth.png",
      "/grids image (2).png"
    ]
  },
  {
    en: "El Anfoshy",
    ar: "الأنفوشي",
    sector: "Seafood Restaurant",
    services: "Environmental Graphic Design, Menus",
    logo: "/logos/alanfoshy.webp",
    images: [
      "/photography1.png",
      "/CGI.png",
      "/photography3.png",
      "/Packaging-design.png"
    ]
  },
  {
    en: "Akleh",
    ar: "أكلة",
    sector: "Casual Dining",
    services: "Packaging, Menu Layouts",
    logo: "/logos/akla.png",
    images: [
      "/Packaging-design.png",
      "/grids image (2).png",
      "/portable-event-booth.png",
      "/CGI.png"
    ]
  },
  {
    en: "Bebek",
    ar: "بيبيك",
    sector: "F&B Dairy & Desserts",
    services: "Illustration, Beverage Cups",
    logo: "",
    images: [
      "/CGI.png",
      "/Packaging-design.png",
      "/grids image (2).png",
      "/photography4.png"
    ]
  },
  {
    en: "El Rahawy",
    ar: "الرهاوي",
    sector: "Bakery",
    services: "Identity Guidelines, Kraft Bags",
    logo: "",
    images: [
      "/photography2.png",
      "/Packaging-design.png",
      "/grids image (2).png",
      "/portable-event-booth.png"
    ]
  },
  {
    en: "Shawerma El Reem",
    ar: "شاورما الريم",
    sector: "Casual Diner",
    services: "Campaign Visuals, Digital Grids",
    logo: "/logos/logo s B.png",
    images: [
      "/photography3.png",
      "/CGI.png",
      "/Packaging-design.png",
      "/photography1.png"
    ]
  }
]

const MARQUEE_LOGOS = [
  { src: "/logos/Logo Barn's-.png", alt: "Barn's" },
  { src: "/logos/kufta.webp", alt: "Kufta" },
  { src: "/logos/logo 2.png", alt: "Ziko" },
  { src: "/logos/مضغووووط-01.png", alt: "Madghout Dajaj" },
  { src: "/logos/122432_935612.webp", alt: "Qasr El Kababgi" },
  { src: "/logos/logo (1).png", alt: "Takhmeesa" },
  { src: "/logos/akla.png", alt: "Akleh" },
  { src: "/logos/logo s B.png", alt: "Shawerma El Reem" },
  { src: "/logos/LUX_LOGO.png", alt: "Lux" },
  { src: "/logos/cif logo0.png", alt: "Cif" },
  { src: "/logos/logo.png", alt: "Knorr" },
  { src: "/logos/lil logo-01.png", alt: "Lil Kitchen" },
  { src: "/logos/2000logo0.png", alt: "Crepe 2000" },
  { src: "/logos/تعديل اللوجو 2019 copy (1).png", alt: "Sayed Hanafy" },
  { src: "/logos/logo faroja00.png", alt: "Farooja" },
  { src: "/logos/eldahan.jpg", alt: "El Dahan" },
  { src: "/logos/townteam.png", alt: "Town Team" },
  { src: "/logos/tant.webp", alt: "Tant" },
  { src: "/logos/tito's.png", alt: "Tito's" },
  { src: "/logos/alanfoshy.webp", alt: "El Anfoshy" }
]

interface GridItem {
  index: string
  title: string
  src: string
  slides: string[]
  spanClass: string
  heightClass: string
}

const GRID_ITEMS: GridItem[] = [
  {
    index: "01",
    title: "Photography",
    src: "/photography image.png",
    slides: [
      "/photography1.png",
      "/photography2.png",
      "/photography3.png",
      "/photography4.png"
    ],
    spanClass: "col-span-1",
    heightClass: "h-[380px]"
  },
  {
    index: "02",
    title: "Grids",
    src: "/grids image (2).png",
    slides: ["/grids image (2).png"],
    spanClass: "col-span-1",
    heightClass: "h-[380px]"
  },
  {
    index: "03",
    title: "CGI",
    src: "/CGI.png",
    slides: ["/CGI.png"],
    spanClass: "col-span-1 md:col-span-2",
    heightClass: "min-h-[450px] h-[480px] md:h-[600px]"
  },
  {
    index: "04",
    title: "Packaging Design",
    src: "/Packaging-design.png",
    slides: ["/Packaging-design.png"],
    spanClass: "col-span-1",
    heightClass: "h-[380px]"
  },
  {
    index: "05",
    title: "Portable Event Booth",
    src: "/portable-event-booth.png",
    slides: ["/portable-event-booth.png"],
    spanClass: "col-span-1",
    heightClass: "h-[380px]"
  }
]

export function ClientsPortfolio() {
  // Main Portfolio Slideshow state
  const [activeSlides, setActiveSlides] = useState<string[] | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [sliderTitle, setSliderTitle] = useState('')
  const [sliderIndex, setSliderIndex] = useState('')

  // Client Visual Collage overlay state (alternative to slideshow)
  const [activeCollageClient, setActiveCollageClient] = useState<ClientDetail | null>(null)

  // Marquee hover state
  const [isHovered, setIsHovered] = useState(false)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activeSlides) return
    setActiveSlideIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activeSlides) return
    setActiveSlideIndex((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1))
  }

  const handleLogoClick = (logoAlt: string) => {
    const client = CLIENTS.find(
      (c) => c.en.toLowerCase() === logoAlt.toLowerCase()
    )
    if (client) {
      const id = `client-${client.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
    }
    // Fallback: scroll to the client list section
    const element = document.getElementById('clients-list')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="portfolio" className="bg-cream py-20 text-navy md:py-28">
      {/* 05. clients — marquee ticker */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Clients
          </h2>
          <p className="mt-4 text-lg text-navy/70">They asked we shaped</p>
        </Reveal>
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mt-10 flex overflow-hidden border-y border-navy/15 py-8 bg-white/50 backdrop-blur-sm group"
      >
        <div 
          className="flex shrink-0 animate-marquee items-center whitespace-nowrap"
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
        >
          {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
            <button
              key={`${logo.src}-${i}`}
              onClick={() => handleLogoClick(logo.alt)}
              className="mx-12 flex items-center justify-center h-16 w-36 relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 rounded-lg cursor-pointer transition-transform hover:scale-105 duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
        {/* duplicate track for seamless loop */}
        <div
          className="flex shrink-0 animate-marquee items-center whitespace-nowrap"
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          aria-hidden="true"
        >
          {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
            <button
              key={`dup-${logo.src}-${i}`}
              onClick={() => handleLogoClick(logo.alt)}
              className="mx-12 flex items-center justify-center h-16 w-36 relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 rounded-lg cursor-pointer transition-transform hover:scale-105 duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Client Directory List Showcase */}
      <div id="clients-list" className="mx-auto mt-24 max-w-7xl px-6">
        <div className="flex flex-col gap-24">
          {CLIENTS.map((client, idx) => {
            const clientSlug = `client-${client.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
            return (
              <div 
                key={client.en} 
                id={clientSlug}
                className="scroll-mt-28 group/client"
              >
                <Reveal duration={700}>
                  <div className="flex flex-col gap-6">
                    {/* Header Row: Logo, Name, Sector */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      {/* Logo Box */}
                      <div className={`size-14 sm:size-16 shrink-0 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden border border-navy/10 ${client.logo ? 'bg-white' : 'bg-navy'}`}>
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={`${client.en} logo`}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="font-display font-extrabold text-lg text-cream select-none uppercase">
                            {client.en.slice(0, 2)}
                          </span>
                        )}
                      </div>

                      {/* Client Names and Info */}
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                            {client.en}
                          </h3>
                        </div>
                        <p className="text-xs uppercase font-extrabold tracking-widest text-water mt-1 font-display">
                          {client.sector}
                        </p>
                      </div>
                    </div>

                    {/* Services / Small Sentence */}
                    <p className="text-base text-navy/70 leading-relaxed max-w-3xl">
                      We shaped their brand through <span className="font-semibold text-navy">{client.services}</span>.
                    </p>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                      {client.images.map((imgUrl, i) => (
                        <div 
                          key={`${imgUrl}-${i}`}
                          onClick={() => setActiveCollageClient(client)}
                          className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-navy/5 border border-navy/10 group/img shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        >
                          <Image
                            src={imgUrl}
                            alt={`${client.en} showcase image ${i + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-cream text-xs font-semibold bg-navy/80 px-3 py-1.5 rounded-full backdrop-blur-sm transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                              View Project
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Elegant Divider */}
                    {idx < CLIENTS.length - 1 && (
                      <div className="w-full flex items-center justify-between gap-4 mt-16 text-navy/10">
                        <div className="h-[1px] flex-1 bg-current" />
                        <span className="text-xs font-display uppercase tracking-widest text-navy/30">
                          ✳
                        </span>
                        <div className="h-[1px] flex-1 bg-current" />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>


      {/* Image Slideshow Modal (for Main Portfolio Grid) */}
      {activeSlides && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#122940]/95 backdrop-blur-lg p-6 sm:p-10 animate-in fade-in duration-300"
          onClick={() => setActiveSlides(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-cream z-10">
            <div className="flex flex-col">
              <span className="font-display text-xs uppercase tracking-widest text-blob/90">{sliderIndex}</span>
              <h3 className="font-display text-xl font-bold tracking-tight">{sliderTitle}</h3>
            </div>
            <button
              onClick={() => setActiveSlides(null)}
              className="rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/25 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Main Slide */}
          <div className="relative flex-1 flex items-center justify-center py-6">
            {activeSlides.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/25 transition-colors backdrop-blur cursor-pointer"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}

            <div className="relative w-full h-[60vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={activeSlides[activeSlideIndex]}
                alt={`${sliderTitle} slide ${activeSlideIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {activeSlides.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/25 transition-colors backdrop-blur cursor-pointer"
              >
                <ChevronRight className="size-6" />
              </button>
            )}
          </div>

          {/* Bottom Indicators */}
          <div className="flex flex-col items-center gap-4 text-cream z-10">
            {activeSlides.length > 1 && (
              <div className="flex gap-2">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveSlideIndex(idx)
                    }}
                    className={`size-2 rounded-full transition-all ${
                      idx === activeSlideIndex ? 'bg-blob w-6' : 'bg-cream/30'
                    }`}
                  />
                ))}
              </div>
            )}
            <span className="font-display text-xs text-cream/60">
              {activeSlideIndex + 1} / {activeSlides.length}
            </span>
          </div>
        </div>
      )}

      {/* Full-Screen Client Visual Collage Board (Alternative to Slideshow) */}
      {activeCollageClient && (
        <div
          className="fixed inset-0 z-50 bg-[#122940]/95 backdrop-blur-lg overflow-y-auto p-6 sm:p-12 text-cream flex flex-col items-center animate-in fade-in duration-300"
          onClick={() => setActiveCollageClient(null)}
        >
          <div className="w-full max-w-7xl">
            {/* Top Bar: Case Header & Close Button */}
            <div className="flex justify-between items-start border-b border-cream/10 pb-6 mb-10">
              <div>
                <span className="font-display text-xs uppercase tracking-widest text-blob/90">
                  {activeCollageClient.sector}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold mt-2 leading-tight">
                  {activeCollageClient.en}
                </h3>
                <p className="text-xs uppercase font-extrabold tracking-widest text-[#457D9E] bg-[#457D9E]/10 border border-[#457D9E]/20 rounded-full px-4 py-1.5 inline-block mt-3">
                  {activeCollageClient.services}
                </p>
              </div>

              <button
                onClick={() => setActiveCollageClient(null)}
                className="rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/25 transition-colors cursor-pointer"
                aria-label="Close Case Board"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Masonry-Style Image Board Showcase */}
            <div
              className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 pb-12"
              onClick={(e) => e.stopPropagation()}
            >
              {activeCollageClient.images.map((imgUrl, idx) => (
                <div
                  key={`${imgUrl}-${idx}`}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden bg-cream/5 border border-cream/10 shadow-lg group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={imgUrl}
                    alt={`${activeCollageClient.en} design board visual ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Subtle label overlay inside collage */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-display tracking-widest text-blob uppercase">
                      Deliverable #{(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

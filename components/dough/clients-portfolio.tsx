"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

export interface ClientDetail {
  en: string;
  ar: string;
  sector: string;
  services: string;
  logo?: string;
  images: string[];
  year?: string;
  subtitle?: string;
  overview?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  scope?: string[];
  challengeLabel?: string;
}

const MARQUEE_LOGOS = [
  { src: "/Logos/Barns.png", alt: "Barn's" },
  { src: "/Logos/Kufta.png", alt: "Kufta" },
  { src: "/Logos/Crepe2000.png", alt: "Crepe 2000" },
  { src: "/Logos/ElAnfoshy.png", alt: "El Anfoshy" },
  { src: "/Logos/ElDahan.png", alt: "El Dahan" },
  { src: "/Logos/Hamzawy.png", alt: "Hamzawy" },
  { src: "/Logos/LilKitchen.png", alt: "Lil Kitchen" },
  { src: "/Logos/MadghoutDajaj.png", alt: "Madghout Dajaj" },
  { src: "/Logos/MiniTownTeam.png", alt: "Mini Town Team" },
  { src: "/Logos/QasrElKababgi.png", alt: "Qasr El Kababgi" },
  { src: "/Logos/ShawermaElreem.png", alt: "Shawerma El Reem" },
  { src: "/Logos/Shrimp.png", alt: "Shrimp" },
  { src: "/Logos/Taghmesa.png", alt: "Taghmesa" },
  { src: "/Logos/Tant.png", alt: "Tant" },
  { src: "/Logos/Titos.png", alt: "Titos" },
  { src: "/Logos/TownTeam.png", alt: "Town Team" },
  { src: "/Logos/Akleh.png", alt: "Akleh" },
  { src: "/Logos/Bebek.png", alt: "Bebek" },
];

const LOGO_GROUPS = [
  MARQUEE_LOGOS.slice(0, 6),
  MARQUEE_LOGOS.slice(6, 12),
  MARQUEE_LOGOS.slice(12, 18),
];

export const CLIENTS: ClientDetail[] = [
  {
    en: "Akleh",
    ar: "أكلة",
    sector: "Casual Dining",
    services: "Packaging, Menu Layouts",
    logo: "/Logos/Akleh.png",
    images: [
      "/Packaging-design.png",
      "/grids image (2).png",
      "/portable-event-booth.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "From Generic to Genre-Defining.",
    overview:
      "Akleh wasn't struggling because of its food—it was struggling because it looked like every other Syrian shawerma restaurant. In a category crowded with similar logos, menus, and interiors, the brand blended into the background. Our mission was to transform Akleh into a bold, culture-driven brand that felt relevant to today's audience while staying true to its roots. The result is a vibrant identity built for a new generation of customers—confident, playful, and instantly recognizable.",
    challenge:
      "The Syrian shawerma category has become visually predictable. Most brands rely on the same cues, making it difficult for customers to distinguish one from another. Akleh needed to break away from convention without losing authenticity. The goal wasn't simply to redesign the logo—it was to create a brand people would want to photograph, share, and remember.",
    approach:
      "We shifted the brand from a traditional takeaway restaurant into a lifestyle-driven fast-casual experience. Every element was designed to express personality—from bold typography and energetic graphics to vibrant packaging and a playful visual language that resonates with Gen Z and young millennials. Rather than following category conventions, we built a brand that feels modern, expressive, and unmistakably Akleh.",
    outcome:
      "The transformation gave Akleh a completely new identity—one that stands apart in an increasingly crowded market. The refreshed brand creates stronger shelf and street presence, elevates the customer experience, and turns everyday items like packaging and menus into memorable brand assets. More than a visual refresh, the project repositioned Akleh as a contemporary food brand with the personality, flexibility, and recognition needed to connect with a younger audience and support long-term growth.",
    scope: [
      "Brand Strategy",
      "Brand Positioning",
      "Visual Identity System",
      "Packaging Design",
      "Menu Engineering",
      "Menu Design",
      "Graphic Language",
      "Restaurant Branding",
      "Brand Guidelines",
      "Social Media Art Direction",
      "Customer Experience Touchpoints",
    ],
  },
  {
    en: "LUX",
    ar: "لوكس",
    sector: "Beauty & Cosmetics",
    services: "Social Media Strategy, Creative Direction",
    images: [
      "/CGI.png",
      "/photography1.png",
      "/photography3.png",
      "/Packaging-design.png",
    ],
    year: "2025",
    subtitle: "Keeping an Icon Ahead of Culture.",
    overview:
      "LUX is one of the most recognized beauty brands in the world. The challenge wasn't awareness—it was relevance. In a fast-moving digital landscape where trends evolve daily, our role was to ensure LUX remained both timeless and contemporary. We developed a social-first creative direction that preserved the brand's premium heritage while embracing the visual language of today's audience.",
    challenge:
      "As a heritage beauty brand, LUX needed to maintain its premium positioning without feeling distant or outdated. Consumers expect luxury brands to do more than follow trends—they expect them to shape them. Every piece of content needed to feel elevated, culturally relevant, and unmistakably LUX across increasingly competitive social platforms.",
    approach:
      "We built a social media system that balances sophistication with modernity. Every visual, campaign, and content piece was crafted to reinforce the brand's premium identity while reflecting current design, beauty, and digital trends. Rather than chasing every trend, we focused on interpreting them through the lens of LUX—creating content that feels current without sacrificing brand equity. The result is a social presence that is aspirational, elegant, and consistently engaging.",
    outcome:
      "Our work helped position LUX as a brand that doesn't simply participate in culture—it contributes to it. By combining premium aesthetics with contemporary creative execution, we created a scalable content system that keeps the brand visually fresh, culturally relevant, and instantly recognizable across digital platforms. LUX continues to demonstrate how heritage brands can evolve with the times while remaining true to what made them iconic in the first place.",
    scope: [
      "Social Media Strategy",
      "Creative Direction",
      "Art Direction",
      "Campaign Development",
      "Content Systems",
      "CGI & AI Creative",
      "Motion Concepts",
      "Visual Storytelling",
      "Product Launch Campaigns",
      "Social Content Production",
    ],
  },
  {
    en: "HNDL",
    ar: "HNDL",
    sector: "Fleet Management Platform",
    services: "Website Strategy, UX Strategy, UI Design",
    images: [
      "/grids image (2).png",
      "/CGI.png",
      "/photography3.png",
      "/Packaging-design.png",
    ],
    year: "2025",
    subtitle:
      "Simplifying Fleet Management Through Better Digital Experiences.",
    overview:
      "Fleet management is complex. The experience shouldn't be. HNDL approached us to create a website that communicates a sophisticated fleet management platform with clarity, confidence, and credibility. Our objective was to translate technical capabilities into an intuitive digital experience that speaks to decision-makers, builds trust, and drives business inquiries. The result is a modern website that positions HNDL as an innovative technology partner rather than just another fleet service provider.",
    challenge:
      "Fleet management platforms are often burdened by technical jargon, cluttered interfaces, and generic corporate messaging. HNDL needed a digital presence that simplified its offering without oversimplifying its value. The website had to communicate advanced technology, operational efficiency, and reliability while remaining approachable and easy to navigate.",
    approach:
      "We designed the website around one principle: Complex technology. Effortless understanding. Every page was structured to guide visitors through HNDL's ecosystem with clear messaging, purposeful hierarchy, and clean visual design. We combined modern UI principles with a confident brand language to create an experience that feels intuitive, professional, and future-focused. Rather than overwhelming users with features, we focused on communicating outcomes—greater visibility, smarter decisions, and more efficient fleet operations.",
    outcome:
      "The new website transforms HNDL's digital presence into a platform that reflects the quality of its technology. By combining strategic messaging with modern design, the experience builds credibility, simplifies complex services, and creates a stronger first impression for prospective clients. The result is a website designed not just to inform, but to convert—positioning HNDL as a trusted, forward-thinking leader in fleet management.",
    scope: [
      "Website Strategy",
      "UX Strategy",
      "UI Design",
      "Information Architecture",
      "Website Copy Direction",
      "Visual Design System",
      "Iconography",
      "Landing Page Design",
      "Conversion Journey",
      "Responsive Experience",
      "Digital Brand Direction",
    ],
  },
  {
    en: "Farooja",
    ar: "فروجى",
    sector: "Healthy F&B Concept",
    services: "Brand Concept Development, Packaging Design, Naming Direction",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "Reinventing the Chicken Bucket for a Healthier Generation.",
    challengeLabel: "The Opportunity",
    overview:
      "What if the experience of ordering a bucket of chicken didn't have to mean fried food? Farooja was born from a simple insight: people love the convenience, sharing experience, and familiarity of brands like KFC—but an increasing number of consumers want grilled, protein-rich meals that fit their lifestyle. We created Farooja from the ground up as a bold, modern chicken concept that delivers the satisfaction of a bucket meal without the guilt. A brand built for gym-goers, health-conscious consumers, families, and anyone looking for a better everyday choice.",
    challenge:
      "The market offered two extremes. On one side were traditional fried chicken chains. On the other were healthy restaurants that often lacked personality and excitement. There was a clear gap for a brand that combined the emotional appeal of comfort food with a healthier proposition—one that felt energetic, social, and craveable rather than clinical. Farooja was designed to own that space.",
    approach:
      "We built Farooja as a category challenger. Instead of speaking the visual language of healthy food, we borrowed the confidence and excitement of mainstream fast food—then paired it with a product people could feel good about eating. Bold typography, vibrant colors, playful graphics, and confident messaging gave the brand a strong presence across every touchpoint, while the concept centered around grilled chicken buckets, protein-packed meals, and shareable dining experiences. The result is a brand that feels just as exciting as indulgent fast food, while representing a smarter everyday choice.",
    outcome:
      "Farooja introduces a fresh category within the chicken market—a brand that captures the energy of traditional chicken chains while aligning with today's lifestyle. By combining bold branding with a differentiated product proposition, Farooja stands out as more than another grilled chicken restaurant. It becomes a modern destination for people seeking flavor, convenience, and high-protein meals without compromise. Designed to be instantly recognizable and built for scale, Farooja lays the foundation for a new generation of chicken brands.",
    scope: [
      "Market & Category Strategy",
      "Brand Concept Development",
      "Brand Positioning",
      "Naming Direction",
      "Visual Identity System",
      "Logo Design",
      "Packaging Design",
      "Bucket System Design",
      "Menu Design",
      "Interior Creative Direction",
      "Environmental Graphics",
      "Brand Guidelines",
      "Customer Experience Design",
      "Social Media Art Direction",
      "Launch Creative Direction",
    ],
  },
  {
    en: "Knorr",
    ar: "كنور",
    sector: "F&B / Cooking Ingredients",
    services:
      "Social Media Strategy, Creative Direction, Short-Form Video Direction",
    images: [
      "/photography3.png",
      "/photography1.png",
      "/CGI.png",
      "/Packaging-design.png",
    ],
    year: "2025",
    subtitle: "Turning Everyday Recipes into Must-Watch Content.",
    overview:
      "For years, recipe content has followed the same formula: ingredients, steps, and a finished dish. The challenge with Knorr wasn't the product—it was the content. In a world dominated by short-form video and entertainment-first platforms, instructional cooking posts were no longer enough to capture attention. Our role was to evolve Knorr's social presence from recipe publisher to food content creator, making every piece of content as engaging as the meals themselves.",
    challenge:
      "Consumers don't open social media to follow recipes—they open it to be inspired, entertained, and discover what's next. Knorr needed to move beyond static cooking tutorials and create content that felt native to modern platforms while continuing to showcase its products naturally and authentically.",
    approach:
      "We shifted the creative strategy from teaching recipes to creating food experiences. Instead of relying solely on step-by-step cooking content, we introduced a more dynamic visual language built around appetite appeal, storytelling, trends, creator-style execution, and premium food cinematography. The focus became creating content that earns attention first—allowing the product to become part of the story rather than the entire story.",
    outcome:
      "Knorr's content evolved from informative to engaging—without losing its role as a trusted cooking companion. By combining trend-driven creativity with strong food storytelling, we helped create a social presence that feels more contemporary, more entertaining, and more relevant to today's audiences. The result is a content system designed to stop the scroll, spark cravings, and keep Knorr at the center of everyday cooking conversations.",
    scope: [
      "Social Media Strategy",
      "Creative Direction",
      "Content Strategy",
      "Art Direction",
      "Campaign Concepts",
      "Short-Form Video Direction",
      "Food Styling Direction",
      "CGI & AI Creative",
      "Always-On Content System",
      "Product Launch Campaigns",
    ],
  },
  {
    en: "Kufta",
    ar: "كفتة",
    sector: "F&B / Casual Dining",
    services: "Campaign Strategy, Packaging Design, Customer Experience Design",
    logo: "/Logos/Kufta.png",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "From Ramadan Promotion to Brand Experience.",
    overview:
      "Ramadan is one of the noisiest marketing seasons of the year, with brands competing through endless discounts, bundles, and price wars. Kufta chose a different path. Instead of lowering prices to drive sales, we created a campaign that rewarded engagement. 'Open the Chips & Win' transformed every meal into an experience, encouraging customers to interact with the brand rather than simply chase the cheapest offer. At its core, the idea tapped into nostalgia. The excitement of finding a surprise inside a snack is something many grew up with—a familiar childhood memory. By bringing this feeling back, we reintroduced the joy of discovery to older audiences while giving Gen Z a chance to experience something they had never encountered before: the thrill of 'Kharbesh w Eksab.'",
    challenge:
      "Most Ramadan campaigns compete on discounts. The problem is that discount-led marketing often attracts price-sensitive customers who disappear as soon as the promotion ends. That wasn't the audience Kufta wanted to build. The objective was to increase traffic, excitement, and repeat visits while protecting the brand's premium perception and strengthening long-term customer loyalty.",
    approach:
      "We designed a campaign around anticipation rather than price. Every qualifying order included a branded bag of chips containing a hidden prize. Customers didn't know what they'd receive until they opened it—turning a simple side item into the centerpiece of the campaign. The concept was rooted in nostalgia. For many, it revived the childhood excitement of discovering gifts inside snack packs. For younger audiences, it introduced a new kind of playful interaction—bringing back the spirit of 'Kharbesh w Eksab' in a modern, branded way. The mechanics were intentionally simple, allowing the excitement of discovery and sharing to become the campaign itself. Every purchase carried the possibility of winning, giving customers a reason to participate, return, and talk about the brand. Rather than buying attention with discounts, Kufta earned it through experience.",
    outcome:
      "The campaign generated excitement without compromising the brand's positioning. By replacing discounts with interaction, Kufta strengthened customer engagement while maintaining the premium perception it has worked hard to build. Every purchase became more than a transaction—it became a moment of anticipation that customers wanted to experience and share. By tapping into nostalgia while introducing it to a new generation, the campaign created an emotional connection that went beyond the promotion itself. The campaign demonstrated that meaningful engagement can be a stronger growth driver than price reductions, proving that great ideas create loyalty where discounts only create temporary demand.",
    scope: [
      "Campaign Strategy",
      "Creative Concept Development",
      "Campaign Identity",
      "Packaging Design",
      "Prize Mechanics",
      "Customer Experience Design",
      "In-Store Campaign Rollout",
      "Social Media Campaign",
      "Art Direction",
      "Launch Creative",
    ],
  },
];

export function ClientsPortfolio() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveGroup((prev) => (prev + 1) % LOGO_GROUPS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="portfolio" className="bg-cream py-20 text-navy md:py-28">
      {/* Title */}
      <div className="mx-auto max-w-7xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Clients
          </h2>
          <p className="mt-4 text-lg text-navy/70">They asked we shaped</p>
        </Reveal>
      </div>

      {/* Logo banner — 6 at a time, fade between groups */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mt-10 overflow-hidden border-y border-cream/10 py-8 bg-[#122940]">
        <div className="relative mx-auto max-w-7xl px-6 min-h-28 sm:min-h-16">
          {LOGO_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className={`absolute inset-x-6 inset-y-0 grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center transition-opacity duration-1000 ease-in-out ${
                activeGroup === groupIdx
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={activeGroup !== groupIdx}>
              {group.map((logo) => (
                <div
                  key={logo.src}
                  className="relative mx-auto h-14 w-full max-w-36 sm:h-16">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Clients Showcase Section */}
      <div id="clients-list" className="mx-auto mt-16 max-w-7xl px-6">
        <div className="flex flex-col gap-16">
          {CLIENTS.map((client, idx) => {
            const clientSlug = client.en
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={client.en} className="scroll-mt-28 group/client">
                <Reveal duration={700}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/40 border border-navy/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                      <div className="flex items-center gap-4 sm:gap-6">
                        {/* Logo Box */}
                        <div className="size-14 sm:size-16 shrink-0 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden border border-cream/10 bg-navy">
                          {client.logo ? (
                            <img
                              src={client.logo}
                              alt={`${client.en} logo`}
                              className="object-contain p-2 w-full h-full"
                            />
                          ) : (
                            <span className="font-display font-extrabold text-lg text-cream select-none uppercase">
                              {client.en.slice(0, 2)}
                            </span>
                          )}
                        </div>

                        {/* Client Names and Info */}
                        <div className="flex-1 min-w-[150px]">
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy">
                            {client.en}
                          </h3>
                          <p className="text-xs uppercase font-extrabold tracking-widest text-water mt-1 font-display">
                            {client.sector}
                          </p>
                        </div>
                      </div>

                      {/* Services Sentence */}
                      <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-xl">
                        We shaped their brand through{" "}
                        <span className="font-semibold text-navy">
                          {client.services}
                        </span>
                        .
                      </p>

                      {/* Button */}
                      <div>
                        <Link
                          href={`/clients/${clientSlug}`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy hover:bg-navy/90 text-cream font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-sm">
                          View Case Study
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Single Minimal Showcase Image */}
                    <div className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm border border-navy/5">
                      <Link
                        href={`/clients/${clientSlug}`}
                        className="block w-full h-full relative group">
                        <Image
                          src={client.images[0]}
                          alt={`${client.en} brand showcase preview`}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

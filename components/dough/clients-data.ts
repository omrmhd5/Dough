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
  { src: "/logos/Barns.png", alt: "Barn's" },
  { src: "/logos/Kufta.png", alt: "Kufta" },
  { src: "/logos/Crepe2000.png", alt: "Crepe 2000" },
  { src: "/logos/ElAnfoshy.png", alt: "El Anfoshy" },
  { src: "/logos/ElDahan.png", alt: "El Dahan" },
  { src: "/logos/Hamzawy.png", alt: "Hamzawy" },
  { src: "/logos/LilKitchen.png", alt: "Lil Kitchen" },
  { src: "/logos/MadghoutDajaj.png", alt: "Madghout Dajaj" },
  { src: "/logos/MiniTownTeam.png", alt: "Mini Town Team" },
  { src: "/logos/QasrElKababgi.png", alt: "Qasr El Kababgi" },
  { src: "/logos/ShawermaElreem.png", alt: "Shawerma El Reem" },
  { src: "/logos/Shrimp.png", alt: "Shrimp" },
  { src: "/logos/Taghmesa.png", alt: "Taghmesa" },
  { src: "/logos/Tant.png", alt: "Tant" },
  { src: "/logos/Titos.png", alt: "Titos" },
  { src: "/logos/townteam.png", alt: "Town Team" },
  { src: "/logos/Akleh.png", alt: "Akleh" },
  { src: "/logos/Bebek.png", alt: "Bebek" },
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
    logo: "/logos/Akleh.png",
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
    logo: "/logos/Kufta.png",
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

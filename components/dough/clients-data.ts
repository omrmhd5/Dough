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
  approachLabel?: string;
  experienceLabel?: string;
  galleryLabel?: string;
  showcaseLayout?: "split" | "combined";
  experience?: { title: string; items?: string }[];
}

export function formatBrandName(name: string) {
  return name.toUpperCase();
}

export const TWO_LINE_TITLE_CLIENTS = new Set(["LUX", "HNDL"]);

export const CLIENTS: ClientDetail[] = [
  {
    en: "Akleh",
    ar: "أكلة",
    sector: "QSR/Casual Dining",
    services:
      "Brand Strategy • Visual Identity • Packaging • Menu Design • Restaurant Branding",
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
      "Transforming a traditional Syrian shawerma restaurant into a bold, culture-driven brand designed for a new generation.",
    challengeLabel: "The Opportunity",
    challenge:
      "AKLEH wasn't struggling because of its food—it was struggling because it looked like every other Syrian shawerma restaurant. In a category crowded with familiar logos, menus, and interiors, the brand lacked distinction. Our challenge was to create an identity that felt authentic to its roots while becoming instantly recognizable to today's audience.",
    approachLabel: "Our Creative Direction",
    approach:
      "Rather than redesigning a logo, we reimagined the entire brand experience. Inspired by street culture, bold typography, vibrant colors, and expressive graphics, we created a visual system that feels playful, confident, and unmistakably AKLEH. Every customer touchpoint—from packaging to menus—was designed to become part of the brand story.",
    showcaseLayout: "combined",
    galleryLabel: "Visual Direction",
    experience: [
      {
        title: "Brand Identity",
        items: "Logo System • Typography • Color Palette",
      },
      {
        title: "Packaging System",
        items: "Meal Boxes • Bags • Wrapping • Stickers",
      },
      {
        title: "Restaurant Experience",
        items: "Menus • Signage • In-store Graphics",
      },
      {
        title: "Art Direction",
        items: "Photography • Social Assets • Campaign Visuals",
      },
    ],
    outcome:
      "AKLEH evolved from another shawerma restaurant into a brand with a distinctive personality and a recognizable visual identity. The new system strengthened brand recognition across every customer touchpoint, elevated the dining experience, and provided a scalable foundation for future growth—proving that thoughtful branding can transform how people perceive a business before they even take their first bite.",
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
    ],
  },
  {
    en: "LUX",
    ar: "لوكس",
    sector: "FMCG - Beauty & Personal Care",
    services:
      "Social Media Strategy • Creative Direction • Content Production • CGI & AI Content • Copywriting • Digital Campaigns",
    logo: "/logos/LUX.png",
    images: [
      "/CGI.png",
      "/photography1.png",
      "/photography3.png",
      "/Packaging-design.png",
    ],
    year: "2025–2026",
    subtitle:
      "Making Premium Beauty Feel Relevant, Accessible, and Made for Gen Z.",
    overview:
      "We evolved LUX's social presence into a modern beauty platform that balances premium aspiration with mainstream accessibility—keeping the brand culturally relevant to a younger generation without losing its established elegance.",
    challengeLabel: "The Opportunity",
    approachLabel: "Our Creative Direction",
    experienceLabel: "Social Experience",
    challenge:
      "LUX is a globally recognized beauty brand with strong heritage and broad market appeal. The challenge was to preserve its premium perception while ensuring its social presence felt current, expressive, and relevant to Gen Z. In a category shaped by fast-moving beauty trends and highly visual content, LUX needed to feel aspirational without becoming distant, and accessible without losing its sense of luxury.",
    approach:
      "We created a social-first visual language that blends premium beauty storytelling with the pace and energy of modern digital culture. Through refined product visuals, sensory storytelling, trend-led formats, CGI, AI-generated content, and platform-native creative, we positioned LUX as an affordable luxury brand that feels elevated, desirable, and culturally connected.",
    experience: [
      {
        title: "Premium Product Storytelling",
        items:
          "Beauty Visuals • Ingredient Stories • Sensory Content • Product Benefits",
      },
      {
        title: "Gen Z Relevance",
        items:
          "Trend Adaptation • Social-first Formats • Cultural Moments • Platform-native Content",
      },
      {
        title: "Creative Innovation",
        items: "CGI • AI Creatives • Motion Design • Digital Art Direction",
      },
      {
        title: "Always-On Social",
        items:
          "Content Strategy • Community Engagement • Campaign Amplification • Copywriting",
      },
    ],
    outcome:
      "LUX's social presence evolved into a more contemporary and distinctive beauty experience—one that maintains the brand's premium heritage while speaking the visual and cultural language of Gen Z. The new creative direction made the brand feel more current, expressive, and desirable, strengthening its position as an accessible luxury beauty brand for a new generation.",
    scope: [
      "Social Media Strategy",
      "Creative Direction",
      "Monthly Content Planning",
      "Campaign Concepts",
      "Product Photography",
      "Short-form Video",
      "Motion Graphics",
      "CGI Content",
      "AI-generated Creative",
      "Copywriting",
      "Trend Adaptation",
      "Community Engagement",
      "Digital Campaign Amplification",
    ],
  },
  {
    en: "HNDL",
    ar: "HNDL",
    sector: "Tech - Fleet Management & Mobility",
    services:
      "Brand Identity • Website UI/UX • Web Development • Digital Strategy • Brand Guidelines",
    logo: "/logos/HNDL.png",
    images: [
      "/grids image (2).png",
      "/CGI.png",
      "/photography3.png",
      "/Packaging-design.png",
    ],
    year: "2026",
    subtitle:
      "Simplifying Fleet Management Through Brand & Digital Experience.",
    overview:
      "We reimagined HNDL's brand identity and website, transforming a complex fleet management business into a modern, intuitive brand that communicates clarity, trust, and innovation.",
    challengeLabel: "The Opportunity",
    challenge:
      "HNDL offers powerful fleet management solutions, but its digital presence didn't reflect the sophistication of its platform. The challenge was to simplify a technically complex business into a brand that feels approachable, modern, and built for enterprise decision-makers.",
    approachLabel: "Our Creative Direction",
    approach:
      "We developed a clean visual identity and intuitive website experience that prioritizes clarity, usability, and confidence. Every design decision—from typography and layout to iconography and interface design—was crafted to help users quickly understand HNDL's solutions while reinforcing credibility across every digital touchpoint.",
    showcaseLayout: "combined",
    galleryLabel: "Digital Experience",
    experience: [
      {
        title: "Brand Identity",
        items: "Logo • Typography • Color Palette • Iconography",
      },
      {
        title: "Website UI/UX",
        items:
          "User Experience • Information Architecture • Responsive Design • Conversion Strategy",
      },
      {
        title: "Interface Design",
        items: "Dashboard UI • Components • Design System • Interaction Design",
      },
      {
        title: "Digital Presence",
        items:
          "Landing Pages • Web Development • CMS • Performance Optimization",
      },
    ],
    outcome:
      "HNDL now presents itself through a cohesive brand and digital experience that reflects the quality of its technology. The new identity and website simplify complex services, strengthen trust with enterprise clients, and create a scalable digital foundation for future growth.",
    scope: [
      "Brand Strategy",
      "Brand Identity",
      "Visual Identity System",
      "Website Strategy",
      "Information Architecture",
      "UI/UX Design",
      "Web Development",
      "Responsive Design",
      "Design System",
      "Brand Guidelines",
    ],
  },
  {
    en: "Farooja",
    ar: "فروجى",
    sector: "Quick Service Restaurant",
    services:
      "Brand Strategy • Brand Positioning • Naming • Visual Identity • Packaging Design • Menu Design • Social Media Art Direction",
    logo: "/logos/Farooja.png",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025–2026",
    subtitle: "Reinventing the Chicken Bucket for a Healthier Generation.",
    overview:
      "We built FAROOJA as a bold, modern grilled chicken brand that delivers the excitement of fast food with a healthier, high-protein proposition—designed for active, digitally native customers.",
    challengeLabel: "The Opportunity",
    challenge:
      "The market was full of fried chicken concepts, but few brands offered the same sense of indulgence, convenience, and shareability through grilled chicken. FAROOJA was created to fill that gap: a brand that could own the healthier chicken bucket space without feeling clinical, restrictive, or overly fitness-focused.",
    approachLabel: "Our Creative Direction",
    approach:
      "We positioned FAROOJA as the grilled alternative to traditional fried chicken brands—a high-protein, post-workout-friendly concept with the energy and attitude of modern fast food. The identity was built around bold typography, expressive graphics, vibrant color, and a playful visual system that feels confident, youthful, and instantly recognizable. Every touchpoint, from the bucket to the menu, was designed to make healthier eating feel exciting rather than compromising.",
    showcaseLayout: "combined",
    galleryLabel: "Brand Experience",
    experience: [
      {
        title: "Brand Identity",
        items:
          "Positioning • Naming • Logo System • Typography • Color Palette",
      },
      {
        title: "Packaging System",
        items: "Chicken Buckets • Meal Boxes • Bags • Wrapping • Stickers",
      },
      {
        title: "Menu Experience",
        items:
          "Menu Architecture • Product Naming • Menu Design • Nutritional Communication",
      },
      {
        title: "Social Art Direction",
        items:
          "Campaign Visuals • Product Storytelling • Lifestyle Content • Digital Brand Assets",
      },
    ],
    outcome:
      "FAROOJA launched with a clear and differentiated position in the chicken category: the excitement of a fast-food bucket, reimagined around grilled chicken and high-protein meals. The brand system created a strong foundation across packaging, menus, and digital communication, helping FAROOJA stand apart from traditional fried chicken concepts and connect with a younger, health-conscious audience without losing the fun and indulgence people expect from fast food.",
    scope: [
      "Brand Strategy",
      "Brand Positioning",
      "Naming",
      "Visual Identity System",
      "Logo Design",
      "Graphic Language",
      "Packaging Design",
      "Menu Engineering",
      "Menu Design",
      "Brand Guidelines",
      "Social Media Art Direction",
      "Customer Experience Touchpoints",
    ],
  },
  {
    en: "Knorr",
    ar: "كنور",
    sector: "FMCG - Food & Beverage",
    services:
      "Social Media Strategy • Creative Direction • Digital Campaigns • Performance Marketing • Website Design & Development • UI/UX Design",
    logo: "/logos/Knorr.png",
    images: [
      "/photography3.png",
      "/photography1.png",
      "/CGI.png",
      "/Packaging-design.png",
    ],
    year: "2025",
    subtitle: "Making Everyday Cooking Worth Watching.",
    overview:
      "We transformed KNORR's digital presence by turning recipe content into entertaining food experiences—supported by integrated social media campaigns, digital amplification, and an AI-powered recipe platform.",
    challengeLabel: "The Opportunity",
    challenge:
      "Traditional recipe content had become predictable. Most cooking posts focused on instructions rather than inspiration, making it difficult to capture attention in increasingly competitive social feeds. KNORR needed a content ecosystem that entertained first, educated second, and inspired consumers to cook with confidence.",
    approachLabel: "Our Creative Direction",
    approach:
      "We shifted KNORR's communication from recipe demonstrations to food storytelling. Every piece of content was designed to be visually engaging, platform-native, and optimized for social sharing—combining cinematic food visuals, creator-led content, trend-driven formats, and performance marketing to maximize reach and engagement.",
    showcaseLayout: "combined",
    galleryLabel: "Digital Experience",
    experience: [
      {
        title: "Social Media",
        items:
          "Content Strategy • Creative Direction • Food Photography • Short-form Video • Motion Graphics",
      },
      {
        title: "KNORR 7alet-ha",
        items:
          "Digital Campaign • Social Amplification • Influencer Content • Community Engagement",
      },
      {
        title: "Smart Recipe Platform",
        items:
          "Website UI/UX • Web Development • AI Recipe Experience • Ingredient-Based Recipe Generator • Responsive Design",
      },
    ],
    outcome:
      "KNORR evolved beyond traditional recipe marketing into a content-driven digital ecosystem. Through engaging social storytelling, the KNORR 7alet-ha campaign, and an AI-powered recipe platform that recommends meals based on ingredients users already have at home, we created a seamless brand experience that inspired everyday cooking, increased engagement, and strengthened KNORR's connection with modern home cooks.",
    scope: [
      "Social Media Strategy",
      "Content Strategy",
      "Creative Direction",
      "Photography & Videography",
      "Motion Graphics",
      "Campaign Development",
      "Performance Marketing",
      "Digital Amplification",
      "Website Strategy",
      "UI/UX Design",
      "Website Development",
      "AI-Powered Recipe Experience",
    ],
  },
  {
    en: "Kufta",
    ar: "كفتة",
    sector: "F&B / Casual Dining",
    services:
      "Campaign Strategy • Creative Concept • Packaging Design • Customer Experience Design",
    logo: "/logos/Kufta.png",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "Turning Every Meal into a Winning Experience.",
    overview:
      "Ramadan is one of the most competitive marketing seasons, with brands competing through discounts and price wars. Rather than joining the race to the lowest price, KUFTA created an experience. Open the Chips & Win transformed every meal into a moment of anticipation, reviving the nostalgia of discovering hidden prizes while introducing a new generation to the excitement of Kharbesh w Eksab. The campaign proved that memorable experiences create stronger brand connections than temporary discounts.",
    challenge:
      "In a market dominated by price-driven promotions, KUFTA wanted to reward engagement instead of discount-seeking behavior. The challenge was to increase traffic, encourage repeat visits, and generate excitement while preserving the brand's premium positioning and strengthening long-term customer loyalty.",
    approach:
      "Every qualifying order included a branded bag of chips containing a hidden prize. Customers only discovered their reward after opening the pack, transforming a simple side item into the centerpiece of the campaign. Inspired by the nostalgia of childhood snack promotions, the experience brought back the excitement of Kharbesh w Eksab for older audiences while introducing it to Gen Z. The mechanics were intentionally simple, allowing anticipation, surprise, and sharing to become the campaign itself. Rather than buying attention with discounts, KUFTA earned it through an experience customers genuinely wanted to talk about.",
    showcaseLayout: "combined",
    galleryLabel: "Campaign Experience",
    experience: [
      { title: "Campaign Identity" },
      { title: "Packaging Experience" },
      { title: "Customer Experience" },
      { title: "Social Campaign" },
    ],
    outcome:
      "Rather than competing through discounts, KUFTA created a campaign customers genuinely wanted to experience. Every purchase became a moment of anticipation, strengthening engagement while protecting the brand's premium positioning. By transforming nostalgia into a modern brand experience, the campaign demonstrated that meaningful interactions create stronger loyalty than temporary price reductions. Because memorable brands aren't built through discounts—they're built through experiences people remember.",
    scope: [
      "Campaign Strategy",
      "Creative Concept Development",
      "Campaign Identity",
      "Packaging Design",
      "Prize Mechanics",
      "Customer Experience Design",
      "Social Media Campaign",
      "Art Direction",
      "Launch Creative",
      "In-Store Campaign Rollout",
    ],
  },
];

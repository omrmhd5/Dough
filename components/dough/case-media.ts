/**
 * Case-study imagery, captions and figures, taken from the 2026 company
 * profile. Copy for overview / challenge / approach lives in clients-data.ts.
 */
import { CLIENTS, type ClientDetail } from "./clients-data";

export type Tone = "cream" | "navy" | "grey" | "sparkle";

export interface MediaImage {
  src: string;
  w: number;
  h: number;
  alt: string;
  altAr?: string;
  caption?: string;
  captionAr?: string;
  fit?: "contain";
  bg?: string;
  position?: string;
}

export interface Stat {
  value: string;
  label: string;
  labelAr: string;
}

export interface Gallery {
  label: string;
  labelAr: string;
  /** Display line; *starred* words render bold. */
  heading?: string;
  headingAr?: string;
  body?: string;
  bodyAr?: string;
  tone: Tone;
  kind: "grid" | "beforeAfter" | "phones" | "screens" | "video" | "feature";
  cols?: 2 | 3 | 4 | 5;
  /** CSS aspect-ratio applied to every tile, e.g. "4/5". */
  aspect?: string;
  images: MediaImage[];
  palette?: { name: string; nameAr: string; hex: string }[];
  stats?: Stat[];
  video?: { src: string; poster: string };
}

export interface CaseMedia {
  slug: string;
  cover: MediaImage;
  /** Opener layout: image fills the start half, or a wide band on top. */
  opener: "split" | "band";
  /** Monochrome logo for dark surfaces. */
  logoLight?: string;
  stats?: Stat[];
  link?: { href: string; label: string };
  galleries: Gallery[];
}

const img = (
  path: string,
  w: number,
  h: number,
  alt: string,
  altAr: string,
  extra: Partial<MediaImage> = {},
): MediaImage => ({ src: `/profile/${path}.webp`, w, h, alt, altAr, ...extra });

export const CASE_MEDIA: Record<string, CaseMedia> = {
  barns: {
    slug: "barns",
    opener: "band",
    cover: img("p15-0", 2000, 1129, "Barn's green storefront panel beside a filled baguette", "لوحة بارنز الخضراء بجانب ساندوتش باجيت"),
    galleries: [
      {
        label: "Social media",
        labelAr: "السوشيال ميديا",
        heading: "we took over *the feed.*",
        headingAr: "استلمنا *الفيد.*",
        body: "Content planning, art direction, photoshoots made for social and community management for Barn's Egypt.",
        bodyAr: "تخطيط المحتوى، الإخراج الفني، جلسات تصوير للسوشيال وإدارة المجتمع لبارنز مصر.",
        tone: "cream",
        kind: "grid",
        cols: 3,
        aspect: "5/6",
        images: [
          img("p14-0", 354, 425, "Barn's social post", "منشور بارنز"),
          img("p14-2", 353, 425, "Barn's social post", "منشور بارنز"),
          img("p14-3", 353, 424, "Barn's social post", "منشور بارنز"),
          img("p14-4", 353, 424, "Barn's social post", "منشور بارنز"),
          img("p14-5", 353, 422, "Barn's social post", "منشور بارنز"),
          img("p14-6", 351, 424, "Barn's social post", "منشور بارنز"),
          img("p14-7", 353, 424, "Barn's social post", "منشور بارنز"),
          img("p14-8", 353, 425, "Barn's social post", "منشور بارنز"),
          img("p14-9", 352, 424, "Barn's social post", "منشور بارنز"),
        ],
      },
      {
        label: "Photoshoots",
        labelAr: "جلسات التصوير",
        heading: "shot *for social.*",
        headingAr: "متصوّر *للسوشيال.*",
        tone: "navy",
        kind: "feature",
        images: [
          img("p16-0", 2000, 1125, "Barn's branded paper cups scattered on white", "أكواب بارنز الورقية على خلفية بيضاء", { caption: "Product photography", captionAr: "تصوير المنتجات" }),
          img("p13-0", 1530, 1912, "Milk pouring into a Barn's iced coffee", "لبن بيتصب على قهوة بارنز المثلّجة", { caption: "Iced coffee", captionAr: "قهوة مثلّجة" }),
        ],
      },
    ],
  },

  akleh: {
    slug: "akleh",
    opener: "split",
    logoLight: "/profile/v3/akleh-new-white.webp",
    cover: img("cp/akleh-stickers-hd", 1504, 1980, "Akleh sticker sheet in teal, mustard, orange and red", "ورقة ملصقات أكلة بالألوان", { bg: "#ffffff" }),
    galleries: [
      {
        label: "The opportunity",
        labelAr: "الفرصة",
        tone: "cream",
        kind: "beforeAfter",
        images: [
          img("cp/akleh-old-logo", 1794, 936, "The previous Akleh logo", "شعار أكلة القديم", { fit: "contain", bg: "#ffffff" }),
          img("cp/akleh-logo-beige", 1802, 1248, "The new Akleh wordmark", "شعار أكلة الجديد", { caption: "After — the new Akleh wordmark", captionAr: "بعد — شعار أكلة الجديد" }),
        ],
      },
      {
        label: "Brand elements",
        labelAr: "عناصر العلامة",
        heading: "a pattern *per category.*",
        headingAr: "باترن *لكل قسم.*",
        body: "Pattern stickers and wraps, one per menu category.",
        bodyAr: "ملصقات وتغليف بباترن، واحد لكل قسم في المنيو.",
        tone: "cream",
        kind: "grid",
        cols: 3,
        aspect: "1/1",
        palette: [
          { name: "Teal", nameAr: "تيل", hex: "#0E8A9A" },
          { name: "Mustard", nameAr: "مستردة", hex: "#C99A00" },
          { name: "Orange", nameAr: "برتقالي", hex: "#D96000" },
          { name: "Red", nameAr: "أحمر", hex: "#E3141B" },
          { name: "Plum", nameAr: "برقوقي", hex: "#8A4F86" },
          { name: "Olive", nameAr: "زيتوني", hex: "#6B8B4F" },
        ],
        images: [
          img("cp/akleh-r1-hd", 620, 620, "Akleh pattern wrap", "تغليف أكلة بالباترن"),
          img("cp/akleh-r2-hd", 620, 620, "Akleh pattern wrap", "تغليف أكلة بالباترن"),
          img("cp/akleh-stickers", 719, 797, "Akleh stickers", "ملصقات أكلة"),
          img("cp/akleh-r4-hd", 620, 620, "Akleh pattern wrap", "تغليف أكلة بالباترن"),
          img("cp/akleh-r5-hd", 620, 620, "Akleh pattern wrap", "تغليف أكلة بالباترن"),
          img("cp/akleh-wrap-yellow-hd", 620, 620, "Akleh yellow wrap", "تغليف أكلة الأصفر"),
        ],
      },
      {
        label: "Packaging system",
        labelAr: "نظام التغليف",
        heading: "one system, *every pack.*",
        headingAr: "نظام واحد، *لكل عبوة.*",
        body: "Cups, bags, boxes and bowls carry the wordmark and a pattern per category.",
        bodyAr: "الأكواب والأكياس والعلب والبولات شايلة الشعار وباترن لكل قسم.",
        tone: "cream",
        kind: "feature",
        images: [
          img("cp/akleh-box", 1600, 1066, "Akleh meal box", "علبة وجبات أكلة"),
          img("cp/akleh-kraft", 668, 1009, "Akleh kraft bag", "كيس أكلة الكرافت"),
        ],
      },
      {
        label: "Merch",
        labelAr: "المنتجات الترويجية",
        heading: "the brand, *on the street.*",
        headingAr: "العلامة، *في الشارع.*",
        body: "Staff and fan tees that carry the brand into the street.",
        bodyAr: "تيشيرتات للفريق والجمهور بتاخد العلامة للشارع.",
        tone: "grey",
        kind: "grid",
        cols: 4,
        aspect: "1/1",
        images: [
          img("cp/akleh-tee1", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("cp/akleh-tee2", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("cp/akleh-tee3", 1308, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("cp/akleh-tee4", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
        ],
      },
      {
        label: "Menu engineering",
        labelAr: "هندسة المنيو",
        heading: "menu *engineering.*",
        headingAr: "هندسة *المنيو.*",
        body: "We restructured the menu around signatures and a build-your-own manoucheh, with photography on every hero item. Print and mobile versions.",
        bodyAr: "أعدنا ترتيب المنيو حول الأطباق المميزة ومنقوشة تختار مكوّناتها بنفسك، مع تصوير لكل طبق رئيسي. نسخة مطبوعة ونسخة للموبايل.",
        tone: "cream",
        kind: "phones",
        images: [
          img("cp/akleh-old-menu", 1600, 1131, "The previous Akleh menu", "منيو أكلة القديم", { caption: "Before", captionAr: "قبل" }),
          img("cp/akleh-menu-p1", 924, 1233, "New Akleh print menu, page one", "منيو أكلة المطبوع الجديد، صفحة ١", { caption: "After — print", captionAr: "بعد — مطبوع" }),
          img("cp/akleh-menu-p2", 924, 1233, "New Akleh print menu, page two", "منيو أكلة المطبوع الجديد، صفحة ٢"),
          img("am/akleh-m6-p", 540, 1080, "Akleh QR mobile menu", "منيو أكلة على الموبايل", { caption: "After — QR mobile menu", captionAr: "بعد — منيو الموبايل" }),
          img("am/akleh-m9-p", 540, 1080, "Akleh QR mobile menu, item page", "منيو أكلة على الموبايل، صفحة طبق"),
        ],
      },
      {
        label: "Menu photoshoot",
        labelAr: "تصوير المنيو",
        heading: "shot *in-house.*",
        headingAr: "متصوّر *عندنا.*",
        body: "Menu photography, shot in-house.",
        bodyAr: "تصوير المنيو، اتعمل في الاستوديو بتاعنا.",
        tone: "navy",
        kind: "grid",
        cols: 2,
        aspect: "4/5",
        images: [
          img("cp/akleh-shoot-burger", 1440, 1800, "Akleh burger", "برجر أكلة"),
          img("cp/akleh-shoot-shawerma", 1440, 1800, "Akleh shawerma", "شاورما أكلة"),
          img("cp/akleh-shoot-zaatar", 1800, 1200, "Akleh zaatar manoucheh", "منقوشة زعتر من أكلة"),
          img("cp/akleh-shoot-cheese", 1800, 1200, "Akleh cheese manoucheh", "منقوشة جبنة من أكلة"),
        ],
      },
    ],
  },

  lux: {
    slug: "lux",
    opener: "split",
    logoLight: "/profile/v3/lux-white.webp",
    cover: img("cp/lux-d", 1080, 1621, "Hand squeezing a Lux body wash bottle", "يد بتعصر عبوة شاور جل لوكس"),
    stats: [
      { value: "28.7K", label: "likes on the Yasmine Sabri post", labelAr: "إعجاب على منشور ياسمين صبري" },
      { value: "11.1K", label: "shares on the same post", labelAr: "مشاركة على نفس المنشور" },
    ],
    galleries: [
      {
        label: "Social content",
        labelAr: "محتوى السوشيال",
        heading: "premium, *made for the feed.*",
        headingAr: "فخامة، *معمولة للفيد.*",
        body: "28.7K likes and 11.1K shares on the Yasmine Sabri post.",
        bodyAr: "٢٨٫٧ ألف إعجاب و١١٫١ ألف مشاركة على منشور ياسمين صبري.",
        tone: "grey",
        kind: "grid",
        cols: 3,
        aspect: "4/5",
        images: [
          img("cp/lux-a", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("cp/lux-c", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("cp/lux-b", 1122, 1402, "Lux social post", "منشور لوكس"),
          img("cp/lux-e", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("cp/lux-f", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("cp/lux-g", 941, 1672, "Lux Revitalizing Grapefruit visual", "مرئي لوكس جريب فروت", { position: "50% 30%" }),
        ],
      },
      {
        label: "AI video",
        labelAr: "فيديو بالذكاء الاصطناعي",
        heading: "motion, *made.*",
        headingAr: "حركة، *مصنوعة.*",
        body: "From a single product still to a finished film. We shape the idea, generate the scene and cut it for the feed.",
        bodyAr: "من صورة منتج واحدة لفيلم كامل. بنشكّل الفكرة، نولّد المشهد، ونقطّعه للفيد.",
        tone: "navy",
        kind: "video",
        images: [],
        video: { src: "/profile/ai/lux-grapefruit.mp4", poster: "/profile/ai/lux-grapefruit-still.webp" },
      },
    ],
  },

  knorr: {
    slug: "knorr",
    opener: "split",
    logoLight: "/profile/v3/knorr-white.webp",
    cover: img("cp/knorr-post", 1206, 1482, "Knorr bechamel chocolate April Fools' post", "منشور كنور بشاميل بالشوكولاتة لكذبة أبريل"),
    stats: [
      { value: "3,180", label: "shares on the April Fools' post", labelAr: "مشاركة على منشور كذبة أبريل" },
      { value: "785", label: "likes", labelAr: "إعجاب" },
      { value: "158", label: "comments", labelAr: "تعليق" },
    ],
    galleries: [
      {
        label: "April Fools",
        labelAr: "كذبة أبريل",
        heading: "a launch people *wanted to be real.*",
        headingAr: "إطلاق الناس *اتمنّت يكون حقيقي.*",
        body: "Bechamel chocolate: a fake product, shot and announced like a real one on @knorregypt. The caption: you asked for something different, so we made it.",
        bodyAr: "بشاميل بالشوكولاتة: منتج وهمي، اتصوّر واتعلن كأنه حقيقي على @knorregypt. والكابشن: طلبتوا حاجة مختلفة، فعملناها.",
        tone: "cream",
        kind: "feature",
        images: [img("cp/knorr-post", 1206, 1482, "Knorr bechamel chocolate pack", "عبوة كنور بشاميل بالشوكولاتة")],
      },
      {
        label: "Always-on social",
        labelAr: "سوشيال مستمر",
        heading: "always on, *always cooking.*",
        headingAr: "شغّالين على طول، *وبنطبخ على طول.*",
        body: "The stunt sits inside an always-on feed built around everyday Egyptian cooking. 6,867 likes on the potato seasoning post.",
        bodyAr: "الحيلة دي جزء من فيد مستمر مبني حوالين الطبخ المصري اليومي. ٦٬٨٦٧ إعجاب على منشور تتبيلة البطاطس.",
        tone: "navy",
        kind: "grid",
        cols: 2,
        aspect: "4/5",
        images: [
          img("cp/knorr-fries", 1206, 1482, "Knorr potato seasoning post", "منشور تتبيلة البطاطس من كنور", { caption: "Potato seasoning", captionAr: "تتبيلة البطاطس", position: "50% 100%" }),
          img("cp/knorr-bucket", 1206, 1482, "Knorr broasted mix post", "منشور خلطة البروستد من كنور", { caption: "Broasted mix", captionAr: "خلطة البروستد", position: "50% 100%" }),
        ],
      },
    ],
  },

  kufta: {
    slug: "kufta",
    opener: "band",
    logoLight: "/profile/v3/logo15-0.webp",
    cover: img("p19-0", 2000, 1125, "Kufta sauce bottles with limes and berries", "زجاجات صوص كفتة مع ليمون وتوت"),
    galleries: [
      {
        label: "Ramadan campaign",
        labelAr: "حملة رمضان",
        heading: "open the bag, *win the eidiya.*",
        headingAr: "افتح الكيس، *واكسب العيدية.*",
        body: "During Ramadan, every Kufta Chips bag was a chance to win. Customers opened their bag to find out if a prize was inside.",
        bodyAr: "في رمضان، كل كيس شيبس من كفتة كان فرصة للمكسب. العملاء بيفتحوا الكيس عشان يعرفوا لو جوّاه جايزة.",
        tone: "navy",
        kind: "feature",
        images: [
          img("cp/kufta-chips-1", 768, 960, "Kufta Eidiya campaign visual with chips and prize cards", "مرئي حملة عيدية كفتة مع الشيبس وكروت الجوايز"),
          img("cp/kufta-chips-2", 1160, 2000, "Kufta chips bag", "كيس شيبس كفتة"),
        ],
      },
      {
        label: "Packaging & spaces",
        labelAr: "التغليف والمساحات",
        heading: "boxes *and kiosks.*",
        headingAr: "علب *وأكشاك.*",
        tone: "cream",
        kind: "grid",
        cols: 2,
        aspect: "4/5",
        images: [
          img("cp/kufta-boxes", 1066, 1600, "Stacked Kufta takeaway boxes", "علب كفتة مرصوصة", { caption: "Takeaway packaging", captionAr: "تغليف التيك أواي" }),
          img("cp/kufta-booth", 1024, 768, "Render of the Kufta ordering kiosk", "تصوّر لكشك طلبات كفتة", { caption: "Ordering kiosk · render", captionAr: "كشك الطلبات · تصوّر" }),
        ],
      },
    ],
  },

  farooja: {
    slug: "farooja",
    opener: "band",
    cover: img("cp/farooja-billboard", 1268, 846, "Farooja 'opening soon' billboard against blue sky", "بيلبورد فروجى «قريبًا» في السما الزرقا", { position: "50% 70%" }),
    galleries: [
      {
        label: "Branding",
        labelAr: "الهوية",
        heading: "a loud, cheeky identity *led by the mascot.*",
        headingAr: "هوية عالية وشقية *بيقودها الماسكوت.*",
        body: "Logo, mascot, stationery, signage and packaging.",
        bodyAr: "الشعار، الماسكوت، المطبوعات، اللافتات والتغليف.",
        tone: "cream",
        kind: "grid",
        cols: 2,
        aspect: "4/3",
        images: [
          img("cp/farooja-cards", 1184, 896, "Farooja business cards", "كروت فروجى"),
          img("cp/farooja-awning", 1205, 764, "Farooja storefront awning", "تندة واجهة فروجى"),
          img("cp/farooja-wings-warm", 1315, 1842, "Farooja grilled wings", "أجنحة فروجى المشوية"),
          img("cp/farooja-bag", 678, 772, "Farooja paper bag", "كيس فروجى الورقي"),
        ],
      },
      {
        label: "Copywriting",
        labelAr: "كتابة المحتوى",
        heading: "a voice *with attitude.*",
        headingAr: "صوت *عنده شخصية.*",
        tone: "grey",
        kind: "grid",
        cols: 2,
        aspect: "3/4",
        images: [
          img("cp/farooja-poster", 796, 822, "Farooja 'opening soon' poster", "بوستر فروجى «قريبًا»", { caption: "Opening soon", captionAr: "قريبًا" }),
          img("cp/farooja-menu-cover", 900, 1600, "Farooja 'born on the grill' menu cover", "غلاف منيو فروجى «اتولد على الشواية»", { caption: "Born on the grill", captionAr: "اتولد على الشواية" }),
        ],
      },
      {
        label: "Interior direction",
        labelAr: "التوجيه الداخلي",
        heading: "the brand, *extended into the store.*",
        headingAr: "العلامة، *جوّه الفرع.*",
        body: "White tile, orange trim and the brand's graphics on the walls. Interior direction renders.",
        bodyAr: "بلاط أبيض، حواف برتقالي وجرافيك العلامة على الحيطان. تصوّرات للتوجيه الداخلي.",
        tone: "cream",
        kind: "feature",
        images: [
          img("cp/farooja-int1", 1400, 1050, "Farooja interior render, counter", "تصوّر داخلي لفروجى، الكاونتر"),
          img("cp/farooja-int2", 1400, 1050, "Farooja interior render, seating", "تصوّر داخلي لفروجى، الجلسة"),
          img("cp/farooja-int3", 1400, 1050, "Farooja interior render, wall graphics", "تصوّر داخلي لفروجى، جرافيك الحيطان"),
        ],
      },
      {
        label: "Digital menu screens",
        labelAr: "شاشات المنيو",
        heading: "the menu, *on screen.*",
        headingAr: "المنيو، *على الشاشة.*",
        body: "Portrait digital boards for meals, wraps, buckets and wings, built from the same system as the print and mobile menu.",
        bodyAr: "شاشات طولية للوجبات والراب والباكيتات والأجنحة، مبنية من نفس نظام المنيو المطبوع والموبايل.",
        tone: "navy",
        kind: "screens",
        images: [
          img("fm/menu-3", 608, 1080, "Farooja digital menu board", "شاشة منيو فروجى"),
          img("fm/menu-4", 608, 1080, "Farooja digital menu board", "شاشة منيو فروجى"),
          img("fm/menu-5", 608, 1080, "Farooja digital menu board", "شاشة منيو فروجى"),
          img("fm/menu-6", 608, 1080, "Farooja digital menu board", "شاشة منيو فروجى"),
        ],
      },
    ],
  },

  hndl: {
    slug: "hndl",
    opener: "split",
    cover: img("cp/hndl-mockup2", 1080, 1440, "HNDL website on a laptop", "موقع HNDL على لابتوب"),
    link: { href: "https://www.hndlfm.com/en", label: "hndlfm.com" },
    galleries: [
      {
        label: "Rebrand",
        labelAr: "إعادة الهوية",
        tone: "cream",
        kind: "beforeAfter",
        images: [
          img("cp/hndl-old-logo", 1123, 588, "The previous HNDL logo", "شعار HNDL القديم", { fit: "contain", bg: "#ffffff" }),
          img("cp/hndl-logo", 924, 653, "The new HNDL logo", "شعار HNDL الجديد", { fit: "contain", bg: "#ffffff" }),
        ],
      },
      {
        label: "Website & UI",
        labelAr: "الموقع والواجهة",
        heading: "clarity, *by design.*",
        headingAr: "وضوح، *بالتصميم.*",
        tone: "navy",
        kind: "feature",
        images: [
          img("cp/hndl-home", 2000, 934, "HNDL homepage", "الصفحة الرئيسية لموقع HNDL", { caption: "hndlfm.com — homepage", captionAr: "hndlfm.com — الصفحة الرئيسية", position: "50% 0%" }),
          img("cp/hndl-mockup1", 1080, 1440, "HNDL app icon", "أيقونة تطبيق HNDL", { caption: "App icon", captionAr: "أيقونة التطبيق" }),
        ],
      },
      {
        label: "Exhibition booth",
        labelAr: "جناح المعرض",
        tone: "cream",
        kind: "grid",
        cols: 2,
        aspect: "3/4",
        images: [
          img("cp/hndl-booth", 1080, 1440, "HNDL exhibition booth", "جناح HNDL في المعرض", { caption: "Exhibition booth", captionAr: "جناح المعرض" }),
          img("cp/hndl-mockup2", 1080, 1440, "HNDL website on a laptop", "موقع HNDL على لابتوب"),
        ],
      },
    ],
  },

  primos: {
    slug: "primos",
    opener: "band",
    logoLight: "/profile/cp/primos-white.webp",
    cover: img("cp/primos-samples", 1274, 654, "Grid of Primos pizza social posts", "شبكة منشورات بريموز للبيتزا"),
    galleries: [
      {
        label: "Social content",
        labelAr: "محتوى السوشيال",
        heading: "the new identity, *on the feed.*",
        headingAr: "الهوية الجديدة، *على الفيد.*",
        tone: "cream",
        kind: "feature",
        images: [
          img("cp/primos-logo-1", 1264, 652, "Primos logo", "شعار بريموز", { caption: "Primos identity", captionAr: "هوية بريموز" }),
        ],
      },
    ],
  },

  "qasr-elkababgi": {
    slug: "qasr-elkababgi",
    opener: "split",
    cover: img("cp/qasr-p1", 924, 1306, "Qasr ElKababgi menu cover with the lion crest", "غلاف منيو قصر الكبابجي بشعار الأسد"),
    galleries: [
      {
        label: "Menu",
        labelAr: "المنيو",
        heading: "designed, printed *and produced.*",
        headingAr: "اتصمم، اتطبع *واتنفّذ.*",
        body: "A 22-page bilingual menu with photography on every section, taken through to print and production.",
        bodyAr: "منيو من ٢٢ صفحة بلغتين، فيه تصوير لكل قسم، ووصلناه لحد الطباعة والإنتاج.",
        tone: "grey",
        kind: "grid",
        cols: 4,
        aspect: "924/1306",
        images: [
          img("cp/qasr-p1", 924, 1306, "Qasr ElKababgi menu, cover", "منيو قصر الكبابجي، الغلاف"),
          img("cp/qasr-p2", 924, 1306, "Qasr ElKababgi menu, inside page", "منيو قصر الكبابجي، صفحة داخلية"),
          img("cp/qasr-p5", 924, 1306, "Qasr ElKababgi menu, inside page", "منيو قصر الكبابجي، صفحة داخلية"),
          img("cp/qasr-p9", 924, 1306, "Qasr ElKababgi menu, inside page", "منيو قصر الكبابجي، صفحة داخلية"),
        ],
      },
    ],
  },
};

/**
 * The six case studies the site lists, in order. Barn's, Primos and Qasr
 * ElKababgi keep their data and images (CASE_MEDIA, clients-data, public/)
 * so they can be added back here, but they are not published.
 */
export const CASE_ORDER = [
  "akleh",
  "hndl",
  "knorr",
  "lux",
  "farooja",
  "kufta",
];

export interface CaseEntry {
  client: ClientDetail;
  media: CaseMedia;
  number: number;
}

export const CASES: CaseEntry[] = CASE_ORDER.map((slug, i) => {
  const client = CLIENTS.find((c) => c.slug === slug);
  if (!client) throw new Error(`Missing client data for case "${slug}"`);
  return { client, media: CASE_MEDIA[slug], number: i + 1 };
});

export function getCase(slug: string | undefined) {
  if (!slug) return undefined;
  return CASES.find((c) => c.client.slug === slug.toLowerCase());
}

/** Client logo wall, white logos on navy (profile page 07). */
export const CLIENT_WALL: { src: string; alt: string; h: number }[] = [
  { src: "/profile/v3/akleh-new-white.webp", alt: "Akleh", h: 100 },
  { src: "/profile/v3/n9-1.webp", alt: "Farooja", h: 90 },
  { src: "/profile/v3/n9-2.webp", alt: "Barn's", h: 100 },
  { src: "/profile/v3/n9-3.webp", alt: "Bebek", h: 70 },
  { src: "/profile/v3/kiri-white.webp", alt: "Kiri", h: 78 },
  { src: "/profile/v3/n9-5.webp", alt: "El Dahan", h: 78 },
  { src: "/profile/v3/n9-6.webp", alt: "Shawerma El Reem", h: 70 },
  { src: "/profile/v3/n9-7.webp", alt: "Crinkle", h: 100 },
  { src: "/profile/v3/n9-8.webp", alt: "Kufta", h: 70 },
  { src: "/profile/v3/n9-9.webp", alt: "Lil Kitchen", h: 64 },
  { src: "/profile/v3/n9-10.webp", alt: "Mini Town Team", h: 70 },
  { src: "/profile/v3/n9-11.webp", alt: "Qasr ElKababgi", h: 90 },
  { src: "/profile/v3/knorr-white.webp", alt: "Knorr", h: 96 },
  { src: "/profile/v3/n9-13.webp", alt: "Tant", h: 100 },
  { src: "/profile/v3/n9-14.webp", alt: "Taghmisa", h: 70 },
  { src: "/profile/v3/lux-white.webp", alt: "Lux", h: 78 },
  { src: "/profile/v3/n9-16.webp", alt: "Town Team", h: 84 },
  { src: "/profile/v3/n9-17.webp", alt: "Madghout Dagag", h: 90 },
  { src: "/profile/v3/n9-18.webp", alt: "J-Smash", h: 110 },
  { src: "/profile/v3/n9-19.webp", alt: "Cif", h: 90 },
  { src: "/profile/v3/n9-20.webp", alt: "Comfort", h: 90 },
  { src: "/profile/v3/camay-white.webp", alt: "Camay", h: 64 },
  { src: "/profile/v3/sayed-hanafy-white.webp", alt: "Sayed Hanafy", h: 76 },
  { src: "/profile/cp/primos-white.webp", alt: "Primos", h: 70 },
  { src: "/profile/v3/omo-white.webp", alt: "Omo", h: 90 },
  { src: "/profile/v3/heinz-white.webp", alt: "Heinz", h: 72 },
];

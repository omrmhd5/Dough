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
  /** Pixels trimmed from the top of the source file (non-destructive; adjust or remove anytime). */
  cropTop?: number;
  /** Feature side column: fill the row height (e.g. tall pack shot). */
  featureFill?: boolean;
  /** Under the feature lead: grow to fill leftover column height (object-cover). */
  featureFlex?: boolean;
  /** Native w×h frame capped by --media-max (social / opener-style sizing). */
  nativeFrame?: boolean;
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
  kind:
    | "grid"
    | "justified"
    | "beforeAfter"
    | "phones"
    | "screens"
    | "video"
    | "feature";
  cols?: 2 | 3 | 4 | 5;
  /** CSS aspect-ratio applied to every tile, e.g. "4/5". */
  aspect?: string;
  /** Cap each tile’s max height (defaults to --media-max). */
  tileMax?: string;
  /** Grid: native w×h social tiles (contain, no forced aspect crop). */
  nativeTiles?: boolean;
  /** Screens row: override `--screen-w` (e.g. tie width to `--media-max`). */
  screenWidth?: string;
  images: MediaImage[];
  /** Feature galleries: a wide photo placed directly under the lead photo. */
  leadUnder?: MediaImage;
  palette?: { name: string; nameAr: string; hex: string }[];
  stats?: Stat[];
  video?: { src: string; poster: string };
}

export interface CaseMedia {
  slug: string;
  cover: MediaImage;
  /** Home selected-work preview when it should differ from `cover`. */
  coverHome?: MediaImage;
  /** Opener layout: image fills the start half, or a wide band on top. */
  opener: "split" | "band";
  /** Monochrome logo for dark surfaces. */
  logoLight?: string;
  stats?: Stat[];
  link?: { href: string; label: string };
  /** Split opener: frame and fit follow cover w×h (no 4∶3 crop). */
  coverPreserveAspect?: boolean;
  /** Split opener: before/after pair in the side panel (cover still used on index cards). */
  coverCompare?: { before: MediaImage; after: MediaImage };
  galleries: Gallery[];
}

const img = (
  path: string,
  w: number,
  h: number,
  alt: string,
  altAr: string,
  extra: Partial<MediaImage> = {},
): MediaImage => ({ src: `/cases/${path}.webp`, w, h, alt, altAr, ...extra });

export const CASE_MEDIA: Record<string, CaseMedia> = {
  barns: {
    slug: "barns",
    opener: "band",
    cover: img(
      "barns/p15-0",
      2000,
      1129,
      "Barn's green storefront panel beside a filled baguette",
      "لوحة بارنز الخضراء بجانب ساندوتش باجيت",
    ),
    galleries: [
      {
        label: "Social media",
        labelAr: "السوشيال ميديا",
        heading: "we took over *the feed.*",
        headingAr: "استلمنا *الفيد.*",
        body: "Content planning, art direction, photoshoots made for social and community management for Barn's Egypt.",
        bodyAr:
          "تخطيط المحتوى، الإخراج الفني، جلسات تصوير للسوشيال وإدارة المجتمع لبارنز مصر.",
        tone: "cream",
        kind: "grid",
        cols: 3,
        aspect: "5/6",
        images: [
          img("barns/p14-0", 354, 425, "Barn's social post", "منشور بارنز"),
          img("barns/p14-2", 353, 425, "Barn's social post", "منشور بارنز"),
          img("barns/p14-3", 353, 424, "Barn's social post", "منشور بارنز"),
          img("barns/p14-4", 353, 424, "Barn's social post", "منشور بارنز"),
          img("barns/p14-5", 353, 422, "Barn's social post", "منشور بارنز"),
          img("barns/p14-6", 351, 424, "Barn's social post", "منشور بارنز"),
          img("barns/p14-7", 353, 424, "Barn's social post", "منشور بارنز"),
          img("barns/p14-8", 353, 425, "Barn's social post", "منشور بارنز"),
          img("barns/p14-9", 352, 424, "Barn's social post", "منشور بارنز"),
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
          img(
            "barns/p16-0",
            2000,
            1125,
            "Barn's branded paper cups scattered on white",
            "أكواب بارنز الورقية على خلفية بيضاء",
            { caption: "Product photography", captionAr: "تصوير المنتجات" },
          ),
          img(
            "barns/p13-0",
            1530,
            1912,
            "Milk pouring into a Barn's iced coffee",
            "لبن بيتصب على قهوة بارنز المثلّجة",
            { caption: "Iced coffee", captionAr: "قهوة مثلّجة" },
          ),
        ],
      },
    ],
  },

  akleh: {
    slug: "akleh",
    opener: "split",
    logoLight: "/work/logos/akleh-new-white.webp",
    cover: img(
      "akleh/akleh-logo-beige",
      1802,
      1248,
      "The new Akleh wordmark",
      "شعار أكلة الجديد",
      {
        bg: "#F0EBE5",
      },
    ),
    coverCompare: {
      before: img(
        "akleh/akleh-old-logo",
        1794,
        936,
        "The previous Akleh logo",
        "شعار أكلة القديم",
      ),
      after: img(
        "akleh/akleh-logo-beige",
        1802,
        1248,
        "The new Akleh wordmark",
        "شعار أكلة الجديد",
      ),
    },
    galleries: [
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
        tileMax: "min(40svh, 420px)",
        palette: [
          { name: "Teal", nameAr: "تيل", hex: "#0E8A9A" },
          { name: "Mustard", nameAr: "مستردة", hex: "#C99A00" },
          { name: "Orange", nameAr: "برتقالي", hex: "#D96000" },
          { name: "Red", nameAr: "أحمر", hex: "#E3141B" },
          { name: "Plum", nameAr: "برقوقي", hex: "#8A4F86" },
          { name: "Olive", nameAr: "زيتوني", hex: "#6B8B4F" },
        ],
        images: [
          img(
            "akleh/akleh-alu-1",
            620,
            620,
            "Aluminium wrapping paper, purple seal on a plain wrap",
            "ورق ألومنيوم للتغليف، ختم بنفسجي على ورق سادة",
          ),
          img(
            "akleh/akleh-alu-2",
            620,
            620,
            "Aluminium wrapping paper, teal seal on a plain wrap",
            "ورق ألومنيوم للتغليف، ختم تركواز على ورق سادة",
          ),
          img(
            "akleh/akleh-alu-3",
            620,
            620,
            "Aluminium wrapping paper, mustard seal on a plain wrap",
            "ورق ألومنيوم للتغليف، ختم خردلي على ورق سادة",
          ),
          img(
            "akleh/akleh-alu-4",
            620,
            620,
            "Aluminium wrapping paper, teal star pattern",
            "ورق ألومنيوم للتغليف، باترن نجوم تركواز",
          ),
          img(
            "akleh/akleh-alu-5",
            620,
            620,
            "Aluminium wrapping paper, purple grid pattern",
            "ورق ألومنيوم للتغليف، باترن شبكة بنفسجي",
          ),
          img(
            "akleh/akleh-alu-6",
            620,
            620,
            "Aluminium wrapping paper, red checker pattern",
            "ورق ألومنيوم للتغليف، باترن مربعات أحمر",
          ),
          img(
            "akleh/akleh-alu-7",
            620,
            620,
            "Aluminium wrapping paper, teal scallop pattern",
            "ورق ألومنيوم للتغليف، باترن أقواس تركواز",
          ),
          img(
            "akleh/akleh-alu-8",
            620,
            620,
            "Aluminium wrapping paper, purple wave pattern",
            "ورق ألومنيوم للتغليف، باترن موجات بنفسجي",
          ),
          img(
            "akleh/akleh-alu-9",
            620,
            620,
            "Aluminium wrapping paper, orange stripe pattern",
            "ورق ألومنيوم للتغليف، باترن خطوط برتقالي",
          ),
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
        leadUnder: img(
          "akleh/akleh-bowls-pattern",
          1800,
          780,
          "Akleh pattern and coloured bowls",
          "أوعية أكلة بالباترن والألوان",
          { featureFlex: true },
        ),
        images: [
          img(
            "akleh/akleh-box",
            1600,
            1066,
            "Akleh meal box",
            "علبة وجبات أكلة",
          ),
          img(
            "akleh/akleh-kraft",
            668,
            1009,
            "Akleh kraft bag",
            "كيس أكلة الكرافت",
            { featureFill: true, fit: "contain" },
          ),
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
          img("akleh/akleh-tee1", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("akleh/akleh-tee2", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("akleh/akleh-tee3", 1308, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
          img("akleh/akleh-tee4", 1303, 1308, "Akleh t-shirt", "تيشيرت أكلة"),
        ],
      },
      {
        label: "Menu engineering",
        labelAr: "هندسة المنيو",
        heading: "menu *engineering.*",
        headingAr: "هندسة *المنيو.*",
        body: "We restructured the menu around signatures and a build-your-own manoucheh, with photography on every hero item. Print and mobile versions.",
        bodyAr:
          "أعدنا ترتيب المنيو حول الأطباق المميزة ومنقوشة تختار مكوّناتها بنفسك، مع تصوير لكل طبق رئيسي. نسخة مطبوعة ونسخة للموبايل.",
        tone: "cream",
        kind: "phones",
        images: [
          img(
            "akleh/akleh-old-menu",
            1600,
            1131,
            "The previous Akleh menu",
            "منيو أكلة القديم",
            { caption: "Before", captionAr: "قبل" },
          ),
          img(
            "akleh/akleh-menu-p1",
            924,
            1233,
            "New Akleh print menu, page one",
            "منيو أكلة المطبوع الجديد، صفحة ١",
            { caption: "After — print", captionAr: "بعد — مطبوع" },
          ),
          img(
            "akleh/akleh-menu-p2",
            924,
            1233,
            "New Akleh print menu, page two",
            "منيو أكلة المطبوع الجديد، صفحة ٢",
          ),
          img(
            "akleh/m6-p",
            540,
            1080,
            "Akleh QR mobile menu",
            "منيو أكلة على الموبايل",
            {
              caption: "After — QR mobile menu",
              captionAr: "بعد — منيو الموبايل",
            },
          ),
          img(
            "akleh/m9-p",
            540,
            1080,
            "Akleh QR mobile menu, item page",
            "منيو أكلة على الموبايل، صفحة طبق",
          ),
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
          img(
            "akleh/akleh-shoot-burger",
            1440,
            1800,
            "Akleh burger",
            "برجر أكلة",
            {
              cropTop: 200,
            },
          ),
          img(
            "akleh/akleh-shoot-shawerma",
            1440,
            1800,
            "Akleh shawerma",
            "شاورما أكلة",
          ),
          img(
            "akleh/akleh-shoot-zaatar",
            1800,
            1200,
            "Akleh zaatar manoucheh",
            "منقوشة زعتر من أكلة",
          ),
          img(
            "akleh/akleh-shoot-cheese",
            1800,
            1200,
            "Akleh cheese manoucheh",
            "منقوشة جبنة من أكلة",
          ),
        ],
      },
    ],
  },

  lux: {
    slug: "lux",
    opener: "split",
    coverPreserveAspect: true,
    logoLight: "/work/logos/lux-white.webp",
    cover: img(
      "lux/lux-d",
      1080,
      1621,
      "Hand squeezing a Lux body wash bottle",
      "يد بتعصر عبوة شاور جل لوكس",
    ),
    stats: [
      {
        value: "28.7K",
        label: "likes on the Yasmine Sabri post",
        labelAr: "إعجاب على منشور ياسمين صبري",
      },
      {
        value: "11.1K",
        label: "shares on the same post",
        labelAr: "مشاركة على نفس المنشور",
      },
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
        nativeTiles: true,
        tileMax: "min(76svh, 840px)",
        images: [
          img("lux/lux-a", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("lux/lux-c", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("lux/lux-b", 1122, 1402, "Lux social post", "منشور لوكس"),
          img("lux/lux-e", 1080, 1350, "Lux social post", "منشور لوكس"),
          img("lux/lux-f", 1080, 1350, "Lux social post", "منشور لوكس"),
          img(
            "lux/lux-g",
            941,
            1672,
            "Lux Revitalizing Grapefruit visual",
            "مرئي لوكس جريب فروت",
          ),
        ],
      },
      {
        label: "AI video",
        labelAr: "فيديو بالذكاء الاصطناعي",
        heading: "motion, *made.*",
        headingAr: "حركة، *مصنوعة.*",
        body: "From a single product still to a finished film. We shape the idea, generate the scene and cut it for the feed.",
        bodyAr:
          "من صورة منتج واحدة لفيلم كامل. بنشكّل الفكرة، نولّد المشهد، ونقطّعه للفيد.",
        tone: "navy",
        kind: "video",
        images: [],
        video: {
          src: "/cases/lux/lux-grapefruit.mp4",
          poster: "/cases/lux/lux-grapefruit-still.webp",
        },
      },
    ],
  },

  knorr: {
    slug: "knorr",
    opener: "split",
    coverPreserveAspect: true,
    logoLight: "/work/logos/knorr-white.webp",
    cover: img(
      "knorr/knorr-cover",
      1080,
      1920,
      "Knorr bechamel chocolate April Fools' post",
      "منشور كنور بشاميل بالشوكولاتة لكذبة أبريل",
    ),
    stats: [
      {
        value: "3,180",
        label: "shares on the April Fools' post",
        labelAr: "مشاركة على منشور كذبة أبريل",
      },
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
        bodyAr:
          "بشاميل بالشوكولاتة: منتج وهمي، اتصوّر واتعلن كأنه حقيقي على @knorregypt. والكابشن: طلبتوا حاجة مختلفة، فعملناها.",
        tone: "cream",
        kind: "feature",
        images: [
          img(
            "knorr/knorr-post",
            1206,
            1482,
            "Knorr bechamel chocolate pack",
            "عبوة كنور بشاميل بالشوكولاتة",
            {
              nativeFrame: true,
              fit: "contain",
              bg: "var(--cream)",
            },
          ),
        ],
      },
      {
        label: "Always-on social",
        labelAr: "سوشيال مستمر",
        heading: "always on, *always cooking.*",
        headingAr: "شغّالين على طول، *وبنطبخ على طول.*",
        body: "The stunt sits inside an always-on feed built around everyday Egyptian cooking. 6,867 likes on the potato seasoning post.",
        bodyAr:
          "الحيلة دي جزء من فيد مستمر مبني حوالين الطبخ المصري اليومي. ٦٬٨٦٧ إعجاب على منشور تتبيلة البطاطس.",
        tone: "navy",
        kind: "grid",
        cols: 2,
        images: [
          img(
            "knorr/knorr-fries",
            1206,
            1482,
            "Knorr potato seasoning post",
            "منشور تتبيلة البطاطس من كنور",
            {
              caption: "Potato seasoning",
              captionAr: "تتبيلة البطاطس",
              nativeFrame: true,
              fit: "contain",
              bg: "var(--cream)",
            },
          ),
          img(
            "knorr/knorr-bucket",
            1206,
            1482,
            "Knorr broasted mix post",
            "منشور خلطة البروستد من كنور",
            {
              caption: "Broasted mix",
              captionAr: "خلطة البروستد",
              nativeFrame: true,
              fit: "contain",
              bg: "var(--cream)",
            },
          ),
        ],
      },
    ],
  },

  kufta: {
    slug: "kufta",
    opener: "split",
    coverPreserveAspect: true,
    logoLight: "/work/logos/logo15-0.webp",
    cover: img(
      "kufta/kufta-cover",
      3661,
      3376,
      "Kufta campaign hero visual",
      "صورة رئيسية لحملة كفتة",
      { src: "/cases/kufta/kufta-cover.webp" },
    ),
    coverHome: img(
      "kufta/kufta-cover-home",
      3661,
      4577,
      "Kufta campaign hero visual",
      "صورة رئيسية لحملة كفتة",
      { src: "/cases/kufta/cover-home.jpg" },
    ),
    galleries: [
      {
        label: "Ramadan campaign",
        labelAr: "حملة رمضان",
        heading: "open the bag, *win the eidiya.*",
        headingAr: "افتح الكيس، *واكسب العيدية.*",
        body: "During Ramadan, every Kufta Chips bag was a chance to win. Customers opened their bag to find out if a prize was inside.",
        bodyAr:
          "في رمضان، كل كيس شيبس من كفتة كان فرصة للمكسب. العملاء بيفتحوا الكيس عشان يعرفوا لو جوّاه جايزة.",
        tone: "navy",
        kind: "justified",
        tileMax: "min(62svh, 720px)",
        images: [
          img(
            "kufta/kufta-chips-1",
            768,
            960,
            "Kufta Eidiya campaign visual with chips and prize cards",
            "مرئي حملة عيدية كفتة مع الشيبس وكروت الجوايز",
          ),
          img(
            "kufta/kufta-chips-2",
            1160,
            2000,
            "Kufta chips bag",
            "كيس شيبس كفتة",
          ),
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
        nativeTiles: true,
        tileMax: "min(76svh, 840px)",
        images: [
          img(
            "kufta/kufta-boxes",
            1066,
            1600,
            "Stacked Kufta takeaway boxes",
            "علب كفتة مرصوصة",
            { caption: "Takeaway packaging", captionAr: "تغليف التيك أواي" },
          ),
          img(
            "kufta/kufta-booth",
            1024,
            768,
            "Render of the Kufta ordering kiosk",
            "تصوّر لكشك طلبات كفتة",
            {
              caption: "Ordering kiosk · render",
              captionAr: "كشك الطلبات · تصوّر",
            },
          ),
        ],
      },
    ],
  },

  farooja: {
    slug: "farooja",
    opener: "split",
    coverPreserveAspect: true,
    cover: img(
      "farooja/farooja-billboard",
      1268,
      846,
      "Farooja 'opening soon' billboard against blue sky",
      "بيلبورد فروجى «قريبًا» في السما الزرقا",
    ),
    galleries: [
      {
        label: "Branding",
        labelAr: "الهوية",
        heading: "a loud, cheeky identity *led by the mascot.*",
        headingAr: "هوية عالية وشقية *بيقودها الماسكوت.*",
        body: "Logo, mascot, stationery, signage and packaging.",
        bodyAr: "الشعار، الماسكوت، المطبوعات، اللافتات والتغليف.",
        tone: "cream",
        kind: "justified",
        images: [
          img(
            "farooja/farooja-cards",
            1184,
            896,
            "Farooja business cards",
            "كروت فروجى",
          ),
          img(
            "farooja/farooja-awning",
            1205,
            764,
            "Farooja storefront awning",
            "تندة واجهة فروجى",
          ),
          img(
            "farooja/farooja-wings-warm",
            1315,
            1842,
            "Farooja grilled wings",
            "أجنحة فروجى المشوية",
          ),
          img(
            "farooja/farooja-bag",
            678,
            772,
            "Farooja paper bag",
            "كيس فروجى الورقي",
          ),
        ],
      },
      {
        label: "Copywriting",
        labelAr: "كتابة المحتوى",
        heading: "a voice *with attitude.*",
        headingAr: "صوت *عنده شخصية.*",
        tone: "grey",
        kind: "justified",
        tileMax: "min(62svh, 720px)",
        images: [
          img(
            "farooja/farooja-poster",
            796,
            822,
            "Farooja 'opening soon' poster",
            "بوستر فروجى «قريبًا»",
            { caption: "Opening soon", captionAr: "قريبًا" },
          ),
          img(
            "farooja/farooja-menu-cover",
            900,
            1600,
            "Farooja 'born on the grill' menu cover",
            "غلاف منيو فروجى «اتولد على الشواية»",
            { caption: "Born on the grill", captionAr: "اتولد على الشواية" },
          ),
        ],
      },
      {
        label: "Interior direction",
        labelAr: "التوجيه الداخلي",
        heading: "the brand, *extended into the store.*",
        headingAr: "العلامة، *جوّه الفرع.*",
        body: "White tile, orange trim and the brand's graphics on the walls. Interior direction renders.",
        bodyAr:
          "بلاط أبيض، حواف برتقالي وجرافيك العلامة على الحيطان. تصوّرات للتوجيه الداخلي.",
        tone: "cream",
        kind: "feature",
        images: [
          img(
            "farooja/farooja-int1",
            1400,
            1050,
            "Farooja interior render, counter",
            "تصوّر داخلي لفروجى، الكاونتر",
          ),
          img(
            "farooja/farooja-int2",
            1400,
            1050,
            "Farooja interior render, seating",
            "تصوّر داخلي لفروجى، الجلسة",
          ),
          img(
            "farooja/farooja-int3",
            1400,
            1050,
            "Farooja interior render, wall graphics",
            "تصوّر داخلي لفروجى، جرافيك الحيطان",
          ),
        ],
      },
      {
        label: "Digital menu screens",
        labelAr: "شاشات المنيو",
        heading: "the menu, *on screen.*",
        headingAr: "المنيو، *على الشاشة.*",
        body: "Portrait digital boards for meals, wraps, buckets and wings, built from the same system as the print and mobile menu.",
        bodyAr:
          "شاشات طولية للوجبات والراب والباكيتات والأجنحة، مبنية من نفس نظام المنيو المطبوع والموبايل.",
        tone: "navy",
        kind: "screens",
        screenWidth: "calc(var(--media-max) * 608 / 1080)",
        images: [
          img(
            "farooja/menu-3",
            608,
            1080,
            "Farooja digital menu board",
            "شاشة منيو فروجى",
          ),
          img(
            "farooja/menu-4",
            608,
            1080,
            "Farooja digital menu board",
            "شاشة منيو فروجى",
          ),
          img(
            "farooja/menu-5",
            608,
            1080,
            "Farooja digital menu board",
            "شاشة منيو فروجى",
          ),
          img(
            "farooja/menu-6",
            608,
            1080,
            "Farooja digital menu board",
            "شاشة منيو فروجى",
          ),
        ],
      },
    ],
  },

  hndl: {
    slug: "hndl",
    opener: "split",
    cover: img(
      "hndl/hndl-mockup2",
      1080,
      1440,
      "HNDL website on a laptop",
      "موقع HNDL على لابتوب",
    ),
    link: { href: "https://www.hndlfm.com/en", label: "hndlfm.com" },
    galleries: [
      {
        label: "Rebrand",
        labelAr: "إعادة الهوية",
        tone: "cream",
        kind: "beforeAfter",
        images: [
          img(
            "hndl/hndl-old-logo",
            1123,
            588,
            "The previous HNDL logo",
            "شعار HNDL القديم",
            { fit: "contain", bg: "#ffffff" },
          ),
          img(
            "hndl/hndl-logo",
            924,
            653,
            "The new HNDL logo",
            "شعار HNDL الجديد",
            { fit: "contain", bg: "#ffffff" },
          ),
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
          img(
            "hndl/hndl-home",
            2000,
            934,
            "HNDL homepage",
            "الصفحة الرئيسية لموقع HNDL",
            {
              caption: "hndlfm.com — homepage",
              captionAr: "hndlfm.com — الصفحة الرئيسية",
              position: "50% 0%",
            },
          ),
          img(
            "hndl/hndl-mockup1",
            1080,
            1440,
            "HNDL app icon",
            "أيقونة تطبيق HNDL",
            { caption: "App icon", captionAr: "أيقونة التطبيق" },
          ),
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
          img(
            "hndl/hndl-booth",
            1080,
            1440,
            "HNDL exhibition booth",
            "جناح HNDL في المعرض",
            { caption: "Exhibition booth", captionAr: "جناح المعرض" },
          ),
          img(
            "hndl/hndl-mockup2",
            1080,
            1440,
            "HNDL website on a laptop",
            "موقع HNDL على لابتوب",
          ),
        ],
      },
    ],
  },

  primos: {
    slug: "primos",
    opener: "band",
    logoLight: "/work/logos/primos-white.webp",
    cover: img(
      "primos/primos-samples",
      1274,
      654,
      "Grid of Primos pizza social posts",
      "شبكة منشورات بريموز للبيتزا",
    ),
    galleries: [
      {
        label: "Social content",
        labelAr: "محتوى السوشيال",
        heading: "the new identity, *on the feed.*",
        headingAr: "الهوية الجديدة، *على الفيد.*",
        tone: "cream",
        kind: "feature",
        images: [
          img("primos/primos-logo-1", 1264, 652, "Primos logo", "شعار بريموز", {
            caption: "Primos identity",
            captionAr: "هوية بريموز",
          }),
        ],
      },
    ],
  },

  "qasr-elkababgi": {
    slug: "qasr-elkababgi",
    opener: "split",
    cover: img(
      "qasr-elkababgi/qasr-p1",
      924,
      1306,
      "Qasr ElKababgi menu cover with the lion crest",
      "غلاف منيو قصر الكبابجي بشعار الأسد",
    ),
    galleries: [
      {
        label: "Menu",
        labelAr: "المنيو",
        heading: "designed, printed *and produced.*",
        headingAr: "اتصمم، اتطبع *واتنفّذ.*",
        body: "A 22-page bilingual menu with photography on every section, taken through to print and production.",
        bodyAr:
          "منيو من ٢٢ صفحة بلغتين، فيه تصوير لكل قسم، ووصلناه لحد الطباعة والإنتاج.",
        tone: "grey",
        kind: "grid",
        cols: 4,
        aspect: "924/1306",
        images: [
          img(
            "qasr-elkababgi/qasr-p1",
            924,
            1306,
            "Qasr ElKababgi menu, cover",
            "منيو قصر الكبابجي، الغلاف",
          ),
          img(
            "qasr-elkababgi/qasr-p2",
            924,
            1306,
            "Qasr ElKababgi menu, inside page",
            "منيو قصر الكبابجي، صفحة داخلية",
          ),
          img(
            "qasr-elkababgi/qasr-p5",
            924,
            1306,
            "Qasr ElKababgi menu, inside page",
            "منيو قصر الكبابجي، صفحة داخلية",
          ),
          img(
            "qasr-elkababgi/qasr-p9",
            924,
            1306,
            "Qasr ElKababgi menu, inside page",
            "منيو قصر الكبابجي، صفحة داخلية",
          ),
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
export const CASE_ORDER = ["akleh", "hndl", "knorr", "lux", "farooja", "kufta"];

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
  { src: "/work/logos/akleh-new-white.webp", alt: "Akleh", h: 100 },
  { src: "/work/logos/n9-1.webp", alt: "Farooja", h: 90 },
  { src: "/work/logos/n9-2.webp", alt: "Barn's", h: 100 },
  { src: "/work/logos/n9-3.webp", alt: "Bebek", h: 70 },
  { src: "/work/logos/kiri-white.webp", alt: "Kiri", h: 78 },
  { src: "/work/logos/n9-5.webp", alt: "El Dahan", h: 78 },
  { src: "/work/logos/n9-6.webp", alt: "Shawerma El Reem", h: 70 },
  { src: "/work/logos/n9-7.webp", alt: "Crinkle", h: 100 },
  { src: "/work/logos/n9-8.webp", alt: "Kufta", h: 70 },
  { src: "/work/logos/n9-9.webp", alt: "Lil Kitchen", h: 64 },
  { src: "/work/logos/n9-10.webp", alt: "Mini Town Team", h: 70 },
  { src: "/work/logos/n9-11.webp", alt: "Qasr ElKababgi", h: 90 },
  { src: "/work/logos/knorr-white.webp", alt: "Knorr", h: 96 },
  { src: "/work/logos/n9-13.webp", alt: "Tant", h: 100 },
  { src: "/work/logos/n9-14.webp", alt: "Taghmisa", h: 70 },
  { src: "/work/logos/lux-white.webp", alt: "Lux", h: 78 },
  { src: "/work/logos/n9-16.webp", alt: "Town Team", h: 84 },
  { src: "/work/logos/n9-17.webp", alt: "Madghout Dagag", h: 90 },
  { src: "/work/logos/n9-18.webp", alt: "J-Smash", h: 110 },
  { src: "/work/logos/n9-19.webp", alt: "Cif", h: 90 },
  { src: "/work/logos/n9-20.webp", alt: "Comfort", h: 90 },
  { src: "/work/logos/camay-white.webp", alt: "Camay", h: 64 },
  { src: "/work/logos/sayed-hanafy-white.webp", alt: "Sayed Hanafy", h: 76 },
  { src: "/work/logos/primos-white.webp", alt: "Primos", h: 70 },
  { src: "/work/logos/omo-white.webp", alt: "Omo", h: 90 },
  { src: "/work/logos/heinz-white.webp", alt: "Heinz", h: 72 },
];

export interface ClientDetail {
  en: string;
  ar: string;
  sector: string;
  sectorAr?: string;
  services: string;
  servicesAr?: string;
  logo?: string;
  images: string[];
  year?: string;
  subtitle?: string;
  subtitleAr?: string;
  overview?: string;
  overviewAr?: string;
  challenge?: string;
  challengeAr?: string;
  approach?: string;
  approachAr?: string;
  outcome?: string;
  outcomeAr?: string;
  scope?: string[];
  scopeAr?: string[];
  challengeLabel?: string;
  challengeLabelAr?: string;
  approachLabel?: string;
  approachLabelAr?: string;
  experienceLabel?: string;
  experienceLabelAr?: string;
  galleryLabel?: string;
  galleryLabelAr?: string;
  showcaseLayout?: "split" | "combined";
  experience?: {
    title: string;
    items?: string;
    titleAr?: string;
    itemsAr?: string;
  }[];
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
    sectorAr: "مطاعم سريعة / أكل كاجوال",
    services:
      "Brand Strategy • Visual Identity • Packaging • Menu Design • Restaurant Branding",
    servicesAr:
      "استراتيجية العلامة • الهوية البصرية • التغليف • تصميم المنيو • هوية المطعم",
    logo: "/logos/Akleh.png",
    images: [
      "/Packaging-design.png",
      "/grids image (2).png",
      "/portable-event-booth.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "From Generic to Genre-Defining.",
    subtitleAr: "من العادي إلى تعريف فئة بحد ذاتها.",
    overview:
      "Transforming a traditional Syrian shawerma restaurant into a bold, culture-driven brand designed for a new generation.",
    overviewAr:
      "حوّلنا مطعم شاورما سوري تقليدي إلى علامة جريئة مدفوعة بالثقافة، مصممة لجيل جديد.",
    challengeLabel: "The Opportunity",
    challengeLabelAr: "الفرصة",
    challenge:
      "AKLEH wasn't struggling because of its food—it was struggling because it looked like every other Syrian shawerma restaurant. In a category crowded with familiar logos, menus, and interiors, the brand lacked distinction. Our challenge was to create an identity that felt authentic to its roots while becoming instantly recognizable to today's audience.",
    challengeAr:
      "أكلة ما كانت بتعاني من جودة الأكل — كانت بتعاني لأن شكلها شبه أي مطعم شاورما سوري تاني. في فئة مليانة شعارات ومنيوهات وديكورات مألوفة، العلامة كانت ناقصها تميّز. تحدّينا كان نصنع هوية تحسّ بأصالتها وتبقى واضحة فورًا لجمهور اليوم.",
    approachLabel: "Our Creative Direction",
    approachLabelAr: "توجّهنا الإبداعي",
    approach:
      "Rather than redesigning a logo, we reimagined the entire brand experience. Inspired by street culture, bold typography, vibrant colors, and expressive graphics, we created a visual system that feels playful, confident, and unmistakably AKLEH. Every customer touchpoint—from packaging to menus—was designed to become part of the brand story.",
    approachAr:
      "بدل ما نعيد تصميم شعار، أعدنا تخيّل تجربة العلامة بالكامل. مستوحين من ثقافة الشارع، تايبوغرافيا جريئة، ألوان حيوية، وجرافيك معبّر، بنينا نظامًا بصريًا مرحًا وواثقًا ولا يُخطئ فيه أحد إنه أكلة. كل نقطة تواصل مع العميل — من التغليف للمنيو — صُمّمت عشان تبقى جزء من قصة العلامة.",
    showcaseLayout: "combined",
    galleryLabel: "Visual Direction",
    galleryLabelAr: "التوجّه البصري",
    experience: [
      {
        title: "Brand Identity",
        titleAr: "هوية العلامة",
        items: "Logo System • Typography • Color Palette",
        itemsAr: "نظام الشعار • الخط • لوحة الألوان",
      },
      {
        title: "Packaging System",
        titleAr: "نظام التغليف",
        items: "Meal Boxes • Bags • Wrapping • Stickers",
        itemsAr: "علب الوجبات • الأكياس • التغليف • الملصقات",
      },
      {
        title: "Restaurant Experience",
        titleAr: "تجربة المطعم",
        items: "Menus • Signage • In-store Graphics",
        itemsAr: "المنيو • اللافتات • الجرافيك داخل المطعم",
      },
      {
        title: "Art Direction",
        titleAr: "الإخراج الفني",
        items: "Photography • Social Assets • Campaign Visuals",
        itemsAr: "التصوير • أصول السوشيال • مرئيات الحملات",
      },
    ],
    outcome:
      "AKLEH evolved from another shawerma restaurant into a brand with a distinctive personality and a recognizable visual identity. The new system strengthened brand recognition across every customer touchpoint, elevated the dining experience, and provided a scalable foundation for future growth—proving that thoughtful branding can transform how people perceive a business before they even take their first bite.",
    outcomeAr:
      "أكلة اتحوّلت من مطعم شاورما تاني إلى علامة بشخصية مميزة وهوية بصرية واضحة. النظام الجديد عزّز التعرف على العلامة في كل نقطة تواصل، رفع تجربة الأكل، ووفّر أساسًا قابل للتوسع للنمو المستقبلي — وبيثبت إن العلامة المدروسة تغيّر إزاي الناس يشوفوا المكان قبل ما ياخدوا أول لقمة.",
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
    scopeAr: [
      "استراتيجية العلامة",
      "تموضع العلامة",
      "نظام الهوية البصرية",
      "تصميم التغليف",
      "هندسة المنيو",
      "تصميم المنيو",
      "لغة الجرافيك",
      "هوية المطعم",
      "دليل العلامة",
      "الإخراج الفني للسوشيال ميديا",
    ],
  },
  {
    en: "LUX",
    ar: "لوكس",
    sector: "FMCG - Beauty & Personal Care",
    sectorAr: "سلع استهلاكية — عناية وجمال",
    services:
      "Social Media Strategy • Creative Direction • Content Production • CGI & AI Content • Copywriting • Digital Campaigns",
    servicesAr:
      "استراتيجية السوشيال ميديا • الإخراج الإبداعي • إنتاج المحتوى • CGI ومحتوى AI • كتابة المحتوى • الحملات الرقمية",
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
    subtitleAr:
      "نجعل الجمال الفاخر قريبًا، ملائمًا، ومصممًا لجيل Z.",
    overview:
      "We evolved LUX's social presence into a modern beauty platform that balances premium aspiration with mainstream accessibility—keeping the brand culturally relevant to a younger generation without losing its established elegance.",
    overviewAr:
      "طوّرنا حضور لوكس على السوشيال إلى منصة جمال عصرية توازن بين الطموح الفاخر والوصول للجميع — مع إبقاء العلامة قريبة من ثقافة جيل أصغر من غير ما تفقد أناقتها الراسخة.",
    challengeLabel: "The Opportunity",
    challengeLabelAr: "الفرصة",
    approachLabel: "Our Creative Direction",
    approachLabelAr: "توجّهنا الإبداعي",
    experienceLabel: "Social Experience",
    experienceLabelAr: "تجربة السوشيال",
    challenge:
      "LUX is a globally recognized beauty brand with strong heritage and broad market appeal. The challenge was to preserve its premium perception while ensuring its social presence felt current, expressive, and relevant to Gen Z. In a category shaped by fast-moving beauty trends and highly visual content, LUX needed to feel aspirational without becoming distant, and accessible without losing its sense of luxury.",
    challengeAr:
      "لوكس علامة جمال عالمية بإرث قوي وجاذبية واسعة. التحدّي كان الحفاظ على صورتها الفاخرة مع جعل حضورها على السوشيال حاليًا ومعبّرًا وقريبًا من جيل Z. في فئة بتتحرك بسرعة مع ترندات الجمال ومحتوى بصري كثيف، لوكس محتاجة تبقى ملهمة من غير ما تبعد، ومتاحة من غير ما تفقد إحساس الفخامة.",
    approach:
      "We created a social-first visual language that blends premium beauty storytelling with the pace and energy of modern digital culture. Through refined product visuals, sensory storytelling, trend-led formats, CGI, AI-generated content, and platform-native creative, we positioned LUX as an affordable luxury brand that feels elevated, desirable, and culturally connected.",
    approachAr:
      "بنينا لغة بصرية تبدأ من السوشيال تمزج بين سرد الجمال الفاخر وإيقاع ثقافة الديجيتال الحديثة. عبر مرئيات منتجات راقية، سرد حسّي، صيغ ترندية، CGI، محتوى AI، وإبداع أصيل لكل منصة، موّضعنا لوكس كعلامة فخامة بأسعار معقولة — مرتفعة، مرغوبة، ومتصلة بالثقافة.",
    experience: [
      {
        title: "Premium Product Storytelling",
        titleAr: "سرد المنتج الفاخر",
        items:
          "Beauty Visuals • Ingredient Stories • Sensory Content • Product Benefits",
        itemsAr:
          "مرئيات الجمال • قصص المكوّنات • محتوى حسّي • فوائد المنتج",
      },
      {
        title: "Gen Z Relevance",
        titleAr: "قرب من جيل Z",
        items:
          "Trend Adaptation • Social-first Formats • Cultural Moments • Platform-native Content",
        itemsAr:
          "مواكبة الترندات • صيغ السوشيال أولًا • لحظات ثقافية • محتوى أصيل للمنصات",
      },
      {
        title: "Creative Innovation",
        titleAr: "ابتكار إبداعي",
        items: "CGI • AI Creatives • Motion Design • Digital Art Direction",
        itemsAr: "CGI • إبداع AI • موشن ديزاين • إخراج فني رقمي",
      },
      {
        title: "Always-On Social",
        titleAr: "سوشيال دائم التشغيل",
        items:
          "Content Strategy • Community Engagement • Campaign Amplification • Copywriting",
        itemsAr:
          "استراتيجية المحتوى • تفاعل المجتمع • تضخيم الحملات • كتابة المحتوى",
      },
    ],
    outcome:
      "LUX's social presence evolved into a more contemporary and distinctive beauty experience—one that maintains the brand's premium heritage while speaking the visual and cultural language of Gen Z. The new creative direction made the brand feel more current, expressive, and desirable, strengthening its position as an accessible luxury beauty brand for a new generation.",
    outcomeAr:
      "حضور لوكس على السوشيال اتحوّل لتجربة جمال أكثر عصرية وتميّزًا — بتحافظ على إرث العلامة الفاخر وتتكلم لغة جيل Z البصرية والثقافية. التوجّه الإبداعي الجديد خلّى العلامة أقرب، أكثر تعبيرًا، وأكثر جاذبية — وعزّز مكانتها كعلامة جمال فاخرة بأسعار معقولة لجيل جديد.",
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
    scopeAr: [
      "استراتيجية السوشيال ميديا",
      "الإخراج الإبداعي",
      "تخطيط المحتوى الشهري",
      "مفاهيم الحملات",
      "تصوير المنتجات",
      "فيديو قصير",
      "موشن جرافيك",
      "محتوى CGI",
      "إبداع AI",
      "كتابة المحتوى",
      "مواكبة الترندات",
      "تفاعل المجتمع",
      "تضخيم الحملات الرقمية",
    ],
  },
  {
    en: "HNDL",
    ar: "HNDL",
    sector: "Tech - Fleet Management & Mobility",
    sectorAr: "تقنية — إدارة الأساطيل والتنقل",
    services:
      "Brand Identity • Website UI/UX • Web Development • Digital Strategy • Brand Guidelines",
    servicesAr:
      "هوية العلامة • UI/UX للموقع • تطوير الويب • الاستراتيجية الرقمية • دليل العلامة",
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
    subtitleAr: "تبسيط إدارة الأساطيل عبر العلامة والتجربة الرقمية.",
    overview:
      "We reimagined HNDL's brand identity and website, transforming a complex fleet management business into a modern, intuitive brand that communicates clarity, trust, and innovation.",
    overviewAr:
      "أعدنا تخيّل هوية HNDL وموقعها، وحوّلنا أعمال إدارة أساطيل معقّدة إلى علامة عصرية وبديهية تنقل الوضوح والثقة والابتكار.",
    challengeLabel: "The Opportunity",
    challengeLabelAr: "الفرصة",
    challenge:
      "HNDL offers powerful fleet management solutions, but its digital presence didn't reflect the sophistication of its platform. The challenge was to simplify a technically complex business into a brand that feels approachable, modern, and built for enterprise decision-makers.",
    challengeAr:
      "HNDL بتقدّم حلول إدارة أساطيل قوية، لكن حضورها الرقمي ما كان يعكس تطوّر منصتها. التحدّي كان تبسيط أعمال تقنية معقّدة إلى علامة قريبة وعصرية ومصممة لصنّاع القرار في المؤسسات.",
    approachLabel: "Our Creative Direction",
    approachLabelAr: "توجّهنا الإبداعي",
    approach:
      "We developed a clean visual identity and intuitive website experience that prioritizes clarity, usability, and confidence. Every design decision—from typography and layout to iconography and interface design—was crafted to help users quickly understand HNDL's solutions while reinforcing credibility across every digital touchpoint.",
    approachAr:
      "طوّرنا هوية بصرية نظيفة وتجربة موقع بديهية تضع الوضوح وسهولة الاستخدام والثقة في المقدمة. كل قرار تصميم — من الخط والتخطيط إلى الأيقونات وتصميم الواجهة — صُمّم عشان يساعد المستخدمين يفهموا حلول HNDL بسرعة ويعزّز المصداقية في كل نقطة تواصل رقمية.",
    showcaseLayout: "combined",
    galleryLabel: "Digital Experience",
    galleryLabelAr: "التجربة الرقمية",
    experience: [
      {
        title: "Brand Identity",
        titleAr: "هوية العلامة",
        items: "Logo • Typography • Color Palette • Iconography",
        itemsAr: "الشعار • الخط • لوحة الألوان • الأيقونات",
      },
      {
        title: "Website UI/UX",
        titleAr: "UI/UX للموقع",
        items:
          "User Experience • Information Architecture • Responsive Design • Conversion Strategy",
        itemsAr:
          "تجربة المستخدم • هيكلة المعلومات • التصميم المتجاوب • استراتيجية التحويل",
      },
      {
        title: "Interface Design",
        titleAr: "تصميم الواجهة",
        items: "Dashboard UI • Components • Design System • Interaction Design",
        itemsAr: "واجهة لوحة التحكم • المكوّنات • نظام التصميم • تصميم التفاعل",
      },
      {
        title: "Digital Presence",
        titleAr: "الحضور الرقمي",
        items:
          "Landing Pages • Web Development • CMS • Performance Optimization",
        itemsAr:
          "صفحات الهبوط • تطوير الويب • CMS • تحسين الأداء",
      },
    ],
    outcome:
      "HNDL now presents itself through a cohesive brand and digital experience that reflects the quality of its technology. The new identity and website simplify complex services, strengthen trust with enterprise clients, and create a scalable digital foundation for future growth.",
    outcomeAr:
      "HNDL دلوقتي بتقدّم نفسها بتجربة علامة ورقمية متماسكة تعكس جودة تقنيتها. الهوية والموقع الجديدين بيبسّطوا خدمات معقّدة، يعزّزوا الثقة مع عملاء المؤسسات، ويبنوا أساسًا رقميًا قابل للتوسع للنمو المستقبلي.",
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
    scopeAr: [
      "استراتيجية العلامة",
      "هوية العلامة",
      "نظام الهوية البصرية",
      "استراتيجية الموقع",
      "هيكلة المعلومات",
      "تصميم UI/UX",
      "تطوير الويب",
      "التصميم المتجاوب",
      "نظام التصميم",
      "دليل العلامة",
    ],
  },
  {
    en: "Farooja",
    ar: "فروجى",
    sector: "Quick Service Restaurant",
    sectorAr: "مطعم خدمة سريعة",
    services:
      "Brand Strategy • Brand Positioning • Naming • Visual Identity • Packaging Design • Menu Design • Social Media Art Direction",
    servicesAr:
      "استراتيجية العلامة • تموضع العلامة • التسمية • الهوية البصرية • تصميم التغليف • تصميم المنيو • الإخراج الفني للسوشيال ميديا",
    logo: "/logos/Farooja.png",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025–2026",
    subtitle: "Reinventing the Chicken Bucket for a Healthier Generation.",
    subtitleAr: "إعادة اختراع باكيت الدجاج لجيل أكثر صحة.",
    overview:
      "We built FAROOJA as a bold, modern grilled chicken brand that delivers the excitement of fast food with a healthier, high-protein proposition—designed for active, digitally native customers.",
    overviewAr:
      "بنينا فروجى كعلامة دجاج مشوي جريئة وعصرية تقدّم إثارة الأكل السريع بعرض أصحى وغني بالبروتين — مصممة لعملاء نشطين ومتصلين بالديجيتال.",
    challengeLabel: "The Opportunity",
    challengeLabelAr: "الفرصة",
    challenge:
      "The market was full of fried chicken concepts, but few brands offered the same sense of indulgence, convenience, and shareability through grilled chicken. FAROOJA was created to fill that gap: a brand that could own the healthier chicken bucket space without feeling clinical, restrictive, or overly fitness-focused.",
    challengeAr:
      "السوق مليان مفاهيم دجاج مقلي، لكن قليل العلامات قدّمت نفس إحساس المتعة والسهولة والمشاركة عبر الدجاج المشوي. فروجى اتخلقت عشان تملأ الفجوة دي: علامة تملك مساحة باكيت الدجاج الأصح من غير ما تحس سريرية أو مقيّدة أو مركّزة على اللياقة بس.",
    approachLabel: "Our Creative Direction",
    approachLabelAr: "توجّهنا الإبداعي",
    approach:
      "We positioned FAROOJA as the grilled alternative to traditional fried chicken brands—a high-protein, post-workout-friendly concept with the energy and attitude of modern fast food. The identity was built around bold typography, expressive graphics, vibrant color, and a playful visual system that feels confident, youthful, and instantly recognizable. Every touchpoint, from the bucket to the menu, was designed to make healthier eating feel exciting rather than compromising.",
    approachAr:
      "موّضعنا فروجى كبديل مشوي للعلامات التقليدية للدجاج المقلي — مفهوم غني بالبروتين ومناسب بعد التمرين بطاقة وموقف الأكل السريع العصري. الهوية اتبنت على تايبوغرافيا جريئة، جرافيك معبّر، ألوان حيوية، ونظام بصري مرح يحسّ بالثقة والشباب ويتعرّف عليه فورًا. كل نقطة تواصل، من الباكيت للمنيو، صُمّمت عشان الأكل الأصح يحسّ مثير مش تنازل.",
    showcaseLayout: "combined",
    galleryLabel: "Brand Experience",
    galleryLabelAr: "تجربة العلامة",
    experience: [
      {
        title: "Brand Identity",
        titleAr: "هوية العلامة",
        items:
          "Positioning • Naming • Logo System • Typography • Color Palette",
        itemsAr: "التموضع • التسمية • نظام الشعار • الخط • لوحة الألوان",
      },
      {
        title: "Packaging System",
        titleAr: "نظام التغليف",
        items: "Chicken Buckets • Meal Boxes • Bags • Wrapping • Stickers",
        itemsAr: "باكيت الدجاج • علب الوجبات • الأكياس • التغليف • الملصقات",
      },
      {
        title: "Menu Experience",
        titleAr: "تجربة المنيو",
        items:
          "Menu Architecture • Product Naming • Menu Design • Nutritional Communication",
        itemsAr:
          "هيكلة المنيو • تسمية المنتجات • تصميم المنيو • التواصل الغذائي",
      },
      {
        title: "Social Art Direction",
        titleAr: "الإخراج الفني للسوشيال",
        items:
          "Campaign Visuals • Product Storytelling • Lifestyle Content • Digital Brand Assets",
        itemsAr:
          "مرئيات الحملات • سرد المنتج • محتوى لايف ستايل • أصول العلامة الرقمية",
      },
    ],
    outcome:
      "FAROOJA launched with a clear and differentiated position in the chicken category: the excitement of a fast-food bucket, reimagined around grilled chicken and high-protein meals. The brand system created a strong foundation across packaging, menus, and digital communication, helping FAROOJA stand apart from traditional fried chicken concepts and connect with a younger, health-conscious audience without losing the fun and indulgence people expect from fast food.",
    outcomeAr:
      "فروجى انطلقت بموقع واضح ومميز في فئة الدجاج: إثارة باكيت الأكل السريع، معاد تخيّلها حول الدجاج المشوي ووجبات غنية بالبروتين. نظام العلامة بنى أساسًا قويًا عبر التغليف والمنيو والتواصل الرقمي، وساعد فروجى تتميّز عن مفاهيم الدجاج المقلي التقليدية وتتواصل مع جمهور أصغر ومهتم بالصحة من غير ما تفقد المرح والمتعة اللي الناس بتتوقعها من الأكل السريع.",
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
    scopeAr: [
      "استراتيجية العلامة",
      "تموضع العلامة",
      "التسمية",
      "نظام الهوية البصرية",
      "تصميم الشعار",
      "لغة الجرافيك",
      "تصميم التغليف",
      "هندسة المنيو",
      "تصميم المنيو",
      "دليل العلامة",
      "الإخراج الفني للسوشيال ميديا",
      "نقاط تواصل تجربة العميل",
    ],
  },
  {
    en: "Knorr",
    ar: "كنور",
    sector: "FMCG - Food & Beverage",
    sectorAr: "سلع استهلاكية — أغذية ومشروبات",
    services:
      "Social Media Strategy • Creative Direction • Digital Campaigns • Performance Marketing • Website Design & Development • UI/UX Design",
    servicesAr:
      "استراتيجية السوشيال ميديا • الإخراج الإبداعي • الحملات الرقمية • تسويق الأداء • تصميم وتطوير الموقع • تصميم UI/UX",
    logo: "/logos/Knorr.png",
    images: [
      "/photography3.png",
      "/photography1.png",
      "/CGI.png",
      "/Packaging-design.png",
    ],
    year: "2025",
    subtitle: "Making Everyday Cooking Worth Watching.",
    subtitleAr: "نجعل الطبخ اليومي يستحق المشاهدة.",
    overview:
      "We transformed KNORR's digital presence by turning recipe content into entertaining food experiences—supported by integrated social media campaigns, digital amplification, and an AI-powered recipe platform.",
    overviewAr:
      "حوّلنا حضور كنور الرقمي بتحويل محتوى الوصفات إلى تجارب طعام مسلية — مدعومة بحملات سوشيال ميديا متكاملة، تضخيم رقمي، ومنصة وصفات مدعومة بالذكاء الاصطناعي.",
    challengeLabel: "The Opportunity",
    challengeLabelAr: "الفرصة",
    challenge:
      "Traditional recipe content had become predictable. Most cooking posts focused on instructions rather than inspiration, making it difficult to capture attention in increasingly competitive social feeds. KNORR needed a content ecosystem that entertained first, educated second, and inspired consumers to cook with confidence.",
    challengeAr:
      "محتوى الوصفات التقليدي بقى متوقع. معظم منشورات الطبخ ركّزت على التعليمات مش الإلهام، وده صعّب جذب الانتباه في فيدات سوشيال أكثر تنافسية. كنور محتاجة نظام محتوى يسلّي أولًا، يعلّم ثانيًا، ويُلهم المستهلكين يطبخوا بثقة.",
    approachLabel: "Our Creative Direction",
    approachLabelAr: "توجّهنا الإبداعي",
    approach:
      "We shifted KNORR's communication from recipe demonstrations to food storytelling. Every piece of content was designed to be visually engaging, platform-native, and optimized for social sharing—combining cinematic food visuals, creator-led content, trend-driven formats, and performance marketing to maximize reach and engagement.",
    approachAr:
      "حوّلنا تواصل كنور من عروض وصفات إلى سرد قصص طعام. كل قطعة محتوى صُمّمت تكون جذابة بصريًا، أصيلة للمنصة، ومحسّنة للمشاركة — بدمج مرئيات طعام سينمائية، محتوى يقوده صنّاع محتوى، صيغ ترندية، وتسويق أداء لتعظيم الوصول والتفاعل.",
    showcaseLayout: "combined",
    galleryLabel: "Digital Experience",
    galleryLabelAr: "التجربة الرقمية",
    experience: [
      {
        title: "Social Media",
        titleAr: "السوشيال ميديا",
        items:
          "Content Strategy • Creative Direction • Food Photography • Short-form Video • Motion Graphics",
        itemsAr:
          "استراتيجية المحتوى • الإخراج الإبداعي • تصوير الطعام • فيديو قصير • موشن جرافيك",
      },
      {
        title: "KNORR 7alet-ha",
        titleAr: "كنور حلّتها",
        items:
          "Digital Campaign • Social Amplification • Influencer Content • Community Engagement",
        itemsAr:
          "حملة رقمية • تضخيم سوشيال • محتوى مؤثرين • تفاعل المجتمع",
      },
      {
        title: "Smart Recipe Platform",
        titleAr: "منصة الوصفات الذكية",
        items:
          "Website UI/UX • Web Development • AI Recipe Experience • Ingredient-Based Recipe Generator • Responsive Design",
        itemsAr:
          "UI/UX للموقع • تطوير الويب • تجربة وصفات AI • مولّد وصفات حسب المكوّنات • تصميم متجاوب",
      },
    ],
    outcome:
      "KNORR evolved beyond traditional recipe marketing into a content-driven digital ecosystem. Through engaging social storytelling, the KNORR 7alet-ha campaign, and an AI-powered recipe platform that recommends meals based on ingredients users already have at home, we created a seamless brand experience that inspired everyday cooking, increased engagement, and strengthened KNORR's connection with modern home cooks.",
    outcomeAr:
      "كنور تطوّرت من تسويق وصفات تقليدي إلى نظام رقمي قائم على المحتوى. عبر سرد سوشيال جذاب، حملة كنور حلّتها، ومنصة وصفات مدعومة بالذكاء الاصطناعي بتقترح وجبات من المكوّنات الموجودة في البيت، خلقنا تجربة علامة سلسة ألهمت الطبخ اليومي، زادت التفاعل، وعزّزت علاقة كنور مع طبّاخي البيت العصريين.",
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
    scopeAr: [
      "استراتيجية السوشيال ميديا",
      "استراتيجية المحتوى",
      "الإخراج الإبداعي",
      "التصوير والفيديو",
      "موشن جرافيك",
      "تطوير الحملات",
      "تسويق الأداء",
      "التضخيم الرقمي",
      "استراتيجية الموقع",
      "تصميم UI/UX",
      "تطوير الموقع",
      "تجربة الوصفات بالذكاء الاصطناعي",
    ],
  },
  {
    en: "Kufta",
    ar: "كفتة",
    sector: "F&B / Casual Dining",
    sectorAr: "أغذية ومشروبات / أكل كاجوال",
    services:
      "Campaign Strategy • Creative Concept • Packaging Design • Customer Experience Design",
    servicesAr:
      "استراتيجية الحملة • المفهوم الإبداعي • تصميم التغليف • تصميم تجربة العميل",
    logo: "/logos/Kufta.png",
    images: [
      "/Packaging-design.png",
      "/photography1.png",
      "/photography3.png",
      "/CGI.png",
    ],
    year: "2025",
    subtitle: "Turning Every Meal into a Winning Experience.",
    subtitleAr: "تحويل كل وجبة إلى تجربة فوز.",
    overview:
      "Ramadan is one of the most competitive marketing seasons, with brands competing through discounts and price wars. Rather than joining the race to the lowest price, KUFTA created an experience. Open the Chips & Win transformed every meal into a moment of anticipation, reviving the nostalgia of discovering hidden prizes while introducing a new generation to the excitement of Kharbesh w Eksab. The campaign proved that memorable experiences create stronger brand connections than temporary discounts.",
    overviewAr:
      "رمضان من أكثر مواسم التسويق تنافسًا، والعلامات بتتنافس بالخصومات وحروب الأسعار. بدل ما تنضم لسباق أقل سعر، كفتة خلقت تجربة. افتح الشيبس واكسب حوّلت كل وجبة للحظة ترقّب، وأحيت حنين اكتشاف الجوائز المخفية وعرّفت جيل جديد على إثارة خربش واكسب. الحملة أثبتت إن التجارب اللي بتتذكّر بتبني علاقة أقوى مع العلامة من الخصومات المؤقتة.",
    challenge:
      "In a market dominated by price-driven promotions, KUFTA wanted to reward engagement instead of discount-seeking behavior. The challenge was to increase traffic, encourage repeat visits, and generate excitement while preserving the brand's premium positioning and strengthening long-term customer loyalty.",
    challengeAr:
      "في سوق مسيطر عليه عروض الأسعار، كفتة حبت تكافئ التفاعل بدل سلوك البحث عن الخصم. التحدّي كان زيادة الزيارات، تشجيع التكرار، وخلق حماس مع الحفاظ على التموضع الفاخر للعلامة وتعزيز ولاء العملاء على المدى الطويل.",
    approach:
      "Every qualifying order included a branded bag of chips containing a hidden prize. Customers only discovered their reward after opening the pack, transforming a simple side item into the centerpiece of the campaign. Inspired by the nostalgia of childhood snack promotions, the experience brought back the excitement of Kharbesh w Eksab for older audiences while introducing it to Gen Z. The mechanics were intentionally simple, allowing anticipation, surprise, and sharing to become the campaign itself. Rather than buying attention with discounts, KUFTA earned it through an experience customers genuinely wanted to talk about.",
    approachAr:
      "كل طلب مؤهل تضمّن كيس شيبس بعلامة كفتة فيه جائزة مخفية. العملاء اكتشفوا مكافأتهم بعد فتح الكيس، وحوّلوا جانب بسيط لمركز الحملة. مستوحين من حنين عروض الوجبات الخفيفة في الطفولة، التجربة رجّعت إثارة خربش واكسب للجمهور الأكبر وعرّفتها لجيل Z. الآلية كانت بسيطة عمدًا، عشان الترقّب والمفاجأة والمشاركة تبقى الحملة نفسها. بدل ما تشتري الانتباه بالخصومات، كفتة كسبته بتجربة العملاء فعلًا حابين يتكلموا عنها.",
    showcaseLayout: "combined",
    galleryLabel: "Campaign Experience",
    galleryLabelAr: "تجربة الحملة",
    experience: [
      { title: "Campaign Identity", titleAr: "هوية الحملة" },
      { title: "Packaging Experience", titleAr: "تجربة التغليف" },
      { title: "Customer Experience", titleAr: "تجربة العميل" },
      { title: "Social Campaign", titleAr: "حملة السوشيال" },
    ],
    outcome:
      "Rather than competing through discounts, KUFTA created a campaign customers genuinely wanted to experience. Every purchase became a moment of anticipation, strengthening engagement while protecting the brand's premium positioning. By transforming nostalgia into a modern brand experience, the campaign demonstrated that meaningful interactions create stronger loyalty than temporary price reductions. Because memorable brands aren't built through discounts—they're built through experiences people remember.",
    outcomeAr:
      "بدل التنافس بالخصومات، كفتة خلقت حملة العملاء فعلًا حابين يعيشوها. كل عملية شراء بقت لحظة ترقّب، عزّزت التفاعل وحافظت على التموضع الفاخر للعلامة. بتحويل الحنين لتجربة علامة عصرية، الحملة أثبتت إن التفاعلات اللي ليها معنى بتبني ولاء أقوى من تخفيضات الأسعار المؤقتة. لأن العلامات اللي بتتذكّر ما بتتبنى بالخصومات — بتتبنى بتجارب الناس بتحفظها.",
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
    scopeAr: [
      "استراتيجية الحملة",
      "تطوير المفهوم الإبداعي",
      "هوية الحملة",
      "تصميم التغليف",
      "آلية الجوائز",
      "تصميم تجربة العميل",
      "حملة السوشيال ميديا",
      "الإخراج الفني",
      "إبداع الإطلاق",
      "تنفيذ الحملة داخل الفروع",
    ],
  },
];

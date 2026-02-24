import type { Product } from "../types";

export const products: Product[] = [
  // ── BRIDAL '25 ──
  {
    id: "brd-001",
    slug: "royal-zardozi-lehenga",
    name: "Royal Zardozi Lehenga",
    nameUr: "شاہی زردوزی لہنگا",
    description:
      "A masterpiece of regal proportions. This lehenga features hand-embroidered zardozi and dabka work across the entire silhouette, with real gold threads creating intricate floral jaal patterns. The heavy flared skirt is paired with a fitted choli and a hand-embroidered dupatta that could be an heirloom in its own right.",
    descriptionUr:
      "شاہی عظمت کا شاہکار۔ اس لہنگے میں پورے ڈیزائن پر ہاتھ سے کڑھائی کردہ زردوزی اور ڈبکا کا کام ہے، اصلی سونے کے دھاگوں سے نفیس پھولوں کے جال بنائے گئے ہیں۔",
    price: 485000,
    currency: "PKR",
    images: [
      { url: "", alt: "Royal Zardozi Lehenga front", gradient: "linear-gradient(135deg, #8B1A1A30, #D4A57450)" },
      { url: "", alt: "Royal Zardozi Lehenga detail", gradient: "linear-gradient(135deg, #8B1A1A40, #D4A57430)" },
      { url: "", alt: "Royal Zardozi Lehenga back", gradient: "linear-gradient(135deg, #D4A57420, #8B1A1A50)" },
    ],
    collectionId: "bridal-25",
    occasion: "barat",
    embroideryIntensity: "bridal",
    embroideryType: "Zardozi + Dabka + Tilla",
    fabric: "Pure Organza on Silk",
    fabricWeight: "heavy",
    fit: "semi-fitted",
    swatches: [
      { name: "Royal Red", nameUr: "شاہی سرخ", hex: "#8B1A1A", available: true },
      { name: "Maroon", nameUr: "مرون", hex: "#6B1010", available: true },
      { name: "Champagne Gold", nameUr: "شیمپین گولڈ", hex: "#D4A574", available: false },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "40\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "41\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "42\"", inStock: true },
      { label: "Custom", chest: "Custom", waist: "Custom", length: "Custom", inStock: true },
    ],
    tags: ["bestseller", "hand-embroidered", "bridal", "zardozi"],
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    craftHours: 380,
    completeTheLook: ["brd-002", "brd-003"],
  },
  {
    id: "brd-002",
    slug: "ivory-nikah-ensemble",
    name: "Ivory Nikah Ensemble",
    nameUr: "آئیوری نکاح لباس",
    description:
      "Elegance distilled. A flowing ivory ensemble with delicate aari and mirror work, perfect for the nikah ceremony. The understated embroidery on pure silk velvet creates a luminous effect under soft lighting. Comes with a hand-finished dupatta with scalloped borders.",
    descriptionUr:
      "خوبصورتی کا نچوڑ۔ نازک عاری اور آئینہ کاری کے ساتھ بہتا آئیوری لباس، نکاح کی تقریب کے لیے بہترین۔",
    price: 385000,
    currency: "PKR",
    images: [
      { url: "", alt: "Ivory Nikah Ensemble", gradient: "linear-gradient(135deg, #F5EDE430, #D4A57440)" },
    ],
    collectionId: "bridal-25",
    occasion: "barat",
    embroideryIntensity: "heavy",
    embroideryType: "Aari + Mirror Work",
    fabric: "Pure Silk Velvet",
    fabricWeight: "heavy",
    fit: "fitted",
    swatches: [
      { name: "Ivory", nameUr: "آئیوری", hex: "#FAF7F2", available: true },
      { name: "Blush Pink", nameUr: "ہلکا گلابی", hex: "#E8C0C0", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "42\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "43\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "44\"", inStock: false },
      { label: "Custom", chest: "Custom", waist: "Custom", length: "Custom", inStock: true },
    ],
    tags: ["nikah", "hand-embroidered", "velvet", "aari"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: false,
    craftHours: 320,
    completeTheLook: ["brd-001", "brd-003"],
  },
  {
    id: "brd-003",
    slug: "crimson-bridal-gharara",
    name: "Crimson Bridal Gharara",
    nameUr: "سرخ بریدل گھرارا",
    description:
      "A traditional gharara silhouette reinvented for the modern bride. The wide-leg gharara flares dramatically, embellished with heavy tilla and gota work. The short kurti features a sweetheart neckline and cape sleeves. A statement dupatta with four-sided embroidery completes the look.",
    descriptionUr:
      "جدید دلہن کے لیے روایتی گھرارا ڈیزائن۔ چوڑی ٹانگ والا گھرارا بھاری تلے اور گوٹا کے کام سے سجا ہوا ہے۔",
    price: 425000,
    currency: "PKR",
    images: [
      { url: "", alt: "Crimson Bridal Gharara", gradient: "linear-gradient(135deg, #A8222230, #D4A57440)" },
    ],
    collectionId: "bridal-25",
    occasion: "barat",
    embroideryIntensity: "bridal",
    embroideryType: "Tilla + Gota + Sequin",
    fabric: "Jamawar Silk",
    fabricWeight: "heavy",
    fit: "semi-fitted",
    trouserCut: "gharara",
    swatches: [
      { name: "Crimson", nameUr: "سرخ", hex: "#A82222", available: true },
      { name: "Burnt Orange", nameUr: "جلی نارنجی", hex: "#CC6633", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "38\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "39\"", inStock: true },
      { label: "Custom", chest: "Custom", waist: "Custom", length: "Custom", inStock: true },
    ],
    tags: ["gharara", "bridal", "tilla", "gota"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: true,
    craftHours: 350,
    completeTheLook: ["brd-001", "brd-002"],
  },

  // ── EID FESTIVE ──
  {
    id: "eid-001",
    slug: "emerald-festive-suit",
    name: "Emerald Festive Suit",
    nameUr: "زمرد فیسٹیو سوٹ",
    description:
      "Rich emerald green raw silk with tilla and sequin spray embroidery. The A-line kurta features a mandarin collar and side slits, paired with straight trousers and a chiffon dupatta with hand-sprayed sequin borders. Perfect for Eid prayers and family gatherings.",
    descriptionUr:
      "بھرپور زمرد سبز کچے ریشم پر تلے اور سیکوئن کی چھڑکاؤ کڑھائی۔ اے لائن کرتا میں مینڈرن کالر اور سائیڈ سلٹس ہیں۔",
    price: 68000,
    currency: "PKR",
    images: [
      { url: "", alt: "Emerald Festive Suit", gradient: "linear-gradient(135deg, #1A3C5E30, #7EB8DA40)" },
    ],
    collectionId: "eid-festive",
    occasion: "eid",
    embroideryIntensity: "moderate",
    embroideryType: "Tilla + Sequin Spray",
    fabric: "Raw Silk",
    fabricWeight: "medium",
    fit: "semi-fitted",
    trouserCut: "straight",
    swatches: [
      { name: "Emerald", nameUr: "زمرد", hex: "#1A5C3E", available: true },
      { name: "Sapphire", nameUr: "نیلم", hex: "#1A3C5E", available: true },
      { name: "Ruby", nameUr: "یاقوت", hex: "#8B1A2A", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "38\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "39\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "40\"", inStock: true },
      { label: "XL", chest: "40\"", waist: "34\"", length: "41\"", inStock: true },
    ],
    tags: ["eid", "festive", "tilla", "raw-silk"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: false,
    craftHours: 60,
    completeTheLook: ["eid-002"],
  },
  {
    id: "eid-002",
    slug: "sapphire-angarkha",
    name: "Sapphire Angarkha",
    nameUr: "نیلم انگرکھا",
    description:
      "A modern take on the classic angarkha silhouette. Deep sapphire blue organza with delicate gota kinari detailing along the wrap-over front and cuffs. The flared cut creates beautiful movement. Paired with raw silk trousers and a net dupatta.",
    descriptionUr:
      "کلاسیکی انگرکھا کی جدید تشریح۔ گہرا نیلم نیلا آرگینزا نازک گوٹا کناری کی تفصیلات کے ساتھ۔",
    price: 85000,
    currency: "PKR",
    images: [
      { url: "", alt: "Sapphire Angarkha", gradient: "linear-gradient(135deg, #1A3C5E40, #7EB8DA30)" },
    ],
    collectionId: "eid-festive",
    occasion: "eid",
    embroideryIntensity: "moderate",
    embroideryType: "Gota Kinari",
    fabric: "Organza",
    fabricWeight: "light",
    fit: "loose",
    swatches: [
      { name: "Sapphire", nameUr: "نیلم", hex: "#1A3C5E", available: true },
      { name: "Teal", nameUr: "ٹیل", hex: "#1A5E5E", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "40\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "41\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "42\"", inStock: true },
    ],
    tags: ["angarkha", "gota-kinari", "organza", "festive"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: false,
    craftHours: 45,
    completeTheLook: ["eid-001"],
  },

  // ── MEHNDI NIGHTS ──
  {
    id: "meh-001",
    slug: "phulkari-gharara-set",
    name: "Phulkari Gharara Set",
    nameUr: "پھلکاری گھرارا سیٹ",
    description:
      "Traditional Punjabi phulkari meets modern gharara glamour. The vibrant hand-embroidered phulkari work covers the short kurti in a riot of colors, while the gharara flares in contrasting chartreuse green. A showstopper for the mehndi dance floor.",
    descriptionUr:
      "روایتی پنجابی پھلکاری جدید گھرارا کے ساتھ۔ رنگ برنگی ہاتھ کی کڑھائی مختصر کرتی کو سجاتی ہے جبکہ گھرارا چمکدار سبز رنگ میں پھیلتا ہے۔",
    price: 125000,
    currency: "PKR",
    images: [
      { url: "", alt: "Phulkari Gharara Set", gradient: "linear-gradient(135deg, #2D501630, #A8D08D40)" },
    ],
    collectionId: "mehndi-nights",
    occasion: "mehndi",
    embroideryIntensity: "heavy",
    embroideryType: "Phulkari Hand Work",
    fabric: "Lawn on Chiffon",
    fabricWeight: "light",
    fit: "semi-fitted",
    trouserCut: "gharara",
    swatches: [
      { name: "Mehndi Green", nameUr: "مہندی سبز", hex: "#4A7A1A", available: true },
      { name: "Mustard", nameUr: "سرسوں", hex: "#C4A012", available: true },
      { name: "Hot Pink", nameUr: "گلابی", hex: "#D4226A", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "30\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "31\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "32\"", inStock: true },
    ],
    tags: ["mehndi", "phulkari", "gharara", "dance-floor"],
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    craftHours: 90,
    completeTheLook: ["meh-002"],
  },
  {
    id: "meh-002",
    slug: "mirror-work-sharara",
    name: "Mirror Work Sharara",
    nameUr: "آئینہ کاری شرارا",
    description:
      "Catch the light from every angle. This sharara set features hand-applied mirror work (shisha) on a vibrant yellow base, creating a dazzling disco-ball effect under mehndi night lights. The sharara gives a vintage Lucknowi vibe updated for today.",
    descriptionUr:
      "ہر زاویے سے روشنی پکڑیں۔ اس شرارا سیٹ میں چمکدار پیلی بنیاد پر ہاتھ سے لگائے گئے آئینے ہیں۔",
    price: 95000,
    currency: "PKR",
    images: [
      { url: "", alt: "Mirror Work Sharara", gradient: "linear-gradient(135deg, #8B691430, #F2D98B40)" },
    ],
    collectionId: "mehndi-nights",
    occasion: "mehndi",
    embroideryIntensity: "heavy",
    embroideryType: "Mirror (Shisha) Work",
    fabric: "Cotton Silk",
    fabricWeight: "medium",
    fit: "loose",
    trouserCut: "sharara",
    swatches: [
      { name: "Sunflower", nameUr: "سورج مکھی", hex: "#E8B812", available: true },
      { name: "Coral", nameUr: "مرجان", hex: "#D46A4A", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "32\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "33\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "34\"", inStock: true },
    ],
    tags: ["mehndi", "mirror-work", "sharara", "vintage"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: true,
    craftHours: 75,
    completeTheLook: ["meh-001"],
  },

  // ── WALIMA GRACE ──
  {
    id: "wal-001",
    slug: "lilac-walima-ensemble",
    name: "Lilac Walima Ensemble",
    nameUr: "نیلگوں ولیمہ لباس",
    description:
      "Ethereal lilac net over tissue base with delicate kora and pearl work scattered across the bodice and dupatta borders. The straight-cut silhouette keeps it elegant and unfussy, letting the embroidery speak. Perfect for the bride who wants to look effortlessly graceful.",
    descriptionUr:
      "ہوائی نیلگوں نیٹ ٹشو کی بنیاد پر نازک کورا اور موتیوں کا کام۔ سیدھا ڈیزائن اسے خوبصورت اور سادہ رکھتا ہے۔",
    price: 245000,
    currency: "PKR",
    images: [
      { url: "", alt: "Lilac Walima Ensemble", gradient: "linear-gradient(135deg, #5C1A8E30, #C9A0DC40)" },
    ],
    collectionId: "walima-grace",
    occasion: "walima",
    embroideryIntensity: "moderate",
    embroideryType: "Kora + Pearl Work",
    fabric: "Net on Tissue",
    fabricWeight: "light",
    fit: "semi-fitted",
    trouserCut: "straight",
    swatches: [
      { name: "Lilac", nameUr: "نیلگوں", hex: "#B08AD4", available: true },
      { name: "Powder Blue", nameUr: "ہلکا نیلا", hex: "#A0C0D4", available: true },
      { name: "Blush", nameUr: "بلش", hex: "#D4A0B0", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "42\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "43\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "44\"", inStock: true },
      { label: "Custom", chest: "Custom", waist: "Custom", length: "Custom", inStock: true },
    ],
    tags: ["walima", "pastel", "kora", "pearls"],
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    craftHours: 180,
    completeTheLook: ["wal-002"],
  },
  {
    id: "wal-002",
    slug: "rose-petal-anarkali",
    name: "Rose Petal Anarkali",
    nameUr: "گلاب پنکھڑی انارکلی",
    description:
      "A sweeping anarkali in the softest blush pink with delicate thread work flowers cascading from the bodice. The full flared skirt creates dramatic movement, while the fitted bodice keeps the silhouette refined. Organza dupatta with hand-rolled edges.",
    descriptionUr:
      "ہلکے گلابی رنگ میں بہتا انارکلی نازک دھاگے کے پھولوں کے ساتھ۔ پھیلا ہوا دامن خوبصورت حرکت پیدا کرتا ہے۔",
    price: 195000,
    currency: "PKR",
    images: [
      { url: "", alt: "Rose Petal Anarkali", gradient: "linear-gradient(135deg, #D4A0B030, #C9A0DC30)" },
    ],
    collectionId: "walima-grace",
    occasion: "walima",
    embroideryIntensity: "moderate",
    embroideryType: "Thread Work Florals",
    fabric: "Organza on Silk",
    fabricWeight: "medium",
    fit: "fitted",
    swatches: [
      { name: "Blush Pink", nameUr: "ہلکا گلابی", hex: "#E8C0C0", available: true },
      { name: "Ivory", nameUr: "آئیوری", hex: "#FAF7F2", available: true },
    ],
    sizes: [
      { label: "S", chest: "34\"", waist: "28\"", length: "52\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "53\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "54\"", inStock: true },
    ],
    tags: ["anarkali", "walima", "thread-work", "floral"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: false,
    craftHours: 150,
    completeTheLook: ["wal-001"],
  },

  // ── PRÊT ESSENTIALS ──
  {
    id: "prt-001",
    slug: "noir-pret-kurta",
    name: "Noir Prêt Kurta",
    nameUr: "نوائر پریٹ کرتا",
    description:
      "Effortless black. A beautifully cut A-line kurta in premium cotton-silk blend with minimal thread embroidery on the neckline and cuffs. The kind of piece you reach for every week — versatile, comfortable, and quietly luxurious. Pairs with jeans, trousers, or a shalwar.",
    descriptionUr:
      "بے ساختہ سیاہ۔ پریمیم کاٹن سلک میں خوبصورت اے لائن کرتا، نیک لائن اور کفوں پر کم سے کم دھاگے کی کڑھائی۔",
    price: 18500,
    currency: "PKR",
    images: [
      { url: "", alt: "Noir Prêt Kurta", gradient: "linear-gradient(135deg, #2A242030, #5C544C40)" },
    ],
    collectionId: "pret-essentials",
    occasion: "pret",
    embroideryIntensity: "minimal",
    embroideryType: "Minimal Thread",
    fabric: "Cotton Silk Blend",
    fabricWeight: "medium",
    fit: "semi-fitted",
    swatches: [
      { name: "Black", nameUr: "سیاہ", hex: "#1A1A1A", available: true },
      { name: "Navy", nameUr: "نیوی", hex: "#1A2A3E", available: true },
      { name: "Olive", nameUr: "زیتونی", hex: "#4A5A3A", available: true },
      { name: "Rust", nameUr: "زنگ", hex: "#8B4A2A", available: true },
    ],
    sizes: [
      { label: "XS", chest: "32\"", waist: "26\"", length: "36\"", inStock: true },
      { label: "S", chest: "34\"", waist: "28\"", length: "37\"", inStock: true },
      { label: "M", chest: "36\"", waist: "30\"", length: "38\"", inStock: true },
      { label: "L", chest: "38\"", waist: "32\"", length: "39\"", inStock: true },
      { label: "XL", chest: "40\"", waist: "34\"", length: "40\"", inStock: true },
    ],
    tags: ["everyday", "minimal", "cotton-silk", "versatile"],
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    craftHours: 8,
    completeTheLook: ["prt-002"],
  },
  {
    id: "prt-002",
    slug: "linen-tunic-kaftan",
    name: "Linen Tunic Kaftan",
    nameUr: "لینن ٹیونک کفتان",
    description:
      "Relaxed luxury. A breezy kaftan-style tunic in premium linen with hand-done French knot detailing on the yoke. Oversized yet flattering, it drapes beautifully and breathes in summer heat. Available in earth tones that pair with everything.",
    descriptionUr:
      "آرام دہ عیش و آرام۔ پریمیم لینن میں ہوادار کفتان طرز کا ٹیونک فرنچ ناٹ کی تفصیلات کے ساتھ۔",
    price: 14500,
    currency: "PKR",
    images: [
      { url: "", alt: "Linen Tunic Kaftan", gradient: "linear-gradient(135deg, #B8ADA230, #D4CBC040)" },
    ],
    collectionId: "pret-essentials",
    occasion: "pret",
    embroideryIntensity: "minimal",
    embroideryType: "French Knots",
    fabric: "Premium Linen",
    fabricWeight: "light",
    fit: "loose",
    swatches: [
      { name: "Sand", nameUr: "ریت", hex: "#D4CBC0", available: true },
      { name: "Sage", nameUr: "بابونہ", hex: "#A0B090", available: true },
      { name: "Terracotta", nameUr: "مٹی", hex: "#C08060", available: true },
    ],
    sizes: [
      { label: "S", chest: "36\"", waist: "Free", length: "34\"", inStock: true },
      { label: "M", chest: "38\"", waist: "Free", length: "35\"", inStock: true },
      { label: "L", chest: "40\"", waist: "Free", length: "36\"", inStock: true },
    ],
    tags: ["kaftan", "linen", "summer", "relaxed"],
    isNew: true,
    isBestseller: false,
    isLimitedEdition: false,
    craftHours: 6,
    completeTheLook: ["prt-001"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collectionId === collectionId);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.completeTheLook
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}

export function formatPrice(price: number): string {
  return `PKR ${price.toLocaleString("en-PK")}`;
}

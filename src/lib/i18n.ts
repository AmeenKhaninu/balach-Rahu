/**
 * Bilingual Content — English + Urdu
 *
 * Not just translation — culturally resonant copy
 * with native phrasing for the Urdu experience.
 */

import type { Language } from "./tokens";

const strings = {
  // Navigation
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.collections": { en: "Collections", ur: "کلیکشنز" },
  "nav.customize": { en: "Customize", ur: "اپنی مرضی سے بنائیں" },
  "nav.designStudio": { en: "Design Studio", ur: "ڈیزائن اسٹوڈیو" },
  "nav.myAccount": { en: "My Account", ur: "میرا اکاؤنٹ" },
  "nav.shop": { en: "Shop", ur: "شاپ" },
  "nav.wishlist": { en: "Wishlist", ur: "پسندیدہ" },

  // Theme
  "theme.pret": { en: "Pret", ur: "پریٹ" },
  "theme.bridal": { en: "Bridal", ur: "بریدل" },
  "theme.switchTo": { en: "Switch to", ur: "تبدیل کریں" },

  // Language
  "lang.english": { en: "English", ur: "انگلش" },
  "lang.urdu": { en: "اردو", ur: "اردو" },
  "lang.switchTo": { en: "اردو", ur: "English" },

  // Buttons
  "btn.explore": { en: "Explore Collection", ur: "کلیکشن دیکھیں" },
  "btn.customize": { en: "Start Customizing", ur: "کسٹمائز شروع کریں" },
  "btn.addToCart": { en: "Add to Cart", ur: "کارٹ میں شامل کریں" },
  "btn.getMeasured": {
    en: "Get Measured",
    ur: "ناپ لیں",
  },
  "btn.viewDetails": { en: "View Details", ur: "تفصیلات دیکھیں" },
  "btn.save": { en: "Save", ur: "محفوظ کریں" },
  "btn.cancel": { en: "Cancel", ur: "منسوخ" },
  "btn.submit": { en: "Submit", ur: "جمع کرائیں" },

  // Occasions
  "occasion.mehndi": { en: "Mehndi", ur: "مہندی" },
  "occasion.barat": { en: "Barat", ur: "بارات" },
  "occasion.walima": { en: "Walima", ur: "ولیمہ" },
  "occasion.eid": { en: "Eid", ur: "عید" },
  "occasion.pret": { en: "Prêt-à-Porter", ur: "پریٹ" },

  // Design System Showcase
  "ds.title": {
    en: "Brand Design System",
    ur: "برانڈ ڈیزائن سسٹم",
  },
  "ds.subtitle": {
    en: "The visual language of Balach Rahu",
    ur: "بلاچ راہو کی بصری زبان",
  },
  "ds.colors": { en: "Color Palette", ur: "رنگ پیلیٹ" },
  "ds.typography": { en: "Typography", ur: "ٹائپوگرافی" },
  "ds.components": { en: "Components", ur: "اجزاء" },
  "ds.occasions": { en: "Occasion Themes", ur: "موقع کے رنگ" },

  // Headlines
  "hero.title": {
    en: "Where Traditional Craftsmanship Meets Intelligent Technology",
    ur: "جہاں روایتی دستکاری جدید ٹیکنالوجی سے ملتی ہے",
  },
  "hero.subtitle": {
    en: "Every stitch tells a story. Every pixel serves the art.",
    ur: "ہر ٹانکا ایک کہانی سناتا ہے۔ ہر پکسل فن کی خدمت کرتا ہے۔",
  },

  // Sections
  "section.newArrivals": { en: "New Arrivals", ur: "نئی آمد" },
  "section.trending": { en: "Trending Now", ur: "ٹرینڈنگ" },
  "section.bridalCollection": { en: "Bridal Collection", ur: "بریدل کلیکشن" },
  "section.craftsmanship": {
    en: "The Art of Craftsmanship",
    ur: "دستکاری کا فن",
  },

  // Phase 3: Custom Tailoring Engine
  "nav.tailoring": { en: "Custom Tailoring", ur: "حسب منشا سلائی" },

  "tailor.title": {
    en: "Custom Tailoring Engine",
    ur: "حسب منشا سلائی انجن",
  },
  "tailor.subtitle": {
    en: "Precision-crafted to your measurements",
    ur: "آپ کے ناپ کے مطابق درستگی سے تیار",
  },

  // Measurement Studio
  "measure.title": { en: "AI Measurement Studio", ur: "اے آئی ناپ اسٹوڈیو" },
  "measure.subtitle": {
    en: "Get measured in 60 seconds using your camera",
    ur: "اپنے کیمرے سے 60 سیکنڈ میں ناپ لیں",
  },
  "measure.welcome": {
    en: "Stand in front of your camera for precise measurements",
    ur: "درست ناپ کے لیے کیمرے کے سامنے کھڑے ہوں",
  },
  "measure.frontCapture": {
    en: "Face the camera straight ahead",
    ur: "سیدھے کیمرے کی طرف دیکھیں",
  },
  "measure.sideCapture": {
    en: "Turn to your side",
    ur: "اپنی طرف مڑیں",
  },
  "measure.processing": {
    en: "Analyzing your measurements...",
    ur: "آپ کے ناپ کا تجزیہ ہو رہا ہے...",
  },
  "measure.results": {
    en: "Your Measurements",
    ur: "آپ کے ناپ",
  },
  "measure.manualEntry": {
    en: "Enter Measurements Manually",
    ur: "ناپ خود درج کریں",
  },
  "measure.retake": { en: "Retake", ur: "دوبارہ ناپیں" },
  "measure.saveProfile": { en: "Save Profile", ur: "پروفائل محفوظ کریں" },
  "measure.bust": { en: "Bust", ur: "سینہ" },
  "measure.waist": { en: "Waist", ur: "کمر" },
  "measure.hip": { en: "Hip", ur: "کولہا" },
  "measure.shoulder": { en: "Shoulder", ur: "کندھا" },
  "measure.armLength": { en: "Arm Length", ur: "بازو کی لمبائی" },
  "measure.kameezLength": { en: "Kameez Length", ur: "قمیض کی لمبائی" },
  "measure.trouserLength": { en: "Trouser Length", ur: "پتلون کی لمبائی" },
  "measure.trouserWaist": { en: "Trouser Waist", ur: "پتلون کی کمر" },
  "measure.inches": { en: "inches", ur: "انچ" },
  "measure.cm": { en: "cm", ur: "سینٹی میٹر" },

  // Profiles
  "profile.title": { en: "Measurement Profiles", ur: "ناپ کے پروفائلز" },
  "profile.subtitle": {
    en: "Save measurements for yourself and loved ones",
    ur: "اپنے اور پیاروں کے ناپ محفوظ کریں",
  },
  "profile.addNew": { en: "Add New Profile", ur: "نیا پروفائل شامل کریں" },
  "profile.mySizes": { en: "My Sizes", ur: "میرے ناپ" },
  "profile.bodyType": { en: "Body Type", ur: "جسمانی ساخت" },
  "profile.fitPreference": { en: "Fit Preference", ur: "فٹنگ کی ترجیح" },
  "profile.delete": { en: "Delete Profile", ur: "پروفائل حذف کریں" },
  "profile.edit": { en: "Edit Profile", ur: "پروفائل ترمیم کریں" },
  "profile.noProfiles": {
    en: "No profiles yet. Create your first one!",
    ur: "ابھی تک کوئی پروفائل نہیں۔ اپنا پہلا بنائیں!",
  },

  // Customization Configurator
  "custom.title": { en: "Design Your Outfit", ur: "اپنا لباس ڈیزائن کریں" },
  "custom.subtitle": {
    en: "Every detail, your way",
    ur: "ہر تفصیل، آپ کی مرضی",
  },
  "custom.neckline": { en: "Neckline", ur: "گلا" },
  "custom.sleeve": { en: "Sleeve Style", ur: "آستین" },
  "custom.trouser": { en: "Trouser Cut", ur: "شلوار/پتلون" },
  "custom.dupatta": { en: "Dupatta", ur: "دوپٹہ" },
  "custom.lining": { en: "Lining", ur: "استر" },
  "custom.preview": { en: "Live Preview", ur: "براہ راست جھلک" },
  "custom.summary": { en: "Your Customization", ur: "آپ کی ترتیب" },
  "custom.addToCart": { en: "Add Customized to Cart", ur: "کسٹمائز شدہ کارٹ میں شامل کریں" },

  // Neckline options
  "neckline.round": { en: "Round", ur: "گول" },
  "neckline.v-neck": { en: "V-Neck", ur: "وی نیک" },
  "neckline.boat": { en: "Boat Neck", ur: "بوٹ نیک" },
  "neckline.sweetheart": { en: "Sweetheart", ur: "سویٹ ہارٹ" },
  "neckline.collar": { en: "Collar", ur: "کالر" },
  "neckline.ban": { en: "Ban / Chinese", ur: "بین / چائنیز" },
  "neckline.square": { en: "Square", ur: "چوکور" },

  // Sleeve options
  "sleeve.full": { en: "Full Sleeve", ur: "پوری آستین" },
  "sleeve.three-quarter": { en: "Three-Quarter", ur: "تھری کوارٹر" },
  "sleeve.half": { en: "Half Sleeve", ur: "آدھی آستین" },
  "sleeve.bell": { en: "Bell Sleeve", ur: "بیل آستین" },
  "sleeve.cap": { en: "Cap Sleeve", ur: "کیپ آستین" },
  "sleeve.sleeveless": { en: "Sleeveless", ur: "بغیر آستین" },

  // Trouser options
  "trouser.straight": { en: "Straight", ur: "سیدھی" },
  "trouser.sharara": { en: "Sharara", ur: "شرارہ" },
  "trouser.gharara": { en: "Gharara", ur: "گھرارہ" },
  "trouser.tulip-shalwar": { en: "Tulip Shalwar", ur: "ٹیولپ شلوار" },
  "trouser.palazzo": { en: "Palazzo", ur: "پلازو" },
  "trouser.cigarette": { en: "Cigarette Pants", ur: "سگریٹ پینٹ" },

  // Dupatta options
  "dupatta.none": { en: "No Dupatta", ur: "بغیر دوپٹہ" },
  "dupatta.matching": { en: "Matching", ur: "مماثل" },
  "dupatta.contrast": { en: "Contrast", ur: "متضاد" },
  "dupatta.net": { en: "Net", ur: "نیٹ" },
  "dupatta.organza": { en: "Organza", ur: "آرگنزا" },

  // Lining options
  "lining.none": { en: "Unlined", ur: "بغیر استر" },
  "lining.silk": { en: "Silk Lining", ur: "ریشمی استر" },
  "lining.cotton": { en: "Cotton Lining", ur: "سوتی استر" },
  "lining.viscose": { en: "Viscose Lining", ur: "وسکوز استر" },

  // Body type options
  "body.slim": { en: "Slim", ur: "دبلا" },
  "body.athletic": { en: "Athletic", ur: "ایتھلیٹک" },
  "body.average": { en: "Average", ur: "اوسط" },
  "body.curvy": { en: "Curvy", ur: "خوبصورت" },
  "body.plus": { en: "Plus Size", ur: "پلس سائز" },

  // Fit preferences
  "fit.loose": { en: "Loose", ur: "ڈھیلا" },
  "fit.semi-fitted": { en: "Semi-Fitted", ur: "نیم فٹ" },
  "fit.fitted": { en: "Fitted", ur: "فٹ" },

  // Darzi Override Panel
  "darzi.title": { en: "Darzi Override", ur: "درزی اوور رائیڈ" },
  "darzi.subtitle": {
    en: "Have your tailor's numbers? Enter them directly",
    ur: "آپ کے درزی کے ناپ ہیں؟ براہ راست درج کریں",
  },
  "darzi.share": { en: "Share Measurements", ur: "ناپ شیئر کریں" },
  "darzi.shareVia": { en: "Share via", ur: "شیئر کریں بذریعہ" },
  "darzi.whatsapp": { en: "WhatsApp", ur: "واٹس ایپ" },
  "darzi.qrCode": { en: "QR Code", ur: "کیو آر کوڈ" },
  "darzi.copyLink": { en: "Copy Link", ur: "لنک کاپی کریں" },
  "darzi.shareCode": { en: "Share Code", ur: "شیئر کوڈ" },
  "darzi.expires": { en: "Expires in 7 days", ur: "7 دن میں ختم ہو جائے گا" },

  // Measurement Studio Steps
  "step.welcome": { en: "Welcome", ur: "خوش آمدید" },
  "step.cameraSetup": { en: "Camera Setup", ur: "کیمرہ سیٹ اپ" },
  "step.frontCapture": { en: "Front View", ur: "سامنے کا منظر" },
  "step.sideCapture": { en: "Side View", ur: "پہلو کا منظر" },
  "step.processing": { en: "Processing", ur: "پراسیسنگ" },
  "step.results": { en: "Results", ur: "نتائج" },
} as const;

type StringKey = keyof typeof strings;

export function t(key: StringKey, lang: Language): string {
  return strings[key]?.[lang] ?? key;
}

export { strings };
export type { StringKey };

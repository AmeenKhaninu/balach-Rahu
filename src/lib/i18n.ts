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
} as const;

type StringKey = keyof typeof strings;

export function t(key: StringKey, lang: Language): string {
  return strings[key]?.[lang] ?? key;
}

export { strings };
export type { StringKey };

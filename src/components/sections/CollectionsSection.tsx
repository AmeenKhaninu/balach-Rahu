"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { Label, SectionHeading, AccentText, Body } from "@/components/ui";
import { colors } from "@/lib/tokens";

const collections = [
  {
    id: "bridal-25",
    nameEn: "Bridal '25",
    nameUr: "بریدل ٢٥",
    descEn:
      "A symphony of silk and zardozi. Each piece takes 300+ hours of hand embroidery by master craftsmen in Lahore.",
    descUr:
      "ریشم اور زردوزی کا شاہکار۔ ہر لباس لاہور کے ماہر کاریگروں کی 300 گھنٹے سے زیادہ کی محنت کا نتیجہ۔",
    color: colors.occasion.barat,
    accent: "#E8A0A0",
    pieces: 24,
    season: "AW 2025",
    tag: "FLAGSHIP",
  },
  {
    id: "eid-festive",
    nameEn: "Eid Festive",
    nameUr: "عید فیسٹیو",
    descEn:
      "Celebrating the spirit of togetherness. Vibrant jewel tones, intricate gota kinari, and silhouettes that move with grace.",
    descUr:
      "اتحاد کے جذبے کا جشن۔ چمکدار رنگ، نفیس گوٹا کناری، اور خوبصورت ڈیزائن۔",
    color: colors.occasion.eid,
    accent: "#7EB8DA",
    pieces: 36,
    season: "SS 2025",
    tag: "NEW",
  },
  {
    id: "mehndi-nights",
    nameEn: "Mehndi Nights",
    nameUr: "مہندی نائٹس",
    descEn:
      "Where festivity meets fashion. Playful colors, mirror work, and contemporary cuts for the most joyous celebration.",
    descUr:
      "جہاں تہوار فیشن سے ملتا ہے۔ خوشگوار رنگ، آئینہ کاری، اور جدید ڈیزائن۔",
    color: colors.occasion.mehndi,
    accent: "#A8D08D",
    pieces: 18,
    season: "SS 2025",
    tag: "LIMITED",
  },
  {
    id: "walima-grace",
    nameEn: "Walima Grace",
    nameUr: "ولیمہ گریس",
    descEn:
      "Understated elegance for the reception. Soft pastels, delicate threadwork, and flowing silhouettes that whisper luxury.",
    descUr:
      "استقبالیہ کے لیے نفیس خوبصورتی۔ ہلکے رنگ، نازک دھاگے کا کام، اور خوبصورت ڈیزائن۔",
    color: colors.occasion.walima,
    accent: "#C9A0DC",
    pieces: 20,
    season: "AW 2025",
    tag: "EXCLUSIVE",
  },
];

function CollectionCard({
  collection,
  index,
  language,
}: {
  collection: (typeof collections)[0];
  index: number;
  language: "en" | "ur";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px] ${
        isEven ? "" : "lg:direction-rtl"
      }`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Image Side */}
      <motion.div
        className={`relative overflow-hidden ${isEven ? "" : "lg:order-2"}`}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div
          className="w-full h-full min-h-[400px] flex flex-col items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${collection.color}18, ${collection.color}50)`,
          }}
        >
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${collection.accent} 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Large decorative number */}
          <span
            className="font-display text-[200px] font-light leading-none select-none"
            style={{ color: `${collection.accent}15` }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Tag */}
          <div
            className="absolute top-6 left-6 px-3 py-1 rounded-full text-[9px] font-body uppercase tracking-[3px] font-medium"
            style={{
              background: `${collection.accent}20`,
              color: collection.accent,
              border: `1px solid ${collection.accent}40`,
            }}
          >
            {collection.tag}
          </div>

          {/* Piece count */}
          <div className="absolute bottom-6 right-6 text-right">
            <div
              className="font-mono text-[40px] font-light leading-none"
              style={{ color: `${collection.accent}60` }}
            >
              {collection.pieces}
            </div>
            <div
              className="font-body text-[9px] uppercase tracking-[2px] mt-1"
              style={{ color: `${collection.accent}80` }}
            >
              Pieces
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Side */}
      <div
        className={`flex flex-col justify-center p-10 lg:p-16 ${
          isEven ? "" : "lg:order-1"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: collection.accent }}
            />
            <Label style={{ color: collection.accent }}>
              {collection.season}
            </Label>
          </div>

          <h3 className="font-display text-[clamp(28px,4vw,48px)] font-light text-theme-primary leading-[1.15] mb-4">
            {language === "en" ? collection.nameEn : collection.nameUr}
          </h3>

          <Body className="max-w-[440px]">
            {language === "en" ? collection.descEn : collection.descUr}
          </Body>

          {/* Explore link */}
          <motion.div
            className="mt-8 inline-flex items-center gap-3 cursor-pointer group"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="font-body text-[11px] uppercase tracking-[2px] transition-colors duration-300"
              style={{ color: collection.accent }}
            >
              {language === "en" ? "Explore Collection" : "کلیکشن دیکھیں"}
            </span>
            <motion.span
              style={{ color: collection.accent }}
              className="text-lg"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CollectionsSection() {
  const { language } = useTheme();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="collections" className="py-24">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="max-w-[960px] mx-auto px-8 mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Label className="mb-4 block">
          {t("section.bridalCollection", language)}
        </Label>
        <SectionHeading>
          {language === "en" ? (
            <>
              Curated With <AccentText>Purpose</AccentText>
            </>
          ) : (
            <>
              <AccentText>مقصد</AccentText> کے ساتھ مرتب
            </>
          )}
        </SectionHeading>
        <Body className="mt-4 max-w-[560px] mx-auto">
          {language === "en"
            ? "Each collection tells a story. Not just products in a grid — but an editorial journey through fabric, color, and craft."
            : "ہر کلیکشن ایک کہانی سناتی ہے۔ صرف مصنوعات نہیں — کپڑے، رنگ اور فن کا ایک سفر۔"}
        </Body>
      </motion.div>

      {/* Collection Cards */}
      <div className="space-y-px">
        {collections.map((collection, i) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={i}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}

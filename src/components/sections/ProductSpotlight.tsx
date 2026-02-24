"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useMousePosition } from "@/hooks/useAnimations";
import { Badge, Button, Label, MonoText, SectionHeading, Body, AccentText } from "@/components/ui";
import { t } from "@/lib/i18n";
import { colors } from "@/lib/tokens";
import type { OccasionType } from "@/lib/tokens";

interface Product {
  name: string;
  nameUr: string;
  price: string;
  occasion: OccasionType;
  color: string;
  accent: string;
  embroidery: string;
  fabric: string;
}

const products: Product[] = [
  {
    name: "Royal Zardozi Lehenga",
    nameUr: "شاہی زردوزی لہنگا",
    price: "PKR 485,000",
    occasion: "barat",
    color: colors.occasion.barat,
    accent: "#E8A0A0",
    embroidery: "Heavy Zardozi + Dabka",
    fabric: "Pure Organza on Silk",
  },
  {
    name: "Emerald Festive Suit",
    nameUr: "زمرد فیسٹیو سوٹ",
    price: "PKR 68,000",
    occasion: "eid",
    color: colors.occasion.eid,
    accent: "#7EB8DA",
    embroidery: "Tilla + Sequin Spray",
    fabric: "Raw Silk",
  },
  {
    name: "Phulkari Gharara Set",
    nameUr: "پھلکاری گھرارا سیٹ",
    price: "PKR 125,000",
    occasion: "mehndi",
    color: colors.occasion.mehndi,
    accent: "#A8D08D",
    embroidery: "Phulkari Hand Work",
    fabric: "Lawn on Chiffon",
  },
  {
    name: "Lilac Walima Ensemble",
    nameUr: "نیلگوں ولیمہ لباس",
    price: "PKR 245,000",
    occasion: "walima",
    color: colors.occasion.walima,
    accent: "#C9A0DC",
    embroidery: "Kora + Pearl Work",
    fabric: "Net on Tissue",
  },
  {
    name: "Noir Prêt Kurta",
    nameUr: "نوائر پریٹ کرتا",
    price: "PKR 18,500",
    occasion: "pret",
    color: colors.occasion.pret,
    accent: "#B8ADA2",
    embroidery: "Minimal Thread",
    fabric: "Cotton Silk Blend",
  },
  {
    name: "Ivory Nikah Ensemble",
    nameUr: "آئیوری نکاح لباس",
    price: "PKR 385,000",
    occasion: "barat",
    color: "#6B4A2E",
    accent: "#E8C9A0",
    embroidery: "Aari + Mirror Work",
    fabric: "Pure Silk Velvet",
  },
];

function ProductCard({
  product,
  index,
  language,
}: {
  product: Product;
  index: number;
  language: "en" | "ur";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mouse = useMousePosition(ref);

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Product Image Area */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(160deg, ${product.color}12, ${product.color}45)`,
          }}
          animate={{
            backgroundPosition: `${mouse.x * 20}% ${mouse.y * 20}%`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative embroidery pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${product.accent} 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Central decorative element */}
          <motion.div
            className="w-24 h-24 rounded-full border opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{ borderColor: product.accent }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `${product.color}D0` }}
        >
          <div className="text-center p-6">
            <div className="font-body text-[9px] uppercase tracking-[3px] text-white/60 mb-2">
              {product.fabric}
            </div>
            <div className="font-body text-[10px] uppercase tracking-[2px] text-white/80 mb-4">
              {product.embroidery}
            </div>
            <Button variant="gold" size="sm">
              {t("btn.viewDetails", language)}
            </Button>
          </div>
        </motion.div>

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="occasion" occasion={product.occasion}>
            {t(`occasion.${product.occasion}`, language)}
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h4 className="font-display text-base text-theme-primary group-hover:text-theme-accent transition-colors duration-300">
          {language === "en" ? product.name : product.nameUr}
        </h4>
        <div className="flex items-center justify-between mt-1.5">
          <MonoText>{product.price}</MonoText>
          <motion.span
            className="text-theme-tertiary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ x: 4 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductSpotlight() {
  const { language } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-8">
      <motion.div
        ref={ref}
        className="max-w-[1200px] mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Label className="mb-3 block">{t("section.newArrivals", language)}</Label>
            <SectionHeading>
              {language === "en" ? (
                <>
                  Curated <AccentText>Pieces</AccentText>
                </>
              ) : (
                <>
                  منتخب <AccentText>لباس</AccentText>
                </>
              )}
            </SectionHeading>
          </div>
          <Button variant="secondary" size="sm">
            {language === "en" ? "View All" : "سب دیکھیں"} →
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              language={language}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

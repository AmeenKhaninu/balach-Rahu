"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { collections } from "@/lib/data/collections";
import { Navbar } from "@/components/sections";
import {
  Label,
  SectionHeading,
  AccentText,
  Body,
  Badge,
} from "@/components/ui";

function CollectionHeroCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/collections/${collection.slug}`}
        className="block no-underline group"
      >
        <div className="relative overflow-hidden rounded-xl">
          {/* Hero image area */}
          <div
            className="aspect-[16/10] flex flex-col justify-end p-8 relative"
            style={{ background: collection.heroGradient }}
          >
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${collection.accent} 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />

            {/* Large decorative number */}
            <span
              className="absolute top-4 right-6 font-display text-[140px] font-light leading-none select-none"
              style={{ color: `${collection.accent}10` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Tag */}
            <div className="absolute top-5 left-5">
              <Badge variant="occasion" occasion={collection.occasion}>
                {collection.tag}
              </Badge>
            </div>

            {/* Content overlay */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-px"
                  style={{ background: collection.accent }}
                />
                <Label style={{ color: collection.accent }}>
                  {collection.season} {collection.year}
                </Label>
              </div>
              <h3 className="font-display text-[clamp(28px,4vw,44px)] font-light text-white/90 leading-[1.1] mb-2">
                {collection.name}
              </h3>
              <p
                className="font-display text-lg italic"
                style={{ color: collection.accent }}
              >
                {collection.tagline}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-mono text-[11px] text-white/50">
                  {collection.productCount} pieces
                </span>
                <motion.span
                  className="font-body text-[11px] uppercase tracking-[2px] text-white/60 group-hover:text-white/90 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  Explore →
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CollectionsPage() {
  const { language } = useTheme();

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />

      {/* Header */}
      <div className="pt-28 pb-12 px-8 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Label className="mb-4 block">
            {language === "en" ? "Our Collections" : "ہماری کلیکشنز"}
          </Label>
          <SectionHeading>
            {language === "en" ? (
              <>
                Each Collection Tells{" "}
                <AccentText>a Story</AccentText>
              </>
            ) : (
              <>
                ہر کلیکشن ایک <AccentText>کہانی</AccentText> سناتی ہے
              </>
            )}
          </SectionHeading>
          <Body className="mt-4 max-w-[600px]">
            {language === "en"
              ? "Not just products in a grid — but curated editorial journeys through fabric, color, craft, and culture."
              : "صرف مصنوعات نہیں — کپڑے، رنگ، فن اور ثقافت کا ایک مرتب سفر۔"}
          </Body>
        </motion.div>
      </div>

      {/* Collections Grid */}
      <div className="px-8 pb-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, i) => (
            <CollectionHeroCard
              key={collection.id}
              collection={collection}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

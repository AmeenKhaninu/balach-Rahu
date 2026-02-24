"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { getCollectionBySlug, collections } from "@/lib/data/collections";
import { getProductsByCollection, formatPrice } from "@/lib/data/products";
import { Navbar } from "@/components/sections";
import {
  Label,
  Body,
  Badge,
  Button,
  Card,
  CardHeading,
  MonoText,
  SectionHeading,
  AccentText,
} from "@/components/ui";

function ProductGrid({
  products,
  language,
}: {
  products: ReturnType<typeof getProductsByCollection>;
  language: "en" | "ur";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="block no-underline group"
          >
            <Card variant="default" hoverable>
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  style={{
                    background: product.images[0]?.gradient || "var(--bg-tertiary)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, var(--text-primary) 0.5px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && <Badge variant="gold">New</Badge>}
                  {product.isBestseller && <Badge>Bestseller</Badge>}
                  {product.isLimitedEdition && (
                    <Badge variant="occasion" occasion="walima">
                      Limited
                    </Badge>
                  )}
                </div>

                {/* Craft hours */}
                <div className="absolute bottom-3 right-3">
                  <span className="font-mono text-[9px] text-white/40 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                    {product.craftHours}h craft
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <motion.span
                    className="font-body text-[11px] uppercase tracking-[2px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  >
                    {language === "en" ? "View Details" : "تفصیلات دیکھیں"} →
                  </motion.span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="occasion" occasion={product.occasion}>
                    {product.occasion}
                  </Badge>
                  <span className="font-body text-[9px] uppercase tracking-[1px] text-theme-tertiary">
                    {product.embroideryType}
                  </span>
                </div>
                <CardHeading className="text-base group-hover:text-theme-accent transition-colors duration-300">
                  {language === "en" ? product.name : product.nameUr}
                </CardHeading>
                <div className="flex items-center justify-between mt-2">
                  <MonoText>{formatPrice(product.price)}</MonoText>
                  <div className="flex gap-1">
                    {product.swatches.slice(0, 3).map((s) => (
                      <div
                        key={s.hex}
                        className="w-3 h-3 rounded-full border border-theme-subtle"
                        style={{ background: s.hex }}
                      />
                    ))}
                    {product.swatches.length > 3 && (
                      <span className="font-mono text-[9px] text-theme-tertiary">
                        +{product.swatches.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function CollectionDetailPage() {
  const params = useParams();
  const { language } = useTheme();
  const slug = params.slug as string;
  const collection = getCollectionBySlug(slug);
  const products = collection
    ? getProductsByCollection(collection.id)
    : [];

  if (!collection) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-theme-primary mb-4">
            Collection Not Found
          </h1>
          <Link href="/collections">
            <Button variant="secondary">Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />

      {/* Hero */}
      <div
        className="relative pt-24 pb-16 px-8 overflow-hidden"
        style={{ background: collection.heroGradient }}
      >
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${collection.accent} 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-secondary no-underline hover:text-theme-accent transition-colors"
            >
              Collections
            </Link>
            <span className="text-theme-tertiary text-xs">/</span>
            <span className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-primary">
              {collection.name}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="occasion" occasion={collection.occasion}>
                {collection.tag}
              </Badge>
              <Label style={{ color: collection.accent }}>
                {collection.season} {collection.year}
              </Label>
            </div>

            <h1 className="font-display text-[clamp(36px,6vw,64px)] font-light text-theme-primary leading-[1.1] mb-3">
              {language === "en" ? collection.name : collection.nameUr}
            </h1>
            <p
              className="font-display text-xl italic mb-6"
              style={{ color: collection.accent }}
            >
              {language === "en"
                ? collection.tagline
                : collection.taglineUr}
            </p>
            <Body className="max-w-[640px]">
              {language === "en"
                ? collection.description
                : collection.descriptionUr}
            </Body>

            <div className="flex items-center gap-4 mt-6">
              <span className="font-mono text-[12px] text-theme-secondary">
                {products.length} pieces available
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        {products.length > 0 ? (
          <ProductGrid products={products} language={language} />
        ) : (
          <div className="text-center py-20">
            <SectionHeading>
              <AccentText>Coming Soon</AccentText>
            </SectionHeading>
            <Body className="mt-4">
              {language === "en"
                ? "This collection is being curated. Check back soon."
                : "یہ کلیکشن تیار ہو رہی ہے۔ جلد واپس آئیں۔"}
            </Body>
          </div>
        )}
      </div>

      {/* Other Collections */}
      <div className="max-w-[1200px] mx-auto px-8 pb-24">
        <div className="border-t border-theme pt-12">
          <Label className="block mb-6">
            {language === "en" ? "Explore More" : "مزید دیکھیں"}
          </Label>
          <div className="flex gap-3 flex-wrap">
            {collections
              .filter((c) => c.id !== collection.id)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/collections/${c.slug}`}
                  className="no-underline"
                >
                  <Button variant="ghost" size="sm">
                    {c.name}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

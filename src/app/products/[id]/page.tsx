"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
} from "@/lib/data/products";
import { getCollectionById } from "@/lib/data/collections";
import { Navbar } from "@/components/sections";
import {
  Label,
  Body,
  Badge,
  Button,
  Card,
  CardHeading,
  SectionHeading,
  AccentText,
  MonoText,
  ImageGallery,
  SwatchSelector,
  PriceDisplay,
  Separator,
} from "@/components/ui";

function SizeSelector({
  sizes,
  language,
}: {
  sizes: ReturnType<typeof getProductBySlug> extends infer P
    ? P extends { sizes: infer S }
      ? S
      : never
    : never;
  language: "en" | "ur";
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <Label className="block mb-3">
        {language === "en" ? "Select Size" : "سائز منتخب کریں"}
      </Label>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size, i) => (
          <motion.button
            key={size.label}
            onClick={() => size.inStock && setSelected(i)}
            whileHover={size.inStock ? { scale: 1.05 } : {}}
            whileTap={size.inStock ? { scale: 0.95 } : {}}
            className={`
              px-5 py-3 rounded-md font-body text-[11px] uppercase tracking-[1.5px]
              border cursor-pointer transition-all duration-300
              ${!size.inStock ? "opacity-30 cursor-not-allowed line-through" : ""}
              ${
                i === selected
                  ? "bg-brand-gold/15 border-brand-gold text-brand-gold"
                  : "bg-transparent border-theme text-theme-secondary hover:border-brand-gold/30"
              }
            `}
          >
            {size.label}
          </motion.button>
        ))}
      </div>

      {/* Size details */}
      {sizes[selected] && (
        <motion.div
          className="mt-3 flex gap-4 font-mono text-[10px] text-theme-tertiary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selected}
        >
          <span>Chest: {sizes[selected].chest}</span>
          <span>Waist: {sizes[selected].waist}</span>
          <span>Length: {sizes[selected].length}</span>
        </motion.div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between py-2.5 border-b border-theme-subtle">
      <span className="font-body text-[11px] uppercase tracking-[1.5px] text-theme-secondary">
        {label}
      </span>
      <span className="font-body text-[13px] text-theme-primary">{value}</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const { language, theme } = useTheme();
  const slug = params.id as string;
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  const collection = product
    ? getCollectionById(product.collectionId)
    : undefined;

  const relatedRef = useRef(null);
  const relatedInView = useInView(relatedRef, { once: true });

  if (!product) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <SectionHeading>Product Not Found</SectionHeading>
          <Link href="/shop" className="mt-4 inline-block">
            <Button variant="secondary">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 px-8 max-w-[1200px] mx-auto">
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/shop"
            className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-secondary no-underline hover:text-theme-accent transition-colors"
          >
            Shop
          </Link>
          <span className="text-theme-tertiary text-xs">/</span>
          {collection && (
            <>
              <Link
                href={`/collections/${collection.slug}`}
                className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-secondary no-underline hover:text-theme-accent transition-colors"
              >
                {collection.name}
              </Link>
              <span className="text-theme-tertiary text-xs">/</span>
            </>
          )}
          <span className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-primary">
            {product.name}
          </span>
        </motion.div>
      </div>

      {/* Product Main */}
      <div className="max-w-[1200px] mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery images={product.images} />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="occasion" occasion={product.occasion}>
                {product.occasion}
              </Badge>
              {product.isNew && <Badge variant="gold">New Arrival</Badge>}
              {product.isBestseller && <Badge>Bestseller</Badge>}
              {product.isLimitedEdition && (
                <Badge variant="occasion" occasion="walima">
                  Limited Edition
                </Badge>
              )}
            </div>

            {/* Name & Price */}
            <div>
              <h1 className="font-display text-[clamp(28px,4vw,40px)] font-light text-theme-primary leading-[1.15] mb-3">
                {language === "en" ? product.name : product.nameUr}
              </h1>
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
              />
            </div>

            {/* Description */}
            <Body>
              {language === "en"
                ? product.description
                : product.descriptionUr}
            </Body>

            {/* Fabric Swatches */}
            <SwatchSelector
              swatches={product.swatches}
              language={language}
            />

            {/* Size Selector */}
            <SizeSelector sizes={product.sizes} language={language} />

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap pt-2">
              <Button variant="primary" size="lg" className="flex-1 min-w-[200px]">
                {language === "en" ? "Add to Cart" : "کارٹ میں شامل کریں"}
              </Button>
              <Button variant="secondary" size="lg">
                {language === "en" ? "Save to Wishlist" : "محفوظ کریں"} ♡
              </Button>
            </div>

            {/* Craft & Fabric Details */}
            <Card variant="accent" className="p-5 mt-2">
              <Label className="block mb-3">
                {language === "en" ? "Craftsmanship Details" : "دستکاری کی تفصیلات"}
              </Label>
              <DetailRow label="Fabric" value={product.fabric} />
              <DetailRow label="Embroidery" value={product.embroideryType} />
              <DetailRow
                label="Intensity"
                value={product.embroideryIntensity}
              />
              <DetailRow
                label="Craft Hours"
                value={`${product.craftHours}+ hours of hand work`}
              />
              <DetailRow label="Fit" value={product.fit} />
              {product.trouserCut && (
                <DetailRow label="Trouser Style" value={product.trouserCut} />
              )}
            </Card>

            {/* Measurement CTA */}
            <Card variant="bordered" className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold text-lg">◈</span>
                </div>
                <div>
                  <CardHeading className="text-sm mb-1">
                    {language === "en"
                      ? "Custom measurements available"
                      : "اپنی ناپ کے مطابق دستیاب"}
                  </CardHeading>
                  <Body className="text-xs mb-3">
                    {language === "en"
                      ? "Get this piece tailored to your exact measurements using our AI body measurement studio."
                      : "ہماری اے آئی ناپ اسٹوڈیو سے اپنی ناپ کے مطابق یہ لباس بنوائیں۔"}
                  </Body>
                  <Button variant="gold" size="sm">
                    {language === "en" ? "Get Measured" : "ناپ لیں"} →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Complete the Look */}
      {relatedProducts.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-8 pb-24">
          <Separator ornament="✦" />

          <motion.div
            ref={relatedRef}
            initial={{ opacity: 0, y: 30 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Label className="block mb-3">
              {language === "en" ? "Complete the Look" : "مکمل لک"}
            </Label>
            <SectionHeading className="mb-8">
              {language === "en" ? (
                <>
                  Pairs <AccentText>Beautifully</AccentText> With
                </>
              ) : (
                <>
                  <AccentText>خوبصورتی</AccentText> سے میچ ہوتا ہے
                </>
              )}
            </SectionHeading>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="no-underline group"
                >
                  <Card variant="default" hoverable>
                    <div
                      className="aspect-[3/4] rounded-t-lg group-hover:scale-105 transition-transform duration-700"
                      style={{
                        background:
                          rp.images[0]?.gradient || "var(--bg-tertiary)",
                      }}
                    />
                    <div className="p-4">
                      <CardHeading className="text-sm group-hover:text-theme-accent transition-colors duration-300">
                        {language === "en" ? rp.name : rp.nameUr}
                      </CardHeading>
                      <MonoText>{formatPrice(rp.price)}</MonoText>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

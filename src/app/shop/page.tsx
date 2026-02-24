"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { products, formatPrice } from "@/lib/data/products";
import { Navbar } from "@/components/sections";
import {
  Label,
  SectionHeading,
  AccentText,
  Body,
  Badge,
  Button,
  Card,
  CardHeading,
  MonoText,
  FilterChip,
  Input,
} from "@/components/ui";
import { colors } from "@/lib/tokens";
import type { OccasionType } from "@/lib/tokens";
import type { EmbroideryIntensity, FabricWeight, SortOption, FilterState } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";

const OCCASIONS: { key: OccasionType; label: string; labelUr: string; color: string }[] = [
  { key: "barat", label: "Barat", labelUr: "بارات", color: colors.occasion.barat },
  { key: "walima", label: "Walima", labelUr: "ولیمہ", color: colors.occasion.walima },
  { key: "mehndi", label: "Mehndi", labelUr: "مہندی", color: colors.occasion.mehndi },
  { key: "eid", label: "Eid", labelUr: "عید", color: colors.occasion.eid },
  { key: "pret", label: "Prêt", labelUr: "پریٹ", color: colors.occasion.pret },
];

const EMBROIDERY: { key: EmbroideryIntensity; label: string }[] = [
  { key: "minimal", label: "Minimal" },
  { key: "moderate", label: "Moderate" },
  { key: "heavy", label: "Heavy" },
  { key: "bridal", label: "Bridal" },
];

const FABRIC_WEIGHT: { key: FabricWeight; label: string }[] = [
  { key: "light", label: "Light / Summer" },
  { key: "medium", label: "Medium" },
  { key: "heavy", label: "Heavy / Winter" },
];

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "craftsmanship", label: "Craft Hours" },
];

const PRICE_RANGES = [
  { label: "Under 25K", min: 0, max: 25000 },
  { label: "25K – 100K", min: 25000, max: 100000 },
  { label: "100K – 250K", min: 100000, max: 250000 },
  { label: "250K+", min: 250000, max: 1000000 },
];

function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item)
    ? arr.filter((x) => x !== item)
    : [...arr, item];
}

export default function ShopPage() {
  const { language } = useTheme();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(true);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Occasion filter
    if (filters.occasions.length > 0) {
      result = result.filter((p) => filters.occasions.includes(p.occasion));
    }

    // Price range
    if (
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1_000_000
    ) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange[0] &&
          p.price <= filters.priceRange[1]
      );
    }

    // Embroidery intensity
    if (filters.embroideryIntensity.length > 0) {
      result = result.filter((p) =>
        filters.embroideryIntensity.includes(p.embroideryIntensity)
      );
    }

    // Fabric weight
    if (filters.fabricWeight.length > 0) {
      result = result.filter((p) =>
        filters.fabricWeight.includes(p.fabricWeight)
      );
    }

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameUr.includes(q) ||
          p.embroideryType.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    // Sort
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "craftsmanship":
        result.sort((a, b) => b.craftHours - a.craftHours);
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [filters]);

  const activeFilterCount =
    filters.occasions.length +
    filters.embroideryIntensity.length +
    filters.fabricWeight.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1_000_000 ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />

      {/* Header */}
      <div className="pt-28 pb-8 px-8 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Label className="mb-3 block">
            {language === "en" ? "Shop All" : "سب دیکھیں"}
          </Label>
          <SectionHeading>
            {language === "en" ? (
              <>
                Discover <AccentText>Your Piece</AccentText>
              </>
            ) : (
              <>
                اپنا <AccentText>لباس</AccentText> تلاش کریں
              </>
            )}
          </SectionHeading>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-24">
        {/* Filter Toggle + Sort */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant={showFilters ? "gold" : "ghost"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-brand-gold text-neutral-900 text-[9px] w-4 h-4 rounded-full inline-flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-tertiary hover:text-theme-accent transition-colors cursor-pointer bg-transparent border-none"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Label>{language === "en" ? "Sort" : "ترتیب"}</Label>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.key}
                  label={opt.label}
                  active={filters.sort === opt.key}
                  onClick={() => setFilters({ ...filters, sort: opt.key })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 overflow-hidden"
              >
                {/* Search */}
                <div>
                  <Input
                    label={language === "en" ? "Search" : "تلاش"}
                    placeholder={
                      language === "en"
                        ? "Zardozi, phulkari, silk..."
                        : "زردوزی، پھلکاری، ریشم..."
                    }
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>

                {/* Occasion */}
                <div>
                  <Label className="block mb-3">
                    {language === "en" ? "Occasion" : "موقع"}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {OCCASIONS.map((occ) => (
                      <FilterChip
                        key={occ.key}
                        label={language === "en" ? occ.label : occ.labelUr}
                        active={filters.occasions.includes(occ.key)}
                        color={occ.color}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            occasions: toggleArrayItem(
                              filters.occasions,
                              occ.key
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="block mb-3">
                    {language === "en" ? "Budget" : "بجٹ"}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map((range) => (
                      <FilterChip
                        key={range.label}
                        label={range.label}
                        active={
                          filters.priceRange[0] === range.min &&
                          filters.priceRange[1] === range.max
                        }
                        onClick={() =>
                          setFilters({
                            ...filters,
                            priceRange:
                              filters.priceRange[0] === range.min &&
                              filters.priceRange[1] === range.max
                                ? [0, 1_000_000]
                                : [range.min, range.max],
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Embroidery Intensity */}
                <div>
                  <Label className="block mb-3">
                    {language === "en" ? "Embroidery" : "کڑھائی"}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {EMBROIDERY.map((e) => (
                      <FilterChip
                        key={e.key}
                        label={e.label}
                        active={filters.embroideryIntensity.includes(e.key)}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            embroideryIntensity: toggleArrayItem(
                              filters.embroideryIntensity,
                              e.key
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Fabric Weight */}
                <div>
                  <Label className="block mb-3">
                    {language === "en" ? "Fabric Weight" : "کپڑے کا وزن"}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {FABRIC_WEIGHT.map((fw) => (
                      <FilterChip
                        key={fw.key}
                        label={fw.label}
                        active={filters.fabricWeight.includes(fw.key)}
                        onClick={() =>
                          setFilters({
                            ...filters,
                            fabricWeight: toggleArrayItem(
                              filters.fabricWeight,
                              fw.key
                            ),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div>
            {/* Results count */}
            <div className="mb-4">
              <span className="font-mono text-[11px] text-theme-tertiary">
                {filteredProducts.length} {language === "en" ? "pieces" : "اشیاء"}
              </span>
            </div>

            <motion.div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="block no-underline group"
                    >
                      <Card variant="default" hoverable>
                        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                          <div
                            className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                            style={{
                              background:
                                product.images[0]?.gradient ||
                                "var(--bg-tertiary)",
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
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            {product.isNew && (
                              <Badge variant="gold">New</Badge>
                            )}
                            {product.isBestseller && (
                              <Badge>Bestseller</Badge>
                            )}
                          </div>
                          <div className="absolute bottom-3 right-3">
                            <span className="font-mono text-[8px] text-white/30 bg-black/20 backdrop-blur-sm px-1.5 py-0.5 rounded">
                              {product.craftHours}h
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <Badge
                            variant="occasion"
                            occasion={product.occasion}
                            className="mb-1"
                          >
                            {product.occasion}
                          </Badge>
                          <CardHeading className="text-sm group-hover:text-theme-accent transition-colors duration-300">
                            {language === "en"
                              ? product.name
                              : product.nameUr}
                          </CardHeading>
                          <div className="flex items-center justify-between mt-1.5">
                            <MonoText>{formatPrice(product.price)}</MonoText>
                            <div className="flex gap-0.5">
                              {product.swatches.slice(0, 3).map((s) => (
                                <div
                                  key={s.hex}
                                  className="w-2.5 h-2.5 rounded-full border border-theme-subtle"
                                  style={{ background: s.hex }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-4xl mb-4 block">◇</span>
                <CardHeading>
                  {language === "en"
                    ? "No pieces match your filters"
                    : "آپ کے فلٹرز سے کوئی لباس نہیں ملا"}
                </CardHeading>
                <Body className="mt-2">
                  {language === "en"
                    ? "Try adjusting your filters or search to discover more."
                    : "مزید تلاش کرنے کے لیے اپنے فلٹرز تبدیل کریں۔"}
                </Body>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

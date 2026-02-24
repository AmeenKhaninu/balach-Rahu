import type { OccasionType } from "./tokens";

/* ── Core Types ── */

export interface ProductImage {
  url: string;
  alt: string;
  /** Gradient placeholder before real images load */
  gradient: string;
}

export type EmbroideryIntensity = "minimal" | "moderate" | "heavy" | "bridal";
export type FabricWeight = "light" | "medium" | "heavy";
export type FitType = "loose" | "semi-fitted" | "fitted";
export type TrouserCut =
  | "straight"
  | "sharara"
  | "gharara"
  | "tulip-shalwar"
  | "palazzo"
  | "cigarette";

export interface FabricSwatch {
  name: string;
  nameUr: string;
  hex: string;
  available: boolean;
}

export interface SizeOption {
  label: string;
  chest: string;
  waist: string;
  length: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUr: string;
  description: string;
  descriptionUr: string;
  price: number;
  originalPrice?: number;
  currency: "PKR";
  images: ProductImage[];
  collectionId: string;
  occasion: OccasionType;
  embroideryIntensity: EmbroideryIntensity;
  embroideryType: string;
  fabric: string;
  fabricWeight: FabricWeight;
  fit: FitType;
  trouserCut?: TrouserCut;
  swatches: FabricSwatch[];
  sizes: SizeOption[];
  tags: string[];
  isNew: boolean;
  isBestseller: boolean;
  isLimitedEdition: boolean;
  craftHours: number;
  /** Related product IDs for "Complete the Look" */
  completeTheLook: string[];
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  nameUr: string;
  tagline: string;
  taglineUr: string;
  description: string;
  descriptionUr: string;
  occasion: OccasionType;
  season: string;
  year: number;
  heroGradient: string;
  color: string;
  accent: string;
  productCount: number;
  heroImage: ProductImage;
  tag: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: Date;
  note?: string;
}

export interface MoodBoard {
  id: string;
  name: string;
  items: WishlistItem[];
  createdAt: Date;
  shared: boolean;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular" | "craftsmanship";

export interface FilterState {
  occasions: OccasionType[];
  priceRange: [number, number];
  embroideryIntensity: EmbroideryIntensity[];
  fabricWeight: FabricWeight[];
  fit: FitType[];
  tags: string[];
  search: string;
  sort: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  occasions: [],
  priceRange: [0, 1_000_000],
  embroideryIntensity: [],
  fabricWeight: [],
  fit: [],
  tags: [],
  search: "",
  sort: "newest",
};

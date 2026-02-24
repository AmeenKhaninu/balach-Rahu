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

/* ── Phase 3: Custom Tailoring Engine ── */

export type NecklineShape =
  | "round"
  | "v-neck"
  | "boat"
  | "sweetheart"
  | "collar"
  | "ban"
  | "square";

export type SleeveStyle =
  | "full"
  | "three-quarter"
  | "half"
  | "bell"
  | "cap"
  | "sleeveless";

export type DupattaStyle =
  | "none"
  | "matching"
  | "contrast"
  | "net"
  | "organza";

export type LiningOption = "none" | "silk" | "cotton" | "viscose";

export type BodyType = "slim" | "athletic" | "average" | "curvy" | "plus";

export interface Measurements {
  bust: number;
  waist: number;
  hip: number;
  shoulder: number;
  armLength: number;
  kameezLength: number;
  trouserLength: number;
  trouserWaist: number;
  /** Inches */
  unit: "inches" | "cm";
}

export const DEFAULT_MEASUREMENTS: Measurements = {
  bust: 0,
  waist: 0,
  hip: 0,
  shoulder: 0,
  armLength: 0,
  kameezLength: 0,
  trouserLength: 0,
  trouserWaist: 0,
  unit: "inches",
};

export interface MeasurementProfile {
  id: string;
  name: string;
  nameUr: string;
  measurements: Measurements;
  bodyType: BodyType;
  fitPreference: FitType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomizationConfig {
  neckline: NecklineShape;
  sleeve: SleeveStyle;
  trouserCut: TrouserCut;
  dupatta: DupattaStyle;
  lining: LiningOption;
  profileId?: string;
}

export const DEFAULT_CUSTOMIZATION: CustomizationConfig = {
  neckline: "round",
  sleeve: "full",
  trouserCut: "straight",
  dupatta: "matching",
  lining: "cotton",
};

export type MeasurementStep =
  | "welcome"
  | "camera-setup"
  | "front-capture"
  | "side-capture"
  | "processing"
  | "results"
  | "manual-entry";

export interface DarziShareData {
  profileName: string;
  measurements: Measurements;
  customization?: CustomizationConfig;
  shareCode: string;
  createdAt: Date;
  expiresAt: Date;
}

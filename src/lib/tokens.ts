/**
 * Design Tokens — Programmatic Access
 *
 * CSS custom properties are the source of truth.
 * This file provides typed constants for use in JS/TS
 * (e.g., Framer Motion animations, dynamic styles).
 */

export const colors = {
  brand: {
    burgundy: "#8B1A1A",
    burgundyLight: "#A82D2D",
    burgundyDark: "#6B1010",
    gold: "#D4A574",
    goldLight: "#E8C9A0",
    goldDark: "#B88B5A",
    cream: "#F5EDE4",
    ivory: "#FAF7F2",
    charcoal: "#2A2420",
    warmGray: "#9A8E82",
  },
  neutral: {
    50: "#FAF9F7",
    100: "#F5F2EE",
    200: "#E8E0D8",
    300: "#D4CBC0",
    400: "#B8ADA2",
    500: "#9A8E82",
    600: "#7A7068",
    700: "#5C544C",
    800: "#3D3732",
    900: "#2A2420",
    950: "#0A0A0A",
  },
  occasion: {
    mehndi: "#2D5016",
    barat: "#8B1A1A",
    walima: "#5C1A8E",
    eid: "#1A3C5E",
    pret: "#3D3732",
  },
} as const;

export const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', Consolas, monospace",
  urdu: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif",
} as const;

export const easings = {
  elegant: [0.22, 1, 0.36, 1] as [number, number, number, number],
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

export type ThemeMode = "pret" | "bridal";
export type Language = "en" | "ur";
export type OccasionType = "mehndi" | "barat" | "walima" | "eid" | "pret";

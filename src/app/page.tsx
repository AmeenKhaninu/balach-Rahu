"use client";

import {
  Navbar,
  HeroSection,
  CollectionsSection,
  ProductSpotlight,
  CraftsmanshipSection,
  AIStudioSection,
  StatsSection,
  FooterSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CollectionsSection />
      <ProductSpotlight />
      <CraftsmanshipSection />
      <AIStudioSection />
      <FooterSection />
    </div>
  );
}

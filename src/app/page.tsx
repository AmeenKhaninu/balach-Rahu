"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import {
  Button,
  Card,
  ThemeSwitcher,
  DisplayHeading,
  AccentText,
  Body,
  Label,
  CardHeading,
  Separator,
} from "@/components/ui";

export default function Home() {
  const { language } = useTheme();

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-theme">
        <span className="font-display text-xl text-theme-primary">
          Balach Rahu
        </span>
        <ThemeSwitcher />
      </header>

      {/* Hero */}
      <motion.section
        className="max-w-[960px] mx-auto px-8 pt-24 pb-16 text-center"
        {...fadeInUp}
      >
        <Label className="mb-4 block">
          AI-Powered Pakistani Fashion Platform
        </Label>
        <DisplayHeading className="text-center">
          {language === "en" ? (
            <>
              Where Traditional Craftsmanship
              <br />
              <AccentText>Meets Intelligent Technology</AccentText>
            </>
          ) : (
            <>
              جہاں روایتی دستکاری
              <br />
              <AccentText>جدید ٹیکنالوجی سے ملتی ہے</AccentText>
            </>
          )}
        </DisplayHeading>
        <Body className="mt-6 max-w-[580px] mx-auto text-center">
          {t("hero.subtitle", language)}
        </Body>
      </motion.section>

      <Separator />

      {/* Navigation Cards */}
      <motion.section
        className="max-w-[960px] mx-auto px-8 pb-24"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerItem}>
          <Link href="/design-system" className="block no-underline">
            <Card variant="bordered" hoverable className="p-8 mb-6">
              <Label className="block mb-2">Phase 1 — Live</Label>
              <CardHeading>Brand Design System</CardHeading>
              <Body className="mt-2">
                Design tokens, typography scale, color palette, component
                library, Pret/Bridal theme modes, and bilingual Urdu/English
                support — the visual DNA of the platform.
              </Body>
              <Button variant="secondary" size="sm" className="mt-4">
                View Design System
              </Button>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Link href="/blueprint" className="block no-underline">
            <Card variant="default" hoverable className="p-8">
              <Label className="block mb-2">Strategic Blueprint</Label>
              <CardHeading>Full 6-Phase Roadmap</CardHeading>
              <Body className="mt-2">
                The complete technical blueprint — phased roadmap, architecture
                decisions, budget tiers, and critique of the original plan.
              </Body>
              <Button variant="ghost" size="sm" className="mt-4">
                View Blueprint
              </Button>
            </Card>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

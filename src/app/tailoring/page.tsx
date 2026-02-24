"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { DisplayHeading, Body } from "@/components/ui";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import {
  MeasurementStudio,
  CustomizationConfigurator,
  ProfileManager,
  DarziPanel,
} from "@/components/tailoring";

type TailoringTab = "measure" | "customize" | "profiles" | "darzi";

const TABS: { key: TailoringTab; labelEn: string; labelUr: string; icon: string }[] = [
  { key: "measure", labelEn: "AI Measurement", labelUr: "اے آئی ناپ", icon: "📐" },
  { key: "customize", labelEn: "Customize Design", labelUr: "ڈیزائن ترتیب", icon: "✂️" },
  { key: "profiles", labelEn: "My Profiles", labelUr: "میرے پروفائلز", icon: "👤" },
  { key: "darzi", labelEn: "Darzi Share", labelUr: "درزی شیئر", icon: "📱" },
];

export default function TailoringPage() {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState<TailoringTab>("measure");

  return (
    <main className="min-h-screen bg-[var(--surface-base)]">
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-16 px-6 text-center overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl" />
          <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full bg-brand-burgundy/5 blur-3xl" />
        </div>

        {/* Decorative measurement tape line */}
        <motion.div
          className="absolute top-24 left-0 right-0 h-px"
          style={{
            background:
              "repeating-linear-gradient(90deg, var(--color-brand-gold) 0px, var(--color-brand-gold) 10px, transparent 10px, transparent 20px)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div variants={staggerItem} className="relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-[11px] uppercase tracking-[3px] font-bold mb-6">
            {language === "en" ? "Phase 3" : "فیز 3"}
          </span>
        </motion.div>

        <motion.div variants={staggerItem}>
          <DisplayHeading className="max-w-3xl mx-auto">
            {t("tailor.title" as Parameters<typeof t>[0], language)}
          </DisplayHeading>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Body className="text-theme-secondary mt-4 max-w-xl mx-auto text-lg">
            {t("tailor.subtitle" as Parameters<typeof t>[0], language)}
          </Body>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {[
            { icon: "📷", en: "AI-Powered Sizing", ur: "اے آئی سائزنگ" },
            { icon: "🎨", en: "Live Configurator", ur: "براہ راست ڈیزائنر" },
            { icon: "👨‍👩‍👧", en: "Family Profiles", ur: "خاندان کے پروفائلز" },
            { icon: "📲", en: "Darzi Share", ur: "درزی شیئر" },
          ].map(({ icon, en, ur }) => (
            <div
              key={en}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)]"
            >
              <span className="text-base">{icon}</span>
              <span className="text-xs text-theme-secondary font-body">
                {language === "en" ? en : ur}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Tab Navigation */}
      <section className="sticky top-16 z-30 px-6 backdrop-blur-xl bg-[var(--surface-overlay)] border-b border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-1 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                relative px-5 py-3 rounded-lg cursor-pointer border-none bg-transparent
                flex items-center gap-2 transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "text-theme-primary"
                    : "text-theme-tertiary hover:text-theme-secondary"
                }
              `}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="text-[11px] uppercase tracking-[1.5px] font-body font-medium whitespace-nowrap">
                {language === "en" ? tab.labelEn : tab.labelUr}
              </span>
              {activeTab === tab.key && (
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-gold rounded-full"
                  layoutId="tailoring-tab"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {activeTab === "measure" && (
            <motion.div key="measure" {...fadeInUp}>
              <MeasurementStudio />
            </motion.div>
          )}
          {activeTab === "customize" && (
            <motion.div key="customize" {...fadeInUp}>
              <CustomizationConfigurator />
            </motion.div>
          )}
          {activeTab === "profiles" && (
            <motion.div key="profiles" {...fadeInUp}>
              <ProfileManager />
            </motion.div>
          )}
          {activeTab === "darzi" && (
            <motion.div key="darzi" {...fadeInUp}>
              <DarziPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Bottom CTA */}
      <motion.section
        className="px-6 py-20 bg-gradient-to-b from-transparent to-brand-burgundy/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="font-display text-2xl text-theme-primary">
            {language === "en"
              ? "Precision Meets Tradition"
              : "درستگی روایت سے ملتی ہے"}
          </h3>
          <Body className="text-theme-secondary">
            {language === "en"
              ? "Every garment crafted to your unique measurements. No more guesswork — just perfect fit, every time."
              : "ہر لباس آپ کے منفرد ناپ کے مطابق تیار۔ مزید اندازہ نہیں — ہر بار بالکل فٹ۔"}
          </Body>
          <div className="flex items-center justify-center gap-6 text-sm">
            {[
              { num: "±0.5\"", label: language === "en" ? "Accuracy" : "درستگی" },
              { num: "60s", label: language === "en" ? "Measurement Time" : "ناپ کا وقت" },
              { num: "∞", label: language === "en" ? "Profiles" : "پروفائلز" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-mono text-2xl text-brand-gold font-bold">{num}</div>
                <div className="text-[10px] text-theme-tertiary uppercase tracking-wider mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}

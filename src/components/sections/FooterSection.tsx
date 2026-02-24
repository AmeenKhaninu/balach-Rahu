"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Button, Label, Body } from "@/components/ui";
import { t } from "@/lib/i18n";

export default function FooterSection() {
  const { language } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Band */}
      <motion.section
        ref={ref}
        className="relative py-32 px-8 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,26,26,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-[640px] mx-auto">
          <Label className="mb-4 block">
            {language === "en"
              ? "Begin Your Journey"
              : "اپنا سفر شروع کریں"}
          </Label>
          <h2 className="font-display text-[clamp(28px,5vw,52px)] font-light text-theme-primary leading-[1.1] mb-6">
            {language === "en" ? (
              <>
                Your Dream Outfit,{" "}
                <span className="italic text-theme-accent">
                  Designed by You
                </span>
              </>
            ) : (
              <>
                آپ کے خوابوں کا لباس،{" "}
                <span className="italic text-theme-accent">
                  آپ کا ڈیزائن کیا ہوا
                </span>
              </>
            )}
          </h2>
          <Body className="mb-10 max-w-[480px] mx-auto">
            {language === "en"
              ? "From AI-powered design to hand-embroidered reality. Start with a measurement, a mood, or a dream."
              : "اے آئی ڈیزائن سے ہاتھ کی کڑھائی تک۔ ناپ سے شروع کریں، موڈ سے، یا خواب سے۔"}
          </Body>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">
              {t("btn.getMeasured", language)}
            </Button>
            <Button variant="secondary" size="lg">
              {t("btn.explore", language)}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer Links */}
      <div className="border-t border-theme px-8 py-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-burgundy flex items-center justify-center">
                <span className="text-brand-cream font-display text-sm font-bold">
                  BR
                </span>
              </div>
              <span className="font-display text-lg text-theme-primary">
                Balach Rahu
              </span>
            </div>
            <Body className="text-xs">
              {language === "en"
                ? "Where traditional Pakistani craftsmanship meets AI-powered design intelligence."
                : "جہاں پاکستانی دستکاری اے آئی ڈیزائن سے ملتی ہے۔"}
            </Body>
          </div>

          {/* Collections */}
          <div>
            <Label className="block mb-4">
              {t("nav.collections", language)}
            </Label>
            <div className="space-y-2">
              {["Bridal '25", "Eid Festive", "Mehndi Nights", "Prêt"].map(
                (item) => (
                  <div
                    key={item}
                    className="font-body text-sm text-theme-secondary hover:text-theme-accent transition-colors duration-300 cursor-pointer"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Platform */}
          <div>
            <Label className="block mb-4">Platform</Label>
            <div className="space-y-2">
              {[
                { label: "Design System", href: "/design-system" },
                { label: "Blueprint", href: "/blueprint" },
                { label: "AI Studio", href: "#ai-studio" },
                { label: "Measurement Guide", href: "#" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block font-body text-sm text-theme-secondary hover:text-theme-accent transition-colors duration-300 no-underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <Label className="block mb-4">
              {language === "en" ? "Connect" : "رابطہ"}
            </Label>
            <div className="space-y-2 font-body text-sm text-theme-secondary">
              <div>Lahore, Pakistan</div>
              <div>London, United Kingdom</div>
              <div>Dubai, UAE</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1200px] mx-auto mt-12 pt-6 border-t border-theme-subtle flex items-center justify-between flex-wrap gap-4">
          <span className="font-body text-[10px] text-theme-tertiary tracking-[1px] uppercase">
            &copy; 2025 Balach Rahu. Crafted with purpose.
          </span>
          <span className="font-mono text-[9px] text-theme-tertiary">
            Phase 1: Brand DNA & Design System — Complete
          </span>
        </div>
      </div>
    </footer>
  );
}

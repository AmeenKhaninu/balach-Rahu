"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";

export default function ThemeSwitcher() {
  const { theme, language, toggleTheme, toggleLanguage } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme transition-all duration-300 hover:border-brand-gold cursor-pointer"
        aria-label={`Switch to ${theme === "pret" ? "bridal" : "pret"} theme`}
      >
        <div className="relative w-8 h-4 rounded-full bg-theme-elevated">
          <motion.div
            className="absolute top-0.5 w-3 h-3 rounded-full"
            animate={{
              x: theme === "bridal" ? 17 : 1,
              backgroundColor: theme === "bridal" ? "#D4A574" : "#8B1A1A",
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-secondary">
          {theme === "pret" ? t("theme.pret", language) : t("theme.bridal", language)}
        </span>
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="px-3 py-1.5 rounded-full border border-theme transition-all duration-300 hover:border-brand-gold cursor-pointer"
        aria-label={`Switch to ${language === "en" ? "Urdu" : "English"}`}
      >
        <span className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-secondary">
          {t("lang.switchTo", language)}
        </span>
      </button>
    </div>
  );
}

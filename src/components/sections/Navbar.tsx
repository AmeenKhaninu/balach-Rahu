"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { ThemeSwitcher } from "@/components/ui";

const navLinks = [
  { key: "nav.collections" as const, href: "#collections" },
  { key: "nav.customize" as const, href: "#craftsmanship" },
  { key: "nav.designStudio" as const, href: "#ai-studio" },
] as const;

export default function Navbar() {
  const { language } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
    // Hide on scroll down, show on scroll up
    if (latest > lastY && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`
          px-8 py-4 flex items-center justify-between transition-all duration-500
          ${
            scrolled
              ? "backdrop-blur-xl bg-[var(--surface-overlay)] border-b border-[var(--border-subtle)] shadow-lg"
              : "bg-transparent"
          }
        `}
      >
        {/* Logo */}
        <Link href="/" className="no-underline">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-brand-burgundy flex items-center justify-center">
              <span className="text-brand-cream font-display text-sm font-bold">
                BR
              </span>
            </div>
            <span className="font-display text-xl text-theme-primary tracking-wide">
              Balach Rahu
            </span>
          </motion.div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.key}
              href={link.href}
              className="font-body text-[11px] uppercase tracking-[2px] text-theme-secondary no-underline
                         hover:text-theme-accent transition-colors duration-300 relative"
              whileHover="hover"
            >
              {t(link.key, language)}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px bg-brand-gold"
                initial={{ scaleX: 0 }}
                variants={{
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href="/design-system" className="no-underline hidden lg:block">
            <span className="font-body text-[10px] uppercase tracking-[1.5px] text-theme-tertiary hover:text-theme-gold transition-colors duration-300">
              Design System
            </span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

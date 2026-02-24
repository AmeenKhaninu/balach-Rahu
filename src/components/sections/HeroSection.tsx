"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button, Label } from "@/components/ui";
import { t } from "@/lib/i18n";

/** Animate each word with staggered reveal */
function AnimatedWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { language, theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        {/* Gradient base */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background:
              theme === "bridal"
                ? "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,26,26,0.2) 0%, rgba(10,10,10,0.95) 70%)"
                : "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,165,116,0.08) 0%, var(--bg-primary) 70%)",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: theme === "bridal" ? "#D4A574" : "#8B1A1A",
            top: "10%",
            left: "60%",
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
          style={{
            background: theme === "bridal" ? "#8B1A1A" : "#D4A574",
            bottom: "20%",
            left: "20%",
          }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px),
                              linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1000px] mx-auto px-8 text-center"
        style={{ y: textY, opacity }}
      >
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Label className="mb-6 block">
            {language === "en"
              ? "AI-Powered Pakistani Fashion Platform"
              : "اے آئی سے چلنے والا پاکستانی فیشن پلیٹ فارم"}
          </Label>
        </motion.div>

        {/* Main Heading */}
        <h1 className="font-display font-light text-[clamp(36px,7vw,80px)] leading-[1.05] tracking-tight text-theme-primary mb-2">
          {language === "en" ? (
            <>
              <AnimatedWords text="Where Traditional" delay={0.4} />
              <br />
              <AnimatedWords text="Craftsmanship" delay={0.7} />
            </>
          ) : (
            <>
              <AnimatedWords text="جہاں روایتی دستکاری" delay={0.4} />
            </>
          )}
        </h1>

        {/* Accent line */}
        <motion.h2
          className="font-display italic text-[clamp(32px,6vw,72px)] leading-[1.1] text-theme-accent shimmer-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {language === "en"
            ? "Meets Intelligent Technology"
            : "جدید ٹیکنالوجی سے ملتی ہے"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-body text-[clamp(14px,1.8vw,18px)] font-light text-theme-secondary mt-8 max-w-[580px] mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {t("hero.subtitle", language)}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex gap-4 justify-center mt-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <Button variant="primary" size="lg">
            {t("btn.explore", language)}
          </Button>
          <Button variant="secondary" size="lg">
            {t("btn.getMeasured", language)}
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <motion.div
            className="w-px h-16 mx-auto bg-gradient-to-b from-transparent via-brand-gold to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

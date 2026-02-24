"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Label } from "@/components/ui";

interface StatItem {
  value: number;
  suffix: string;
  labelEn: string;
  labelUr: string;
}

const stats: StatItem[] = [
  {
    value: 200,
    suffix: "+",
    labelEn: "Hours of hand embroidery per bridal piece",
    labelUr: "بریدل لباس میں ہاتھ کی کڑھائی کے گھنٹے",
  },
  {
    value: 47,
    suffix: "",
    labelEn: "Point quality inspection on every garment",
    labelUr: "ہر لباس پر معائنے کے نکات",
  },
  {
    value: 4,
    suffix: "",
    labelEn: "AI design variations generated in seconds",
    labelUr: "سیکنڈوں میں اے آئی ڈیزائن تغیرات",
  },
  {
    value: 3,
    suffix: "",
    labelEn: "Markets served — Pakistan, UK, UAE",
    labelUr: "مارکیٹس — پاکستان، برطانیہ، متحدہ عرب امارات",
  },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { language } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Ornate divider */}
        <div className="separator-ornate mb-16">◆</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="font-display text-[clamp(36px,6vw,64px)] font-light text-theme-accent leading-none mb-3">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <Label className="block leading-relaxed">
                {language === "en" ? stat.labelEn : stat.labelUr}
              </Label>
            </motion.div>
          ))}
        </div>

        <div className="separator-ornate mt-16">◆</div>
      </div>
    </section>
  );
}

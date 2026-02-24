"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Label, SectionHeading, AccentText, Body } from "@/components/ui";
import { t } from "@/lib/i18n";

const craftSteps = [
  {
    step: "01",
    titleEn: "Design Conception",
    titleUr: "ڈیزائن تخلیق",
    descEn:
      "Every piece begins with a hand-sketched design, blending contemporary silhouettes with centuries-old pattern traditions from the subcontinent.",
    descUr:
      "ہر لباس ہاتھ سے بنائے گئے خاکے سے شروع ہوتا ہے، جو جدید ڈیزائن کو صدیوں پرانی روایات سے ملاتا ہے۔",
    icon: "✎",
  },
  {
    step: "02",
    titleEn: "Fabric Selection",
    titleUr: "کپڑے کا انتخاب",
    descEn:
      "Silk from Benares, organza from Switzerland, velvet from Turkey — each fabric sourced for its drape, texture, and how it catches light in a dimly lit wedding hall.",
    descUr:
      "بنارس کا ریشم، سوئٹزرلینڈ کا آرگینزا، ترکی کا مخمل — ہر کپڑا اپنی خوبصورتی اور معیار کی بنیاد پر منتخب۔",
    icon: "◈",
  },
  {
    step: "03",
    titleEn: "Hand Embroidery",
    titleUr: "ہاتھ کی کڑھائی",
    descEn:
      "Zardozi, dabka, gota, tilla, kora, sequin — each technique mastered over generations. A single bridal piece takes 200-400 hours of continuous hand embroidery work.",
    descUr:
      "زردوزی، ڈبکا، گوٹا، تلا، کورا — ہر تکنیک نسلوں سے سیکھی گئی۔ ایک بریدل لباس میں 200 سے 400 گھنٹے لگتے ہیں۔",
    icon: "✦",
  },
  {
    step: "04",
    titleEn: "Assembly & Finishing",
    titleUr: "تیاری اور فنشنگ",
    descEn:
      "Precision stitching, steam pressing, and a 47-point quality inspection. Every seam, every bead, every thread end — checked by hand before it reaches you.",
    descUr:
      "درست سلائی، سٹیم پریسنگ، اور 47 نکاتی معائنہ۔ ہر سلائی، ہر موتی، ہر دھاگا — ہاتھ سے جانچا جاتا ہے۔",
    icon: "◆",
  },
];

function CraftStep({
  step,
  index,
  language,
}: {
  step: (typeof craftSteps)[0];
  index: number;
  language: "en" | "ur";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-10"
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Step Number + Line */}
      <div className="flex md:flex-col items-center gap-3">
        <motion.div
          className="w-14 h-14 rounded-full border-2 border-brand-gold/30 flex items-center justify-center flex-shrink-0"
          whileInView={{
            borderColor: [
              "rgba(212,165,116,0.3)",
              "rgba(212,165,116,0.8)",
              "rgba(212,165,116,0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          viewport={{ once: false }}
        >
          <span className="font-display text-xl text-brand-gold">
            {step.icon}
          </span>
        </motion.div>
        {index < craftSteps.length - 1 && (
          <motion.div
            className="hidden md:block w-px flex-1 min-h-[60px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
            style={{
              background:
                "linear-gradient(to bottom, rgba(212,165,116,0.4), transparent)",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[11px] text-brand-gold/60">
            {step.step}
          </span>
          <span className="w-6 h-px bg-brand-gold/30" />
        </div>
        <h3 className="font-display text-2xl text-theme-primary mb-3">
          {language === "en" ? step.titleEn : step.titleUr}
        </h3>
        <Body className="max-w-[520px]">
          {language === "en" ? step.descEn : step.descUr}
        </Body>
      </div>
    </motion.div>
  );
}

export default function CraftsmanshipSection() {
  const { language } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="relative py-32 overflow-hidden"
    >
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          x: bgX,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[900px] mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Label className="mb-4 block">{t("section.craftsmanship", language)}</Label>
          <SectionHeading>
            {language === "en" ? (
              <>
                200 Hours of <AccentText>Love</AccentText>
                <br />
                In Every Stitch
              </>
            ) : (
              <>
                ہر ٹانکے میں <AccentText>محبت</AccentText> کے
                <br />
                200 گھنٹے
              </>
            )}
          </SectionHeading>
        </motion.div>

        {/* Steps */}
        <div>
          {craftSteps.map((step, i) => (
            <CraftStep key={step.step} step={step} index={i} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}

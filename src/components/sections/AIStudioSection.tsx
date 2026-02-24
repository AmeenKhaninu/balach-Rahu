"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button, Label, SectionHeading, AccentText, Body, Badge } from "@/components/ui";
import { colors } from "@/lib/tokens";

const prompts = [
  {
    textEn: "Mujhe is design mein maroon color chahiye aur neckline pe heavy zardozi lagao",
    textUr: "مجھے اس ڈیزائن میں مرون رنگ چاہیے اور نیک لائن پر بھاری زردوزی لگاؤ",
    tagEn: "Urdu Prompt",
    tagUr: "اردو پرامپٹ",
  },
  {
    textEn: "Make this more suitable for a Walima — lighter embroidery, pastel tones",
    textUr: "اسے ولیمہ کے لیے مناسب بنائیں — ہلکی کڑھائی، ہلکے رنگ",
    tagEn: "English Prompt",
    tagUr: "انگلش پرامپٹ",
  },
  {
    textEn: "Show me something like heavy Mughal-era jali work but modern and minimal",
    textUr: "مجھے مغل دور کی جالی کا کام دکھائیں مگر جدید اور کم سے کم",
    tagEn: "Style Search",
    tagUr: "اسٹائل سرچ",
  },
  {
    textEn: "A-line silhouette with vertical embroidery panels for a petite frame",
    textUr: "چھوٹے قد کے لیے اے لائن ڈیزائن عمودی کڑھائی کے ساتھ",
    tagEn: "Body-Aware",
    tagUr: "قد کے مطابق",
  },
];

const aiCapabilities = [
  {
    iconBg: colors.occasion.barat,
    icon: "✦",
    titleEn: "Co-Design with AI",
    titleUr: "اے آئی کے ساتھ ڈیزائن",
    descEn: "Describe your dream outfit in English or Urdu. AI generates 4 variations in seconds.",
    descUr: "اپنے خوابوں کا لباس بیان کریں۔ اے آئی سیکنڈوں میں 4 ڈیزائن بنائے گی۔",
  },
  {
    iconBg: colors.occasion.eid,
    icon: "◈",
    titleEn: "Style Advisor",
    titleUr: "اسٹائل مشیر",
    descEn: "Input your skin tone, body type, and event. Get personalized recommendations with explanations.",
    descUr: "اپنا رنگ، قد کاٹھ اور تقریب بتائیں۔ ذاتی نوعیت کی سفارشات حاصل کریں۔",
  },
  {
    iconBg: colors.occasion.walima,
    icon: "◆",
    titleEn: "Heritage Patterns",
    titleUr: "ورثے کے نمونے",
    descEn: "AI-tagged library of Sindhi ajrak, Punjabi phulkari, Balochi mirror work, Kashmiri aari.",
    descUr: "سندھی اجرک، پنجابی پھلکاری، بلوچی آئینہ کاری، کشمیری عاری ورک کا ذخیرہ۔",
  },
];

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-0.5 h-4 ml-0.5 align-middle bg-brand-gold"
        style={{ opacity: cursor ? 1 : 0 }}
      />
    </span>
  );
}

export default function AIStudioSection() {
  const { language } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activePrompt, setActivePrompt] = useState(0);

  // Cycle through prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrompt((p) => (p + 1) % prompts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="ai-studio"
      className="relative py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(92,26,142,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Label className="mb-4 block">
            {language === "en" ? "AI Design Studio" : "اے آئی ڈیزائن اسٹوڈیو"}
          </Label>
          <SectionHeading>
            {language === "en" ? (
              <>
                Describe Your <AccentText>Dream</AccentText>
                <br />
                Watch It Come Alive
              </>
            ) : (
              <>
                اپنا <AccentText>خواب</AccentText> بیان کریں
                <br />
                اسے زندہ ہوتے دیکھیں
              </>
            )}
          </SectionHeading>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Prompt Input Simulation */}
          <div className="bg-theme-elevated border border-theme rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-error" />
              <div className="w-2 h-2 rounded-full bg-warning" />
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="ml-2 font-mono text-[10px] text-theme-tertiary">
                ai-studio.balach-rahu.com
              </span>
            </div>

            {/* Prompt Area */}
            <div className="bg-theme-primary border border-theme rounded-lg p-4 mb-4 min-h-[100px]">
              <Label className="block mb-2">
                {language === "en"
                  ? prompts[activePrompt].tagEn
                  : prompts[activePrompt].tagUr}
              </Label>
              <p className="font-body text-sm text-theme-primary leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activePrompt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TypewriterText
                      text={
                        language === "en"
                          ? prompts[activePrompt].textEn
                          : prompts[activePrompt].textUr
                      }
                    />
                  </motion.span>
                </AnimatePresence>
              </p>
            </div>

            {/* Prompt Dots */}
            <div className="flex gap-2 justify-center">
              {prompts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePrompt(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-none ${
                    i === activePrompt
                      ? "bg-brand-gold w-6"
                      : "bg-theme-tertiary"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Generated Results Simulation */}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`${activePrompt}-${i}`}
                className="aspect-[3/4] rounded-lg overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg,
                      ${Object.values(colors.occasion)[i % 5]}20,
                      ${Object.values(colors.occasion)[(i + 1) % 5]}40)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, var(--text-primary) 0.5px, transparent 0)`,
                    backgroundSize: `${16 + i * 4}px ${16 + i * 4}px`,
                  }}
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <Badge>V{i + 1}</Badge>
                  <span className="font-mono text-[9px] text-theme-tertiary">
                    {(1.2 + i * 0.3).toFixed(1)}s
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiCapabilities.map((cap, i) => (
            <motion.div
              key={i}
              className="bg-theme-elevated border border-theme-subtle rounded-xl p-6 hover:border-brand-gold/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-lg"
                style={{
                  background: `${cap.iconBg}20`,
                  color: cap.iconBg,
                }}
              >
                {cap.icon}
              </div>
              <h4 className="font-display text-lg text-theme-primary mb-2">
                {language === "en" ? cap.titleEn : cap.titleUr}
              </h4>
              <Body className="text-sm">
                {language === "en" ? cap.descEn : cap.descUr}
              </Body>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

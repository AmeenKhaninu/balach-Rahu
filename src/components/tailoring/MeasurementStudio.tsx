"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useMeasurement } from "@/contexts/MeasurementContext";
import { t } from "@/lib/i18n";
import { Button, Input } from "@/components/ui";
import { SectionHeading, Body, Label, MonoText } from "@/components/ui";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";
import type { MeasurementStep, Measurements } from "@/lib/types";
import { DEFAULT_MEASUREMENTS } from "@/lib/types";

const STEP_ORDER: MeasurementStep[] = [
  "welcome",
  "camera-setup",
  "front-capture",
  "side-capture",
  "processing",
  "results",
];

const MEASUREMENT_FIELDS: {
  key: keyof Omit<Measurements, "unit">;
  i18nKey: string;
}[] = [
  { key: "bust", i18nKey: "measure.bust" },
  { key: "waist", i18nKey: "measure.waist" },
  { key: "hip", i18nKey: "measure.hip" },
  { key: "shoulder", i18nKey: "measure.shoulder" },
  { key: "armLength", i18nKey: "measure.armLength" },
  { key: "kameezLength", i18nKey: "measure.kameezLength" },
  { key: "trouserLength", i18nKey: "measure.trouserLength" },
  { key: "trouserWaist", i18nKey: "measure.trouserWaist" },
];

/** Simulated AI measurement result */
function generateSimulatedMeasurements(): Measurements {
  return {
    bust: 34 + Math.round(Math.random() * 8),
    waist: 28 + Math.round(Math.random() * 8),
    hip: 36 + Math.round(Math.random() * 8),
    shoulder: 14 + Math.round(Math.random() * 4),
    armLength: 22 + Math.round(Math.random() * 4),
    kameezLength: 38 + Math.round(Math.random() * 6),
    trouserLength: 36 + Math.round(Math.random() * 6),
    trouserWaist: 28 + Math.round(Math.random() * 8),
    unit: "inches",
  };
}

export default function MeasurementStudio() {
  const { language } = useTheme();
  const { createProfile } = useMeasurement();
  const [step, setStep] = useState<MeasurementStep>("welcome");
  const [measurements, setMeasurements] = useState<Measurements>(DEFAULT_MEASUREMENTS);
  const [isManual, setIsManual] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [saved, setSaved] = useState(false);

  const currentStepIndex = STEP_ORDER.indexOf(step);

  const handleStartCamera = useCallback(() => {
    setStep("camera-setup");
  }, []);

  const handleCaptureFront = useCallback(() => {
    setStep("front-capture");
    // Simulate capture delay
    setTimeout(() => setStep("side-capture"), 2000);
  }, []);

  const handleCaptureSide = useCallback(() => {
    setStep("side-capture");
    setTimeout(() => {
      setStep("processing");
      // Simulate AI processing
      setTimeout(() => {
        setMeasurements(generateSimulatedMeasurements());
        setStep("results");
      }, 2500);
    }, 2000);
  }, []);

  const handleManualEntry = useCallback(() => {
    setIsManual(true);
    setStep("results");
  }, []);

  const handleFieldChange = useCallback(
    (key: keyof Omit<Measurements, "unit">, value: string) => {
      const num = parseFloat(value) || 0;
      setMeasurements((prev) => ({ ...prev, [key]: num }));
    },
    []
  );

  const handleUnitToggle = useCallback(() => {
    setMeasurements((prev) => ({
      ...prev,
      unit: prev.unit === "inches" ? "cm" : "inches",
    }));
  }, []);

  const handleSaveProfile = useCallback(() => {
    const name = profileName.trim() || "My Sizes";
    createProfile(name, name, measurements, "average", "semi-fitted");
    setSaved(true);
  }, [profileName, measurements, createProfile]);

  const handleRetake = useCallback(() => {
    setStep("welcome");
    setMeasurements(DEFAULT_MEASUREMENTS);
    setIsManual(false);
    setSaved(false);
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center">
        <SectionHeading>
          {t("measure.title" as Parameters<typeof t>[0], language)}
        </SectionHeading>
        <Body className="text-theme-secondary mt-2 max-w-lg mx-auto">
          {t("measure.subtitle" as Parameters<typeof t>[0], language)}
        </Body>
      </motion.div>

      {/* Progress Steps */}
      <motion.div variants={staggerItem} className="flex items-center justify-center gap-2">
        {STEP_ORDER.map((s, i) => {
          const stepKey = `step.${
            s === "camera-setup"
              ? "cameraSetup"
              : s === "front-capture"
              ? "frontCapture"
              : s === "side-capture"
              ? "sideCapture"
              : s
          }` as Parameters<typeof t>[0];
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                  ${
                    i <= currentStepIndex
                      ? "bg-brand-gold text-neutral-900"
                      : "bg-[var(--surface-elevated)] text-theme-tertiary border border-[var(--border-subtle)]"
                  }
                `}
              >
                {i < currentStepIndex ? "✓" : i + 1}
              </div>
              {i < STEP_ORDER.length - 1 && (
                <div
                  className={`w-8 h-px transition-colors duration-500 ${
                    i < currentStepIndex ? "bg-brand-gold" : "bg-[var(--border-subtle)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Welcome */}
        {step === "welcome" && (
          <motion.div
            key="welcome"
            {...fadeInUp}
            className="text-center space-y-8"
          >
            {/* Camera Illustration */}
            <div className="mx-auto w-64 h-64 rounded-2xl bg-gradient-to-br from-brand-burgundy/10 to-brand-gold/10 border border-[var(--border-subtle)] flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gold">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <Body className="text-theme-secondary px-8">
                {t("measure.welcome" as Parameters<typeof t>[0], language)}
              </Body>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="lg" onClick={handleStartCamera}>
                {t("btn.getMeasured", language)}
              </Button>
              <Button variant="secondary" size="lg" onClick={handleManualEntry}>
                {t("measure.manualEntry" as Parameters<typeof t>[0], language)}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Camera Setup */}
        {step === "camera-setup" && (
          <motion.div
            key="camera-setup"
            {...fadeInUp}
            className="text-center space-y-6"
          >
            <div className="mx-auto w-80 h-96 rounded-2xl bg-neutral-900 border-2 border-brand-gold/30 relative overflow-hidden flex items-center justify-center">
              {/* Simulated camera viewfinder */}
              <div className="absolute inset-8 border-2 border-brand-gold/50 rounded-lg" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/70 text-xs font-mono">CAMERA</span>
              </div>
              {/* Body outline guide */}
              <svg
                viewBox="0 0 100 200"
                className="w-24 h-48 text-brand-gold/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <ellipse cx="50" cy="25" rx="15" ry="20" />
                <line x1="50" y1="45" x2="50" y2="110" />
                <line x1="50" y1="60" x2="20" y2="95" />
                <line x1="50" y1="60" x2="80" y2="95" />
                <line x1="50" y1="110" x2="30" y2="180" />
                <line x1="50" y1="110" x2="70" y2="180" />
              </svg>
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="text-brand-gold/80 text-xs">
                  {language === "en"
                    ? "Align yourself within the frame"
                    : "اپنے آپ کو فریم میں سیدھا کریں"}
                </span>
              </div>
            </div>
            <Button variant="gold" size="lg" onClick={handleCaptureFront}>
              {language === "en" ? "Capture Front View" : "سامنے کا منظر لیں"}
            </Button>
          </motion.div>
        )}

        {/* Front Capture */}
        {step === "front-capture" && (
          <motion.div
            key="front-capture"
            {...fadeInUp}
            className="text-center space-y-6"
          >
            <div className="mx-auto w-80 h-96 rounded-2xl bg-neutral-900 border-2 border-green-500/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-8 border-2 border-green-500/60 rounded-lg" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-xs font-mono">CAPTURING</span>
              </div>
              <motion.div
                className="w-60 h-80 rounded-lg bg-gradient-to-b from-brand-gold/10 to-brand-burgundy/10"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="text-green-400 text-xs">
                  {t("measure.frontCapture" as Parameters<typeof t>[0], language)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <Body className="text-green-400">
                {language === "en" ? "Hold still..." : "ایسے ہی رہیں..."}
              </Body>
            </div>
          </motion.div>
        )}

        {/* Side Capture */}
        {step === "side-capture" && (
          <motion.div
            key="side-capture"
            {...fadeInUp}
            className="text-center space-y-6"
          >
            <div className="mx-auto w-80 h-96 rounded-2xl bg-neutral-900 border-2 border-blue-500/50 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-8 border-2 border-blue-500/60 rounded-lg" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-400 text-xs font-mono">SIDE VIEW</span>
              </div>
              <svg
                viewBox="0 0 100 200"
                className="w-16 h-48 text-blue-400/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <ellipse cx="50" cy="25" rx="12" ry="20" />
                <path d="M50 45 Q60 70 50 110" />
                <path d="M50 60 Q70 70 65 95" />
                <path d="M50 110 Q55 150 45 180" />
                <path d="M50 110 Q55 150 60 180" />
              </svg>
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="text-blue-400 text-xs">
                  {t("measure.sideCapture" as Parameters<typeof t>[0], language)}
                </span>
              </div>
            </div>
            <Button variant="gold" size="lg" onClick={handleCaptureSide}>
              {language === "en" ? "Capture Side View" : "پہلو کا منظر لیں"}
            </Button>
          </motion.div>
        )}

        {/* Processing */}
        {step === "processing" && (
          <motion.div
            key="processing"
            {...fadeInUp}
            className="text-center space-y-8"
          >
            <div className="mx-auto w-64 h-64 rounded-full bg-gradient-to-br from-brand-burgundy/5 to-brand-gold/10 border border-[var(--border-subtle)] flex items-center justify-center relative">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-brand-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ borderTopColor: "var(--color-brand-gold)" }}
              />
              <div className="text-center space-y-3">
                <motion.div
                  className="text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✂️
                </motion.div>
                <Body className="text-theme-secondary text-sm">
                  {t("measure.processing" as Parameters<typeof t>[0], language)}
                </Body>
              </div>
            </div>

            {/* Processing Steps Animation */}
            <div className="max-w-xs mx-auto space-y-3">
              {[
                language === "en" ? "Detecting body landmarks..." : "جسمانی نشانیاں تلاش ہو رہی ہیں...",
                language === "en" ? "Calculating proportions..." : "تناسب کا حساب ہو رہا ہے...",
                language === "en" ? "Generating measurements..." : "ناپ تیار ہو رہے ہیں...",
              ].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.8 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center"
                    animate={{ backgroundColor: ["rgba(212,165,116,0.2)", "rgba(212,165,116,0.6)", "rgba(212,165,116,0.2)"] }}
                    transition={{ delay: i * 0.8, duration: 1.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  </motion.div>
                  <span className="text-sm text-theme-secondary">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results / Manual Entry */}
        {step === "results" && (
          <motion.div
            key="results"
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="text-center">
              <SectionHeading>
                {t("measure.results" as Parameters<typeof t>[0], language)}
              </SectionHeading>
              {!isManual && (
                <Body className="text-theme-secondary mt-2">
                  {language === "en"
                    ? "AI-powered measurements. Review and adjust as needed."
                    : "اے آئی سے حاصل شدہ ناپ۔ ضرورت کے مطابق تبدیل کریں۔"}
                </Body>
              )}
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center justify-center gap-4">
              <Label>{language === "en" ? "Unit" : "اکائی"}</Label>
              <button
                onClick={handleUnitToggle}
                className="flex items-center bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-full p-0.5 cursor-pointer"
              >
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
                    measurements.unit === "inches"
                      ? "bg-brand-gold text-neutral-900 font-bold"
                      : "text-theme-tertiary"
                  }`}
                >
                  {t("measure.inches" as Parameters<typeof t>[0], language)}
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
                    measurements.unit === "cm"
                      ? "bg-brand-gold text-neutral-900 font-bold"
                      : "text-theme-tertiary"
                  }`}
                >
                  {t("measure.cm" as Parameters<typeof t>[0], language)}
                </span>
              </button>
            </div>

            {/* Measurements Grid + Body Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
              {/* Left: Upper body measurements */}
              <div className="space-y-4">
                {MEASUREMENT_FIELDS.slice(0, 4).map(({ key, i18nKey }) => (
                  <div key={key} className="flex items-center gap-4">
                    <Label className="w-32 text-right shrink-0">
                      {t(i18nKey as Parameters<typeof t>[0], language)}
                    </Label>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={measurements[key] || ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md font-mono text-sm text-theme-primary bg-[var(--surface-elevated)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all duration-300"
                        min={0}
                        step={0.5}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-theme-tertiary font-mono">
                        {measurements.unit === "inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center: Body Visualization */}
              <div className="hidden lg:flex justify-center">
                <div className="w-40 h-80 relative">
                  <svg
                    viewBox="0 0 120 280"
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {/* Head */}
                    <ellipse cx="60" cy="28" rx="16" ry="20" className="text-brand-gold/50" />
                    {/* Neck */}
                    <line x1="60" y1="48" x2="60" y2="58" className="text-brand-gold/50" />
                    {/* Shoulders */}
                    <line x1="30" y1="65" x2="90" y2="65" className="text-brand-gold/60" strokeWidth="2" />
                    {/* Torso */}
                    <path d="M30 65 Q28 100 35 130 Q40 140 60 145 Q80 140 85 130 Q92 100 90 65" className="text-brand-gold/30" />
                    {/* Bust line */}
                    <line x1="28" y1="82" x2="92" y2="82" className="text-brand-burgundy/60" strokeDasharray="3 3" strokeWidth="1" />
                    {/* Waist line */}
                    <line x1="35" y1="108" x2="85" y2="108" className="text-brand-burgundy/60" strokeDasharray="3 3" strokeWidth="1" />
                    {/* Hip line */}
                    <line x1="30" y1="140" x2="90" y2="140" className="text-brand-burgundy/60" strokeDasharray="3 3" strokeWidth="1" />
                    {/* Arms */}
                    <path d="M30 65 Q15 90 12 120" className="text-brand-gold/40" />
                    <path d="M90 65 Q105 90 108 120" className="text-brand-gold/40" />
                    {/* Legs */}
                    <path d="M45 145 Q42 190 40 260" className="text-brand-gold/40" />
                    <path d="M75 145 Q78 190 80 260" className="text-brand-gold/40" />
                    {/* Measurement labels */}
                    <text x="98" y="84" fontSize="7" className="fill-brand-burgundy/80 font-mono">
                      {measurements.bust > 0 ? `${measurements.bust}"` : ""}
                    </text>
                    <text x="90" y="110" fontSize="7" className="fill-brand-burgundy/80 font-mono">
                      {measurements.waist > 0 ? `${measurements.waist}"` : ""}
                    </text>
                    <text x="95" y="142" fontSize="7" className="fill-brand-burgundy/80 font-mono">
                      {measurements.hip > 0 ? `${measurements.hip}"` : ""}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right: Lower body measurements */}
              <div className="space-y-4">
                {MEASUREMENT_FIELDS.slice(4).map(({ key, i18nKey }) => (
                  <div key={key} className="flex items-center gap-4">
                    <Label className="w-32 text-right shrink-0">
                      {t(i18nKey as Parameters<typeof t>[0], language)}
                    </Label>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={measurements[key] || ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md font-mono text-sm text-theme-primary bg-[var(--surface-elevated)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all duration-300"
                        min={0}
                        step={0.5}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-theme-tertiary font-mono">
                        {measurements.unit === "inches" ? "in" : "cm"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Profile */}
            <div className="max-w-md mx-auto space-y-4 pt-4">
              {!saved ? (
                <>
                  <Input
                    label={language === "en" ? "Profile Name" : "پروفائل کا نام"}
                    placeholder={language === "en" ? "e.g., My Sizes, Ammi's Sizes" : "مثلاً میرے ناپ، امی کے ناپ"}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="gold" size="lg" onClick={handleSaveProfile}>
                      {t("measure.saveProfile" as Parameters<typeof t>[0], language)}
                    </Button>
                    {!isManual && (
                      <Button variant="ghost" size="lg" onClick={handleRetake}>
                        {t("measure.retake" as Parameters<typeof t>[0], language)}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 rounded-xl bg-green-500/10 border border-green-500/30"
                >
                  <div className="text-3xl mb-2">✓</div>
                  <Body className="text-green-600 font-medium">
                    {language === "en"
                      ? "Profile saved successfully!"
                      : "پروفائل کامیابی سے محفوظ ہو گیا!"}
                  </Body>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

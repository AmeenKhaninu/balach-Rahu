"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useMeasurement } from "@/contexts/MeasurementContext";
import { t } from "@/lib/i18n";
import { Button, Input } from "@/components/ui";
import { SectionHeading, Body, Label, CardHeading, MonoText } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/motion";
import type { Measurements, DarziShareData } from "@/lib/types";

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

function QRCodePlaceholder({ code }: { code: string }) {
  return (
    <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-neutral-200">
      {/* Simulated QR pattern */}
      <div className="grid grid-cols-8 gap-0.5 w-32 h-32">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className={`w-full aspect-square rounded-[1px] ${
              Math.random() > 0.45 ? "bg-neutral-900" : "bg-white"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-neutral-500 font-mono">{code}</span>
    </div>
  );
}

function ShareCard({
  shareData,
  language,
}: {
  shareData: DarziShareData;
  language: "en" | "ur";
}) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = useCallback(() => {
    const text = `Balach Rahu - ${shareData.profileName}\nShare Code: ${shareData.shareCode}\n\n${MEASUREMENT_FIELDS.map(
      (f) => `${f.key}: ${shareData.measurements[f.key]}"`
    ).join("\n")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [shareData]);

  const whatsappText = encodeURIComponent(
    `*Balach Rahu - ${shareData.profileName}*\nShare Code: ${shareData.shareCode}\n\n${MEASUREMENT_FIELDS.map(
      (f) => `${f.key}: ${shareData.measurements[f.key]}"`
    ).join("\n")}`
  );

  return (
    <motion.div
      {...fadeInUp}
      className="p-6 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <CardHeading>{shareData.profileName}</CardHeading>
          <div className="flex items-center gap-2 mt-1">
            <Label>{t("darzi.shareCode" as Parameters<typeof t>[0], language)}</Label>
            <MonoText className="text-brand-gold text-sm font-bold">
              {shareData.shareCode}
            </MonoText>
          </div>
        </div>
        <span className="text-[10px] text-theme-tertiary">
          {t("darzi.expires" as Parameters<typeof t>[0], language)}
        </span>
      </div>

      {/* Measurements summary */}
      <div className="grid grid-cols-4 gap-3">
        {MEASUREMENT_FIELDS.map(({ key, i18nKey }) => (
          <div key={key} className="text-center">
            <span className="text-[9px] text-theme-tertiary block">
              {t(i18nKey as Parameters<typeof t>[0], language)}
            </span>
            <MonoText className="text-sm font-bold">
              {shareData.measurements[key] > 0
                ? `${shareData.measurements[key]}"`
                : "—"}
            </MonoText>
          </div>
        ))}
      </div>

      {/* QR Code */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <QRCodePlaceholder code={shareData.shareCode} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Actions */}
      <div className="flex items-center gap-3">
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="primary" size="sm" className="w-full">
            <span className="mr-1">📱</span>
            {t("darzi.whatsapp" as Parameters<typeof t>[0], language)}
          </Button>
        </a>

        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => setShowQR(!showQR)}
        >
          <span className="mr-1">⊞</span>
          {t("darzi.qrCode" as Parameters<typeof t>[0], language)}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={handleCopy}
        >
          {copied ? "✓" : "📋"}{" "}
          {copied
            ? language === "en"
              ? "Copied!"
              : "کاپی ہو گیا!"
            : t("darzi.copyLink" as Parameters<typeof t>[0], language)}
        </Button>
      </div>
    </motion.div>
  );
}

export default function DarziPanel() {
  const { language } = useTheme();
  const {
    profiles,
    activeProfileId,
    activeProfile,
    generateShareData,
    shareLinks,
    createProfile,
  } = useMeasurement();

  const [manualMeasurements, setManualMeasurements] = useState<Measurements>({
    bust: 0,
    waist: 0,
    hip: 0,
    shoulder: 0,
    armLength: 0,
    kameezLength: 0,
    trouserLength: 0,
    trouserWaist: 0,
    unit: "inches",
  });
  const [manualName, setManualName] = useState("");
  const [showManualForm, setShowManualForm] = useState(false);
  const [latestShare, setLatestShare] = useState<DarziShareData | null>(null);

  const handleManualChange = useCallback(
    (key: keyof Omit<Measurements, "unit">, value: string) => {
      setManualMeasurements((prev) => ({
        ...prev,
        [key]: parseFloat(value) || 0,
      }));
    },
    []
  );

  const handleManualSave = useCallback(() => {
    const name = manualName.trim() || "Darzi Entry";
    const id = createProfile(name, name, manualMeasurements, "average", "semi-fitted");
    const data = generateShareData(id);
    if (data) setLatestShare(data);
    setShowManualForm(false);
    setManualName("");
  }, [manualName, manualMeasurements, createProfile, generateShareData]);

  const handleShareExisting = useCallback(() => {
    if (!activeProfileId) return;
    const data = generateShareData(activeProfileId);
    if (data) setLatestShare(data);
  }, [activeProfileId, generateShareData]);

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
          {t("darzi.title" as Parameters<typeof t>[0], language)}
        </SectionHeading>
        <Body className="text-theme-secondary mt-2 max-w-lg mx-auto">
          {t("darzi.subtitle" as Parameters<typeof t>[0], language)}
        </Body>
      </motion.div>

      {/* Actions */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Share existing profile */}
        {activeProfile && (
          <Button variant="gold" size="lg" onClick={handleShareExisting}>
            <span className="mr-2">📤</span>
            {t("darzi.share" as Parameters<typeof t>[0], language)} — {activeProfile.name}
          </Button>
        )}

        {/* Manual entry */}
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setShowManualForm(!showManualForm)}
        >
          <span className="mr-2">✂️</span>
          {language === "en"
            ? "Enter Tailor's Numbers"
            : "درزی کے ناپ درج کریں"}
        </Button>
      </motion.div>

      {/* Manual Entry Form */}
      <AnimatePresence>
        {showManualForm && (
          <motion.div
            {...fadeInUp}
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-[var(--surface-elevated)] border border-brand-gold/30 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <span className="text-xl">✂️</span>
              </div>
              <div>
                <CardHeading>
                  {language === "en"
                    ? "Tailor's Measurements"
                    : "درزی کے ناپ"}
                </CardHeading>
                <Body className="text-theme-tertiary text-xs">
                  {language === "en"
                    ? "Enter the measurements from your trusted tailor"
                    : "اپنے معتبر درزی کے ناپ یہاں درج کریں"}
                </Body>
              </div>
            </div>

            <Input
              label={language === "en" ? "Label (e.g., Ammi, Baji)" : "نام (مثلاً امی، باجی)"}
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder={language === "en" ? "Who are these measurements for?" : "یہ ناپ کس کے لیے ہیں؟"}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MEASUREMENT_FIELDS.map(({ key, i18nKey }) => (
                <div key={key}>
                  <label className="text-[10px] text-theme-tertiary block mb-1">
                    {t(i18nKey as Parameters<typeof t>[0], language)}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={manualMeasurements[key] || ""}
                      onChange={(e) => handleManualChange(key, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-md font-mono text-sm text-theme-primary bg-[var(--surface-base)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                      min={0}
                      step={0.5}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-theme-tertiary font-mono">
                      in
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="gold" size="md" onClick={handleManualSave}>
                {language === "en" ? "Save & Generate Share Link" : "محفوظ کریں اور شیئر لنک بنائیں"}
              </Button>
              <Button variant="ghost" size="md" onClick={() => setShowManualForm(false)}>
                {t("btn.cancel", language)}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Latest Share */}
      {latestShare && (
        <motion.div variants={staggerItem}>
          <ShareCard shareData={latestShare} language={language} />
        </motion.div>
      )}

      {/* Previous Shares */}
      {shareLinks.length > 1 && (
        <motion.div variants={staggerItem} className="space-y-4">
          <Label>
            {language === "en" ? "Previous Shares" : "پچھلے شیئرز"}
          </Label>
          <div className="space-y-4">
            {shareLinks
              .filter((s) => s.shareCode !== latestShare?.shareCode)
              .reverse()
              .map((share) => (
                <ShareCard
                  key={share.shareCode}
                  shareData={share}
                  language={language}
                />
              ))}
          </div>
        </motion.div>
      )}

      {/* Info Box */}
      <motion.div
        variants={staggerItem}
        className="max-w-2xl mx-auto p-6 rounded-xl bg-brand-burgundy/5 border border-brand-burgundy/20"
      >
        <div className="flex gap-4">
          <div className="w-10 h-10 shrink-0 rounded-full bg-brand-burgundy/10 flex items-center justify-center">
            <span className="text-brand-burgundy">ℹ</span>
          </div>
          <div className="space-y-2">
            <CardHeading className="text-sm">
              {language === "en" ? "How Darzi Share Works" : "درزی شیئر کیسے کام کرتا ہے"}
            </CardHeading>
            <Body className="text-theme-secondary text-xs leading-relaxed">
              {language === "en"
                ? "Share your measurements directly with your trusted tailor via WhatsApp or QR code. The share code expires in 7 days for privacy. Your tailor can use these digital measurements to create perfectly fitted garments without an in-person visit."
                : "اپنے ناپ اپنے معتبر درزی کو واٹس ایپ یا کیو آر کوڈ کے ذریعے شیئر کریں۔ رازداری کے لیے شیئر کوڈ 7 دنوں میں ختم ہو جاتا ہے۔ آپ کا درزی ان ڈیجیٹل ناپ کو استعمال کرکے بغیر ملاقات کے بالکل فٹ لباس بنا سکتا ہے۔"}
            </Body>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

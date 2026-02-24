"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useMeasurement } from "@/contexts/MeasurementContext";
import { t } from "@/lib/i18n";
import { Button, Input } from "@/components/ui";
import { SectionHeading, Body, Label, CardHeading, MonoText } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/motion";
import type { BodyType, FitType, Measurements } from "@/lib/types";
import { DEFAULT_MEASUREMENTS } from "@/lib/types";

const BODY_TYPES: { value: BodyType; i18nKey: string }[] = [
  { value: "slim", i18nKey: "body.slim" },
  { value: "athletic", i18nKey: "body.athletic" },
  { value: "average", i18nKey: "body.average" },
  { value: "curvy", i18nKey: "body.curvy" },
  { value: "plus", i18nKey: "body.plus" },
];

const FIT_PREFS: { value: FitType; i18nKey: string }[] = [
  { value: "loose", i18nKey: "fit.loose" },
  { value: "semi-fitted", i18nKey: "fit.semi-fitted" },
  { value: "fitted", i18nKey: "fit.fitted" },
];

const MEASUREMENT_LABELS: { key: keyof Omit<Measurements, "unit">; i18nKey: string }[] = [
  { key: "bust", i18nKey: "measure.bust" },
  { key: "waist", i18nKey: "measure.waist" },
  { key: "hip", i18nKey: "measure.hip" },
  { key: "shoulder", i18nKey: "measure.shoulder" },
  { key: "armLength", i18nKey: "measure.armLength" },
  { key: "kameezLength", i18nKey: "measure.kameezLength" },
  { key: "trouserLength", i18nKey: "measure.trouserLength" },
  { key: "trouserWaist", i18nKey: "measure.trouserWaist" },
];

export default function ProfileManager() {
  const { language } = useTheme();
  const {
    profiles,
    activeProfileId,
    setActiveProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useMeasurement();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New profile form state
  const [formName, setFormName] = useState("");
  const [formNameUr, setFormNameUr] = useState("");
  const [formBodyType, setFormBodyType] = useState<BodyType>("average");
  const [formFit, setFormFit] = useState<FitType>("semi-fitted");
  const [formMeasurements, setFormMeasurements] = useState<Measurements>(DEFAULT_MEASUREMENTS);

  const resetForm = useCallback(() => {
    setFormName("");
    setFormNameUr("");
    setFormBodyType("average");
    setFormFit("semi-fitted");
    setFormMeasurements(DEFAULT_MEASUREMENTS);
    setIsCreating(false);
    setEditingId(null);
  }, []);

  const handleCreateProfile = useCallback(() => {
    if (!formName.trim()) return;
    createProfile(
      formName.trim(),
      formNameUr.trim() || formName.trim(),
      formMeasurements,
      formBodyType,
      formFit
    );
    resetForm();
  }, [formName, formNameUr, formMeasurements, formBodyType, formFit, createProfile, resetForm]);

  const handleStartEdit = useCallback(
    (profileId: string) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (!profile) return;
      setEditingId(profileId);
      setFormName(profile.name);
      setFormNameUr(profile.nameUr);
      setFormBodyType(profile.bodyType);
      setFormFit(profile.fitPreference);
      setFormMeasurements(profile.measurements);
    },
    [profiles]
  );

  const handleSaveEdit = useCallback(() => {
    if (!editingId) return;
    updateProfile(editingId, {
      name: formName.trim(),
      nameUr: formNameUr.trim() || formName.trim(),
      bodyType: formBodyType,
      fitPreference: formFit,
      measurements: formMeasurements,
    });
    resetForm();
  }, [editingId, formName, formNameUr, formBodyType, formFit, formMeasurements, updateProfile, resetForm]);

  const handleMeasurementChange = useCallback(
    (key: keyof Omit<Measurements, "unit">, value: string) => {
      setFormMeasurements((prev) => ({
        ...prev,
        [key]: parseFloat(value) || 0,
      }));
    },
    []
  );

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
          {t("profile.title" as Parameters<typeof t>[0], language)}
        </SectionHeading>
        <Body className="text-theme-secondary mt-2 max-w-lg mx-auto">
          {t("profile.subtitle" as Parameters<typeof t>[0], language)}
        </Body>
      </motion.div>

      {/* Profile Cards */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`
                p-6 rounded-xl border transition-all duration-300 cursor-pointer
                ${
                  activeProfileId === profile.id
                    ? "bg-brand-gold/10 border-brand-gold shadow-lg"
                    : "bg-[var(--surface-elevated)] border-[var(--border-subtle)] hover:border-brand-gold/40"
                }
              `}
              onClick={() => setActiveProfile(profile.id)}
            >
              {/* Profile header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <CardHeading>{profile.name}</CardHeading>
                  {profile.nameUr !== profile.name && (
                    <span className="text-sm text-theme-tertiary font-urdu">
                      {profile.nameUr}
                    </span>
                  )}
                </div>
                {activeProfileId === profile.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center"
                  >
                    <span className="text-neutral-900 text-xs font-bold">✓</span>
                  </motion.div>
                )}
              </div>

              {/* Body type + fit */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-brand-burgundy/10 text-brand-burgundy text-[10px] uppercase tracking-wider font-bold">
                  {t(`body.${profile.bodyType}` as Parameters<typeof t>[0], language)}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-wider font-bold">
                  {t(`fit.${profile.fitPreference}` as Parameters<typeof t>[0], language)}
                </span>
              </div>

              {/* Key measurements */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: t("measure.bust" as Parameters<typeof t>[0], language), val: profile.measurements.bust },
                  { label: t("measure.waist" as Parameters<typeof t>[0], language), val: profile.measurements.waist },
                  { label: t("measure.hip" as Parameters<typeof t>[0], language), val: profile.measurements.hip },
                  { label: t("measure.shoulder" as Parameters<typeof t>[0], language), val: profile.measurements.shoulder },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[10px] text-theme-tertiary">{label}</span>
                    <MonoText className="text-xs">
                      {val > 0 ? `${val}"` : "—"}
                    </MonoText>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(profile.id);
                  }}
                  className="text-[10px] uppercase tracking-wider text-theme-tertiary hover:text-brand-gold transition-colors cursor-pointer bg-transparent border-none"
                >
                  {t("profile.edit" as Parameters<typeof t>[0], language)}
                </button>
                <span className="text-theme-tertiary/30">|</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProfile(profile.id);
                  }}
                  className="text-[10px] uppercase tracking-wider text-theme-tertiary hover:text-red-500 transition-colors cursor-pointer bg-transparent border-none"
                >
                  {t("profile.delete" as Parameters<typeof t>[0], language)}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Add New Profile Card */}
          {!isCreating && !editingId && (
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsCreating(true)}
              className="p-6 rounded-xl border-2 border-dashed border-[var(--border-subtle)] hover:border-brand-gold/50 bg-transparent cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[200px] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <span className="text-brand-gold text-2xl">+</span>
              </div>
              <span className="text-sm text-theme-secondary">
                {t("profile.addNew" as Parameters<typeof t>[0], language)}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Create / Edit Form */}
      <AnimatePresence>
        {(isCreating || editingId) && (
          <motion.div
            {...fadeInUp}
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-6"
          >
            <CardHeading>
              {editingId
                ? t("profile.edit" as Parameters<typeof t>[0], language)
                : t("profile.addNew" as Parameters<typeof t>[0], language)}
            </CardHeading>

            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={language === "en" ? "Profile Name (English)" : "پروفائل کا نام (انگریزی)"}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g., My Sizes"
              />
              <Input
                label={language === "en" ? "Profile Name (Urdu)" : "پروفائل کا نام (اردو)"}
                value={formNameUr}
                onChange={(e) => setFormNameUr(e.target.value)}
                placeholder="مثلاً میرے ناپ"
                dir="rtl"
              />
            </div>

            {/* Body type */}
            <div className="space-y-2">
              <Label>{t("profile.bodyType" as Parameters<typeof t>[0], language)}</Label>
              <div className="flex flex-wrap gap-2">
                {BODY_TYPES.map(({ value, i18nKey }) => (
                  <button
                    key={value}
                    onClick={() => setFormBodyType(value)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-body cursor-pointer border transition-all duration-300
                      ${
                        formBodyType === value
                          ? "bg-brand-gold text-neutral-900 border-brand-gold font-bold"
                          : "bg-transparent border-[var(--border-subtle)] text-theme-secondary hover:border-brand-gold/50"
                      }
                    `}
                  >
                    {t(i18nKey as Parameters<typeof t>[0], language)}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit preference */}
            <div className="space-y-2">
              <Label>{t("profile.fitPreference" as Parameters<typeof t>[0], language)}</Label>
              <div className="flex flex-wrap gap-2">
                {FIT_PREFS.map(({ value, i18nKey }) => (
                  <button
                    key={value}
                    onClick={() => setFormFit(value)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-body cursor-pointer border transition-all duration-300
                      ${
                        formFit === value
                          ? "bg-brand-burgundy text-brand-cream border-brand-burgundy font-bold"
                          : "bg-transparent border-[var(--border-subtle)] text-theme-secondary hover:border-brand-burgundy/50"
                      }
                    `}
                  >
                    {t(i18nKey as Parameters<typeof t>[0], language)}
                  </button>
                ))}
              </div>
            </div>

            {/* Measurements */}
            <div className="space-y-3">
              <Label>{language === "en" ? "Measurements (inches)" : "ناپ (انچ)"}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MEASUREMENT_LABELS.map(({ key, i18nKey }) => (
                  <div key={key}>
                    <label className="text-[10px] text-theme-tertiary block mb-1">
                      {t(i18nKey as Parameters<typeof t>[0], language)}
                    </label>
                    <input
                      type="number"
                      value={formMeasurements[key] || ""}
                      onChange={(e) => handleMeasurementChange(key, e.target.value)}
                      className="w-full px-3 py-2 rounded-md font-mono text-sm text-theme-primary bg-[var(--surface-base)] border border-[var(--border-subtle)] focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                      min={0}
                      step={0.5}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="gold"
                size="md"
                onClick={editingId ? handleSaveEdit : handleCreateProfile}
              >
                {t("btn.save", language)}
              </Button>
              <Button variant="ghost" size="md" onClick={resetForm}>
                {t("btn.cancel", language)}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {profiles.length === 0 && !isCreating && (
        <motion.div variants={staggerItem} className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-gold/10 flex items-center justify-center">
            <span className="text-3xl text-brand-gold/60">📐</span>
          </div>
          <Body className="text-theme-tertiary">
            {t("profile.noProfiles" as Parameters<typeof t>[0], language)}
          </Body>
        </motion.div>
      )}
    </motion.div>
  );
}

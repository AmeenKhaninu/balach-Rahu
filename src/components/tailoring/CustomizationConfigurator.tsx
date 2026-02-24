"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useMeasurement } from "@/contexts/MeasurementContext";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui";
import { SectionHeading, Body, Label, CardHeading } from "@/components/ui";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type {
  NecklineShape,
  SleeveStyle,
  TrouserCut,
  DupattaStyle,
  LiningOption,
} from "@/lib/types";

interface OptionItem<T extends string> {
  value: T;
  i18nKey: string;
  icon: string;
}

const NECKLINES: OptionItem<NecklineShape>[] = [
  { value: "round", i18nKey: "neckline.round", icon: "◯" },
  { value: "v-neck", i18nKey: "neckline.v-neck", icon: "∨" },
  { value: "boat", i18nKey: "neckline.boat", icon: "⌒" },
  { value: "sweetheart", i18nKey: "neckline.sweetheart", icon: "♡" },
  { value: "collar", i18nKey: "neckline.collar", icon: "⌓" },
  { value: "ban", i18nKey: "neckline.ban", icon: "▬" },
  { value: "square", i18nKey: "neckline.square", icon: "□" },
];

const SLEEVES: OptionItem<SleeveStyle>[] = [
  { value: "full", i18nKey: "sleeve.full", icon: "━━" },
  { value: "three-quarter", i18nKey: "sleeve.three-quarter", icon: "━─" },
  { value: "half", i18nKey: "sleeve.half", icon: "━" },
  { value: "bell", i18nKey: "sleeve.bell", icon: "╲╱" },
  { value: "cap", i18nKey: "sleeve.cap", icon: "╲" },
  { value: "sleeveless", i18nKey: "sleeve.sleeveless", icon: "·" },
];

const TROUSERS: OptionItem<TrouserCut>[] = [
  { value: "straight", i18nKey: "trouser.straight", icon: "║" },
  { value: "sharara", i18nKey: "trouser.sharara", icon: "╲╱" },
  { value: "gharara", i18nKey: "trouser.gharara", icon: "╱╲╱" },
  { value: "tulip-shalwar", i18nKey: "trouser.tulip-shalwar", icon: "◠" },
  { value: "palazzo", i18nKey: "trouser.palazzo", icon: "╱  ╲" },
  { value: "cigarette", i18nKey: "trouser.cigarette", icon: "│" },
];

const DUPATTAS: OptionItem<DupattaStyle>[] = [
  { value: "none", i18nKey: "dupatta.none", icon: "✕" },
  { value: "matching", i18nKey: "dupatta.matching", icon: "≡" },
  { value: "contrast", i18nKey: "dupatta.contrast", icon: "◐" },
  { value: "net", i18nKey: "dupatta.net", icon: "▦" },
  { value: "organza", i18nKey: "dupatta.organza", icon: "◇" },
];

const LININGS: OptionItem<LiningOption>[] = [
  { value: "none", i18nKey: "lining.none", icon: "─" },
  { value: "silk", i18nKey: "lining.silk", icon: "✧" },
  { value: "cotton", i18nKey: "lining.cotton", icon: "○" },
  { value: "viscose", i18nKey: "lining.viscose", icon: "◎" },
];

function OptionSelector<T extends string>({
  label,
  options,
  selected,
  onSelect,
  language,
}: {
  label: string;
  options: OptionItem<T>[];
  selected: T;
  onSelect: (value: T) => void;
  language: "en" | "ur";
}) {
  return (
    <motion.div variants={staggerItem} className="space-y-3">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`
              px-4 py-3 rounded-lg border cursor-pointer transition-all duration-300 min-w-[100px]
              flex flex-col items-center gap-1.5
              ${
                selected === opt.value
                  ? "bg-brand-gold/15 border-brand-gold text-theme-primary shadow-sm"
                  : "bg-[var(--surface-elevated)] border-[var(--border-subtle)] text-theme-secondary hover:border-brand-gold/50"
              }
            `}
          >
            <span className="text-lg leading-none">{opt.icon}</span>
            <span className="text-[11px] font-body whitespace-nowrap">
              {t(opt.i18nKey as Parameters<typeof t>[0], language)}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/** Garment SVG preview */
function GarmentPreview({
  neckline,
  sleeve,
  trouserCut,
  dupatta,
}: {
  neckline: NecklineShape;
  sleeve: SleeveStyle;
  trouserCut: TrouserCut;
  dupatta: DupattaStyle;
}) {
  const neckPaths: Record<NecklineShape, string> = {
    round: "M40 55 Q60 65 80 55",
    "v-neck": "M40 55 L60 72 L80 55",
    boat: "M35 55 Q60 58 85 55",
    sweetheart: "M40 55 Q48 65 60 60 Q72 65 80 55",
    collar: "M38 50 L42 58 Q60 62 78 58 L82 50",
    ban: "M42 52 Q60 55 78 52 Q60 58 42 52",
    square: "M42 55 L42 65 L78 65 L78 55",
  };

  const sleeveLeft: Record<SleeveStyle, string> = {
    full: "M30 65 L8 130",
    "three-quarter": "M30 65 L15 110",
    half: "M30 65 L20 95",
    bell: "M30 65 L18 105 Q10 115 5 115",
    cap: "M30 65 Q22 75 25 80",
    sleeveless: "",
  };

  const sleeveRight: Record<SleeveStyle, string> = {
    full: "M90 65 L112 130",
    "three-quarter": "M90 65 L105 110",
    half: "M90 65 L100 95",
    bell: "M90 65 L102 105 Q110 115 115 115",
    cap: "M90 65 Q98 75 95 80",
    sleeveless: "",
  };

  const trouserPath: Record<TrouserCut, string> = {
    straight: "M42 155 L40 260 M78 155 L80 260",
    sharara: "M42 155 L42 200 Q35 240 20 265 M78 155 L78 200 Q85 240 100 265",
    gharara: "M42 155 L42 190 Q30 220 15 260 M78 155 L78 190 Q90 220 105 260",
    "tulip-shalwar": "M42 155 Q38 180 45 210 Q50 240 48 260 M78 155 Q82 180 75 210 Q70 240 72 260",
    palazzo: "M42 155 Q35 200 25 265 M78 155 Q85 200 95 265",
    cigarette: "M46 155 L45 260 M74 155 L75 260",
  };

  return (
    <motion.div
      className="w-full max-w-[200px] mx-auto"
      layout
    >
      <svg
        viewBox="0 0 120 280"
        className="w-full h-auto"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Dupatta */}
        {dupatta !== "none" && (
          <motion.path
            d={
              dupatta === "net" || dupatta === "organza"
                ? "M30 52 Q15 80 10 130 Q8 160 12 190"
                : "M30 52 Q20 80 15 130 Q12 155 18 180"
            }
            className={
              dupatta === "contrast"
                ? "stroke-brand-burgundy/60"
                : "stroke-brand-gold/50"
            }
            strokeWidth="6"
            strokeDasharray={
              dupatta === "net" ? "4 4" : dupatta === "organza" ? "2 6" : "none"
            }
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Kameez body */}
        <motion.path
          d="M30 65 Q28 100 32 130 Q35 145 42 155 L78 155 Q85 145 88 130 Q92 100 90 65"
          className="stroke-theme-primary/70"
          fill="var(--surface-elevated)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Neckline */}
        <motion.path
          d={neckPaths[neckline]}
          className="stroke-brand-gold"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        {/* Sleeves */}
        {sleeveLeft[sleeve] && (
          <motion.path
            d={sleeveLeft[sleeve]}
            className="stroke-theme-primary/60"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        )}
        {sleeveRight[sleeve] && (
          <motion.path
            d={sleeveRight[sleeve]}
            className="stroke-theme-primary/60"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        )}

        {/* Trousers */}
        <motion.path
          d={trouserPath[trouserCut]}
          className="stroke-theme-primary/50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Decorative hem line */}
        <motion.line
          x1="42"
          y1="155"
          x2="78"
          y2="155"
          className="stroke-brand-gold/40"
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

export default function CustomizationConfigurator() {
  const { language } = useTheme();
  const { customization, updateCustomization } = useMeasurement();

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
          {t("custom.title" as Parameters<typeof t>[0], language)}
        </SectionHeading>
        <Body className="text-theme-secondary mt-2 max-w-lg mx-auto">
          {t("custom.subtitle" as Parameters<typeof t>[0], language)}
        </Body>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
        {/* Options */}
        <div className="space-y-8">
          <OptionSelector
            label={t("custom.neckline" as Parameters<typeof t>[0], language)}
            options={NECKLINES}
            selected={customization.neckline}
            onSelect={(v) => updateCustomization({ neckline: v })}
            language={language}
          />

          <OptionSelector
            label={t("custom.sleeve" as Parameters<typeof t>[0], language)}
            options={SLEEVES}
            selected={customization.sleeve}
            onSelect={(v) => updateCustomization({ sleeve: v })}
            language={language}
          />

          <OptionSelector
            label={t("custom.trouser" as Parameters<typeof t>[0], language)}
            options={TROUSERS}
            selected={customization.trouserCut}
            onSelect={(v) => updateCustomization({ trouserCut: v })}
            language={language}
          />

          <OptionSelector
            label={t("custom.dupatta" as Parameters<typeof t>[0], language)}
            options={DUPATTAS}
            selected={customization.dupatta}
            onSelect={(v) => updateCustomization({ dupatta: v })}
            language={language}
          />

          <OptionSelector
            label={t("custom.lining" as Parameters<typeof t>[0], language)}
            options={LININGS}
            selected={customization.lining}
            onSelect={(v) => updateCustomization({ lining: v })}
            language={language}
          />
        </div>

        {/* Live Preview Panel */}
        <motion.div
          variants={staggerItem}
          className="sticky top-24 space-y-6"
        >
          <div className="p-6 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-6">
            <CardHeading className="text-center">
              {t("custom.preview" as Parameters<typeof t>[0], language)}
            </CardHeading>

            <GarmentPreview
              neckline={customization.neckline}
              sleeve={customization.sleeve}
              trouserCut={customization.trouserCut}
              dupatta={customization.dupatta}
            />

            {/* Summary */}
            <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
              <CardHeading className="text-sm">
                {t("custom.summary" as Parameters<typeof t>[0], language)}
              </CardHeading>
              {[
                { label: t("custom.neckline" as Parameters<typeof t>[0], language), value: t(`neckline.${customization.neckline}` as Parameters<typeof t>[0], language) },
                { label: t("custom.sleeve" as Parameters<typeof t>[0], language), value: t(`sleeve.${customization.sleeve}` as Parameters<typeof t>[0], language) },
                { label: t("custom.trouser" as Parameters<typeof t>[0], language), value: t(`trouser.${customization.trouserCut}` as Parameters<typeof t>[0], language) },
                { label: t("custom.dupatta" as Parameters<typeof t>[0], language), value: t(`dupatta.${customization.dupatta}` as Parameters<typeof t>[0], language) },
                { label: t("custom.lining" as Parameters<typeof t>[0], language), value: t(`lining.${customization.lining}` as Parameters<typeof t>[0], language) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-theme-tertiary">{label}</span>
                  <span className="text-theme-primary font-medium">{value}</span>
                </div>
              ))}
            </div>

            <Button variant="gold" size="md" className="w-full">
              {t("custom.addToCart" as Parameters<typeof t>[0], language)}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

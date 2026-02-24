"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@/lib/i18n";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/motion";
import { colors } from "@/lib/tokens";
import {
  Button,
  Card,
  Badge,
  Input,
  ThemeSwitcher,
  Separator,
  DisplayHeading,
  SectionHeading,
  CardHeading,
  Label,
  Body,
  AccentText,
  MonoText,
} from "@/components/ui";

/* ── Color Swatch ── */
function ColorSwatch({
  name,
  hex,
  large,
}: {
  name: string;
  hex: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`rounded-lg border border-theme-subtle ${large ? "w-full h-20" : "w-full h-14"}`}
        style={{ background: hex }}
      />
      <div>
        <div className="font-body text-[11px] text-theme-primary">{name}</div>
        <div className="font-mono text-[10px] text-theme-tertiary">{hex}</div>
      </div>
    </div>
  );
}

/* ── Section Wrapper ── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="mb-20"
      {...fadeInUp}
    >
      <Label className="mb-3 block">{title}</Label>
      <div className="h-px bg-gradient-to-r from-brand-gold/40 to-transparent mb-8" />
      {children}
    </motion.section>
  );
}

export default function DesignSystemPage() {
  const { theme, language } = useTheme();

  return (
    <div className="min-h-screen bg-theme-primary transition-all duration-500">
      {/* ── Header ── */}
      <header className="border-b border-theme px-8 py-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Label>{t("ds.subtitle", language)}</Label>
          <h1 className="font-display text-2xl text-theme-primary mt-1">
            {t("ds.title", language)}
          </h1>
        </div>
        <ThemeSwitcher />
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-16">
        {/* ── Hero ── */}
        <motion.div className="mb-24" {...fadeInUp}>
          <DisplayHeading>
            {language === "en" ? (
              <>
                Where Traditional Craftsmanship
                <br />
                <AccentText>Meets Intelligent Technology</AccentText>
              </>
            ) : (
              <>
                جہاں روایتی دستکاری
                <br />
                <AccentText>جدید ٹیکنالوجی سے ملتی ہے</AccentText>
              </>
            )}
          </DisplayHeading>
          <Body className="mt-6 max-w-[640px]">
            {t("hero.subtitle", language)}
          </Body>
          <div className="flex gap-3 mt-8 flex-wrap">
            <Button variant="primary">{t("btn.explore", language)}</Button>
            <Button variant="secondary">{t("btn.customize", language)}</Button>
            <Button variant="gold">{t("btn.getMeasured", language)}</Button>
          </div>
        </motion.div>

        <Separator />

        {/* ── Color Palette ── */}
        <Section id="colors" title={t("ds.colors", language)}>
          {/* Brand Colors */}
          <CardHeading className="mb-4">Brand Core</CardHeading>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
            <ColorSwatch name="Burgundy" hex={colors.brand.burgundy} large />
            <ColorSwatch name="Gold" hex={colors.brand.gold} large />
            <ColorSwatch name="Cream" hex={colors.brand.cream} large />
            <ColorSwatch name="Ivory" hex={colors.brand.ivory} large />
            <ColorSwatch name="Charcoal" hex={colors.brand.charcoal} large />
            <ColorSwatch name="Warm Gray" hex={colors.brand.warmGray} large />
          </div>

          {/* Neutral Scale */}
          <CardHeading className="mb-4">Neutral Scale</CardHeading>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-3 mb-10">
            {Object.entries(colors.neutral).map(([key, hex]) => (
              <ColorSwatch key={key} name={key} hex={hex} />
            ))}
          </div>

          {/* Occasion Colors */}
          <CardHeading className="mb-4">
            {t("ds.occasions", language)}
          </CardHeading>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {(
              Object.entries(colors.occasion) as [
                keyof typeof colors.occasion,
                string,
              ][]
            ).map(([key, hex]) => (
              <ColorSwatch
                key={key}
                name={t(`occasion.${key}`, language)}
                hex={hex}
                large
              />
            ))}
          </div>
        </Section>

        <Separator ornament="◇" />

        {/* ── Typography ── */}
        <Section id="typography" title={t("ds.typography", language)}>
          <div className="space-y-8">
            <div>
              <Label className="mb-2 block">Display / font-display</Label>
              <DisplayHeading>
                The Art of Adornment
              </DisplayHeading>
            </div>
            <div>
              <Label className="mb-2 block">Section Heading</Label>
              <SectionHeading>
                Bridal Collection 2025
              </SectionHeading>
            </div>
            <div>
              <Label className="mb-2 block">Card Heading</Label>
              <CardHeading>Hand-Embroidered Zardozi Lehenga</CardHeading>
            </div>
            <div>
              <Label className="mb-2 block">Body Text / font-body</Label>
              <Body>
                Each piece in this collection is meticulously handcrafted by
                master artisans in Lahore, using techniques passed down through
                generations. The zardozi work alone takes over 200 hours per
                garment, with real gold and silver threads woven into silk fabric
                sourced from the finest mills.
              </Body>
            </div>
            <div>
              <Label className="mb-2 block">Label</Label>
              <Label>New Arrival — Limited Edition</Label>
            </div>
            <div>
              <Label className="mb-2 block">Accent / Italic</Label>
              <p className="font-display text-2xl">
                <AccentText>
                  Crafted with love, worn with pride
                </AccentText>
              </p>
            </div>
            <div>
              <Label className="mb-2 block">Monospace / Technical</Label>
              <div className="flex gap-2 flex-wrap">
                <MonoText>PKR 245,000</MonoText>
                <MonoText>SKU-BRD-2025-001</MonoText>
                <MonoText>Bust: 36&quot;</MonoText>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Gold Shimmer (Bridal)</Label>
              <h2 className="font-display text-4xl shimmer-gold">
                بریدل کلیکشن
              </h2>
            </div>
            <div>
              <Label className="mb-2 block">Urdu / RTL</Label>
              <p
                className="font-urdu text-2xl leading-relaxed text-theme-primary"
                dir="rtl"
              >
                ہر ٹانکا ایک کہانی سناتا ہے۔ ہر دھاگا ایک روایت بنتا ہے۔ یہ
                صرف لباس نہیں — یہ ایک وراثت ہے۔
              </p>
            </div>
          </div>
        </Section>

        <Separator ornament="◈" />

        {/* ── Components ── */}
        <Section id="components" title={t("ds.components", language)}>
          {/* Buttons */}
          <CardHeading className="mb-4">Buttons</CardHeading>
          <div className="space-y-6 mb-12">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="gold">Gold</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </div>

          {/* Badges */}
          <CardHeading className="mb-4">Badges</CardHeading>
          <div className="flex flex-wrap gap-3 mb-12">
            <Badge>Default</Badge>
            <Badge variant="gold">New Arrival</Badge>
            <Badge variant="occasion" occasion="mehndi">
              {t("occasion.mehndi", language)}
            </Badge>
            <Badge variant="occasion" occasion="barat">
              {t("occasion.barat", language)}
            </Badge>
            <Badge variant="occasion" occasion="walima">
              {t("occasion.walima", language)}
            </Badge>
            <Badge variant="occasion" occasion="eid">
              {t("occasion.eid", language)}
            </Badge>
            <Badge variant="occasion" occasion="pret">
              {t("occasion.pret", language)}
            </Badge>
          </div>

          {/* Cards */}
          <CardHeading className="mb-4">Cards</CardHeading>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {(
              [
                { v: "default" as const, label: "Default" },
                { v: "elevated" as const, label: "Elevated" },
                { v: "bordered" as const, label: "Bordered" },
                { v: "accent" as const, label: "Accent" },
              ] as const
            ).map(({ v, label }) => (
              <motion.div key={v} variants={staggerItem}>
                <Card variant={v} hoverable className="p-6">
                  <Label className="block mb-2">{label}</Label>
                  <CardHeading>{label} Card</CardHeading>
                  <Body className="mt-2 text-sm">
                    A card variant for different contexts and visual hierarchy.
                  </Body>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Product Card Example */}
          <CardHeading className="mb-4">Product Card Pattern</CardHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Zardozi Bridal Lehenga",
                price: "PKR 485,000",
                occasion: "barat" as const,
                color: colors.occasion.barat,
              },
              {
                name: "Phulkari Festive Suit",
                price: "PKR 45,000",
                occasion: "eid" as const,
                color: colors.occasion.eid,
              },
              {
                name: "Mehndi Green Gharara",
                price: "PKR 125,000",
                occasion: "mehndi" as const,
                color: colors.occasion.mehndi,
              },
            ].map((product) => (
              <Card key={product.name} variant="default" hoverable>
                <div
                  className="h-56 rounded-t-lg flex items-end p-4"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}20, ${product.color}60)`,
                  }}
                >
                  <Badge variant="occasion" occasion={product.occasion}>
                    {t(`occasion.${product.occasion}`, language)}
                  </Badge>
                </div>
                <div className="p-5">
                  <CardHeading>{product.name}</CardHeading>
                  <MonoText>{product.price}</MonoText>
                  <div className="flex gap-2 mt-4">
                    <Button variant="primary" size="sm">
                      {t("btn.addToCart", language)}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t("btn.viewDetails", language)}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Inputs */}
          <CardHeading className="mb-4">Form Inputs</CardHeading>
          <Card variant="default" className="p-8 max-w-md">
            <div className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                hint="As it appears on your order"
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
              />
              <Input
                label="Phone"
                placeholder="+92 300 1234567"
                hint="WhatsApp preferred for order updates"
              />
              <Input
                label="Bust Measurement"
                placeholder='e.g., 36"'
                error="Measurement must be between 24&quot; and 60&quot;"
              />
              <Button variant="primary" className="w-full">
                {t("btn.submit", language)}
              </Button>
            </div>
          </Card>
        </Section>

        <Separator ornament="✦" />

        {/* ── Theme Comparison ── */}
        <Section id="themes" title="Theme Modes">
          <Body className="mb-8 max-w-[640px]">
            Two visual modes that transform the entire UI. <strong>Pret</strong>{" "}
            is clean, airy, and modern — for everyday browsing.{" "}
            <strong>Bridal</strong> is rich, dark, and gold-accented — for the
            luxury wedding experience. Toggle the switch in the header to see
            them live.
          </Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card
              variant="bordered"
              className="p-6"
            >
              <Badge variant="gold" className="mb-3">
                Current: {theme === "pret" ? "Pret Mode" : "Bridal Mode"}
              </Badge>
              <CardHeading>
                {theme === "pret" ? "Clean & Contemporary" : "Rich & Luxurious"}
              </CardHeading>
              <Body className="mt-2">
                {theme === "pret"
                  ? "Light backgrounds, subtle shadows, burgundy accents. Optimized for browsing prêt-à-porter collections in daylight."
                  : "Dark backgrounds, warm gold accents, elevated shadows. Designed for the immersive bridal shopping experience."}
              </Body>
            </Card>
            <Card variant="accent" className="p-6">
              <Label className="block mb-3">CSS Variables Active</Label>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-theme-secondary">--bg-primary</span>
                  <span className="text-theme-gold">
                    {theme === "pret" ? "#FAF9F7" : "#0A0A0A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-secondary">--text-primary</span>
                  <span className="text-theme-gold">
                    {theme === "pret" ? "#2A2420" : "#F5EDE4"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-secondary">--text-accent</span>
                  <span className="text-theme-gold">
                    {theme === "pret" ? "#8B1A1A" : "#D4A574"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-secondary">--border-default</span>
                  <span className="text-theme-gold">
                    {theme === "pret" ? "#E8E0D8" : "rgba(255,255,255,0.08)"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── Footer ── */}
        <div className="text-center pt-12 pb-8 border-t border-theme">
          <p className="font-body text-[11px] text-theme-tertiary tracking-[1px]">
            Balach Rahu Design System — Phase 1: Brand DNA
          </p>
        </div>
      </main>
    </div>
  );
}

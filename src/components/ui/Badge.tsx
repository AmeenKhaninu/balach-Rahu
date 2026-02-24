import { clsx } from "clsx";
import { colors } from "@/lib/tokens";
import type { OccasionType } from "@/lib/tokens";

type BadgeVariant = "default" | "gold" | "occasion";

interface BadgeProps {
  variant?: BadgeVariant;
  occasion?: OccasionType;
  children: React.ReactNode;
  className?: string;
}

const occasionColors: Record<OccasionType, { bg: string; text: string }> = {
  mehndi: { bg: "rgba(45,80,22,0.15)", text: colors.occasion.mehndi },
  barat: { bg: "rgba(139,26,26,0.15)", text: colors.occasion.barat },
  walima: { bg: "rgba(92,26,142,0.15)", text: colors.occasion.walima },
  eid: { bg: "rgba(26,60,94,0.15)", text: colors.occasion.eid },
  pret: { bg: "rgba(61,55,50,0.15)", text: colors.occasion.pret },
};

export default function Badge({
  variant = "default",
  occasion,
  children,
  className,
}: BadgeProps) {
  const occ = occasion ? occasionColors[occasion] : null;

  return (
    <span
      className={clsx(
        "inline-flex items-center font-body text-[10px] font-medium",
        "uppercase tracking-[2px] px-3 py-1 rounded-full",
        variant === "default" && "bg-theme-elevated text-theme-secondary border border-theme-subtle",
        variant === "gold" &&
          "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
        className
      )}
      style={
        variant === "occasion" && occ
          ? { background: occ.bg, color: occ.text }
          : undefined
      }
    >
      {children}
    </span>
  );
}

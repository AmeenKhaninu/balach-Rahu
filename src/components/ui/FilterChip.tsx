"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface FilterChipProps {
  label: string;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}

export default function FilterChip({
  label,
  active = false,
  color,
  onClick,
}: FilterChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "px-4 py-2 rounded-full font-body text-[11px] uppercase tracking-[1.5px]",
        "border cursor-pointer transition-all duration-300",
        active
          ? "bg-brand-gold/15 border-brand-gold/40 text-brand-gold"
          : "bg-transparent border-theme text-theme-secondary hover:border-brand-gold/30"
      )}
      style={
        active && color
          ? { background: `${color}15`, borderColor: `${color}40`, color }
          : undefined
      }
    >
      {label}
    </motion.button>
  );
}

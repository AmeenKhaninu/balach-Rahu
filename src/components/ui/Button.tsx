"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { easings, durations } from "@/lib/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy-light border border-transparent shadow-burgundy",
  secondary:
    "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-neutral-900",
  ghost:
    "bg-transparent border border-transparent hover:bg-neutral-100 [data-theme=bridal]_&:hover:bg-[rgba(255,255,255,0.06)]",
  gold: "bg-brand-gold text-neutral-900 hover:bg-brand-gold-light border border-transparent shadow-gold",
  danger:
    "bg-error text-brand-cream hover:bg-brand-burgundy-light border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-[11px] tracking-[1.5px]",
  md: "px-6 py-2.5 text-[12px] tracking-[2px]",
  lg: "px-8 py-3.5 text-[13px] tracking-[2.5px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: durations.fast, ease: easings.elegant }}
      className={clsx(
        "font-body uppercase font-medium rounded-sm cursor-pointer",
        "transition-colors duration-300",
        "inline-flex items-center justify-center gap-2",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

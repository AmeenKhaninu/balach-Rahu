"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { cardHover } from "@/lib/motion";

type CardVariant = "default" | "elevated" | "bordered" | "accent";

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-theme-secondary border border-theme rounded-lg",
  elevated: "bg-theme-elevated border border-theme-subtle rounded-lg shadow-md",
  bordered: "bg-transparent border border-theme-accent rounded-lg",
  accent: "bg-theme-accent border border-theme-accent rounded-lg",
};

export default function Card({
  variant = "default",
  className,
  children,
  hoverable = false,
  onClick,
}: CardProps) {
  const Component = hoverable ? motion.div : "div";
  const motionProps = hoverable
    ? { initial: "rest", whileHover: "hover", variants: cardHover }
    : {};

  return (
    <Component
      className={clsx(
        "transition-all duration-300",
        variantStyles[variant],
        hoverable && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

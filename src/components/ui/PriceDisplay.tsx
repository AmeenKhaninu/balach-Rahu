import { clsx } from "clsx";
import { formatPrice } from "@/lib/data/products";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PriceDisplay({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discount = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={clsx("flex items-baseline gap-2 flex-wrap", className)}>
      <span
        className={clsx(
          "font-mono text-theme-gold",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-xl"
        )}
      >
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span
            className={clsx(
              "font-mono text-theme-tertiary line-through",
              size === "sm" && "text-[10px]",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}
          >
            {formatPrice(originalPrice)}
          </span>
          <span className="font-body text-[10px] uppercase tracking-[1px] text-success-light bg-success/15 px-2 py-0.5 rounded-full">
            {discount}% off
          </span>
        </>
      )}
    </div>
  );
}

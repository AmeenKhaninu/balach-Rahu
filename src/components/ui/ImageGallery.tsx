"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductImage } from "@/lib/types";

interface ImageGalleryProps {
  images: ProductImage[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  return (
    <div className={className}>
      {/* Main Image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: active.gradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative pattern on placeholder */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, var(--text-primary) 0.5px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />
            <span className="font-display text-4xl text-white/10 select-none">
              {activeIndex + 1}/{images.length}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                flex-1 aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300
                ${
                  i === activeIndex
                    ? "border-brand-gold"
                    : "border-transparent opacity-60 hover:opacity-100"
                }
              `}
            >
              <div
                className="w-full h-full"
                style={{ background: img.gradient }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FabricSwatch } from "@/lib/types";
import { Label } from "./Typography";

interface SwatchSelectorProps {
  swatches: FabricSwatch[];
  language: "en" | "ur";
}

export default function SwatchSelector({
  swatches,
  language,
}: SwatchSelectorProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Label>
          {language === "en" ? "Fabric Color" : "کپڑے کا رنگ"}
        </Label>
        <span className="font-body text-[11px] text-theme-primary">
          — {language === "en" ? swatches[selected].name : swatches[selected].nameUr}
        </span>
      </div>
      <div className="flex gap-3">
        {swatches.map((swatch, i) => (
          <motion.button
            key={swatch.hex}
            onClick={() => swatch.available && setSelected(i)}
            whileHover={swatch.available ? { scale: 1.1 } : {}}
            whileTap={swatch.available ? { scale: 0.95 } : {}}
            className={`
              relative w-10 h-10 rounded-full cursor-pointer border-none
              ${!swatch.available ? "opacity-30 cursor-not-allowed" : ""}
            `}
            title={swatch.name}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: swatch.hex }}
            />
            {/* Selected ring */}
            {i === selected && (
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-brand-gold"
                layoutId="swatch-ring"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {/* Sold out slash */}
            {!swatch.available && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[140%] h-px bg-theme-tertiary rotate-45" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

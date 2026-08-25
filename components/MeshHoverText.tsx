"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Mesh-hover text: each character tracks the cursor with a subtle magnetic
 * displacement + weight/skew shift, like a type mesh being pulled toward the
 * pointer. Interpreted from the horizonx.so "Mesh Text Hover" reference, * built from scratch here (no source was provided) using framer-motion
 * springs per character.
 */
export default function MeshHoverText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const chars = text.split("");

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMouseX(e.clientX - rect.left);
      }}
      onMouseLeave={() => setMouseX(null)}
    >
      {chars.map((c, i) => {
        const charWidth = 28; // approximate spacing unit for distance calc
        const charCenter = i * charWidth + charWidth / 2;
        const dist = mouseX === null ? 999 : Math.abs(mouseX - charCenter);
        const influence = Math.max(0, 1 - dist / 140);
        return (
          <motion.span
            key={i}
            animate={{
              y: -influence * 10,
              scale: 1 + influence * 0.18,
              color: influence > 0.05 ? "var(--color-brass)" : "var(--color-ink)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SWATCHES = [
  { color: "#1F2937", top: "10%", left: "78%", size: 90, depth: 0.02 },
  { color: "#B8863B", top: "62%", left: "85%", size: 60, depth: 0.05 },
  { color: "#3A3A3A", top: "75%", left: "8%", size: 110, depth: 0.015 },
  { color: "#8A8A82", top: "18%", left: "4%", size: 70, depth: 0.04 },
  { color: "#5C1A22", top: "40%", left: "92%", size: 50, depth: 0.06 },
];

/**
 * Environmental 3D-feeling background: floating fabric-swatch shapes that
 * drift with mouse position (parallax depth). This is the honest
 * implementation of "3D and modern" for a hero section without needing
 * WebGL or 3D assets, pure CSS transforms + framer-motion.
 */
export default function ParallaxSwatches() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="perspective-container pointer-events-none absolute inset-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }}
    >
      {SWATCHES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm shadow-lg"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
          }}
          animate={{
            x: pos.x * s.size * s.depth * 40,
            y: pos.y * s.size * s.depth * 40,
            rotate: pos.x * 8,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 12 }}
        />
      ))}
    </div>
  );
}

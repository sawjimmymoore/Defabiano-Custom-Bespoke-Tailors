"use client";

/*
 * Real product photo display with a subtle 3D tilt-on-hover (mouse-driven
 * perspective rotation via CSS transforms) plus zoom. This is the realistic
 * "3D" treatment for a single real studio photo, no fake spin frames
 * pretending to be a turntable shoot.
 */

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ProductImageDisplay({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div className="perspective-container">
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          setTilt({ x: py * -8, y: px * 10 });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-sm border border-line bg-paper-2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">
            Move to explore
          </span>
        </div>
      </motion.div>
    </div>
  );
}

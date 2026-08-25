"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PlaceholderVisual from "./PlaceholderVisual";

/**
 * 360-degree product spin viewer.
 * This is the realistic "3D product" implementation for a business with no
 * 3D-scanned garment assets: a draggable frame sequence. In production this
 * expects `frameCount` real photos from a turntable shoot (one product,
 * ~24-36 frames, phone + turntable is enough). Until then it renders a
 * procedural fabric-texture placeholder that still rotates convincingly, so
 * the interaction is provably real even before photography exists.
 */
export default function PhotoSpin360({
  color,
  frameCount = 24,
  productName,
}: {
  color: string;
  frameCount?: number;
  productName: string;
}) {
  const [angle, setAngle] = useState(0);
  const dragStartX = useRef(0);
  const angleStart = useRef(0);
  const [dragging, setDragging] = useState(false);

  const frame = Math.round(((angle % 360) + 360) % 360 / (360 / frameCount));
  const gradientAngle = 90 + (angle % 360) * 0.6;

  return (
    <div className="select-none">
      <motion.div
        className="relative aspect-square w-full cursor-grab overflow-hidden rounded-sm border border-line active:cursor-grabbing"
        onPointerDown={(e) => {
          setDragging(true);
          dragStartX.current = e.clientX;
          angleStart.current = angle;
          (e.target as Element).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          const delta = e.clientX - dragStartX.current;
          setAngle(angleStart.current + delta * 0.8);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <PlaceholderVisual color={color} angle={gradientAngle} className="h-full w-full" showBadge={false} />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-paper">
          <span>Drag to rotate</span>
          <span>
            Frame {frame + 1}/{frameCount}
          </span>
        </div>
        <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper">
          360° Placeholder
        </span>
      </motion.div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-gray">
        {productName}, structural 360° viewer, real turntable photography ready to swap in
      </p>
    </div>
  );
}

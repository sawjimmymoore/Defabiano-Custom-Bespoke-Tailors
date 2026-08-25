"use client";

/*
 * Site-wide ambient 3D background, a handful of large, blurred, low-opacity
 * gradient forms drifting slowly in 3D space (perspective + rotateX/Y via
 * CSS transforms) with a gentle scroll-linked parallax. Fixed behind all
 * page content on every route (mounted once in the root layout), subtle
 * enough not to fight readability on the light theme, but present enough to
 * give the whole site, not just the hero, a sense of depth.
 */

import { motion, useScroll, useTransform } from "framer-motion";

const SHAPES = [
  { size: 560, top: "-8%", left: "-10%", color: "rgba(47,92,255,0.16)", depth: 0.15, dur: 22 },
  { size: 420, top: "15%", left: "80%", color: "rgba(193,97,61,0.13)", depth: 0.25, dur: 28 },
  { size: 480, top: "55%", left: "-8%", color: "rgba(47,92,255,0.12)", depth: 0.1, dur: 34 },
  { size: 340, top: "78%", left: "72%", color: "rgba(193,97,61,0.12)", depth: 0.3, dur: 26 },
  { size: 300, top: "35%", left: "35%", color: "rgba(47,92,255,0.08)", depth: 0.2, dur: 30 },
];

export default function GlobalBackground3D() {
  const { scrollY } = useScroll();

  return (
    <div
      aria-hidden
      className="perspective-container pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(14,21,34,0.035) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }}
    >
      {SHAPES.map((s, i) => (
        <Shape key={i} shape={s} scrollY={scrollY} />
      ))}
    </div>
  );
}

function Shape({
  shape,
  scrollY,
}: {
  shape: (typeof SHAPES)[number];
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const y = useTransform(scrollY, (v) => v * shape.depth * -0.15);
  const rotate = useTransform(scrollY, (v) => v * shape.depth * 0.02);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: shape.top,
        left: shape.left,
        width: shape.size,
        height: shape.size,
        borderRadius: "9999px",
        background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        y,
        rotate,
      }}
      animate={{
        x: [0, 30, -20, 0],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{
        duration: shape.dur,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

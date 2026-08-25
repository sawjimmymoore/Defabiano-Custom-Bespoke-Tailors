"use client";

/*
 * Scroll-scrubbed video background, the video never autoplays; instead,
 * playback time is mapped directly to scroll position within a tall
 * container (useScroll + useTransform), so scrolling IS the video control.
 * A raf loop syncs video.currentTime to the (spring-smoothed) scroll
 * progress rather than seeking on every scroll event, which avoids most of
 * the stutter direct seeking causes without needing full canvas-frame
 * extraction.
 */

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function ScrollScrubVideo({
  src,
  heightVh = 300,
  children,
  tilt = true,
}: {
  src: string;
  heightVh?: number;
  children?: React.ReactNode;
  tilt?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll progress slightly so the scrub doesn't feel jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const target = progress * duration;
    // Only seek if the delta is meaningful, avoids redundant seeks that
    // cause visible stutter on some browsers
    if (Math.abs(video.currentTime - target) > 0.03) {
      video.currentTime = target;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setDuration(video.duration || 0);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  // Subtle 3D tilt tied to scroll, rotates slightly as you scrub through
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [4, 0, -4]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <div ref={containerRef} style={{ height: `${heightVh}vh`, position: "relative" }}>
      <div className="perspective-container sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <motion.video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={tilt ? { rotateX, scale, transformStyle: "preserve-3d" } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        {children}
      </div>
    </div>
  );
}

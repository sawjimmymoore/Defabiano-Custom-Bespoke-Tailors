"use client";

import { useEffect, useState, type RefObject } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * Reusable scroll-scrub hook, maps scroll progress through `containerRef`
 * directly to `videoRef.currentTime`. No autoplay; scrolling IS playback.
 */
export function useScrollScrub(
  containerRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>
) {
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const clamped = Math.min(1, Math.max(0, progress));
    const target = clamped * duration;
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
  }, [videoRef]);

  return { smoothProgress };
}

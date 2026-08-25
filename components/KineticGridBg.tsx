"use client";

/*
 * Adapted from Originkit "Kinetic Grid", a reactive dot-grid that pulls
 * toward the cursor within a radius, with a fading trail line. Ported to
 * plain React/Canvas (Originkit's Framer-only bits were already stubbed
 * out in the source), re-themed to the light/blue palette.
 */

import { useRef, useEffect, type CSSProperties } from "react";

interface KineticGridBgProps {
  dotColor?: string;
  lineColor?: string;
  trailColor?: string;
  spacing?: number;
  radius?: number;
  strength?: number;
  trail?: boolean;
  style?: CSSProperties;
}

export default function KineticGridBg({
  dotColor = "#2F5CFF",
  lineColor = "#9DB3F5",
  trailColor = "#2F5CFF",
  spacing = 42,
  radius = 220,
  strength = 4,
  trail = true,
  style,
}: KineticGridBgProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const trailRef = useRef<{ x: number; y: number; t: number }[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = Math.max(8, spacing);
    const R = Math.max(1, radius);
    const PULL = (Math.max(1, Math.min(10, strength)) / 10) * 4;

    let W = 1;
    let H = 1;
    type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };
    let cols: Dot[][] = [];
    let dots: Dot[] = [];

    const build = (mw?: number, mh?: number) => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? r.width));
      H = Math.max(1, Math.floor(mh ?? r.height));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      dots = [];
      const nCols = Math.floor(W / GAP) + 2;
      const nRows = Math.floor(H / GAP) + 2;
      for (let c = 0; c < nCols; c++) {
        const col: Dot[] = [];
        for (let rIdx = 0; rIdx < nRows; rIdx++) {
          const hx = c * GAP;
          const hy = rIdx * GAP;
          const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
          col.push(d);
          dots.push(d);
        }
        cols.push(col);
      }
    };

    build();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            build(cr?.width, cr?.height);
          })
        : null;
    ro?.observe(host);

    const setMouse = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const mx = clientX - r.left;
      const my = clientY - r.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.active = true;
      const now = performance.now();
      const t = trailRef.current;
      t.push({ x: mx, y: my, t: now });
      if (t.length > 80) t.shift();
    };

    const onMove = (e: MouseEvent) => setMouse(e.clientX, e.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setMouse(t.clientX, t.clientY);
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    host.addEventListener("touchmove", onTouch, { passive: true });
    host.addEventListener("touchend", onLeave);

    let raf = 0;
    const frame = () => {
      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        let ax = (d.hx - d.x) * 0.08;
        let ay = (d.hy - d.y) * 0.08;
        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            const f = (1 - dist / R) * PULL;
            ax += (dx / dist) * f;
            ay += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }

      for (let c = 0; c < cols.length; c++) {
        for (let rIdx = 0; rIdx < cols[c].length; rIdx++) {
          const d = cols[c][rIdx];
          const right = cols[c + 1]?.[rIdx];
          const down = cols[c]?.[rIdx + 1];
          const prox = m.active
            ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
            : 0;
          if (right) {
            ctx.globalAlpha = 0.05 + prox * 0.55;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 + prox * 1.3;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }
          if (down) {
            ctx.globalAlpha = 0.05 + prox * 0.55;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5 + prox * 1.3;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        const prox = m.active
          ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R)
          : 0;
        ctx.globalAlpha = 0.18 + prox * 0.7;
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.7 + prox * 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (trail) {
        const now = performance.now();
        const tr = trailRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < tr.length; i++) {
          const a = tr[i - 1];
          const b = tr[i];
          const age = now - b.t;
          if (age > 260) continue;
          ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.7;
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      host.removeEventListener("touchmove", onTouch);
      host.removeEventListener("touchend", onLeave);
    };
  }, [dotColor, lineColor, trailColor, spacing, radius, strength, trail]);

  return (
    <div
      ref={hostRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}

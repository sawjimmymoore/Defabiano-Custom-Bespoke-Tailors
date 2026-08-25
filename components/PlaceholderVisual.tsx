"use client";

/**
 * Procedural placeholder product visual.
 * De Fabiano has no digital product photography yet, rather than link to
 * broken image paths, this renders a fabric-texture-style gradient tinted to
 * the product's variant color, with a small "placeholder" badge.
 * Swap for real photography by rendering an <Image> here instead, the
 * component signature (color, label) stays the same for the calling pages.
 */
export default function PlaceholderVisual({
  color = "#3A3A3A",
  label,
  angle = 135,
  className = "",
  showBadge = true,
}: {
  color?: string;
  label?: string;
  angle?: number;
  className?: string;
  showBadge?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `repeating-linear-gradient(${angle}deg, ${color}dd 0px, ${color}dd 2px, ${color}aa 2px, ${color}aa 4px)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${color}00 0%, #14110F55 100%)`,
        }}
      />
      {showBadge && (
        <span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper">
          Placeholder
        </span>
      )}
      {label && (
        <span className="relative z-10 px-4 text-center font-display text-sm italic text-paper/80">
          {label}
        </span>
      )}
    </div>
  );
}

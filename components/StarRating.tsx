import { Star } from "lucide-react";

export default function StarRating({
  rating,
  reviewCount,
  size = 13,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "fill-brass text-brass" : "fill-line text-line"}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-gray">
        {rating.toFixed(1)}
        {reviewCount ? ` (${reviewCount})` : ""}
      </span>
    </div>
  );
}

import { FaStar } from "react-icons/fa6";

export function RatingStars({
  value,
  size = "sm"
}: {
  value: number;
  size?: "md" | "lg" | "sm";
}) {
  const classNames = "text-sm text-md text-lg";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => {
        return (
          <FaStar
            key={i}
            className={`text-${size} ${i <= Math.floor(value)
              ? "text-secondary"
              : "text-gray-400"}`}
          />
        );
        // <Rating.Star color="var(--secondary-color)" key={i} filled={false} />
      })}
    </div>
  );
}

import { Rating } from "flowbite-react";

export function RatingStars({
  value,
  size = "sm"
}: {
  value: number;
  size?: "md" | "lg" | "sm";
}) {
  return (
    <Rating size={size}>
      {[1, 2, 3, 4, 5].map(i => {
        return (
          <Rating.Star
            color="var(--secondary-color)"
            key={i}
            filled={i <= value}
          />
        );
      })}
    </Rating>
  );
}

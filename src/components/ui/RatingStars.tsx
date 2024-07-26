import { getStarSize } from "@/functions/helpers";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";

export type SizeVariant = "md" | "lg" | "sm";

export function RatingStars({
  value,
  size = "sm"
}: {
  value: number;
  size?: SizeVariant;
}) {
  const classNames = "text-sm text-md text-lg";
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => {
        const size = getStarSize(value, i);
        return (
          size === 'full' ?
          <FaStar
            key={i}
            className={`text-${size} text-secondary-accent`}
          /> : size == 'half' ?<FaStarHalfAlt
          key={i}
          className={`text-${size} text-secondary-accent`}
        /> : <FaRegStar
          key={i}
          className={`text-${size} text-secondary-accent`}
        /> 
        );
        // <Rating.Star color="var(--secondary-color)" key={i} filled={false} />
      })}
    </div>
  );
}


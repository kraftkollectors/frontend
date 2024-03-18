import { BasicService, BasicUser } from "@/utils/types/basicTypes";
import { RatingStars } from "./ui/RatingStars";

/* eslint-disable @next/next/no-img-element */

export type ArtisanReviewCardProps = {
  user: BasicUser;
  date: string;
  rating: number;
  review: string;
  service: BasicService;
  id: string;
};

export function ArtisanReviewCard({
  user,
  date,
  rating,
  review,
  service,
  id
}: ArtisanReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-2">
      <div className="flex gap-3 items-center">
        <img src={user.img} alt={user.name} className="avatar size-8" />
        <div className="flex flex-col">
          <h1 className="text-sm r-font-semibold truncate">
            {user.name}
          </h1>
          <p className="text-xs opacity-60">
            {date}
          </p>
        </div>
      </div>
      <RatingStars value={rating} />
      <p className="text-sm text-dark-gray">
        {review}
      </p>
      <div className="flex gap-2 items-center">
        <img
          src={service.img}
          alt={service.title}
          className="w-4/12 object-cover aspect-[5/3] rounded"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-xs opacity-60">Reviewed</h1>
          <h2 className="text-xs">
            {service.title}
          </h2>
          <p className="text-xs r-font-semibold">
            N{service.price} / {service.duration}
          </p>
        </div>
      </div>
    </div>
  );
}

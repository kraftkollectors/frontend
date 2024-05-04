import { RatingStars } from "../ui/RatingStars";
import { ArtisanReviewCardProps } from "../ArtisanReviewCard";

export function DashboardReviewCard({
  date,
  id,
  rating,
  review,
  user,
  service,
}: ArtisanReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-2 bg-light p-2 rounded">
      <div className="flex gap-3 items-center">
        <img src={user.img} alt={user.name} className="avatar size-8" />
        <div className="flex flex-col">
          <h1 className="text-black-900 r-font-semibold truncate">
            {user.name}
          </h1>
          <p className=" text-black-300">{date}</p>
        </div>
        <div className="flex flex-col max-md:hidden">
          <p className=" text-black-300">reviewed</p>
          <h1 className="text-black-900 r-font-semibold truncate">
            {service?.title}
          </h1>
        </div>
      </div>
        <div className="flex flex-col md:hidden">
          <p className=" text-black-300">reviewed</p>
          <h1 className="text-black-900 r-font-semibold truncate">
            {service?.title}
          </h1>
        </div>
      <RatingStars value={rating} />
      <p className="text-black-500">{review}</p>
    </div>
  );
}

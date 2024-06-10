import { RatingStars } from "../ui/RatingStars";
import { ArtisanReviewCardProps } from "../reviewCard/ArtisanReviewServiceCard";
import UserProfile from "../reviewCard/UserProfile";
import { Suspense } from "react";
import CardUserSkeleton from "../skeletons/CardUserSkeleton";

export function DashboardReviewCard({
  createdAt: date,
  _id: id,
  rating,
  review,
  userId: user,
  serviceId: service,
}: ArtisanReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-2 bg-light p-2 rounded">
      <div className="flex gap-3 items-center">
        <Suspense fallback={<CardUserSkeleton />}>
        <UserProfile userId={user} date={date}  />
        </Suspense>
        <div className="flex flex-col max-md:hidden">
          <p className=" text-black-300">reviewed</p>
          <h1 className="text-black-900 r-font-semibold truncate">
            service?.title
          </h1>
        </div>
      </div>
        <div className="flex flex-col md:hidden">
          <p className=" text-black-300">reviewed</p>
          <h1 className="text-black-900 r-font-semibold truncate">
            service?.title
          </h1>
        </div>
      <RatingStars value={rating} />
      <p className="text-black-500">{review}</p>
    </div>
  );
}

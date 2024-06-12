import { RatingStars } from "../ui/RatingStars";
import UserProfile from "./UserProfile";
import { Review } from "@/utils/types/review";
import ReviewServiceCard from './ReviewServiceCard'
import { Suspense } from "react";
import CardUserSkeleton from "../skeletons/CardUserSkeleton";

/* eslint-disable @next/next/no-img-element */

export type ArtisanReviewCardProps = Review & {
  showService?: boolean;
};

export function ArtisanReviewCard({
  reviewerId: user,
  createdAt: date,
  rating,
  review,
  serviceId: service,
  _id: id,
  showService
}: ArtisanReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-2">
      <div className="flex gap-3 items-center">
        <Suspense fallback={<CardUserSkeleton />}>
        <UserProfile userId={user} date={date}  />
        </Suspense>
      </div>
      <RatingStars value={rating} />
      <p className="text-black-500">{review}</p>
      {showService && (
        <ReviewServiceCard serviceId={service}/>
      )}
    </div>
  );
}

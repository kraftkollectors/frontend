import { fetchUserReviews, fetchUserReviewsCount } from "@/actions";
import { RatingStars, SizeVariant } from "../ui/RatingStars";

export default async function ArtisanCardReviews({
  userId,
  size = "lg",
}: {
  userId: string;
  size?: SizeVariant;
}) {
  const reviews = await fetchUserReviews({
    throwsError: false,
    isPublic: true,
    params: userId,
  });
  if (!reviews || reviews == "error")
    return <div className="skeleton h-4 w-8"></div>;
  const reviewsCount = await fetchUserReviewsCount({
    throwsError: false,
    isPublic: true,
    params: userId,
  });
  if (!reviewsCount || reviewsCount == "error")
    return <div className="skeleton h-4 w-8"></div>;

  const avgRating =
    reviewsCount.totalRatings == 0
      ? 0
      : reviewsCount.sumRating / reviewsCount.totalRatings;

  return (
    <div className="flex items-center gap-2">
      <h3 className={`font-bold ${size === "lg" ? "text-xl" : "text-label"}`}>
        {(avgRating ?? 0).toFixed(1)}
      </h3>
      <RatingStars value={avgRating} size={size} />
    </div>
  );
}

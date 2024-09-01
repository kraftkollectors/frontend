import {
  ArtisanReviewCard,
  Pagination,
  RatingStars,
  ReviewLines,
} from "@/components";
import WriteReview from "./WriteReview";
import { fetchServiceRatings, fetchServiceReviewsCount } from "@/actions";
import { CummulativeReview } from "@/utils/types/review";
import { buildUrlQuery } from "@/functions/helpers";
import { Suspense } from "react";
import { ReviewLineProps } from "@/components/ui/ReviewLines";

export default async function Reviews({
  serviceId,
  cummulative: { totalRatings, averageRating },
  ownerId,
  page,
}: {
  ownerId: string;
  serviceId: string;
  cummulative: CummulativeReview;
  page?: string;
}) {
  const reviews = await fetchServiceRatings(serviceId, {
    params: buildUrlQuery({ page }),
  });
  if (!reviews || reviews == "error")
    return <div className="info-box">failed to load reviews</div>;
  const reviewsCount = await fetchServiceReviewsCount({
    throwsError: false,
    isPublic: true,
    params: serviceId,
  });
  if (!reviewsCount || reviewsCount == "error")
    return <div className="info-box">Failed to get cummulative reviews</div>;

  const reviewLines: ReviewLineProps[] = Object.entries(
    reviewsCount.ratingCounts,
  )
    .map(([key, val], i) => {
      return {
        label: Number(key),
        value: val,
        percentage:
          reviewsCount.totalRatings == 0
            ? 0
            : (val * 100) / reviewsCount.totalRatings,
      };
    })
    .reverse();
  const avgRating =
    reviewsCount.totalRatings == 0
      ? 0
      : reviewsCount.sumRating / reviewsCount.totalRatings;

  return (
    <section id="Reviews" className="py-4">
      <h1 className="r-font-bold text-title">
        {totalRatings} Review{totalRatings === 1 ? "" : "s"}
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-black-400">Overall Rating</h1>
        <div className="flex items-center gap-2">
          <h1 className="r-font-semibold text-title">
            {averageRating.toFixed(1)}
          </h1>
          <RatingStars value={averageRating} size="lg" />
        </div>
        <div className="flex max-w-[400px] flex-col gap-2">
          {reviewLines.map((reviewLine) => (
            <ReviewLines key={reviewLine.label} {...reviewLine} />
          ))}
        </div>
      </div>
      <div className="py-2">
        <WriteReview ownerId={ownerId} serviceId={serviceId} />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-10">
        {reviews.existingRecords.length == 0 ? (
          <div className="info-box">No Reviews</div>
        ) : (
          reviews.existingRecords.map((review) => (
            <ArtisanReviewCard
              key={review._id}
              {...review}
              showService={false}
            />
          ))
        )}
      </div>
      <Suspense>
        <Pagination className="pt-4" pagination={reviews} hash="Reviews" />
      </Suspense>
    </section>
  );
}

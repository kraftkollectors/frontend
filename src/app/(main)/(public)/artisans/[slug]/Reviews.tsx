import { ArtisanReviewCard, Pagination, RatingStars, ReviewLines } from "@/components";

import ReviewsClient from "./ReviewsClient";
import { fetchUserReviews, fetchUserReviewsCount } from "@/actions";
import { ReviewLineProps } from "@/components/ui/ReviewLines";
import { Suspense } from "react";
import { paths } from "@/utils";
import { debugLog } from "@/functions/helpers";

export default async function Reviews({ userId }: { userId: string }) {
  const reviews = await fetchUserReviews({ throwsError: false, isPublic: true, params: userId });
  if (!reviews || reviews == 'error') return <div className="info-box">Failed to get reviews</div>
  const reviewsCount = await fetchUserReviewsCount({ throwsError: false, isPublic: true, params: userId });
  if (!reviewsCount || reviewsCount == 'error') return <div className="info-box">Failed to get cummulative reviews</div>

  const reviewLines:ReviewLineProps[] = Object.entries(reviewsCount.ratingCounts).map(([key, val], i)=>{
    return({
      label: Number(key),
      value: val,
      percentage: (val * 100) / reviewsCount.totalRatings
    })
  }).reverse()
  const avgRating = reviewsCount.sumRating / reviewsCount.totalRatings;
  
  
  return (
    <section id="Reviews" className="app-container py-10">
      <ReviewsClient />
      <h1 className="r-font-bold text-title">{reviewsCount.totalRatings} Review{reviewsCount.totalRatings == 1 ? '' : 's'}</h1>
      <div className="flex justify-between max-md:flex-col">
        <div className="flex flex-col gap-2 w-full md:w-5/12 md:sticky top-0">
          <h1 className="r-font-semibold text-sm text-dark-gray">
            Overall Rating
          </h1>
          <div className="flex items-center gap-2">
            <h3 className="r-font-bold text-title">{avgRating.toFixed(1)}</h3>
            <RatingStars value={avgRating} size="lg" />
          </div>
          <div className="flex flex-col gap-2 max-w-[400px]">
            {reviewLines.map((reviewLine) => (
              <ReviewLines key={reviewLine.label} {...reviewLine} />
            ))}
          </div>
        </div>
        <div className="max-md:pt-10 gap-4 flex-col w-full md:w-6/12">
          {
            reviews.existingRecords.length == 0 ? <div className="info-box">No Reviews</div> :
              reviews.existingRecords.map((review) => (
                <ArtisanReviewCard key={review._id} {...review} showService />
              ))}
        </div>
      </div>
      <Suspense>
      {reviews.totalPages > 1 && <Pagination pagination={reviews} baseUrl={paths.singleArtisan(userId + "#Reviews")} />}
      </Suspense>
    </section>
  );
}

import { ArtisanReviewCard, RatingStars, ReviewLines } from "@/components";
import { dummyReviews, dummyReviewsLine } from "@/utils/dummy";

import ReviewsClient from "./ReviewsClient";

export default async function Reviews() {
  return (
    <section className="app-container py-10">
      <ReviewsClient />
      <div className="flex justify-between max-md:flex-col">
        <div className="flex flex-col gap-2 w-full sticky top-0">
          <h1 className="r-font-semibold text-sm text-dark-gray">
            Overall Rating
          </h1>
          <div className="flex items-center gap-2">
            <h1 className="r-font-bold text-title">4.8</h1>
            <RatingStars value={4.8} size="lg" />
          </div>
          <div className="flex flex-col gap-2 max-w-[400px]">
            {dummyReviewsLine.map((reviewLine) => (
              <ReviewLines key={reviewLine.label} {...reviewLine} />
            ))}
          </div>
        </div>
        <div className="pt-10 gap-4 grid md:grid-cols-2 xl:grid-cols-3 md:flex flex-col">
          {dummyReviews.map((review) => (
            <ArtisanReviewCard key={review._id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}

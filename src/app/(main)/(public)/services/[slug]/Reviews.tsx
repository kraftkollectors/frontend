"use client";

import { ArtisanReviewCard, RatingStars, ReviewLines } from "@/components";
import { dummyReviews, dummyReviewsLine } from "@/utils/dummy";

import { ThemeModeScript, Progress } from "flowbite-react";
import WriteReview from "./WriteReview";

export default function Reviews() {
  return (
    <section className="py-4">
      <ThemeModeScript />
      <h1 className="r-font-bold text-title">400 Reviews</h1>
      <div className="flex flex-col gap-2">
        <h1 className=" text-black-400">Overall Rating</h1>
        <div className="flex items-center gap-2">
          <h1 className="r-font-semibold text-title">4.8</h1>
          <RatingStars value={4.8} size="lg" />
        </div>
        <div className="flex flex-col gap-2 max-w-[400px]">
          {dummyReviewsLine.map((reviewLine) => (
            <ReviewLines key={reviewLine.label} {...reviewLine} />
          ))}
        </div>
      </div>
      <div className="py-2">
        <WriteReview />
      </div>
      <div className="pt-10 gap-4 grid grid-cols-1">
        {dummyReviews.map((review) => (
          <ArtisanReviewCard key={review.id} {...review} service={undefined} />
        ))}
      </div>
    </section>
  );
}

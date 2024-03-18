"use client";

import { ArtisanReviewCard, RatingStars } from '@/components';
import { dummyReviews } from '@/utils/dummy';
import type { CustomFlowbiteTheme } from 'flowbite-react';

import { ThemeModeScript, Progress } from "flowbite-react";
import { FaStar } from "react-icons/fa6";

export default function Reviews() {
  return (
    <section className="app-container py-10">
      <ThemeModeScript />
      <h1 className="r-font-bold r-text-lg">400 Reviews</h1>
      <div className="flex flex-col gap-2">
        <h1 className="r-font-semibold text-sm text-dark-gray">Overall Rating</h1>
        <div className="flex items-center gap-2">
          <h1 className="r-font-bold r-text-lg">4.8</h1>
          <RatingStars value={4.8} size='lg' />
        </div>
        <div className="flex flex-col gap-2 max-w-[400px]">
          {dummyReviewsLine.map(reviewLine =>
            <ReviewLine key={reviewLine.label} {...reviewLine} />
          )}
        </div>
      </div>
      <div className="pt-10 gap-4 grid md:grid-cols-2 xl:grid-cols-3">
        {
          dummyReviews.map(review=>
            <ArtisanReviewCard key={review.id} {...review} />
            )
        }
      </div>
    </section>
  );
}

const dummyReviewsLine: ReviewLineProps[] = [
  {
    label: 5,
    value: 100,
    percentage: 50
  },
  {
    label: 4,
    value: 10,
    percentage: 5
  },
  {
    label: 3,
    value: 30,
    percentage: 20
  },
  {
    label: 2,
    value: 30,
    percentage: 20
  },
  {
    label: 1,
    value: 30,
    percentage: 20
  },
];

const customTheme:CustomFlowbiteTheme['progress'] = {
  color: {
    yellow: 'bg-secondary'
  }
}
type ReviewLineProps = {
  label: number;
  value: number;
  percentage: number;
};
function ReviewLine({ label, value, percentage }: ReviewLineProps) {
  return (
    <div className="w-full flex gap-2 items-center">
      <div className="w-8 flex-shrink-0 flex gap-1 items-center">
        <span>
          {label}
        </span>
        <FaStar />
      </div>
      <div className="w-full flex-shrink">
        <Progress theme={customTheme} size="sm" progress={percentage} color='yellow' />
      </div>
      <div className="w-8 flex-shrink-0">
        {value}
      </div>
    </div>
  );
}


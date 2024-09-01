'use client'

import { ReviewLines } from "@/components";
import { dummyReviewsLine } from "@/utils/dummy";

import { ThemeModeScript } from "flowbite-react";

export default function ReviewsClient() {
    return (
        <>
      <ThemeModeScript />
            <div className="flex flex-col gap-2 max-w-[400px]">
          {dummyReviewsLine.map((reviewLine) => (
            <ReviewLines key={reviewLine.label} {...reviewLine} />
          ))}
        </div>
        </>
    );
}
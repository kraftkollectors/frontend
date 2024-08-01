import {
  ArtisanReviewCard,
  Pagination,
  RatingStars,
  ReviewLines,
} from "@/components";
import WriteReview from "./WriteReview";
import { fetchServiceRatings } from "@/actions";
import { CummulativeReview } from "@/utils/types/review";
import { buildUrlQuery } from "@/functions/helpers";

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
  if (!reviews || reviews == "error") return <></>;

  return (
    <section className="py-4">
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
      </div>
      <div className="py-2">
        <WriteReview ownerId={ownerId} serviceId={serviceId} />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-10">
        {reviews.existingRecords.map((review) => (
          <ArtisanReviewCard key={review._id} {...review} showService={false} />
        ))}
      </div>
      <Pagination className="pt-4" pagination={reviews} />
    </section>
  );
}

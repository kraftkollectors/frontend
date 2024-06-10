import { ArtisanReviewCard, RatingStars, ReviewLines } from "@/components";
import { dummyReviews, dummyReviewsLine } from "@/utils/dummy";
import WriteReview from "./WriteReview";
import { fetchServiceRatings } from "@/actions";

export default async function Reviews({serviceId}:{serviceId:string}) {
  const reviews = await fetchServiceRatings(serviceId);
  if(!reviews || reviews == 'error') return <></>
  
  return (
    <section className="py-4">
      <h1 className="r-font-bold text-title">400 Reviews</h1>
      <div className="flex flex-col gap-2">
        <h1 className=" text-black-400">Overall Rating</h1>
        <div className="flex items-center gap-2">
          <h1 className="r-font-semibold text-title">4.8</h1>
          <RatingStars value={4.8} size="lg" />
        </div>
        
      </div>
      <div className="py-2">
        <WriteReview serviceId={serviceId} />
      </div>
      <div className="pt-10 gap-4 grid grid-cols-1">
        {reviews.existingRecords.map((review) => (
          <ArtisanReviewCard key={review._id} {...review} showService={false} />
        ))}
      </div>
    </section>
  );
}

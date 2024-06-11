import { RatingStars } from "../ui/RatingStars";
import { ArtisanReviewCardProps } from "../reviewCard/ArtisanReviewServiceCard";
import UserProfile from "../reviewCard/UserProfile";
import { Suspense } from "react";
import CardUserSkeleton from "../skeletons/CardUserSkeleton";
import { fetchSingleArtisanService } from "@/actions";

export function DashboardReviewCard({
  createdAt: date,
  _id: id,
  rating,
  review,
  reviewerId: user,
  serviceId: service,
}: ArtisanReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 border-b pb-2 bg-light p-2 rounded">
      <div className="flex gap-3 items-center">
        <Suspense fallback={<CardUserSkeleton />}>
        <UserProfile userId={user} date={date}  />
        </Suspense>
        <div className="ps-4 flex flex-col max-md:hidden">
          <p className=" text-black-300">reviewed</p>
          <ServiceName serviceId={service} />
        </div>
      </div>
        <div className="flex flex-col md:hidden">
<p className=" text-black-300">reviewed</p>
          <ServiceName serviceId={service} />
        </div>
      <RatingStars value={rating} />
      <p className="text-black-500">{review}</p>
    </div>
  );
}


async function ServiceName({serviceId}:{serviceId:string}){
  const s = await fetchSingleArtisanService(serviceId, {throwsError: false, isPublic: true})
  if(!s || s == 'error') return <div className="skeleton w-40 h-5"></div>

  return (<>
          <h1 className="text-black-900 r-font-semibold truncate line-clamp-1">
            {s.title}
          </h1>
  </>)

}
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
    <div className="flex w-full flex-col gap-2 rounded border-b bg-light p-2 pb-2">
      <div className="flex items-center gap-3">
        <Suspense fallback={<CardUserSkeleton />}>
          <UserProfile userId={user} date={date} />
        </Suspense>
        <div className="flex flex-col ps-4 max-md:hidden">
          <p className="text-black-300">reviewed</p>
          <ServiceName serviceId={service} />
        </div>
      </div>
      <div className="flex flex-col md:hidden">
        <p className="text-black-300">reviewed</p>
        <ServiceName serviceId={service} />
      </div>
      <RatingStars value={rating} />
      <p className="text-black-500">{review}</p>
    </div>
  );
}

async function ServiceName({ serviceId }: { serviceId: string }) {
  const s = await fetchSingleArtisanService(serviceId, {
    throwsError: false,
    isPublic: true,
  });
  if (!s || s == "error") return <div className="skeleton h-5 w-40"></div>;

  return (
    <>
      <p className="r-font-semibold line-clamp-2 text-black-900">{s.title}</p>
    </>
  );
}

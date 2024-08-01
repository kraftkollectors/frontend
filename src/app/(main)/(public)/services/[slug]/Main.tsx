import { MediaSlider } from "@/components";
import Reviews from "./Reviews";
import ServiceDetails from "./ServiceDetails";
import Profile from "./Profile";
import {
  Service,
  ServiceDetails as DetailedService,
} from "@/utils/types/service";
import { Suspense } from "react";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";

export default function Main({
  s,
  reviewsPage,
}: {
  s: DetailedService;
  reviewsPage?: string;
}) {
  return (
    <section className="md:col-span-7">
      <div className="mx-auto w-full max-md:max-w-[500px]">
        <MediaSlider media={s.portfolio} />
      </div>
      <div className="max-md:app-container">
        <ServiceDetails {...s} />
        <div className="border-b pb-4 md:hidden">
          <Suspense fallback={<UserProfileSkeleton />}>
            <Profile userId={s.userId} />
          </Suspense>
        </div>
        <Reviews
          page={reviewsPage}
          ownerId={s.userId}
          cummulative={s.cummulativeRating}
          serviceId={s._id}
        />
      </div>
    </section>
  );
}

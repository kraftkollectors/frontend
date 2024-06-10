import { MediaSlider } from "@/components";
import Reviews from "./Reviews";
import ServiceDetails from "./ServiceDetails";
import Profile from "./Profile";
import { Service } from "@/utils/types/service";
import { Suspense } from "react";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";

export default function Main({s}: {s:Service}) {
  return (
    <section className="md:col-span-7">
      <div className="w-full max-md:max-w-[500px] mx-auto">
        <MediaSlider
          media={s.portfolio}
        />
      </div>
      <div className="max-md:app-container">
      <ServiceDetails {...s} />
      <div className="md:hidden pb-4 border-b">
      <Suspense fallback={<UserProfileSkeleton />}>
        <Profile userId={s.userId} />
        </Suspense>
      </div>
      <Reviews serviceId={s._id} />
      </div>
    </section>
  );
}

import { MediaSlider } from "@/components";
import Reviews from "./Reviews";
import ServiceDetails from "./ServiceDetails";
import Profile from "./Profile";
import { Service } from "@/utils/types/service";
import { Suspense } from "react";

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
      <Suspense fallback={
          <div className="skeleton h-96 w-full flex items-center p-10 flex-col gap-4">
            <div className="avatar skeleton size-28"></div>
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        }>
        <Profile userId={s.userId} />
        </Suspense>
      </div>
      <Reviews />
      </div>
    </section>
  );
}

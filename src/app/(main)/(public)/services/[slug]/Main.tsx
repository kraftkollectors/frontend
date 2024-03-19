import { MediaSlider } from "@/components";
import Reviews from "./Reviews";
import ServiceDetails from "./ServiceDetails";
import Profile from "./Profile";

export default function Main() {
  return (
    <section className="md:col-span-7">
      <div className="w-full max-md:max-w-[500px] mx-auto">
        <MediaSlider
          media={[
            "/images/auth-bg.mp4",
            "/images/dna logo.png",
            "/images/galaxy s24.jpg",
            "/images/auth-bg.png"
          ]}
        />
      </div>
      <ServiceDetails />
      <div className="md:hidden pb-4 border-b">
        <Profile />
      </div>
      <Reviews />
    </section>
  );
}

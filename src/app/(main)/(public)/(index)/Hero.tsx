import NavSearch from "@/components/navbar/NavSearch";
import HeroButton from "./HeroButtons";

export default function Hero() {
  return (
    <div className="bg-[url('/images/hero-bg.jpeg')] bg-no-repeat bg-cover h-[500px] md:h-[600px] bg-center bg-dark bg-opacity-15">
      <div className="app-container py-16 flex flex-col justify-center items-center h-full">
        <div className="max-w-[720px] mx-auto flex flex-col gap-4 text-center h-fit">
          <h1 className="text-black-50 font-semibold text-headline md:text-headlineBig">
            Find Professionals Nearby
          </h1>
          <p className="text-light">
            Linking You to the Best Artisans and Experts in Your Area
          </p>
          <div className="[&>*]:bg-light [&>*]:rounded-lg text-start ">
            <NavSearch />
          </div>
          <HeroButton />
        </div>
      </div>
    </div>
  );
}

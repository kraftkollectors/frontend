/* eslint-disable @next/next/no-img-element */
import NavSearch from "@/components/navbar/NavSearch";
import HeroButton from "./HeroButtons";
import { Suspense } from "react";

export default function Hero() {
  return (
    <div className="relative h-[500px] bg-dark bg-opacity-15 bg-cover bg-center bg-no-repeat md:h-[600px]">
      <img
        src="/images/hero-bg.jpeg"
        height={700}
        width={900}
        alt="hero banner"
        className="absolute left-0 top-0 h-full w-full object-cover object-center"
      />
      <div className="app-container relative flex h-full flex-col items-center justify-center py-16">
        <div className="mx-auto flex h-fit max-w-[720px] flex-col gap-4 text-center">
          <h1 className="text-headline font-semibold text-black-50 md:text-headlineBig">
            Find Professionals Nearby
          </h1>
          <h2 className="text-light">
            Linking You to the Best Artisans and Experts in Your Area
          </h2>
          <div className="text-start [&>*]:rounded-lg [&>*]:bg-light [&>div>form]:min-h-[42px]">
            <Suspense>
              <NavSearch />
            </Suspense>
          </div>
          <HeroButton />
        </div>
      </div>
    </div>
  );
}

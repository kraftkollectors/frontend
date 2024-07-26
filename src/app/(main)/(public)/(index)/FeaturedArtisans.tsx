import { Suspense } from "react";
import ArtisansColumn from "./ArtisansColumn";
import AdsColumn from "./AdsColumn";

export default function FeaturedArtisans() {
  return (
    <section className="app-container bg-black-50 py-16">
      <h3 className="text-title font-bold text-black-400">Featured Artisans</h3>
      <div className="flex gap-6 pt-8 max-md:flex-col">
        <div className="w-full md:w-4/12">
          <Suspense fallback={<div className="skeleton h-60 w-full"></div>}>
            <ArtisansColumn />
          </Suspense>
        </div>
        <div className="w-full md:w-8/12">
          <Suspense fallback={<div className="skeleton h-60 w-full"></div>}>
            <AdsColumn />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

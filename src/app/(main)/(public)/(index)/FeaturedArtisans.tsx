import { Suspense } from "react";
import ArtisansColumn from "./ArtisansColumn";

export default function FeaturedArtisans(){
    return (
        <section className="app-container py-16 bg-black-50">
            <h3 className="text-title font-bold text-black-400">Our Categories</h3>
            <div className="flex max-md:flex-col gap-6 pt-8">
                <div className="w-full md:w-4/12">
                    <Suspense fallback={<div className="skeleton h-48 w-full"></div>}>
                        <ArtisansColumn />
                    </Suspense>
                </div>
                <div className="w-full md:w-8/12"></div>
            </div>
        </section>
    )
}
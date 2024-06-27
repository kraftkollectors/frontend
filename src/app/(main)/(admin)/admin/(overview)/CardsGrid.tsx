import { Suspense } from "react";
import { Adverts, Categories, Payments, TotalArtisans, TotalListedServices, TotalUsers } from "./gridCards";

export default function CardsGrid() {
    const loading = <div className="skeleton !rounded-md h-40" />;
    
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={loading}>
                <TotalUsers />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalArtisans />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalListedServices />
            </Suspense>
            <Suspense fallback={loading}>
                <Payments />
            </Suspense>
            <Suspense fallback={loading}>
                <Adverts />
            </Suspense>
            <Suspense fallback={loading}>
                <Categories />
            </Suspense>
        </div>
    );
}
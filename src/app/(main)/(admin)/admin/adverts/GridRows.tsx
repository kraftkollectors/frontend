import { Suspense } from "react";
import TotalAdvertisements from "./components/TotalAdvertisements";
import InactiveAdvertisements from "./components/InactiveAdvertisements";
import ActiveAdvertisements from "./components/ActiveAdvertisements";

export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalAdvertisements />
            </Suspense>
            <Suspense fallback={loading}>
                <ActiveAdvertisements />
            </Suspense>
            <Suspense fallback={loading}>
                <InactiveAdvertisements />
            </Suspense>
            
        </div>
    );
}
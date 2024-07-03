import { Suspense } from "react";
import TotalUsers from "./components/TotalUsers";
import TotalVerifiedUsers from "./components/TotalVerifiedUsers";
import TotalNormalUsers from "./components/TotalNormalUsers";

export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalUsers />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalVerifiedUsers />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalNormalUsers />
            </Suspense>
            
        </div>
    );
}
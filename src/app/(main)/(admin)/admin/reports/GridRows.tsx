import { Suspense } from "react";
import TotalMessages from "./components/TotalReports";
import TotalUnresolvedMessages from "./components/TotalUnresolvedReports";
import { TotalUnreadReports } from "./components/TotalUnreadReports";
export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalMessages />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalUnreadReports />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalUnresolvedMessages />
            </Suspense>
            
        </div>
    );
}
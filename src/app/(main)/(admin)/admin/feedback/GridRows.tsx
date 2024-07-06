import { Suspense } from "react";
import TotalMessages from "./components/TotalMessages";
import TotalUnresolvedMessages from "./components/TotalUnresolvedMessages";
import TotalUnreadMessages from "./components/TotalUnreadMessages";

export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalMessages />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalUnreadMessages />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalUnresolvedMessages />
            </Suspense>
        </div>
    );
}
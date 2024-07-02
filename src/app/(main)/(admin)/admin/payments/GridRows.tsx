import { Suspense } from "react";
import TotalUsers from "./components/TotalRevenue";
import TotalVerifiedUsers from "./components/ActivePayments";
import ActivePayment from "./components/PendingTransactions";

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
                <ActivePayment />
            </Suspense>
            
        </div>
    );
}
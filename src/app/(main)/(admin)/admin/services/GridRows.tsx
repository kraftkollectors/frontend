import { Suspense } from "react";
import TotalListedServices from "./components/TotalListedServices";

export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalListedServices />
            </Suspense>
            
        </div>
    );
}
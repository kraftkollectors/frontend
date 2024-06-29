import { Suspense } from "react";
import TotalCategories from "./components/TotalCategories";
import TotalSubCategories from "./components/TotalSubCategories";

export default function GridRows() {
    
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className=" grid lg:grid-cols-3 gap-4">
            <Suspense fallback={loading}>
                <TotalCategories />
            </Suspense>
            <Suspense fallback={loading}>
                <TotalSubCategories />
            </Suspense>
        </div>
    );
}
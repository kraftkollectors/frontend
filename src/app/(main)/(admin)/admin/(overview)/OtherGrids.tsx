import { ListGroup } from "@/components/admin";
import { Suspense } from "react";
import UnreadReports from "./UnreadReports";
import LatestAccounts from "./LatestAccounts";
import UnreadFeedbacks from "./UnreadFeedbacks";

export default function OtherGrids() {
    const loading = <div className="skeleton !rounded-md h-40" />;

    return (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="grid gap-4 grid-cols-1 lg:col-span-2">
                <Suspense fallback={loading}>
                    <UnreadReports />
                </Suspense>
                <Suspense fallback={loading}>
                    <UnreadFeedbacks />
                </Suspense>
            </div>
            <div className="col-span-1">
                <Suspense fallback={loading}>
                    <LatestAccounts />
                </Suspense>
            </div>
        </div>
    );
}
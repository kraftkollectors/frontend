import { fetchReports } from "@/actions";
import { ListGroup, UserName } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";
import { Suspense } from "react";

export default async function UnreadReoprts() {
    const reports = await fetchReports({ throwsError: false, params: "?only=unread" });
    if (reports === 'error' || !reports) return <div className="skeleton h-20"></div>; ;

    return (
        <ListGroup
            title={`Unread Reports (${reports.totalDocuments})`}
            allUrl={paths.adminReports}
        >
            {
                reports.existingRecords.length === 0 ? <p className="info-box">You have no unread reports</p> :
                    reports.existingRecords.map(report => <ListTile
                        key={report._id}
                        before={<AppIcons.UnreadReport />}
                        href={`${paths.adminReports}?reportId=${report._id}`}
                    >
                        <p className="text-label font-semibold text-black-400">
                            <Suspense fallback={<div className="skeleton h-4 w-20"></div>}>
                                <UserName userId={report.reporterId} />
                            </Suspense>
                            <span className="text-black-200"> reported a post by </span>
                            <Suspense fallback={<div className="skeleton h-4 w-20"></div>}>
                                <UserName userId={report.reportedId} />
                            </Suspense>
                        </p>
                    </ListTile>)
            }

        </ListGroup>
    );
}
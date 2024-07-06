import { fetchReports } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalUnresolvedReports() {
    const reports = await fetchReports({ throwsError: false, params: "?only=unresolved"  });
    if (reports === 'error' || !reports) return null;
    return (
        <AdminCard
        title={formatNumber(reports.totalDocuments)}
        label="Total Unresolved Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
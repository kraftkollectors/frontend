import { fetchReports } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalReports() {
    const reports = await fetchReports({ throwsError: false });
    if (reports === 'error' || !reports) return null;
    return (
        <AdminCard
        title={formatNumber(reports.totalDocuments)}
        label="Total Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
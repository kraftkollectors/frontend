import { fetchReports } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export  async function TotalUnreadReports() {
    const reports = await fetchReports({ throwsError: false, params: "?only=unread" });
    if (reports === 'error' || !reports) return null;
    return (
        <AdminCard
        title={formatNumber(reports.totalDocuments)}
        label="Total Unread Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
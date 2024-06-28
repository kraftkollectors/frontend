import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalUnresolvedReports() {
    return (
        <AdminCard
        title="2,000"
        label="Total Unresolved Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
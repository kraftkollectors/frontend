import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalUnreadReports() {
    return (
        <AdminCard
        title="2,000"
        label="Total Unread Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
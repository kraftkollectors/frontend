import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalReports() {
    return (
        <AdminCard
        title="2,000"
        label="Total Reports"
        icon={<AppIcons.AdminReport />}
        bg="secondary"
         />
    );
}
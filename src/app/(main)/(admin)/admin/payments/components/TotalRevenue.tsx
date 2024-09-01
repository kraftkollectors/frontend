import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalRevenue() {
    return (
        <AdminCard
        title="2,000"
        label="Total Revenue"
        icon={<AppIcons.AdminPayments />}
        bg="secondary"
         />
    );
}
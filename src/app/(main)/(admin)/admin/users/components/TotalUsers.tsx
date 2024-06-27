import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalUsers() {
    return (
        <AdminCard
        title="2,000"
        label="Total Users"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalVerifiedUsers() {
    return (
        <AdminCard
        title="2,000"
        label="Total Verified Users"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
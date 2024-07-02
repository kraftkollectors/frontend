import { fetchUsers } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalVerifiedUsers() {
    const users = await fetchUsers({ throwsError: false, params: "?artisanOnly=true" });
    if (users === 'error' || !users) return null;
    
    return (
        <AdminCard
        title={formatNumber(users.totalDocuments)}
        label="Total Artisans"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
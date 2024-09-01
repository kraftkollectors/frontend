import { fetchUsers } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalNormalUsers() {
    const users = await fetchUsers({ throwsError: false, params: "?artisanOnly=false" });
    if (users === 'error' || !users) return null;
    
    return (
        <AdminCard
        title={formatNumber(users.totalDocuments)}
        label="Total Non-Artisans"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
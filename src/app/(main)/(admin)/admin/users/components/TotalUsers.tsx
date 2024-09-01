import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { fetchUsers } from "@/actions";
import { formatNumber } from "@/functions/helpers";


export default async function TotalUsers() {
    const users = await fetchUsers({ throwsError: false });
    if (users === 'error' || !users) return null;
    
    return (
        <AdminCard
        title={formatNumber(users.totalDocuments)}
        label="Total Users"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
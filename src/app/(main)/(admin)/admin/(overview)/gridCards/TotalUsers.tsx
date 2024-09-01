import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchUsers } from "@/actions";
import { formatNumber } from "@/functions/helpers";

export default async function TotalUsers() {
    const users = await fetchUsers({ throwsError: false });
    if (users === 'error' || !users) return null;

    return (
        <AdminCard
            icon={<AppIcons.AdminUsers />}
            label="Total users"
            title={formatNumber(users.totalDocuments)}
        >
            <ViewAll href={paths.adminUsers} />
        </AdminCard>
    );
}

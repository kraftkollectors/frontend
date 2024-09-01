import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchUsers } from "@/actions";
import { formatNumber } from "@/functions/helpers";

export default async function TotalArtisans() {
    const users = await fetchUsers({ throwsError: false, params: "?artisanOnly=true" });
    if (users === 'error' || !users) return null;

    return (
        <AdminCard
        icon={<AppIcons.AdminUsers />}
        label="Total artisans"
        title={formatNumber(users.totalDocuments)}
        >
            <ViewAll href={paths.adminUsers + "?artisanOnly=true"} />
        </AdminCard>
    );
}
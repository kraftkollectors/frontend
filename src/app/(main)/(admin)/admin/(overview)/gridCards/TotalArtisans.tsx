import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function TotalArtisans() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminUsers />}
        label="Total artisans"
        title="2,000"
        >
            <ViewAll href={paths.adminUsers + "tab=artisans"} />
        </AdminCard>
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function TotalUsers() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminUsers />}
        label="Total users"
        title="2,000"
        >
            <ViewAll href={paths.adminUsers} />
        </AdminCard>
    );
}
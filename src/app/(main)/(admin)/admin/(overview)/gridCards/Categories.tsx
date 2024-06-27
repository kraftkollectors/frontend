import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function Categories() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminUsers />}
        label="Categories"
        title="2,000"
        bg="secondary"
        >
            <ViewAll href={paths.adminCategories} />
        </AdminCard>
    );
}
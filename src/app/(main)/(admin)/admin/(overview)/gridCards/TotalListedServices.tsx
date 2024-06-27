import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function TotalListedServices() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminServices />}
        label="Total listed services"
        title="2,000"
        >
            <ViewAll href={paths.adminServices} />
        </AdminCard>
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function Adverts() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminAdverts />}
        label="Adverts"
        title="2,000"
        bg="secondary"
        >
            <ViewAll href={paths.adminAdverts} />
        </AdminCard>
    );
}
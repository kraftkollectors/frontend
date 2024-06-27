import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";

export default async function Payments() {
    // const users = await fetchUser
    
    return (
        <AdminCard
        icon={<AppIcons.AdminPayments />}
        label="Payments"
        title="2,000"
        bg="secondary"
        >
            <ViewAll href={paths.adminPayments} />
        </AdminCard>
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalCategories() {
    return (
        <AdminCard
        title="2,000"
        label="Total categories"
        icon={<AppIcons.AdminCategories />}
        bg="secondary"
         />
    );
}
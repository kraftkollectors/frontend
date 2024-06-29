import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalSubCategories() {
    return (
        <AdminCard
        title="2,000"
        label="Total sub-categories"
        icon={<AppIcons.AdminCategories />}
        bg="secondary"
         />
    );
}
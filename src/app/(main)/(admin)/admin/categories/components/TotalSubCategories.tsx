import { fetchSubCategories } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalSubCategories() {
    const subCategories = await fetchSubCategories({ throwsError: false });
    if (subCategories === 'error' || !subCategories) return null;
    
    return (
        <AdminCard
        title={String(subCategories.totalDocuments)}
        label="Total sub-categories"
        icon={<AppIcons.AdminCategories />}
        bg="secondary"
         />
    );
}
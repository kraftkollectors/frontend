import { fetchCategories } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalCategories() {
    const categories = await fetchCategories({ throwsError: false });
    if (categories === 'error' || !categories) return null;

    return (
        <AdminCard
            title={String(categories.totalDocuments)}
            label="Total categories"
            icon={<AppIcons.AdminCategories />}
            bg="secondary"
        />
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchCategories } from "@/actions/fetch/fetchCategories";
import { formatNumber } from "@/functions/helpers";

export default async function Categories() {
    const categories = await fetchCategories();
    if (categories === 'error' || !categories) return null;
    
    return (
        <AdminCard
        icon={<AppIcons.AdminUsers />}
        label="Categories"
        title={formatNumber(categories.totalDocuments)}
        bg="secondary"
        >
            <ViewAll href={paths.adminCategories} />
        </AdminCard>
    );
}
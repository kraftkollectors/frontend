import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchAdverts } from "@/actions/admin";
import { formatNumber } from "@/functions/helpers";

export default async function Adverts() {
    const adverts = await fetchAdverts();
    if(!adverts || adverts == 'error') return null;
    
    return (
        <AdminCard
        icon={<AppIcons.AdminAdverts />}
        label="Adverts"
        title={formatNumber(adverts.totalDocuments)}
        bg="secondary"
        >
            <ViewAll href={paths.adminAdverts} />
        </AdminCard>
    );
}
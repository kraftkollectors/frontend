import { fetchAdverts } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function ActiveAdvertisements() {
    const adverts = await fetchAdverts({ throwsError: false, params: "?activeOnly=true" });
    if (adverts === 'error' || !adverts) return null;
    return (
        <AdminCard
        title={formatNumber(adverts.totalDocuments)}
        label="Active Advertisements"
        icon={<AppIcons.AdminAdverts />}
        bg="secondary"
         />
    );
}
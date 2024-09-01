import { fetchAdverts } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalAdvertisements() {
    const adverts = await fetchAdverts({ throwsError: false });
    if (adverts === 'error' || !adverts) return null;
    return (
        <AdminCard
        title={formatNumber(adverts.totalDocuments)}
        label="Total Advertisements"
        icon={<AppIcons.AdminAdverts />}
        bg="secondary"
         />
    );
}
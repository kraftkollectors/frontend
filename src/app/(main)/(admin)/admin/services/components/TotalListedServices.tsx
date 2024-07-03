import { fetchServices, fetchUsers } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalListedServices() {
    const services = await fetchServices({ throwsError: false });
    if (services === 'error' || !services) return null;
    return (
        <AdminCard
        title={formatNumber(services.totalDocuments)}
        label="Total Listed Services"
        icon={<AppIcons.AdminServices />}
        bg="secondary"
         />
    );
}
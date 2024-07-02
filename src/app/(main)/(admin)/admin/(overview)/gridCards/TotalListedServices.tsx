import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { ViewAll } from "./ViewAll";
import { paths } from "@/utils";
import { fetchServices } from "@/actions";
import { formatNumber } from "@/functions/helpers";

export default async function TotalListedServices() {
    const services = await fetchServices({throwsError: false});
    if(services === 'error' || !services) return null;
    // const all = services;
    
    
    return (
        <AdminCard
        icon={<AppIcons.AdminServices />}
        label="Total listed services"
        title={formatNumber(services.totalDocuments)}
        >
            <ViewAll href={paths.adminServices} />
        </AdminCard>
    );
}
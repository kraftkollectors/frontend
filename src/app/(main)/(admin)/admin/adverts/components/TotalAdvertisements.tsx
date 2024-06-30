import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalAdvertisements() {
    return (
        <AdminCard
        title="2,000"
        label="Total Advertisements"
        icon={<AppIcons.AdminAdverts />}
        bg="secondary"
         />
    );
}
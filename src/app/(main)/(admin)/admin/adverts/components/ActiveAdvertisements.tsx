import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function ActiveAdvertisements() {
    return (
        <AdminCard
        title="2,000"
        label="Active Advertisements"
        icon={<AppIcons.AdminAdverts />}
        bg="secondary"
         />
    );
}
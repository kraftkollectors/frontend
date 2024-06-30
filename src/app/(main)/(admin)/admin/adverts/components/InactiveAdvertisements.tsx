import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function InactiveAdvertisements() {
    return (
        <AdminCard
        title="2,000"
        label="Inactive Advertisements"
        icon={<AppIcons.AdminAdverts />}
        bg="secondary"
         />
    );
}
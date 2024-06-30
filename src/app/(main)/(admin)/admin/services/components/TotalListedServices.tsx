import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalListedServices() {
    return (
        <AdminCard
        title="2,000"
        label="Total Listed Services"
        icon={<AppIcons.AdminServices />}
        bg="secondary"
         />
    );
}
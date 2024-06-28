import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default async function TotalMessages() {
    return (
        <AdminCard
        title="2,000"
        label="Total Messages"
        icon={<AppIcons.AdminFeedback />}
        bg="secondary"
         />
    );
}
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalUnresolvedMessages() {
    return (
        <AdminCard
        title="2,000"
        label="Total Unresolved Messages"
        icon={<AppIcons.AdminFeedback />}
        bg="secondary"
         />
    );
}
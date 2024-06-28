import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";

export default function TotalUnreadMessages() {
    return (
        <AdminCard
        title="2,000"
        label="Total Unread Messages"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
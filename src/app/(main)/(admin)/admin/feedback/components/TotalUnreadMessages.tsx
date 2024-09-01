import { fetchFeedbacks } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalUnreadMessages() {
    const feedbacks = await fetchFeedbacks({ throwsError: false, params: "?only=unread" });
    if (feedbacks === 'error' || !feedbacks) return null;
    return (
        <AdminCard
        title={formatNumber(feedbacks.totalDocuments)}
        label="Total Unread Messages"
        icon={<AppIcons.AdminUsers />}
        bg="secondary"
         />
    );
}
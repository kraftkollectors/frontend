import { fetchFeedbacks } from "@/actions";
import { AdminCard } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import { formatNumber } from "@/functions/helpers";

export default async function TotalUnresolvedMessages() {
    const feedbacks = await fetchFeedbacks({ throwsError: false, params: "?only=unresolved"  });
    if (feedbacks === 'error' || !feedbacks) return null;
    return (
        <AdminCard
        title={formatNumber(feedbacks.totalDocuments)}
        label="Total Unresolved Messages"
        icon={<AppIcons.AdminFeedback />}
        bg="secondary"
         />
    );
}
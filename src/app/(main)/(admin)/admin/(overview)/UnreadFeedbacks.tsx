import { fetchFeedbacks } from "@/actions";
import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";

export default async function UnreadFeedbacks() {
    const feedbacks = await fetchFeedbacks({ throwsError: false, params: "?only=unread" });
    if (feedbacks === 'error' || !feedbacks) return <div className="skeleton h-20"></div>; ;
    
    return (
        <ListGroup
            title={`Unread Feedbacks (${feedbacks.totalDocuments})`}
            allUrl={paths.adminFeedback}
        >
            {
                feedbacks.existingRecords.length === 0 ? <p className="info-box">You have no unread feedbacks</p> :
                feedbacks.existingRecords.map(feedback => <ListTile
                key={feedback._id}
                before={<AppIcons.UnreadFeedback />}
                href={`${paths.adminFeedback}?feedbackId=${feedback._id}`}
                >
                    <p className="text-label font-semibold text-black-400">
                        {feedback.name}
                        <span className="text-black-200"> sent a message</span>
                    </p>
                </ListTile>)
            }
        </ListGroup>
    );
}
import { ListGroup } from "@/components/admin";
import { paths } from "@/utils";

export default function UnreadFeedbacks() {
    return (
        <ListGroup
            title="Unread Feedbacks (2)"
            allUrl={paths.adminFeedback}
        >
            1
        </ListGroup>
    );
}
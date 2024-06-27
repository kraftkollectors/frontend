import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";

export default function UnreadFeedbacks() {
    return (
        <ListGroup
            title="Unread Feedbacks (2)"
            allUrl={paths.adminFeedback}
        >
             <ListTile
            before={<AppIcons.UnreadFeedback />}
            href={""}
            >
                <p className="text-label font-semibold text-black-400">
                    example user
                    <span className="text-black-200"> sent a message</span>
                </p>
            </ListTile>
             <ListTile
            before={<AppIcons.UnreadFeedback />}
            href={""}
            >
                <p className="text-label font-semibold text-black-400">
                    example user
                    <span className="text-black-200"> sent a message</span>
                </p>
            </ListTile>
        </ListGroup>
    );
}
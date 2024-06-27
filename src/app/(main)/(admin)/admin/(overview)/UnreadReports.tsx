import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { paths } from "@/utils";

export default function UnreadReoprts() {
    return (
        <ListGroup
            title="Unread Reports (2)"
            allUrl={paths.adminReports}
        >
            <ListTile
            before={<AppIcons.UnreadReport />}
            href={""}
            >
                <p className="text-label font-semibold text-black-400">
                    example user
                    <span className="text-black-200"> sent a message</span>
                </p>
            </ListTile>
            <ListTile
            before={<AppIcons.UnreadReport />}
            href={""}
            >
                <p className="text-label font-semibold text-black-400">
                    example user
                    <span className="text-black-200"> reported a post by </span>
                    example person
                </p>
            </ListTile>
            <ListTile
            before={<AppIcons.UnreadReport />}
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
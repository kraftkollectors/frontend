import { ListGroup } from "@/components/admin";
import { paths } from "@/utils";

export default function UnreadReoprts() {
    return (
        <ListGroup
            title="Unread Reports (2)"
            allUrl={paths.adminReports}
        >
            1
        </ListGroup>
    );
}
import { ListGroup } from "@/components/admin";
import { paths } from "@/utils";

export default function LatestAccounts() {
    return (
        <ListGroup
            title="Latest Accounts"
            allUrl={paths.adminUsers}
        >
            1
        </ListGroup>
    );
}
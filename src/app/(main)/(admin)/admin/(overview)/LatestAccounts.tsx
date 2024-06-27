/* eslint-disable @next/next/no-img-element */
import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import { paths } from "@/utils";

export default function LatestAccounts() {
    return (
        <ListGroup
            title="Latest Accounts"
            allUrl={paths.adminUsers}
        >
             <ListTile
            before={<img alt="" src="/images/user-avatar.png" className="avatar size-9 flex-shrink-0" />}
            href={""}
            >
                <div className="flex flex-col text-label font-semibold text-black-400">
                    <span>John Doe</span>
                    <span className="text-black-200">@username</span>
                </div>
            </ListTile>
             <ListTile
            before={<img alt="" src="/images/user-avatar.png" className="avatar size-9 flex-shrink-0" />}
            href={""}
            >
                <div className="flex flex-col text-label font-semibold text-black-400">
                    <span>John Doe</span>
                    <span className="text-black-200">@username</span>
                </div>
            </ListTile>
        </ListGroup>
    );
}
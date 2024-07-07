/* eslint-disable @next/next/no-img-element */
import { fetchUsers } from "@/actions";
import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import { fallbackImage, fullName } from "@/functions/helpers";
import { paths } from "@/utils";

export default async function LatestAccounts() {
    const users = await fetchUsers({ throwsError: false });
    if (users === 'error' || !users) return <div className="skeleton h-40"></div>;

    return (
        <ListGroup
            title="Latest Accounts"
            allUrl={paths.adminUsers}
        >
            {
                users.existingRecords.length === 0 ? <p className="info-box">No user accounts</p> :
                    users.existingRecords.map(user => <ListTile
                        key={user._id}
                        before={<img alt="user avatar" src={fallbackImage(user.image)} className="avatar size-9 flex-shrink-0" />}
                        href={paths.adminSingleUser(user._id)}
                    >
                        <div className="flex flex-col text-label font-semibold text-black-400">
                            <span>{fullName(user.firstName, user.lastName)}</span>
                            <span className="text-black-200">@{user.userName}</span>
                        </div>
                    </ListTile>)
            }
        </ListGroup>
    );
}
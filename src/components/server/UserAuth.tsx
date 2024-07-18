'use client'

import { useUserStore } from "@/state";

export default function UserAuth({withNames = false}:{withNames?: boolean}) {
    const user = useUserStore(s=>s.user)
    return (
        <>
        <input type="hidden" hidden defaultValue={user?._id} name="userId" />
        <input type="hidden" hidden defaultValue={user?.email} name="userEmail" />
        {withNames && <>
        
      <input type="hidden" hidden name="firstName" value={user?.firstName} />
      <input type="hidden" hidden name="lastName" value={user?.lastName} />
        </>}
        </>
    );
}
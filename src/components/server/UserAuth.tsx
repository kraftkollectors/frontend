'use client'

import { useUserStore } from "@/state";

export default function UserAuth() {
    const user = useUserStore(s=>s.user)
    return (
        <>
        <input type="hidden" hidden defaultValue={user?._id} name="userId" />
        <input type="hidden" hidden defaultValue={user?.email} name="userEmail" />
        </>
    );
}
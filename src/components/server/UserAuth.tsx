'use client'

import { useUserStore } from "@/state";

export default function UserAuth() {
    const user = useUserStore(s=>s.user)
    return (
        <>
        <input type="hidden" hidden value={user?._id} name="userId" />
        <input type="hidden" hidden value={user?.email} name="userEmail" />
        </>
    );
}
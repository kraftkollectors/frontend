'use client'

import { ApiUser } from "@/actions/fetch/fetchUser";
import { useRunOnce } from "@/hooks";
import { useUserStore } from "@/state";

export default function UserStateProvider({user}:{
    user: ApiUser|null;
}){
    const setUser = useUserStore(s=>s.setUser);
    useRunOnce(() => {
        setUser(user);
    })
    return <></>
}
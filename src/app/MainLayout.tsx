'use client'

import { useRunOnce } from "@/hooks";
import { useUserStore } from "@/state";
import { UserDetailsPlus } from "@/utils/types/user";

export default function UserStateProvider({user}:{
    user: UserDetailsPlus|null;
}){
    const setUser = useUserStore(s=>s.setUser);
    useRunOnce(() => {
        setUser(user);
    })
    return <></>
}
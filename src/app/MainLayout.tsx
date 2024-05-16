'use client'

import { useRunOnce } from "@/hooks";
import { useUserStore } from "@/state";

export default function UserStateProvider({user}:{
    user?: any;
}){
    const setUser = useUserStore(s=>s.setUser);
    useRunOnce(() => {
        console.log(user);
        setUser(user);
    })
    return <></>
}
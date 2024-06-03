'use client'

import { useRunOnce } from "@/hooks";
import { useUserStore } from "@/state";
import { Artisan } from "@/utils/types/artisan";
import { UserDetailsPlus } from "@/utils/types/user";

export default function UserStateProvider({user, artisan}:{
    user: UserDetailsPlus|null;
    artisan: Artisan|null;
}){
    const setUser = useUserStore(s=>s.setUser);
    const setArtisan = useUserStore(s=>s.setArtisan);
    useRunOnce(() => {
        setUser(user);
        setArtisan(artisan);
    })
    return <></>
}
'use client'

import { useRunOnce } from "@/hooks";
import { logout } from "@/actions";
import { useRouter } from "next/navigation";

export default function Page(){
    const {back} = useRouter();
    
    useRunOnce(async ()=>{
        const loggedOut = await logout()
        if(window && window.location && loggedOut)
            window.location.href = '/'
        else
            back();
    });
    
    return <div>logging out</div>
}
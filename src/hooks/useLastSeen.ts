import { fetchUser } from "@/actions"
import { compareDates, formatChatTime, formatDate } from "@/functions/date";
import { debugLog } from "@/functions/helpers";
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";


type LastSeen = 'online' | string

export function useLastSeen(userId: string):LastSeen{
    const [lastSeen, setLastSeen] = useState('')
    const {data, isLoading, error} = useQuery({
        queryFn: ()=>fetchUser({isPublic: true, params: userId}),
        queryKey: [userId],
        refetchInterval: 25,
    });

    useEffect(()=>{
        if(isLoading) return;
        if(error || !data || data == 'error') {
            setLastSeen('')
        }else{
            const res = compareDates(data.lastSeen, new Date().toDateString())
            if(res === 'online') setLastSeen(res)
            else setLastSeen(formatDate(res) + formatChatTime(res))
        }
    }, [isLoading, error, data])

    return lastSeen;
}



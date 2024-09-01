import { fetchUser } from "@/actions"
import { compareDates, formatChatDate, formatChatTime, formatDate } from "@/functions/date";
import { debugLog } from "@/functions/helpers";
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";


type LastSeen = 'online' | string

export function useLastSeen(userId: string): LastSeen {
    const [lastSeen, setLastSeen] = useState('')
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchUser({ isPublic: true, params: userId, throwsError: false }),
        queryKey: [userId, 'last_seen'],
        refetchInterval: 25,
    });

    useEffect(() => {
        if (isLoading) return;
        if (error || !data || data == 'error') {
            setLastSeen('')
        } else {
            debugLog({ls: data})
            const res = compareDates(data.lastSeen)
            if (res === 'online') setLastSeen(res)
            else {
                const ls = formatChatDate(res);
                setLastSeen(ls == 'now' ? 'online' :("last seen " + ls))
            }
        }
    }, [isLoading, error, data])
    return lastSeen;
}

import { updateOnlineStatus } from "@/actions";
import { formatDate } from "@/functions/date";
import { debugLog } from "@/functions/helpers";
import { useUserStore } from "@/state";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useUpdateOnline() {
    // const [started, setStarted] = useState(false)
    const user = useUserStore(s => s.user);

    const {} = useQuery({
        queryFn: async ()=>{
            if(!user) return false;
            const status = await updateOnlineStatus();
            debugLog({status});
            return status;
        },
        queryKey: ['update_last_seen', user?._id],
        refetchInterval: 1000 * 25,
    })

    // async function updateLastSeen(){
    //     if(!user) return;
    //     setStarted(true);
        
    //     setTimeout(()=>{
    //         updateLastSeen();
    //     }, 
    //     1000 * 30
    // )
    // }
    
    // useEffect(() => {
    //     debugLog({started})
    //     if (started) return;
    //     updateLastSeen();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user])
}
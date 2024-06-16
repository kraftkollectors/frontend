import { updateOnlineStatus } from "@/actions";
import { formatDate } from "@/functions/date";
import { debugLog } from "@/functions/helpers";
import { useUserStore } from "@/state";
import { useEffect, useState } from "react";

export function useUpdateOnline() {
    const [started, setStarted] = useState(false)
    const user = useUserStore(s => s.user);

    async function updateLastSeen(){
        if(!user) return;
        setStarted(true);
        const status = await updateOnlineStatus();
        debugLog({
            time: Date.now().toLocaleString(),
            status
        })
        setTimeout(()=>{
            updateLastSeen();
        }, 
        1000 * 30
    )
    }
    
    useEffect(() => {
        debugLog({started})
        if (started) return;
        updateLastSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
}
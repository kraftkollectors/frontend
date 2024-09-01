import { updateOnlineStatus } from "@/actions";
import { useUserStore } from "@/state";
import { useQuery } from "@tanstack/react-query";

export function useUpdateOnline() {
    const user = useUserStore(s => s.user);

    const {} = useQuery({
        queryFn: async ()=>{
            if(!user) return false;
            const status = await updateOnlineStatus();
            // debugLog({status});
            return status;
        },
        queryKey: ['update_last_seen', user?._id],
        refetchInterval: 1000 * 25,
    })
}
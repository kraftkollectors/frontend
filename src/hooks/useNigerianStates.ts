import { fetchNigerianStates } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export function useNigerianStates() {
    return useQuery({
        queryFn: () => fetchNigerianStates({ throwsError: false }),
        queryKey: ["nigerianStates"],
    })
}
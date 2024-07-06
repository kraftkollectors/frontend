import { fetchUser } from "@/actions";
import { fullName } from "@/functions/helpers";
import { useQuery } from "@tanstack/react-query";

export default function ReportedUser({userId}:{userId: string}) {
    const { data } = useQuery({
        queryKey: ['fetch_user', userId],
        queryFn: () => fetchUser({ isPublic: true, throwsError: false, params: userId }),
    })

    if (!data || data==='error') return <div className="skeleton !w-20 !h-5 mx-auto"></div>
    return (
        <h2 className="font-semibold text-black-300 text-label text-center">
            {fullName(data.firstName, data.lastName)}
            <br />
            {data.email}
        </h2>
    );
}
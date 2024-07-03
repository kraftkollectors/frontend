import { fetchUser } from "@/actions";
import { fullName } from "@/functions/helpers";

export default async function UserName({userId}:{userId: string}) {
    const user = await fetchUser({isPublic: true, throwsError: false, params: userId});
    if(!user || user === 'error') return null;
    
    return (
        <>
        {fullName(user.firstName, user.lastName)}
        </>
    );
}
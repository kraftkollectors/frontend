import { fetchUser } from "@/actions";
import UserStateProvider from "@/app/MainLayout";


export default async function AuthProvider() {
    const user = await fetchUser({throwsError: false});

    if(user !== 'error')
    return (
        <UserStateProvider user={user}>
        </UserStateProvider>
    );
}
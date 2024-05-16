import { fetchUser } from "@/actions";
import UserStateProvider from "@/app/MainLayout";


export default async function AuthProvider() {
    const user = await fetchUser();
    if (user === 'error') throw new Error("Server unable to connect")

    return (
        <UserStateProvider user={user}>
        </UserStateProvider>
    );
}
import { fetchUser } from "@/actions";
import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import UserStateProvider from "@/app/MainLayout";
import { debugLog } from "@/functions/helpers";
import { Artisan } from "@/utils/types/artisan";


export default async function AuthProvider() {
    const user = await fetchUser({ throwsError: false });
    // if(!user)
    if (user as any == 'conflict') {
        return null;
    };
    if (user == 'error' || !user) return;

    let artisan: Artisan | null = null;
    if (user?.isArtisan || true) {
        let art = await fetchArtisan({ throwsError: false });
        if (art !== 'error' && art) artisan = art;
    }


    return (
        <UserStateProvider artisan={artisan} user={user}>
        </UserStateProvider>
    );
}
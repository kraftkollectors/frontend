import { Artisan } from '@/utils/types/artisan';
import { UserDetailsPlus } from '@/utils/types/user';
import {create} from 'zustand';

export type UserState = {
    user: UserDetailsPlus | null;
    artisan: Artisan | null;
    setUser: (user: any) => void;
    setArtisan: (user: any) => void;
}

export const useUserStore =  create<UserState>(
    (set) => ({
        user: null,
        artisan: null,
        setUser: (user) => set({user}),
        setArtisan: (artisan) => set({artisan}),
    })
)
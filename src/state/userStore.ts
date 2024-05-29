import { UserDetailsPlus } from '@/utils/types/user';
import {create} from 'zustand';

export type UserState = {
    user: UserDetailsPlus | null;
    setUser: (user: any) => void;
}

export const useUserStore =  create<UserState>(
    (set) => ({
        user: null,
        setUser: (user) => set({user}),
    })
)
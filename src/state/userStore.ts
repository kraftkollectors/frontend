import { ApiUser } from '@/actions/fetch/fetchUser';
import {create} from 'zustand';

export type UserState = {
    user: ApiUser | null;
    setUser: (user: any) => void;
}

export const useUserStore =  create<UserState>(
    (set) => ({
        user: null,
        setUser: (user) => set({user}),
    })
)
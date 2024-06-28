import { UserDetailsPlus } from '@/utils/types/user';
import {create} from 'zustand';

export type UserState = {
    admin: UserDetailsPlus | null;
    setAdmin: (user: any) => void;
    sidebarOpen: boolean;
    setSidebar: (open: boolean) => void;
}

export const useAdminStore =  create<UserState>(
    (set) => ({
        admin: null,
        sidebarOpen: false,
        setAdmin: (user) => set({admin: user}),
        setSidebar: (open) => set({sidebarOpen: open}),
    })
)
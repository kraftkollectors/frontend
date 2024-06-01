import { Artisan } from '@/utils/types/artisan';
import {create} from 'zustand';

export type BecomeArtisanState = {
    artisan: Artisan | null;
    updateArtisan: (user: any) => void;
}

export const useBecomeArtisanStore =  create<BecomeArtisanState>(
    (set) => ({
        artisan: null,
        updateArtisan: (user) => set(_=>({artisan:{..._, ...user}})),
    })
)
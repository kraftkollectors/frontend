
import { debugLog } from '@/functions/helpers';
import { cookies } from 'next/headers'

export const ServerApiRequest = {
    get(url: string, init: RequestInit = {}) {
        const {get, has} = cookies();
        if(!has('__access_token')) return null;
        const accessToken = get('__access_token')!.value;
        const {headers, ...others} = init;
        
        return fetch(url, {
            ...others,
            headers: {
                ...headers,
                'Authorization': `Token ${accessToken}`
            },
        });
    }
}
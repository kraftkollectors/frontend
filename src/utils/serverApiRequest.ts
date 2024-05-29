
import { debugLog } from '@/functions/helpers';
import { cookies } from 'next/headers'
import paths from './paths';
import { RedirectType, redirect } from 'next/navigation';

export const ServerApiRequest = {
    get(url: string, init: RequestInit = {}) {
        const {get, has} = cookies();
        if(!has('__access_token')) redirect(paths.login, RedirectType.replace);
        const accessToken = get('__access_token')!.value;
        const {headers, ...others} = init;
        
        return fetch(url, {
            ...others,
            headers: {
                ...headers,
                'x-access-token': accessToken
            },
        });
    }
}
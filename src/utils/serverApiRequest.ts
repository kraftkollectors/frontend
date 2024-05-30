
import { cookies } from 'next/headers'
import { appCookies } from '.';

export const ServerApiRequest = {
    get(url: string, init: RequestInit = {}) {
        const {get, has} = cookies();
        if(!has(appCookies.accessToken)) return null;
        const accessToken = get(appCookies.accessToken)!.value;
        const {headers, ...others} = init;
        
        return fetch(url, {
            ...others,
            headers: {
                ...headers,
                'x-access-token': accessToken
            },
        });
    },
    post(url: string,body:any, init: RequestInit = {}) {
        const {get, has} = cookies();
        if(!has(appCookies.accessToken)) return null;
        const accessToken = get(appCookies.accessToken)!.value;
        const {headers, ...others} = init;
        
        return fetch(url, {
            ...others,
            method: 'POST',
            headers: {
                ...headers,
                'x-access-token': accessToken
            },
            body: JSON.stringify(body),
        });
    }
}
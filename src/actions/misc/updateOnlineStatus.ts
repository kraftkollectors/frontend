'use server'

import { debugLog } from "@/functions/helpers";
import { apis, appCookies } from "@/utils"
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { cookies } from "next/headers"

export async function updateOnlineStatus(){
    try {
        const accessId = cookies().get(appCookies.accessId)?.value;
        if(!accessId) return false;
        const req = await ServerApiRequest.get(apis.updateLastSeen(accessId), {cache: 'no-cache'});
        const res = await req?.json();
        // debugLog(res);
        return true;
    } catch (error) {
        debugLog(error);
        return false;
    }
}
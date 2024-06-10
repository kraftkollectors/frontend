'use server'

import { debugLog } from "@/functions/helpers"
import { apis, tags } from "@/utils"
import { ServerApiRequest } from "@/utils/serverApiRequest"
import { ApiResponse } from "@/utils/types/basicTypes"

export async function checkFavourite({userId, serviceId}:{userId: string, serviceId: string}): Promise<boolean|null>{
    debugLog({userId, serviceId})
    if(!userId || !serviceId) return false;
    try {
        const req = await ServerApiRequest.get(apis.checkFavourite(userId, serviceId), {next: {tags: [tags.mySingleFav(userId,serviceId)]}})
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);
        if(res.statusCode == 201){
            return res.data
        }
        return false;
    } catch (error) {
        debugLog(error)
        return null;
    }
}
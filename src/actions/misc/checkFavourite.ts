'use server'

import { debugLog } from "@/functions/helpers"
import { apis, appCookies, tags } from "@/utils"
import { ServerApiRequest } from "@/utils/serverApiRequest"
import { ApiResponse } from "@/utils/types/basicTypes"
import { cookies } from "next/headers"

export async function checkFavourite(serviceId: string): Promise<boolean | null> {
    const userId = cookies().get(appCookies.accessId)?.value
    // debugLog({ userId, serviceId })
    if (!userId || !serviceId) return false;
    try {
        const req = await ServerApiRequest.get(apis.checkFavourite(userId, serviceId), {
            next: {
                tags: [
                    tags.mySingleFav(userId, serviceId),
                    tags.myFavs(userId),
                ]
            }
        })
        const res = (await req?.json()) as ApiResponse;
        // debugLog(res);
        if (res.statusCode == 201) {
            return res.data
        }
        return false;
    } catch (error) {
        debugLog(error)
        return null;
    }
}
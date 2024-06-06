'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { ArtisanDetails } from "@/utils/types/artisan";
import { ApiRequest } from "@/utils/apiRequest";
import { Service } from "@/utils/types/service";



export async function fetchSingleArtisanService(serviceId: string, { throwsError = true, }: ServerActionParams = {}): Promise<ActionApiResponse<Service>> {
    try {
        const req = await ApiRequest.getJson(apis.getSingleArtisanService(serviceId), { next: { revalidate: 0 }, });
        if (!req) return null;
        const res = (await req.json()) as ApiResponse<Service>;
        debugLog(res);

        if ((res as any).message == 'Invalid Token') return null;
        else if (res.statusCode === 201) return res.data;
        else if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
    // if(proceed && shouldRedirect){
    //     cookies().delete(appCookies.accessToken);
    //     cookies().delete(appCookies.accessId);
    //     redirect(paths.login)
    // };
    return 'error'
}
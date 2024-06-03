'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { ArtisanDetails } from "@/utils/types/artisan";


export type ArtisanApiResponse = {
    existingRecord: ArtisanDetails
}
export async function fetchArtisan({  throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<ArtisanDetails>> {
    let proceed = false;
    try {
        const accessId = cookies().get(appCookies.accessId)?.value
        const req = await ServerApiRequest.get(apis.getArtisan(accessId ?? ''), {
            next: { tags: [tags.user, tags.artisan] },
        });
        if(!req) return null;
        const res = (await req.json()) as ApiResponse<ArtisanApiResponse>;
        // debugLog(res);

        if((res as any).message == 'Invalid Token') proceed = true;
        else if (res.statusCode === 201) return res.data.existingRecord;
        else if (throwsError) throw new Error("Unable to connect")
        if(!proceed) return 'error';
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
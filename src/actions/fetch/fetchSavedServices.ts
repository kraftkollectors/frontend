'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { Service } from "@/utils/types/service";


export async function fetchSavedServices({ throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<Paginated<Service>>> {
    try {
        const accessId = cookies().get(appCookies.accessId)?.value
        const req = await ServerApiRequest.get(apis.myFavouriteServices(accessId ?? ''), {
            next: { tags: [tags.myFavs(accessId??'')] },
        });
        if(!req) return null;
        const res = (await req.json()) as ApiResponse<Paginated<Service>>;
        // debugLog(res);

        if (res.statusCode === 201) return res.data;
        else if(res.data.toString() == 'No records found') return null;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}
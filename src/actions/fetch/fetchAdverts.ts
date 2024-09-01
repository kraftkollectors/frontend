'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { ContactMessage } from "@/utils/types/contact";
import { Advert } from "@/utils/types/advert";


export async function fetchAdverts({ throwsError = true, isPublic = true, params = '' }: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<Advert>>> {
    try {
        const req = await (isPublic 
            ? ApiRequest.getJson(apis.adverts + params, {next: {tags: [tags.adverts]}}) 
            : ServerApiRequest.get(apis.adverts + params, {next: {tags: [tags.adverts]}}));
        const res = (await req?.json()) as ApiResponse<Paginated<Advert>>;
        // debugLog(res);
        // debugLog(apis.services + params);


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
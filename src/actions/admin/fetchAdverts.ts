'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { Advert } from "@/utils/types/advert";


export async function fetchAdverts({ throwsError = false}: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<Advert>>> {
    try {
        const req = await ApiRequest.getJson(apis.adverts, {next: {tags: [tags.adverts]}}) 
        const res = (await req?.json()) as ApiResponse<Paginated<Advert>>;
        // debugLog(res);

        if (res.statusCode === 201) return res.data;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}
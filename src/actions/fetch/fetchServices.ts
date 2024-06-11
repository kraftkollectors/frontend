'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { Service } from "@/utils/types/service";
import { ApiRequest } from "@/utils/apiRequest";


export async function fetchServices({ throwsError = true, isPublic = true }: ServerActionParams = {}): Promise<ActionApiResponse<Paginated<Service>>> {
    try {
        const req = await (isPublic 
            ? ApiRequest.getJson(apis.services, {next: {tags: [tags.myServices]}}) 
            : ServerApiRequest.get(apis.services, {next: {tags: [tags.myServices]}}));
        const res = (await req?.json()) as ApiResponse<Paginated<Service>>;
        debugLog(res);

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
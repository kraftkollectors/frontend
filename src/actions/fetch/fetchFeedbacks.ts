'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { ContactMessage } from "@/utils/types/contact";


export async function fetchFeedbacks({ throwsError = true, isPublic = true, params = '' }: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<ContactMessage>>> {
    try {
        const req = await (isPublic 
            ? ApiRequest.getJson(apis.feedbacks + params, {next: {tags: [tags.feedbacks]}}) 
            : ServerApiRequest.get(apis.feedbacks + params, {next: {tags: [tags.feedbacks]}}));
        const res = (await req?.json()) as ApiResponse<Paginated<ContactMessage>>;
        debugLog(res);
        debugLog(apis.services + params);


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
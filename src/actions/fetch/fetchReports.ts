'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { tags } from "@/utils";
import { ActionApiResponse, ApiResponse, Paginated } from "@/utils/types/basicTypes";
import { ServerActionParams } from "@/utils/types/actions";
import { ApiRequest } from "@/utils/apiRequest";
import { Report } from "@/utils/types/reports";


export async function fetchReports({ throwsError = true, isPublic = true, params = '' }: ServerActionParams<string> = {}): Promise<ActionApiResponse<Paginated<Report>>> {
    try {
        const req = await (isPublic 
            ? ApiRequest.getJson(apis.reports + params, {next: {tags: [tags.reports]}}) 
            : ServerApiRequest.get(apis.reports + params, {next: {tags: [tags.reports]}}));
        const res = (await req?.json()) as ApiResponse<Paginated<Report>>;
        debugLog(res);
        debugLog(apis + params);


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
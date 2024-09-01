'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { Education } from "@/utils/types/education";
import { ApiRequest } from "@/utils/apiRequest";


export type UserEducationApiResponse = {
    existingRecords: Education[];
}

export async function fetchUserEducations({ throwsError = true, params, isPublic = false }: ServerActionParams = {}): Promise<ActionApiResponse<Education[]>> {
    try {
        const accessId = isPublic ? '' : cookies().get(appCookies.accessId)?.value
        const req = await (isPublic ? ApiRequest.getJson(apis.getUserEducations(params ?? ''), {
            next: { tags: [tags.userEducation] },
        }) : ServerApiRequest.get(apis.getUserEducations(accessId ?? ''), {
            next: { tags: [tags.userEducation] },
        }));
        if(!req) return null;
        const res = (await req.json()) as ApiResponse<UserEducationApiResponse>;
        // debugLog(res);

        if (res.statusCode === 201) return res.data.existingRecords;
        else if(res.data.toString() == 'No records found') return null;
        if (throwsError) throw new Error("Unable to connect")
        return 'error';
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}
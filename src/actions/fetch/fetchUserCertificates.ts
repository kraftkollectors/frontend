'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { ServerActionParams } from "@/utils/types/actions";
import { Certificate } from "@/utils/types/certificate";
import { ApiRequest } from "@/utils/apiRequest";


export type UserCertificatesApiResponse = {
    existingRecords: Certificate[];
}

export async function fetchUserCertificates({ isPublic = false, params, throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<Certificate[]>> {
    try {
        const accessId = isPublic ? '' : cookies().get(appCookies.accessId)?.value
        const req = await (isPublic ? ApiRequest.getJson(apis.getUserCertificates(params ?? ''), {
            next: { tags: [tags.userCertificates] },
        }) : ServerApiRequest.get(apis.getUserCertificates(accessId ?? ''), {
            next: { tags: [tags.userCertificates] },
        }));
        if(!req) return null;
        const res = (await req.json()) as ApiResponse<UserCertificatesApiResponse>;
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
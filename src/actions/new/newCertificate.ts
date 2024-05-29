'use server'

import { Certificate } from "@/components/certificate/CertificateCard";
import { debugLog, formDataToObject } from "@/functions/helpers";
import { appCookies, apis, tags } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { UserApiResponse } from "../fetch/fetchUser";

export async function newCertificate(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    try {
        const data = formDataToObject(formData);
        const req = await ServerApiRequest.post(apis.uploadCertificate, data);
        const res = (await req?.json()) as ApiResponse

        if(!req) return {};
        
        debugLog(res);
    } catch (error) {
        return {error: 'Something went wrong'}
    }
    return {}
}
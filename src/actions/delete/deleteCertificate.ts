'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { UserAuthProps } from "@/utils/types/auth";
import { revalidateTag } from "next/cache";
import { Certificate } from "@/utils/types/certificate";

type CertificateFormData = Certificate & UserAuthProps;

export async function deleteCertificate(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CertificateFormData>(formData);
    if(!data.userId || !data.userEmail) throw new Error();
    
    try {
        const req =  await ServerApiRequest.delete(apis.editCertificate(data._id), data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.userCertificates);
            return {success: `Certificate deleted Successfully`, data: res.data.data};
        }
        return {error: res.data ?? "Failed to delete Certificate", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { Certificate } from "@/utils/types/certificate";
import { UserAuthProps } from "@/utils/types/auth";
import { z } from "zod";
import validators from "@/utils/validators";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

type CertificateFormData = Certificate & UserAuthProps;

const certificateSchema = z.object({
    certificate: validators.name,
    certifiedBy: validators.name,
})

export async function newCertificate(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CertificateFormData>(formData);
    if(!data.userId || !data.userEmail) redirect(paths.login)

    const tryParse = certificateSchema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
    
    try {
        const req = (data._id) 
        ? await ServerApiRequest.patch(apis.editCertificate(data._id), data) 
        : await ServerApiRequest.post(apis.uploadCertificate, data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.userCertificates);
            return {data: 'success'};
        }
        return {error: res.data ?? "Failed to add certificate", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
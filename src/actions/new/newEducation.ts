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
import { Education } from "@/utils/types/education";

type EducationFormData = Education & UserAuthProps;

const certificateSchema = z.object({
    university: validators.name,
    degree: validators.name,
})

export async function newEducation(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<EducationFormData>(formData);
    if(!data.userId || !data.userEmail) redirect(paths.login)

    const tryParse = certificateSchema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
    
    try {
        const req = (data._id) 
        ? await ServerApiRequest.patch(apis.editEducation(data._id), data) 
        : await ServerApiRequest.post(apis.uploadEducation, data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.userCertificates);
            return { data: "success"};
        }
        return {error: res.data ?? "Failed to add education", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
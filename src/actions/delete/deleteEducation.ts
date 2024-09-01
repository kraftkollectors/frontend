'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { UserAuthProps } from "@/utils/types/auth";
import { revalidateTag } from "next/cache";
import { Education } from "@/utils/types/education";

type EducationFormData = Education & UserAuthProps;

export async function deleteEducation(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<EducationFormData>(formData);
    if(!data.userId || !data.userEmail) throw new Error();
    
    try {
        const req =  await ServerApiRequest.delete(apis.editEducation(data._id), data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.userEducation);
            return {success: `Education deleted Successfully`, data: res.data.data};
        }
        return {error: res.data ?? "Failed to delete education", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
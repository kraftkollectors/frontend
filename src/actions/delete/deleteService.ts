'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { UserAuthProps } from "@/utils/types/auth";
import { revalidateTag } from "next/cache";
import { Education } from "@/utils/types/education";
import { Service } from "@/utils/types/service";

type DeleteServiceFormData = Service & UserAuthProps;

export async function deleteService(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<DeleteServiceFormData>(formData);
    if(!data.userId || !data.userEmail) throw new Error();
    
    try {
        const req =  await ServerApiRequest.delete(apis.getSingleArtisanService(data._id), data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.myServices);
            return {success: `Service deleted Successfully`, data: res.data.data};
        }
        return {error: res.data ?? "Failed to delete service", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
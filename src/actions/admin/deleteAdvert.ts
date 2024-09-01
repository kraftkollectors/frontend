'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { AdminAuthProps } from "@/utils/types/auth";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

type CategoryFormData =  AdminAuthProps & {
    advertId?: string;
};

export async function deleteAdvert(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CategoryFormData>(formData);
    if(!data.adminId || !data.adminEmail) redirect(paths.adminLogin)

    try {
        if(!data.advertId) return {error: "invalid advert"}
        const req = await ServerApiRequest.delete(apis.singleAdvert(data.advertId!), data);
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.adverts);
            return {data: 'deleted', success: "successful"};
        }
        return {error: res.data ?? "Failed to create category", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { AdminAuthProps } from "@/utils/types/auth";
import { redirect } from "next/navigation";


type CategoryFormData =  AdminAuthProps & {
    serviceId?: string;
    enable?: 'true' | 'false';
};

export async function enableOrDisableService(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CategoryFormData>(formData);
    if(!data.adminId || !data.adminEmail) redirect(paths.adminLogin)
    if(!data.serviceId || !data.enable) return({error: 'Something went wrong'});

    try {
        const {serviceId, enable, adminEmail} = data;
        const req = await ServerApiRequest.patch(apis.adminEditService(serviceId), {active: enable === 'true', adminEmail});
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            return {success:"updated user", data: res.data.data.active};
        }
        return {error: res.data ?? "Failed to change user state", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
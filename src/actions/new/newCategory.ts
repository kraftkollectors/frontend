'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, tags, paths } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { Certificate } from "@/utils/types/certificate";
import { AdminAuthProps, UserAuthProps } from "@/utils/types/auth";
import { z } from "zod";
import validators from "@/utils/validators";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";


const certificateSchema = z.object({
    title: validators.name,
})

type CategoryFormData =  AdminAuthProps & {
    title: string;
    subCategories?: string;
};

export async function newCategory(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CategoryFormData>(formData);
    if(!data.adminId || !data.adminEmail) redirect(paths.adminLogin)

    const tryParse = certificateSchema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
    
    try {
        let subs:string[] = [];
        if(data.subCategories) subs = JSON.parse(data.subCategories);
        const req = await ServerApiRequest.post(apis.category, {...data, subCategories: subs});
        const res = (await req?.json()) as ApiResponse
        debugLog(res);
        if(res.statusCode == 201){
            revalidateTag(tags.categories);
            return {data: 'success'};
        }
        return {error: res.data ?? "Failed to create category", data: res};
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return {error: 'Something went wrong'}
}
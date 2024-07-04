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
import { uploadSingleFile } from "../misc/uploadSingleFile";


const certificateSchema = z.object({
    title: validators.name,
    startDate: z.string().min(1, "select a date"),
    duration: z.string().min(1, "select a duration"),
    url: validators.url,
})

type CategoryFormData =  AdminAuthProps & z.infer<typeof certificateSchema>;

export async function newAdvert(_res:ActionResponse, formData:FormData):Promise<ActionResponse> {
    const data = formDataToObject<CategoryFormData>(formData);
    if(!data.adminId || !data.adminEmail) redirect(paths.adminLogin)

    const tryParse = certificateSchema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
    
    try {
        const tryImg = await uploadSingleFile(formData);
        if(typeof tryImg === 'string') return({error: "Failed to upload file"});
        const {url:image} = tryImg;
        const req = await ServerApiRequest.post(apis.adverts, {...data, image,});
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
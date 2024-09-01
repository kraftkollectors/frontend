'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { z } from "zod";

const schema = z.object({
    text: validators.name,
})

export type ReportServiceFormData = z.infer<typeof schema> & {
    reporterId: string;
    reportedId: string;
    postId: string;
};

export async function reportService(_: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<ReportServiceFormData>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    if(!data.reporterId) return {error: "You are not logged in, you are being redirected to log in"}

    try {

        const req = await ServerApiRequest.post(apis.reportService, data);
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201){
            return {success: "Your report has been sent!"}
        } else return {error: res.data ?? "An error occurred"}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return { data: 'refresh'}
}
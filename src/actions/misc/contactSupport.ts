'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { z } from "zod";

const schema = z.object({
    email: validators.email,
    name: validators.name,
    phone: validators.phoneNumber,
    subject: validators.name,
    message: validators.name,
})

export type ContactSupportFormData = z.infer<typeof schema> & Artisan;

export async function contactSupport(_: ActionResponse, formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<ContactSupportFormData>(formData);
    debugLog(data)
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}

    try {

        const req = await ApiRequest.postJson(apis.contactSupport, data);
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201){
            return {success: "Your message has been sent!"}
        } else return {error: res.data ?? "An error occurred"}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    return { data: 'refresh'}
}
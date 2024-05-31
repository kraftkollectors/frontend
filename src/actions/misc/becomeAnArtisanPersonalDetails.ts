'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { z } from "zod";

const schema = z.object({
    businessName: validators.name,
    phoneNumber: validators.phoneNumber,
    description: validators.name,
    facebook: z.string(),
    instagram: z.string(),
    twitter: z.string(),
    linkedin: z.string(),
    state: z.string(),
    address: z.string(),
})

export type BecomeAnArtisanPersonalDetails = z.infer<typeof schema>

export async function becomeAnArtisanPersonalDetails(formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<BecomeAnArtisanPersonalDetails>(formData);
    try {
        const req = await ApiRequest.postFormData(apis.uploadSingleFile, formData);
        const res = (await req.json()) as ApiResponse;

        if(res.statusCode == 201){

        }
       
        return {error: res.data}
    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
    
}
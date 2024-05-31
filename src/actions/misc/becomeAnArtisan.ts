'use server'

import { debugLog, formDataToObject } from "@/functions/helpers"
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { Artisan } from "@/utils/types/artisan";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { z } from "zod";

const schema = z.object({
    
})

export async function becomeAnArtisan(formData: FormData): Promise<ActionResponse>{
    const data = formDataToObject<Artisan>(formData);
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
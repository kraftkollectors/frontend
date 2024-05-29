'use server'

import { debugLog } from "@/functions/helpers"
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";

export async function uploadSingleFile(formData: FormData): Promise<ActionResponse>{
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
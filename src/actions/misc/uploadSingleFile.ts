
import { debugLog } from "@/functions/helpers"
import { apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionApiResponse, ActionResponse, ApiResponse } from "@/utils/types/basicTypes";

export async function uploadSingleFile(formData: FormData): Promise<(string | {url: string})>{
    try {
        const req = await ApiRequest.postFormData(apis.uploadSingleFile, formData);
        const res = (await req.json()) as ApiResponse;
        debugLog({res});

        if(res.statusCode == 201){
            return {url: res.data.uploadUrl}
        }
        return res.data.toString();
    } catch (error) {
        debugLog(error);
    }
    return "Image upload failed";
}
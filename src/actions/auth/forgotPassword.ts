'use server'

import { formDataToObject, debugLog } from "@/functions/helpers";
import { paths, apis } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function forgotPasswordSendEmail(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const data = formDataToObject<{email: string}>(formData);

    try {
        const req = await ApiRequest.postJson(apis.forgotPasswordSendEmail, data);
        const res = await req.json();
        debugLog(res)
        if (res.error) return {
            error: res.details
        }
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
    return {}
}

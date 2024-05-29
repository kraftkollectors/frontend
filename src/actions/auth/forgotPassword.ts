'use server'

import { formDataToObject, debugLog } from "@/functions/helpers";
import { apis, appCookies } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { cookies } from "next/headers";
import { z } from "zod";


const passwordSchema = z.object({
    password: validators.password,
    c_password: validators.password,
})

type ForgotPasswordFormData = { email: string, token?: string; 
    password?: string;
    c_password?: string;
 }

export async function forgotPasswordSendEmail(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const { set, get, delete:del } = cookies();
    const data = formDataToObject<ForgotPasswordFormData>(formData);

    try {
        if (data.token) {
            if (data.token === get(appCookies.clientToken)?.value) {
                return {
                    success: "Token validated, now change password",
                    data: 'valid_token'
                }
            }
        }else if(data.password && data.c_password){
            const tryParse = passwordSchema.safeParse(data);
            if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
            if(data.password !== data.c_password) return {error: "Passwords don't match"}

            const req = await ApiRequest.postJson(apis.forgotPasswordReset, data);
            const res = (await req.json()) as ApiResponse;
            debugLog(res)

            if(res.statusCode === 201) {
                del(appCookies.clientToken);
                return {
                    success: "Password changed. Login now",
                    data: 'password_changed'
                };
            }
            else return {error: res.data}
        }else{
            const req = await ApiRequest.postJson(apis.forgotPasswordSendEmail, data);
            const res = (await req.json()) as ApiResponse;
            debugLog(res)
            if (res.statusCode === 201) {
                set(appCookies.clientToken, res.data.otp)
                return {
                    success: "Check your email for verification token",
                    data: 'valid_email'
                };
            }
            return {
                error: res.data
            }
        }
        return {error: "Unknown error"}
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
}

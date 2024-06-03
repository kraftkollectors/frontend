'use server'

import { formDataToObject, debugLog } from "@/functions/helpers";
import { apis, appCookies } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { cookies } from "next/headers";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from "@/utils/constants";


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
            const matches = await bcrypt.compare(data.token, get(appCookies.clientToken)?.value??'');
            if (matches) return {
                    success: "Token validated, now change password",
                    data: 'valid_token'
                }
            else return {error: "Invalid token"}
        }else if(data.password && data.c_password){
            const tryParse = passwordSchema.safeParse(data);
            if(!tryParse.success) return {fieldErrors: tryParse.error.flatten().fieldErrors}
            if(data.password !== data.c_password) return {error: "Passwords don't match"}
            const stored = jwt.verify(get(appCookies.accessTokenTmp)?.value??'', JWT_SECRET);

            const req = await ApiRequest.postJson(apis.forgotPasswordReset, {...data, stored});
            const res = (await req.json()) as ApiResponse;
            debugLog(res)

            if(res.statusCode === 201) {
                del(appCookies.clientToken);
                del(appCookies.accessTokenTmp);
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
                const secureOtp = await bcrypt.hash(res.data.otp, 10);
                const secureStored = jwt.sign(res.data.stored, JWT_SECRET);
                set(appCookies.clientToken, secureOtp)
                set(appCookies.accessTokenTmp, secureStored)
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

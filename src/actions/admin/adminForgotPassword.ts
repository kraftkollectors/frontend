'use server'

import { formDataToObject, debugLog } from "@/functions/helpers";
import { apis, appCookies } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { cookies } from "next/headers";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "@/utils/constants";


const passwordSchema = z.object({
    password: validators.password,
    c_password: validators.password,
})

type ForgotPasswordFormData = { email: string, token?: string; 
    password?: string;
    c_password?: string;
 }

/**
 * Handles the admin forgot password functionality.
 *
 * This function is responsible for the following:
 * - Validating a password reset token sent to the user's email
 * - Allowing the user to reset their password if the token is valid
 * - Sending a password reset token to the user's email if they have forgotten their password
 *
 * @param res - The ActionResponse object to return the result of the operation
 * @param formData - The form data containing the user's email, password reset token, and new password
 * @returns The ActionResponse object with the result of the operation
 */
export async function adminForgotPassword(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

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

            const req = await ApiRequest.postJson(apis.adminResetPassword, {...data, stored});
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
            const req = await ApiRequest.postJson(apis.adminForgotPassword, data);
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

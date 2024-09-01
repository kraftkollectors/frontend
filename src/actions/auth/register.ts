"use server"

import { debugLog, formDataToObject } from "@/functions/helpers";
import { tags, apis, appCookies } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from 'bcrypt'

const registerSchema = z.object({
    email: validators.email,
    password: validators.password,
    userName: validators.name,
})

type RegisterFormProps = {
    email: string;
    password: string;
    userName: string;
}

export async function register(res: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<RegisterFormProps>(formData);

    const tryParse = registerSchema.safeParse(data)
    if (!tryParse.success) return {
        fieldErrors: tryParse.error.flatten().fieldErrors,
    }

    const { set } = cookies();
    set(appCookies.registerData, JSON.stringify(data), {
        maxAge: 60 * 20
    });
    redirect(paths.signupDetails);
    return {};
}



const registerDetailsSchema = z.object({
    firstName: validators.name,
    lastName: validators.name,
    gender: z.string().trim(),
})

type RegisterDetailsFormProps = {
    firstName: string;
    lastName: string;
    gender: string;
}

export async function registerDetails(res: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const { has, get, set } = cookies();
    if (!has(appCookies.registerData)) redirect(paths.signup);

    const data = formDataToObject<RegisterDetailsFormProps>(formData);

    const tryParse = registerDetailsSchema.safeParse(data)
    if (!tryParse.success) return {
        fieldErrors: tryParse.error.flatten().fieldErrors,
    }

    let success = false;
    try {
        const prevData = JSON.parse(get(appCookies.registerData)?.value ?? "{}");
        const postData = {
            ...prevData,
            ...data,
        };
        const req = await ApiRequest.postJson(apis.register, postData);
        const res = (await req.json()) as ApiResponse<ApiSignupResponse | string>;
        debugLog(res)

        if (res.statusCode !== 201 || typeof res.data == 'string') return {
            error:  res.data as string ?? "Unable to signup"
        }
        set(appCookies.registerData, JSON.stringify(postData), {maxAge: 60 * 60 * 24});
        set(appCookies.clientToken, (await bcrypt.hash(res.data.otp, 10)), {maxAge: 60 * 60 * 24});
        set(appCookies.accessTokenTmp, res.data.token, {maxAge: COOKIE_MAX_AGE});
        set(appCookies.accessId, res.data.user._id, {maxAge: COOKIE_MAX_AGE});
        success = true;
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
    if (success)
        redirect(paths.signupToken);
    return {}
}



type RegisterTokenFormProps = {
    token: string;
}

export async function registerToken(res: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const { get, set, delete: deleteCookie } = cookies();
    // if (!has(appCookies.registerData)) redirect(paths.signup);

    const data = formDataToObject<RegisterTokenFormProps>(formData);

    let success = false;
    try {
        const prevData = JSON.parse(get(appCookies.registerData)?.value ?? "{}");
        const postData = {
            ...prevData,
            ...data,
        };

        const cookieToken = get(appCookies.clientToken)?.value
        if(!(await bcrypt.compare(data.token, cookieToken??''))) return {
            error: "invalid token"
        }
        
        const req = await ApiRequest.postJson(apis.registerVerifyEmail, postData);
        const res = (await req.json()) as ApiResponse;
        debugLog(res)
        if(res.msg === 'Success') { 
            deleteCookie(appCookies.registerData);
            deleteCookie(appCookies.clientToken);
            set(appCookies.accessToken, get(appCookies.accessTokenTmp)?.value!);
            deleteCookie(appCookies.accessTokenTmp);
            revalidateTag(tags.user);
            revalidatePath('/');
            success = true;
        }
        else return {
            error: res.data ?? "Verification failed"
        }
        success = true;
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
    if (success){
        redirect(paths.dashboard, RedirectType.replace);
    }
        
    return {}
}
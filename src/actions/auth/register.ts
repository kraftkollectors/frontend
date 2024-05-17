"use server"

import { debugLog, formDataToObject } from "@/functions/helpers";
import { tags, apis, appCookies } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ActionResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
    email: validators.email,
    password: validators.password,
    username: validators.name,
})

type RegisterFormProps = {
    email: string;
    password: string;
    username: string;
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
    first_name: validators.name,
    last_name: validators.name,
    other_names: z.string().trim(),
})

type RegisterDetailsFormProps = {
    first_name: string;
    last_name: string;
    other_names: string;
}

export async function registerDetails(res: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const { has, get } = cookies();
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
            password1: prevData.password,
            password2: prevData.password,
        };
        const req = await ApiRequest.postJson(apis.register, postData);
        const res = await req.json();
        debugLog(res)
        if (res.error) return {
            error: res.details
        }
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
    const { has, get, set, delete: deleteCookie } = cookies();
    if (!has(appCookies.registerData)) redirect(paths.signup);

    const data = formDataToObject<RegisterTokenFormProps>(formData);

    let success = false;
    try {
        const prevData = JSON.parse(get(appCookies.registerData)?.value ?? "{}");
        const postData = {
            ...prevData,
            ...data,
        };
        const req = await ApiRequest.postJson(apis.registerToken, postData);
        const res = await req.json();
        debugLog(res)
        if(res.token) {
            deleteCookie(appCookies.registerData);
            set(appCookies.accessToken, res.token, {
                maxAge: COOKIE_MAX_AGE
            });
            revalidateTag(tags.user);
            revalidatePath('/');
            success = true;
        }
        else return {
            error: res.details ?? res.error ?? "Verification failed"
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
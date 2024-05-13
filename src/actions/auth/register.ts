"use server"

import { debugLog, formDataToObject } from "@/functions/helpers";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import paths from "@/utils/paths";
import { ActionResponse } from "@/utils/types/basicTypes";
import validators from "@/utils/validators";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
    set('__reg_data', JSON.stringify(data), {
        maxAge: 60 * 5
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
    if (!has('__reg_data')) redirect(paths.signup);
    
    const data = formDataToObject<RegisterDetailsFormProps>(formData);

    const tryParse = registerDetailsSchema.safeParse(data)
    if (!tryParse.success) return {
        fieldErrors: tryParse.error.flatten().fieldErrors,
    }

    try {
        const prevData = JSON.parse(get('__reg_data')?.value ?? "{}");
        const postData = {
            ...prevData,
            ...data,
            password1: prevData.password,
            password2: prevData.password,
        };
        const req = await ApiRequest.postJson(apis.register, postData);
        const res = await req.json();
        debugLog(res)
        return (res.error) ? {
            error: res.details
        } : {
            success: "Account created successfully",
            data: res
        };
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }

    redirect(paths.signupDetails);
}
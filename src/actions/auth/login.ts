"use server"

import { formDataToObject, debugLog } from "@/functions/helpers";
import { appCookies, tags } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ActionResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";


type LoginFormProps = {
    email: string;
    password: string;
}

export async function login(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const data = formDataToObject<LoginFormProps>(formData);

    let success = false;
    try {
        const req = await ApiRequest.postJson(apis.login, data);
        const res = await req.json();
        debugLog(res)
        if(res.key) {
            success = true;
            cookies().set(appCookies.accessToken, res.key, {
                maxAge: COOKIE_MAX_AGE
            })
            revalidatePath('/');
            revalidateTag(tags.user);
        }
        else if (res.error || Object.keys(res).join(' ').includes('error')) return {
            error: res.details ?? res.error ?? "Invalid login details"
        }
        else throw new Error();
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
    if (success)
        redirect(paths.dashboard, RedirectType.replace);
    return {}
}
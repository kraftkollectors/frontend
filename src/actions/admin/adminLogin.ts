"use server"

import { formDataToObject, debugLog } from "@/functions/helpers";
import { appCookies, tags } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiAdminSignupResponse, ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";


type LoginFormProps = {
    email: string;
    password: string;
}

export async function adminLogin(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const data = formDataToObject<LoginFormProps>(formData);
    if(!data.email || !data.password) return {error: "All fields are required"}

    let success = false;
    try {
        const req = await ApiRequest.postJson(apis.adminLogin, data);
        const res = await (req.json()) as ApiResponse<ApiAdminSignupResponse>;
        debugLog(res)
        if (res.statusCode === 201) {
            success = true;
            cookies().set(appCookies.accessToken, res.data.token, {
                maxAge: COOKIE_MAX_AGE
            })
            cookies().set(appCookies.adminAccessId, res.data.admin._id, {
                maxAge: COOKIE_MAX_AGE
            })
            revalidatePath('/');
            revalidateTag(tags.user);
        }
        else return {
            error: res.data as unknown as string ?? "Invalid login details"
        }
    } catch (error) {
        debugLog(error)
        return {
            error: "Something went wrong"
        };
    }
    if (success)
        redirect(paths.admin, RedirectType.replace);
    return {error: "Unknown error"}
}
"use server"

import { formDataToObject, debugLog } from "@/functions/helpers";
import { appCookies, tags } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import bcrypt from 'bcrypt'
import { UserDetails } from "@/utils/types/user";


type LoginFormProps = {
    email: string;
    password: string;
    token?: string;
}

export async function login(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const data = formDataToObject<LoginFormProps>(formData);

    let success = false;
    try {
        if (data.token) {
            const token = cookies().get(appCookies.clientToken)?.value ?? '';
            if (!(await bcrypt.compare(data.token, token))) return { error: 'Invalid token' }

            const req = await ApiRequest.postJson(apis.registerVerifyEmail, data);
            const res = (await req.json()) as ApiResponse;
            debugLog(res)

            if (res.statusCode !== 201) throw new Error();
        }
        const req = await ApiRequest.postJson(apis.login, data);
        const res = await (req.json()) as ApiResponse<ApiSignupResponse>;
        debugLog(res)
        if (res.statusCode === 201) {
            const user = res.data.user as UserDetails;
            if (!user.emailVerify) return {
                error: 'verify email first',
                data: data.email
            }
            success = true;
            cookies().set(appCookies.accessToken, res.data.token, {
                maxAge: COOKIE_MAX_AGE
            })
            cookies().set(appCookies.accessId, res.data.user._id, {
                maxAge: COOKIE_MAX_AGE
            })
            revalidatePath('/');
            revalidateTag(tags.user);
        }
        else if (res.data.toString() === 'email not verified') return {
            error: 'verify email first',
            data: data.email
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
        redirect(paths.dashboard, RedirectType.replace);
    return { error: "Unknown error" }
}
"use server"

import { formDataToObject, debugLog } from "@/functions/helpers";
import { appCookies, tags, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiAdminSignupResponse, ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import {z} from 'zod'


const schema = z.object({
    email: validators.email,
    password: validators.password,
    confirmPassword: validators.password,
    passcode: z.string().min(6, 'invalid access code')
})

type LoginFormProps = z.infer<typeof schema>

export async function adminRegister(res: ActionResponse, formData: FormData): Promise<ActionResponse> {

    const data = formDataToObject<LoginFormProps>(formData);
    const tryParse = schema.safeParse(data);
    if(!tryParse.success) return {
        fieldErrors: tryParse.error.flatten().fieldErrors
    }

    let success = false;
    if(data.password !== data.confirmPassword) return {
        error: "Passwords do not match"
    }
    try {
        const req = await ApiRequest.postJson(apis.adminRegister, data);
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
            error: res.data as unknown as string ?? "IAn error occurred"
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
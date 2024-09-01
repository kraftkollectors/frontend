"use server"

import { GoogleAuthResponse } from "@/components/ContinueWithGoogleButton";
import { debugLog, formDataToObject } from "@/functions/helpers";
import { appCookies, tags, validators } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE, GOOGLE_AUTH_USER_INFO_API } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";

const googleAuthRegisterSchema = z.object({
    firstName: validators.name,
    lastName: validators.name,
    userName: validators.name,
    gender: z.string(),
    email: validators.email,
})

type GoogleAuthRegisterFormData = z.infer<typeof googleAuthRegisterSchema>
export async function googleAuthRegister(_:ActionResponse, formData:FormData): Promise<ActionResponse> {
    let success = false;
    const data = formDataToObject<GoogleAuthRegisterFormData>(formData);
    debugLog(data);

    const tryParse = googleAuthRegisterSchema.safeParse(data);
    if(!tryParse.success) return {
        error: "fill all fields correctly",
        fieldErrors: tryParse.error.flatten().fieldErrors
    }
    
    try {
        
        const req = await ApiRequest.postJson(apis.googleAuth, data);
        const res = await (req.json()) as ApiResponse<ApiSignupResponse>;
        debugLog(res)
        if(res.statusCode === 201) {
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
    return {}
}
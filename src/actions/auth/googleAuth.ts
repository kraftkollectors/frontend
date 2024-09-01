"use server"

import { GoogleAuthResponse } from "@/components/ContinueWithGoogleButton";
import { debugLog } from "@/functions/helpers";
import { appCookies, tags } from "@/utils";
import { ApiRequest } from "@/utils/apiRequest";
import apis from "@/utils/apis";
import { COOKIE_MAX_AGE, GOOGLE_AUTH_USER_INFO_API } from "@/utils/constants";
import paths from "@/utils/paths";
import { ApiSignupResponse } from "@/utils/types/auth";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";


export async function googleAuth(data: {access_token: string}): Promise<ActionResponse> {
    let success = false;
    debugLog(data);
    
    try {
        const googReq = await ApiRequest.getJson(GOOGLE_AUTH_USER_INFO_API, {
            headers:{
                'Authorization': `Bearer ${data.access_token}`
            }
        });
        const googRes = await googReq.json() as GoogleAuthResponse;
        debugLog(googRes);
        if(!googRes.email) return {
            error: "Unable to signin with google"
        }

        const req = await ApiRequest.postJson(apis.googleAuth, googRes);
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
        else if((res.data as any as string).startsWith('Error creating account')) return {
                error: "needs_register",
                data: googRes
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
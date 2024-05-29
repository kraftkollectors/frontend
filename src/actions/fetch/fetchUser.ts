'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, tags } from "@/utils";
import { ActionApiResponse, ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { UserDetails, UserDetailsPlus } from "@/utils/types/user";
import { ServerActionParams } from "@/utils/types/actions";


export type UserApiResponse = {
    userDetails: UserDetailsPlus
}

export async function fetchUser({ redirect = true, throwsError = true }: ServerActionParams = {}): Promise<ActionApiResponse<UserDetailsPlus>> {
    try {
        const accessId = cookies().get(appCookies.accessId)?.value
        const req = await ServerApiRequest.get(apis.getUser(accessId ?? ''), {
            next: { tags: [tags.user] },
        });
        const res = (await req.json()) as ApiResponse<UserApiResponse>;
        debugLog(res);

        if (res.statusCode === 201) return res.data.userDetails;
        if (throwsError) throw new Error("Unable to connect")
        return null;
    } catch (error) {
        debugLog(error)
        if (throwsError) throw new Error("Something went wrong")
        return "error";
    }
}
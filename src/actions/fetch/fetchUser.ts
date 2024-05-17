'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import {tags} from "@/utils";
import { ActionApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";

export type ApiUser = {
    last_name: string;
    first_name: string;
    other_names: string;
    username: string;
}

export async function fetchUser(): Promise<ActionApiResponse<ApiUser>> {
    const { get, has } = cookies();
    if (!has('__access_token')) return null;
    const accessToken = get('__access_token')!.value;
    try {
        const req = await ServerApiRequest.get(apis.user, {
            next: { tags: [tags.user] },
            headers: {
                'Authorization': `Token ${accessToken}`
            }
        });
        const res = await req?.json();
        debugLog(`USER------\n${res}\n`);
        if (req?.status === 200 && !!res) return res as ApiUser;
        return null;
    } catch (error) {
        debugLog(error)
        return "error";
    }
}
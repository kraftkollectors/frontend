'use server'

import { debugLog } from "@/functions/helpers"
import apis from "@/utils/apis";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { appCookies, paths, tags } from "@/utils";
import { ApiResponse } from "@/utils/types/basicTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminUser } from "@/utils/types/admin";


export type AdminApiResponse = {
    existingAdmin: AdminUser
}

export async function adminDashboard() {
    let proceed = false;
    try {
        const accessId = cookies().get(appCookies.adminAccessId)?.value
        const req = await ServerApiRequest.get(apis.adminDashboard(accessId ?? ''), {
            next: { tags: [tags.admin] },
        });

        if (!req) return 'error';
        const res = (await req.json()) as ApiResponse<AdminApiResponse>;
        // debugLog(res);

        if ((res as any).message == 'Invalid Token') proceed = true;
        else if (res.statusCode === 201) return res.data.existingAdmin;
        else return null
        if (!proceed) return 'error';
    } catch (error) {
        debugLog(error)
        throw new Error("Something went wrong")
    }
    if (proceed) {
        cookies().delete(appCookies.accessToken);
        cookies().delete(appCookies.adminAccessId);
        redirect(paths.login)
    };
    return 'error'
}
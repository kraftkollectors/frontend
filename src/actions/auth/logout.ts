'use server';

import { debugLog } from "@/functions/helpers";
import { appCookies, tags } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function logout() {
    try {
        cookies().delete(appCookies.accessToken);
        cookies().delete(appCookies.accessId);
        revalidateTag(tags.user);
        revalidatePath('/');

        return true;
    } catch (error) {
        debugLog(error);
        return false;
    }
}
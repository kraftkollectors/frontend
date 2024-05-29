'use server';

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
        return false;
    }
}
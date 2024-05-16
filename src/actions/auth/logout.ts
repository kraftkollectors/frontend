'use server';

import { tags } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function logout() {
    try {
        cookies().delete('__access_token');
        revalidateTag(tags.user);
        revalidatePath('/');

        return true;
    } catch (error) {
        return false;
    }
}
'use server'

import { debugLog, formDataToObject } from "@/functions/helpers";
import { apis, paths, tags, validators } from "@/utils";
import { ServerApiRequest } from "@/utils/serverApiRequest";
import { ActionResponse, ApiResponse } from "@/utils/types/basicTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";



type UpdateNotificationFormData = {
    notify?: "true",
    notifyReview?: "true",
    userId: string;
    userEmail: string;
};

export async function updateUserNotificationSettings(_: any, formData: FormData): Promise<ActionResponse> {
    const data = formDataToObject<UpdateNotificationFormData>(formData);
    debugLog(data);

    try {
        const _data = {
            ...data,
            notify: data.notify == 'true',
            notifyReview: data.notifyReview == 'true',
        };
        const req = await ServerApiRequest.patch(apis.updateUserProfile(data.userId), _data);
        const res = (await req?.json()) as ApiResponse;
        debugLog(res);

        if(res.statusCode == 201) {
            revalidateTag(tags.user);
            revalidatePath(paths.dashboard);
            return {success: "Notification settings updated", data: res.data.data};
        }

        return {
            error: res.data ?? "Something went wrong"
        }

    } catch (error) {
        debugLog(error);
        return {error: 'Something went wrong'}
    }
}